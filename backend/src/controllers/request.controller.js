import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma.js';
import { requestSchema, reviewSchema } from '../utils/validators.js';

export const createRequest = async (req, res) => {
  const data = requestSchema.parse(req.body);
  const request = await prisma.request.create({
    data: { ...data, schedule: new Date(data.schedule), customerId: req.user.sub }
  });
  return res.status(StatusCodes.CREATED).json({ request });
};

export const listRequests = async (req, res) => {
  const where = req.user.role === 'CUSTOMER' ? { customerId: req.user.sub } : {};
  const requests = await prisma.request.findMany({ where, orderBy: { createdAt: 'desc' } });
  return res.json({ requests });
};

export const getRequestById = async (req, res) => {
  const request = await prisma.request.findUnique({ where: { id: req.params.id }, include: { payment: true, messages: true } });
  if (!request) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Request not found' });
  return res.json({ request });
};

export const createReview = async (req, res) => {
  const data = reviewSchema.parse(req.body);
  const review = await prisma.review.create({ data: { ...data, customerId: req.user.sub } });
  return res.status(StatusCodes.CREATED).json({ review });
};
