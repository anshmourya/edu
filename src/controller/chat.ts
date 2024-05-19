import { Request, Response } from 'express';
import { video } from 'service/video';
import { youtube } from 'config/youtube';
import { parseISODuration } from '@utils/helper';
import openai from '@config/gpt';
import { transcriptVideoSystemPrompt } from 'constant';
class Chat {
  constructor() {
    this.newVideoDoubt = this.newVideoDoubt.bind(this);
  }
  async newVideoDoubt(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { question } = req.body;
      // Fetch video details
      const videoDetails = await youtube.videos.list({
        part: ['contentDetails'],
        id: [id],
      });

      const videoLengthInMinutes = parseISODuration(
        videoDetails.data.items[0].contentDetails.duration,
      );

      if (videoLengthInMinutes > 20) {
        throw new Error('Video is too long');
      }
      // Fetch video transcript
      const transcribeVideo = await video.transcript(id);

      const newQuery = [
        {
          role: 'system',
          content: transcriptVideoSystemPrompt(transcribeVideo),
        },
        {
          role: 'user',
          content: question,
        },
      ];
      const answer = await this.answerInText(newQuery);
      res.success({
        message: 'your answer',
        data: answer,
      });
    } catch (error) {
      console.error('error in the doubt function', error);
      res.error(error);
    }
  }
  async answerInText(messages) {
    console.log('messages');
    const repsone = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
    });
    return repsone.choices[0].message.content;
  }
}

export const chat = new Chat();
