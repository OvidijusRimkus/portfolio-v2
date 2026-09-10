// backend/src/middleware/error.middleware.js

import { env } from '../config/env.js';

/**
 * Global error middleware.
 *
 * Visi next(error) galiausiai patenka čia.
 *
 * Development režime grąžiname daugiau informacijos,
 * kad būtų lengviau debuginti.
 *
 * Production režime stack trace vartotojui nerodysime.
 */
export function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';

  if (env.NODE_ENV === 'development') {
    console.error('❌ Error:', error);

    return res.status(statusCode).json({
      success: false,
      status,
      message: error.message,
      stack: error.stack,
    });
  }

  if (error.isOperational) {
    return res.status(statusCode).json({
      success: false,
      status,
      message: error.message,
    });
  }

  console.error('❌ Unexpected error:', error);

  return res.status(500).json({
    success: false,
    status: 'error',
    message: 'Something went wrong',
  });
}