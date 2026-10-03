// backend/src/modules/projects/projects.validation.js

import { z } from 'zod';

export const projectParamsSchema = z.object({
  id: z.string().uuid('Invalid project id'),
});

export const projectSlugParamsSchema = z.object({
  slug: z.string().trim().min(2, 'Invalid project slug'),
});

export const getProjectsQuerySchema = z.object({
  featured: z
    .enum(['true', 'false'])
    .optional()
    .transform((value) => {
      if (value === undefined) {
        return undefined;
      }

      return value === 'true';
    }),
});

const urlOrLocalPathSchema = z
  .string()
  .trim()
  .refine(
    (value) => {
      if (value.startsWith('/')) {
        return true;
      }

      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: 'Value must be a valid URL or local public path',
    },
  );

const projectImageSchema = z.object({
  url: urlOrLocalPathSchema,
  alt: z.string().trim().min(2).max(160),
  caption: z.string().trim().max(240).optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const createProjectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL friendly'),

  type: z.string().trim().min(2).max(120),
  description: z.string().trim().min(20).max(2000),

  stack: z.array(z.string().trim().min(1).max(40)).min(1).max(24),
  highlights: z.array(z.string().trim().min(1).max(80)).min(1).max(12),

  githubUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  imageUrl: urlOrLocalPathSchema.optional().nullable(),

  status: z.string().trim().min(2).max(80).default('In progress'),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),

  overview: z.string().trim().max(4000).optional().nullable(),
  role: z.string().trim().max(2000).optional().nullable(),
  methodology: z.string().trim().max(2000).optional().nullable(),
  projectManagement: z.string().trim().max(2500).optional().nullable(),
  developmentProcess: z.string().trim().max(4000).optional().nullable(),
  testingProcess: z.string().trim().max(3000).optional().nullable(),
  lessonsLearned: z.string().trim().max(3000).optional().nullable(),

  problemsSolved: z.array(z.string().trim().min(1).max(300)).max(12).optional(),
  techDetails: z.array(z.string().trim().min(1).max(300)).max(20).optional(),

  images: z.array(projectImageSchema).max(12).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();