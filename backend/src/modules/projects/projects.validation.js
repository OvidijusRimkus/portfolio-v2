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

  stack: z.array(z.string().trim().min(1).max(40)).min(1).max(20),
  highlights: z.array(z.string().trim().min(1).max(80)).min(1).max(10),

  githubUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),

  status: z.string().trim().min(2).max(80).default('In progress'),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const updateProjectSchema = createProjectSchema.partial();