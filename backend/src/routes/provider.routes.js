import { Router } from 'express';
import { providerEarnings, providerRequests, updateProviderRequest } from '../controllers/provider.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth, requireRole('PROVIDER'));
router.get('/requests', providerRequests);
router.patch('/requests/:id', updateProviderRequest);
router.get('/earnings', providerEarnings);
export default router;
