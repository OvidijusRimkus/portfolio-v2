// backend/src/modules/auth/auth.service.js

import bcrypt from 'bcryptjs';

import { prisma } from '../../db/prisma.js';
import { AppError } from '../../utils/AppError.js';
import { signToken } from '../../utils/jwt.js';

/**
 * Suranda admin pagal username ir patikrina slaptažodį.
 *
 * Jeigu duomenys blogi, grąžiname tą pačią klaidą:
 * "Invalid username or password"
 *
 * Kodėl?
 * Saugumo prasme geriau neatskleisti, ar blogas username, ar password.
 */
export async function loginAdmin({ username, password }) {
  const admin = await prisma.admin.findUnique({
    where: {
      username,
    },
  });

  if (!admin) {
    throw new AppError('Invalid username or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isPasswordValid) {
    throw new AppError('Invalid username or password', 401);
  }

  const token = signToken({
    adminId: admin.id,
  });

  return {
    token,
    admin: {
      id: admin.id,
      username: admin.username,
      createdAt: admin.createdAt,
    },
  };
}

/**
 * Grąžina prisijungusio admin duomenis pagal id.
 *
 * Naudosime /api/auth/me endpointui.
 */
export async function getAdminById(adminId) {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!admin) {
    throw new AppError('Admin not found', 404);
  }

  return admin;
}