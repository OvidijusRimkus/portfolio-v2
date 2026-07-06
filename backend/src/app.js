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
import { contactRoutes } from './modules/contact/contact.routes.js';

const app = express();

/**
 * Helmet prideda saugumo HTTP headerius.
 */
app.use(helmet());

/**
 * CORS reikalingas frontend/backend komunikacijai.
 *
 * credentials: true būtinas, nes auth etape JWT saugosime HttpOnly cookie.
 */
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

/**
 * Bendras API rate limit.
 * Vėliau auth route turės atskirą griežtesnį limitą.
 */
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

/**
 * API root endpointas.
 */
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio v2 API is running',
  });
});

/**
 * Health check endpointas.
 */
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

/**
 * Feature routes.
 */
app.use('/api/contact', contactRoutes);

/**
 * 404 ir global error middleware turi būti pačioje app.js apačioje,
 * po visų route.
 */
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;