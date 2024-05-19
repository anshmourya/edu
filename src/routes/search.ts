import { feed } from '@controller/feed';
import express from 'express';
const router = express.Router();

router.post('/search', feed.search);
router.get('/video/:id', feed.detail);

export default router;
