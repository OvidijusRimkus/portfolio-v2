// backend/src/modules/contact/contact.validation.js

import { z } from 'zod';

/**
 * Kontaktų formos validacija.
 *
 * Zod leidžia užtikrinti, kad į service sluoksnį pateks tik tvarkingi duomenys.
 */
export const createContactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(80, 'Name must be at most 80 characters long'),

  email: z
    .string()
    .trim()
    .email('Please provide a valid email address')
    .max(120, 'Email must be at most 120 characters long'),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message must be at most 2000 characters long'),
});