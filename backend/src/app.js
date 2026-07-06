
// backend/src/app.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { env } from './config/env.js';
import { prisma } from './db/prisma.js';

const app = express();

/**
 * Helmet prideda saugumo HTTP headerius.
 * Tai paprasta, bet profesionali production-style apsauga.
 */
app.use(helmet());

/**
 * CORS leidžia frontend aplikacijai bendrauti su backend.
 *
 * credentials: true reikalinga, nes JWT saugosime HttpOnly cookie.
 */
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

/**
 * Bendras API rate limit.
 * Vėliau auth route'ams pridėsime atskirą griežtesnį limitą.
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
 * Greitam testui, ar backend serveris veikia.
 */
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio v2 API is running',
  });
});

/**
 * Health check endpointas.
 *
 * Čia tikriname ne tik Express,
 * bet ir realų ryšį su PostgreSQL per Prisma.
 */
app.get('/api/health', async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      status: 'healthy',
      services: {
        api: 'up',
        database: 'up',
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Laikinas 404 handleris.
 * Vėliau iškelsime į atskirą middleware failą.
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

/**
 * Laikinas global error handleris.
 * Vėliau iškelsime į atskirą middleware failą.
 */
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

export default app;
