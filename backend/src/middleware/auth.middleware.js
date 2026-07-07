// backend/src/middleware/auth.middleware.js

import { env } from '../config/env.js';
import { prisma } from '../db/prisma.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { verifyToken } from '../utils/jwt.js';

/**
 * protect middleware apsaugo admin route'us.
 *
 * JWT imame iš HttpOnly cookie:
 * req.cookies[env.JWT_COOKIE_NAME]
 *
 * Jeigu token nėra arba jis blogas — grąžiname 401.
 * Jeigu token geras — surandame admin DB ir pridedame prie req.admin.
 */
export const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies?.[env.JWT_COOKIE_NAME];

  if (!token) {
    throw new AppError('You are not logged in', 401);
  }

  let decodedToken;

  try {
    decodedToken = verifyToken(token);
  } catch (error) {
    throw new AppError('Invalid or expired token', 401);
  }

  const admin = await prisma.admin.findUnique({
    where: {
      id: decodedToken.adminId,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!admin) {
    throw new AppError('Admin no longer exists', 401);
  }

  req.admin = admin;

  next();
});