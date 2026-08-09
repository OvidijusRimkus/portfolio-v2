// backend/src/app.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { env } from './config/env.js';
import { prisma } from './db/prisma.js';
import { catchAsync } from './utils/catchAsync.js';
import { notFoundMiddleware } from './middleware/notFound.middleware.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { adminRoutes } from './modules/admin/admin.routes.js';
import { analyticsRoutes } from './modules/analytics/analytics.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { contactRoutes } from './modules/contact/contact.routes.js';
import { projectRoutes } from './modules/projects/projects.routes.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }),
);

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio v2 API is running',
  });
});

app.get(
  '/api/health',
  catchAsync(async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      status: 'healthy',
      services: {
        api: 'up',
        database: 'up',
      },
    });
  }),
);

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/projects', projectRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;