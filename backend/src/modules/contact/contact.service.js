// backend/src/modules/contact/contact.service.js

import { prisma } from '../../db/prisma.js';

/**
 * Sukuria naują kontaktų žinutę duomenų bazėje.
 *
 * Prisma naudojame tik service sluoksnyje.
 * Controlleris neturi žinoti, kaip tiksliai saugomi duomenys.
 */
export async function createContactMessage(data) {
  const contactMessage = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
    },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      isRead: true,
      createdAt: true,
    },
  });

  return contactMessage;
}