// backend/src/db/prisma.js

import { PrismaClient } from '@prisma/client';

/**
 * Vienas bendras Prisma klientas visai backend aplikacijai.
 *
 * Svarbu:
 * - Prisma nenaudosime controlleriuose.
 * - Prisma naudosime tik service sluoksnyje.
 * - Šis failas tik sukuria ryšį su DB.
 */
export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['warn', 'error'],
});