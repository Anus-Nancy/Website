import { prisma } from '../config/prisma.js';

export const providerRequests = async (req, res) => {
  const requests = await prisma.request.findMany({ where: { providerId: req.user.sub }, orderBy: { createdAt: 'desc' } });
  return res.json({ requests });
};

export const updateProviderRequest = async (req, res) => {
  const request = await prisma.request.update({
    where: { id: req.params.id },
    data: { status: req.body.status, providerId: req.user.sub }
  });
  return res.json({ request });
};

export const providerEarnings = async (req, res) => {
  const payments = await prisma.payment.findMany({
    where: { request: { providerId: req.user.sub }, status: 'PAID' },
    include: { request: true }
  });
  const total = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  return res.json({ total, payments });
};
