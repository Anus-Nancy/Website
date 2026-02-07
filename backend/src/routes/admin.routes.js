import { Router } from 'express';
import { analytics, getProviders, getUsers, updateUser } from '../controllers/admin.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth, requireRole('ADMIN'));
router.get('/users', getUsers);
router.get('/providers', getProviders);
router.patch('/users/:id', updateUser);
router.get('/analytics', analytics);
export default router;
