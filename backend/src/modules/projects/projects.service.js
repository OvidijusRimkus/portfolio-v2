// backend/src/modules/projects/projects.service.js

import { prisma } from '../../db/prisma.js';
import { AppError } from '../../utils/AppError.js';

const publicProjectSelect = {
  id: true,
  title: true,
  slug: true,
  type: true,
  description: true,
  stack: true,
  highlights: true,
  githubUrl: true,
  liveUrl: true,
  imageUrl: true,
  status: true,
  isFeatured: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
};

/**
 * Grąžina publikuotus projektus public portfolio puslapiui.
 */
export async function getPublishedProjects({ featured }) {
  const where = {
    isPublished: true,
  };

  if (typeof featured === 'boolean') {
    where.isFeatured = featured;
  }

  const projects = await prisma.project.findMany({
    where,
    orderBy: [
      {
        sortOrder: 'asc',
      },
      {
        createdAt: 'desc',
      },
    ],
    select: publicProjectSelect,
  });

  return projects;
}

/**
 * Grąžina vieną public projektą pagal slug.
 */
export async function getPublishedProjectBySlug(slug) {
  const project = await prisma.project.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    select: publicProjectSelect,
  });

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  return project;
}

/**
 * Sukuria projektą admin dashboardui.
 */
export async function createProject(data) {
  const existingProject = await prisma.project.findUnique({
    where: {
      slug: data.slug,
    },
    select: {
      id: true,
    },
  });

  if (existingProject) {
    throw new AppError('Project with this slug already exists', 409);
  }

  const project = await prisma.project.create({
    data,
    select: publicProjectSelect,
  });

  return project;
}

/**
 * Atnaujina projektą pagal id.
 */
export async function updateProject(id, data) {
  const existingProject = await prisma.project.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingProject) {
    throw new AppError('Project not found', 404);
  }

  if (data.slug) {
    const projectWithSameSlug = await prisma.project.findUnique({
      where: {
        slug: data.slug,
      },
      select: {
        id: true,
      },
    });

    if (projectWithSameSlug && projectWithSameSlug.id !== id) {
      throw new AppError('Project with this slug already exists', 409);
    }
  }

  const project = await prisma.project.update({
    where: {
      id,
    },
    data,
    select: publicProjectSelect,
  });

  return project;
}

/**
 * Ištrina projektą pagal id.
 */
export async function deleteProject(id) {
  const existingProject = await prisma.project.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingProject) {
    throw new AppError('Project not found', 404);
  }

  await prisma.project.delete({
    where: {
      id,
    },
  });
}