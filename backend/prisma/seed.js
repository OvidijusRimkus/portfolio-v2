// backend/prisma/seed.js

import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

/**
 * Seed sukuria vieną admin vartotoją iš .env:
 *
 * ADMIN_USERNAME
 * ADMIN_PASSWORD
 *
 * Registracijos portfolio projekte nebus.
 */
async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env');
  }

  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD must be at least 8 characters long');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: {
      username,
    },
    update: {
      passwordHash,
    },
    create: {
      username,
      passwordHash,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  console.log('✅ Admin seeded successfully');
  console.log(admin);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });