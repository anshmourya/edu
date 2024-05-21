import user from '@controller/user';
import express from 'express';
const router = express.Router();
router.get('/get/:id', user.getUser);
router.post('/create', user.create);
router.post('/session', user.createSesion);
router.post('/logout');

export default router;
