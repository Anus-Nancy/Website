import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma.js';
import { signToken } from '../utils/jwt.js';
import { loginSchema, registerSchema } from '../utils/validators.js';

export const register = async (req, res) => {
  const data = registerSchema.parse(req.body);
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) return res.status(StatusCodes.CONFLICT).json({ message: 'Email already used' });

  const user = await prisma.user.create({
    data: { ...data, password: await bcrypt.hash(data.password, 10) },
    select: { id: true, name: true, email: true, role: true, verified: true, createdAt: true }
  });
  return res.status(StatusCodes.CREATED).json({ user, token: signToken(user) });
};

export const login = async (req, res) => {
  const data = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
  }
  const payload = { id: user.id, name: user.name, email: user.email, role: user.role, verified: user.verified };
  return res.json({ user: payload, token: signToken(user) });
};

export const me = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.sub },
    select: { id: true, name: true, email: true, role: true, verified: true, createdAt: true }
  });
  return res.json({ user });
};
