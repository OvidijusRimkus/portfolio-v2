
// backend/src/server.js

import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './db/prisma.js';

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${env.PORT}`);
});

/**
 * Tvarkingas serverio išjungimas.
 *
 * Kai spaudi Ctrl + C:
 * - uždarome Express serverį;
 * - atjungiame Prisma nuo duomenų bazės;
 * - tik tada užbaigiame procesą.
 */
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    await prisma.$disconnect();

    console.log('Database disconnected.');
    console.log('Server closed.');

    process.exit(0);
  });
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
