import { prisma } from '../config/prisma.js';

export const getUsers = async (_req, res) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  res.json({ users });
};

export const getProviders = async (_req, res) => {
  const providers = await prisma.user.findMany({ where: { role: 'PROVIDER' }, orderBy: { createdAt: 'desc' } });
  res.json({ providers });
};

export const updateUser = async (req, res) => {
  const user = await prisma.user.update({ where: { id: req.params.id }, data: req.body });
  res.json({ user });
};

export const analytics = async (_req, res) => {
  const [users, jobs, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.request.count(),
    prisma.payment.aggregate({ _sum: { amount: true } })
  ]);
  res.json({ users, jobs, revenue: Number(revenue._sum.amount || 0) });
};
