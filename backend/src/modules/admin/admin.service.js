// backend/src/modules/admin/admin.service.js

import { prisma } from '../../db/prisma.js';
import { AppError } from '../../utils/AppError.js';

/**
 * Grąžina kontaktų žinutes admin dashboardui.
 *
 * Service sluoksnyje laikome:
 * - Prisma užklausas;
 * - pagination logiką;
 * - filtravimą.
 */
export async function getContactMessages({ page, limit, isRead }) {
  const skip = (page - 1) * limit;

  const where = {};

  if (typeof isRead === 'boolean') {
    where.isRead = isRead;
  }

  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        message: true,
        isRead: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.contactMessage.count({
      where,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    messages,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * Pažymi kontaktų žinutę kaip perskaitytą.
 */
export async function markContactMessageAsRead(id) {
  const existingMessage = await prisma.contactMessage.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingMessage) {
    throw new AppError('Contact message not found', 404);
  }

  const updatedMessage = await prisma.contactMessage.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      isRead: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedMessage;
}