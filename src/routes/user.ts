import user from '@controller/user';
import express from 'express';
const router = express.Router();

router.post('/create', user.create);
router.post('/session');
router.post('/logout');

export default router;
