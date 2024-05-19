import { chat } from '@controller/chat';
import express from 'express';
const router = express.Router();

// Define your routes
router.post('/video-doubt/:id', chat.newVideoDoubt);

export default router;
