// backend/prisma/seed.js

import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const projects = [
  {
    title: 'Portfolio v2',
    slug: 'portfolio-v2',
    type: 'Production Portfolio Application',
    description:
      'A premium full stack developer portfolio with analytics, contact forms, CV tracking, project API and admin dashboard.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Express', 'PostgreSQL', 'Prisma', 'Docker'],
    highlights: ['Analytics', 'Admin Dashboard', 'JWT Auth', 'Contact Messages'],
    githubUrl: 'https://github.com/OvidijusRimkus/portfolio-v2',
    liveUrl: null,
    imageUrl: null,
    status: 'In progress',
    isFeatured: true,
    isPublished: true,
    sortOrder: 1,
  },
  {
  title: 'FitBook',
  slug: 'fitbook',
  type: 'Full Stack Booking Platform',
  description:
    'A full stack group training booking application where users can register, log in, browse available training sessions, book sessions, view their bookings and cancel reservations. The admin area allows managing bookings, updating booking statuses and viewing analytics data.',
  stack: [
    'React',
    'Vite',
    'Tailwind CSS',
    'Zustand',
    'Express',
    'PostgreSQL',
    'JWT',
    'Docker',
  ],
  highlights: [
    'User Authentication',
    'Booking Management',
    'Admin Dashboard',
    'Analytics',
    'Swagger API Docs',
  ],
  githubUrl: 'https://github.com/AugustinaCodes/pavasario-projektas-js.git',
  liveUrl: null,
  imageUrl: '/projects/fitbook.png',
  status: 'Completed',
  isFeatured: true,
  isPublished: true,
  sortOrder: 2,
},
  {
    title: 'PetClinic',
    slug: 'petclinic',
    type: 'Practice Management System',
    description:
      'A PetClinic-style full stack application focused on CRUD operations, clean architecture and real-world API structure.',
    stack: ['React', 'Axios', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    highlights: ['CRUD', 'REST API', 'Database'],
    githubUrl: null,
    liveUrl: null,
    imageUrl: null,
    status: 'Practice project',
    isFeatured: true,
    isPublished: true,
    sortOrder: 3,
  },
  {
  title: 'PayAPI Multi-page Website',
  slug: 'payapi-website',
  type: 'Frontend Multi-page Website',
  description:
    'A responsive team-built multi-page marketing website built with HTML, CSS and JavaScript. The project includes Home, About, Pricing and Contact pages, responsive layouts, mobile navigation, reusable visual assets and a contact form interface.',
  stack: [
    'HTML',
    'CSS',
    'JavaScript',
    'Responsive Design',
    'Multi-page Website',
  ],
  highlights: [
    'Responsive Layout',
    'Mobile Navigation',
    'Multi-page Structure',
    'Pricing Page',
    'Static Website',
  ],
  githubUrl: 'https://github.com/AugustinaCodes/techin_null_team',
  liveUrl: null,
  imageUrl: '/projects/payapi-website.png',
  status: 'Completed',
  isFeatured: true,
  isPublished: true,
  sortOrder: 4,
},
];

/**
 * Seed sukuria:
 * - vieną admin vartotoją iš .env;
 * - pradinius portfolio projektus.
 *
 * Registracijos portfolio projekte nebus.
 */
async function main() {
  await seedAdmin();
  await seedProjects();
}

async function seedAdmin() {
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

async function seedProjects() {
  for (const project of projects) {
    const seededProject = await prisma.project.upsert({
      where: {
        slug: project.slug,
      },
      update: project,
      create: project,
      select: {
        id: true,
        title: true,
        slug: true,
        isFeatured: true,
        isPublished: true,
      },
    });

    console.log(`✅ Project seeded: ${seededProject.title}`);
  }
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