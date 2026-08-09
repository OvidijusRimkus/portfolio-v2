// backend/src/modules/admin/admin.validation.js

import { z } from 'zod';

/**
 * Admin contact messages query validacija.
 *
 * Kol kas leidžiame:
 * - page
 * - limit
 * - isRead
 *
 * Vėliau galėsime pridėti:
 * - search
 * - dateFrom/dateTo
 * - sorting
 */
export const getContactMessagesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),

  isRead: z
    .enum(['true', 'false'])
    .optional()
    .transform((value) => {
      if (value === undefined) {
        return undefined;
      }

      return value === 'true';
    }),
});

/**
 * UUID validacija route parametrams.
 *
 * ContactMessage id yra uuid iš Prisma schema.
 */
export const contactMessageParamsSchema = z.object({
  id: z.string().uuid('Invalid contact message id'),
});