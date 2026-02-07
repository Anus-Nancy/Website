import { Router } from 'express';
import { createRequest, createReview, getRequestById, listRequests } from '../controllers/request.controller.js';
import { createPayment } from '../controllers/payment.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.post('/requests', requireRole('CUSTOMER'), createRequest);
router.get('/requests', listRequests);
router.get('/requests/:id', getRequestById);
router.post('/payments', requireRole('CUSTOMER'), createPayment);
router.post('/reviews', requireRole('CUSTOMER'), createReview);

export default router;
