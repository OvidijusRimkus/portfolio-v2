// backend/src/modules/auth/auth.validation.js

import { z } from 'zod';

/**
 * Login validacija.
 *
 * Registracijos šiame projekte nebus.
 * Admin vartotojas bus sukurtas per seed iš .env reikšmių.
 */
export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters long')
    .max(80, 'Username must be at most 80 characters long'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(200, 'Password must be at most 200 characters long'),
});