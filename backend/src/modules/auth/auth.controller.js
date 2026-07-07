// backend/src/modules/auth/auth.controller.js

import { env } from '../../config/env.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { getAdminById, loginAdmin } from './auth.service.js';
import { loginSchema } from './auth.validation.js';

/**
 * Cookie nustatymai.
 *
 * JWT saugosime HttpOnly cookie.
 * Tai saugiau negu localStorage, nes JavaScript negali tiesiogiai perskaityti cookie.
 */
function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

/**
 * POST /api/auth/login
 */
export const login = catchAsync(async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Invalid login data';

    throw new AppError(firstError, 400);
  }

  const { token, admin } = await loginAdmin(result.data);

  res.cookie(env.JWT_COOKIE_NAME, token, getAuthCookieOptions());

  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    data: {
      admin,
    },
  });
});

/**
 * POST /api/auth/logout
 */
export const logout = catchAsync(async (req, res) => {
  res.clearCookie(env.JWT_COOKIE_NAME, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

/**
 * GET /api/auth/me
 *
 * req.admin bus pridėtas auth middleware kitame pakete.
 */
export const me = catchAsync(async (req, res) => {
  const admin = await getAdminById(req.admin.id);

  res.status(200).json({
    success: true,
    data: {
      admin,
    },
  });
});