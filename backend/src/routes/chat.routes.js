import { Router } from 'express';
import { getMessages, postMessage } from '../controllers/chat.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/:requestId', getMessages);
router.post('/:requestId', postMessage);
export default router;
