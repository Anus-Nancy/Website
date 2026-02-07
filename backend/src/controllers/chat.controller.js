import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma.js';
import { messageSchema } from '../utils/validators.js';

export const getMessages = async (req, res) => {
  const messages = await prisma.message.findMany({
    where: { requestId: req.params.requestId },
    orderBy: { createdAt: 'asc' }
  });
  res.json({ messages });
};

export const postMessage = async (req, res) => {
  const payload = messageSchema.parse(req.body);
  const message = await prisma.message.create({
    data: { requestId: req.params.requestId, senderId: req.user.sub, text: payload.text }
  });
  req.app.get('io').to(`request:${req.params.requestId}`).emit('chat:message', message);
  res.status(StatusCodes.CREATED).json({ message });
};
