import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma.js';
import { stripe } from '../services/payment.service.js';

export const createPayment = async (req, res) => {
  const { requestId, amount } = req.body;
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(Number(amount) * 100),
    currency: 'usd',
    metadata: { requestId }
  });
  const payment = await prisma.payment.create({
    data: { requestId, amount, status: 'PENDING', transactionId: intent.id }
  });
  return res.status(StatusCodes.CREATED).json({ payment, clientSecret: intent.client_secret });
};
