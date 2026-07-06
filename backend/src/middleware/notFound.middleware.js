// backend/src/middleware/notFound.middleware.js

import { AppError } from '../utils/AppError.js';

/**
 * 404 middleware.
 *
 * Jei request pasiekia šitą vietą, reiškia jokio route nerado.
 */
export function notFoundMiddleware(req, res, next) {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
}