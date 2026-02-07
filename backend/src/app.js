import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import requestRoutes from './routes/request.routes.js';
import providerRoutes from './routes/provider.routes.js';
import adminRoutes from './routes/admin.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { errorHandler, notFound } from './middleware/error.js';

export const createApp = () => {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan('dev'));
  app.use(rateLimit({ windowMs: 10 * 60 * 1000, limit: 200 }));

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use('/api/auth', authRoutes);
  app.use('/api', requestRoutes);
  app.use('/api/provider', providerRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/chat', chatRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
};
