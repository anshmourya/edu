import { Request, Response } from 'express';
import { video } from 'service/video';
import { youtube } from 'config/youtube';
import { parseISODuration } from '@utils/helper';
import openai from '@config/gpt';
import { transcriptVideoSystemPrompt } from 'constant';
import { ChatModal, ConversationModal } from '@schema/chat';

class Chat {
  videoDoubt = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { question } = req.body;
      const userId = 'anshmourya1234';

      // Check if conversation exists
      let conversation = await this.isConversationExist(userId, id);
      if (!conversation) {
        // Fetch video details only if conversation doesn't exist
        const videoDetails = await youtube.videos.list({
          part: ['contentDetails'],
          id: [id],
        });

        if (!videoDetails.data.items.length) {
          throw new Error('Video not found');
        }

        const videoLengthInMinutes = parseISODuration(
          videoDetails.data.items[0].contentDetails.duration,
        );

        if (videoLengthInMinutes > 20) {
          throw new Error('Video is too long');
        }

        // Fetch and summarize video transcript
        const transcribeVideo = await video.transcript(id);
        const summarizedTranscription =
          await this.summarizeText(transcribeVideo);

        // Create new conversation and store system prompt
        conversation = await this.createNewConversation(userId, 'video', id);
        await this.storeChatMessage(
          userId,
          conversation.id,
          'system',
          transcriptVideoSystemPrompt(summarizedTranscription),
        );
      }

      // Fetch last 5 messages
      const last5Messages = await this.getLastMessages(conversation.id, 5);

      // Construct query for AI answer
      const newQuery = [
        ...last5Messages.map((message) => ({
          role: message.sender === 'user' ? 'user' : 'assistant',
          content: message.message,
        })),
        {
          role: 'user',
          content: question,
        },
      ];

      // Get AI answer
      const answer = await this.answerInText(newQuery);

      // Store user question and AI answer in the chat
      await this.storeChatMessage(userId, conversation.id, 'user', question);
      await this.storeChatMessage(userId, conversation.id, 'ai', answer);

      res.success({
        message: 'Your answer',
        data: {
          answer,
          newQuery,
        },
      });
    } catch (error) {
      console.error('Error in the videoDoubt function', error);
      res.error({ message: error.message });
    }
  };

  answerInText = async (messages) => {
    console.log(messages);
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 200,
    });
    return response.choices[0].message.content;
  };

  storeChatMessage = async (userId, conversationId, sender, message) => {
    const chat = await ChatModal.create({
      userId,
      conversationId,
      sender,
      message,
      timestamp: new Date(),
    });
    return chat;
  };

  createNewConversation = async (userId, type, typeId) => {
    const newConversation = await ConversationModal.create({
      userId,
      typeId,
      type,
    });
    return newConversation;
  };

  isConversationExist = async (userId, typeId) => {
    const conversation = await ConversationModal.findOne({
      userId,
      typeId,
    });
    return conversation;
  };

  getLastMessages = async (conversationId, limit) => {
    const allMessages = await ChatModal.find({
      conversationId,
      $or: [{ sender: { $ne: 'system' } }, { sender: 'system' }],
    })
      .sort({ timestamp: -1 })
      .limit(limit)
      .exec();

    // Sort by timestamp to ensure correct order
    const sortedMessages = allMessages.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    );

    return sortedMessages;
  };

  summarizeText = async (text) => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Summarize the following text while retaining the key information.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    return response.choices[0].message.content;
  };
}
export const chat = new Chat();
