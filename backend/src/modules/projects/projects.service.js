// backend/src/modules/projects/projects.service.js

import { prisma } from '../../db/prisma.js';
import { AppError } from '../../utils/AppError.js';

const projectImageSelect = {
  id: true,
  url: true,
  alt: true,
  caption: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
};

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
  isPublished: true,
  sortOrder: true,

  overview: true,
  role: true,
  methodology: true,
  projectManagement: true,
  developmentProcess: true,
  testingProcess: true,
  lessonsLearned: true,
  problemsSolved: true,
  techDetails: true,

  images: {
    orderBy: {
      sortOrder: 'asc',
    },
    select: projectImageSelect,
  },

  createdAt: true,
  updatedAt: true,
};

function splitProjectPayload(data) {
  const { images, ...projectData } = data;

  return {
    projectData,
    images,
  };
}

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
 * Grąžina visus projektus admin dashboardui.
 *
 * Čia specialiai nefiltruojame pagal isPublished,
 * nes admin turi matyti ir paslėptus projektus.
 */
export async function getAllProjectsForAdmin() {
  const projects = await prisma.project.findMany({
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

  const { projectData, images } = splitProjectPayload(data);

  const project = await prisma.project.create({
    data: {
      ...projectData,
      images: images
        ? {
            create: images,
          }
        : undefined,
    },
    select: publicProjectSelect,
  });

  return project;
}

/**
 * Atnaujina projektą pagal id.
 *
 * Jeigu request body turi images masyvą, senos projekto nuotraukos
 * yra pakeičiamos naujomis. Jeigu images nėra pateiktas,
 * galerijos neliečiame.
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

  const { projectData, images } = splitProjectPayload(data);

  if (images === undefined) {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data: projectData,
      select: publicProjectSelect,
    });

    return project;
  }

  const project = await prisma.$transaction(async (tx) => {
    await tx.projectImage.deleteMany({
      where: {
        projectId: id,
      },
    });

    return tx.project.update({
      where: {
        id,
      },
      data: {
        ...projectData,
        images: {
          create: images,
        },
      },
      select: publicProjectSelect,
    });
  });

  return project;
}

/**
 * Ištrina projektą pagal id.
 *
 * ProjectImage įrašai išsitrins automatiškai dėl onDelete: Cascade.
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