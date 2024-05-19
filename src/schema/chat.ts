import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ['video', 'chat', 'blog'],
    required: true,
  },
  typeId: {
    type: String,
    required: true,
  },
});

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  sender: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true,
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

chatSchema.index({ userId: 1, conversationId: 1, timestamp: -1 });

export const ConversationModal = mongoose.model(
  'Conversation',
  conversationSchema,
);
export const ChatModal = mongoose.model('Chat', chatSchema);
