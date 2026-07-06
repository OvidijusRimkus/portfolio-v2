
// backend/src/config/env.js

import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

/**
 * Environment validation.
 *
 * Tikslas:
 * - jeigu trūksta DATABASE_URL, JWT_SECRET ar kitos svarbios reikšmės,
 *   serveris turi sustoti iš karto su aiškia klaida.
 * - taip išvengiam situacijos, kai klaida išlenda tik po kelių etapų.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z.string().url(),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  JWT_SECRET: z.string().min(20, 'JWT_SECRET must be at least 20 characters long'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_COOKIE_NAME: z.string().default('portfolio_token'),

  ADMIN_USERNAME: z.string().min(3, 'ADMIN_USERNAME must be at least 3 characters long'),
  ADMIN_PASSWORD: z.string().min(8, 'ADMIN_PASSWORD must be at least 8 characters long'),

  COOKIE_SECURE: z
    .string()
    .default('false')
    .transform((value) => value === 'true'),

  COOKIE_SAME_SITE: z.enum(['lax', 'strict', 'none']).default('lax'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables');
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
