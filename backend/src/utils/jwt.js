// backend/src/utils/jwt.js

import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

/**
 * JWT helperiai.
 *
 * Čia laikome token kūrimą ir tikrinimą,
 * kad auth service/controller failuose nereikėtų kartoti jwt logikos.
 */

export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}