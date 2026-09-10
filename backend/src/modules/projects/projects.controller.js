// backend/src/modules/projects/projects.controller.js

import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import {
  createProject,
  deleteProject,
  getAllProjectsForAdmin,
  getPublishedProjectBySlug,
  getPublishedProjects,
  updateProject,
} from './projects.service.js';
import {
  createProjectSchema,
  getProjectsQuerySchema,
  projectParamsSchema,
  projectSlugParamsSchema,
  updateProjectSchema,
} from './projects.validation.js';

/**
 * GET /api/projects
 */
export const getProjectsHandler = catchAsync(async (req, res) => {
  const result = getProjectsQuerySchema.safeParse(req.query);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Invalid projects query';

    throw new AppError(firstError, 400);
  }

  const projects = await getPublishedProjects(result.data);

  res.status(200).json({
    success: true,
    data: {
      projects,
    },
  });
});

/**
 * GET /api/projects/admin/all
 *
 * Protected endpoint admin dashboardui.
 * Grąžina visus projektus, įskaitant hidden.
 */
export const getAdminProjectsHandler = catchAsync(async (req, res) => {
  const projects = await getAllProjectsForAdmin();

  res.status(200).json({
    success: true,
    data: {
      projects,
    },
  });
});

/**
 * GET /api/projects/:slug
 */
export const getProjectBySlugHandler = catchAsync(async (req, res) => {
  const result = projectSlugParamsSchema.safeParse(req.params);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Invalid project slug';

    throw new AppError(firstError, 400);
  }

  const project = await getPublishedProjectBySlug(result.data.slug);

  res.status(200).json({
    success: true,
    data: {
      project,
    },
  });
});

/**
 * POST /api/projects
 */
export const createProjectHandler = catchAsync(async (req, res) => {
  const result = createProjectSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Invalid project data';

    throw new AppError(firstError, 400);
  }

  const project = await createProject(result.data);

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: {
      project,
    },
  });
});

/**
 * PATCH /api/projects/:id
 */
export const updateProjectHandler = catchAsync(async (req, res) => {
  const paramsResult = projectParamsSchema.safeParse(req.params);

  if (!paramsResult.success) {
    const firstError = paramsResult.error.issues[0]?.message || 'Invalid project id';

    throw new AppError(firstError, 400);
  }

  const bodyResult = updateProjectSchema.safeParse(req.body);

  if (!bodyResult.success) {
    const firstError = bodyResult.error.issues[0]?.message || 'Invalid project data';

    throw new AppError(firstError, 400);
  }

  const project = await updateProject(paramsResult.data.id, bodyResult.data);

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: {
      project,
    },
  });
});

/**
 * DELETE /api/projects/:id
 */
export const deleteProjectHandler = catchAsync(async (req, res) => {
  const result = projectParamsSchema.safeParse(req.params);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Invalid project id';

    throw new AppError(firstError, 400);
  }

  await deleteProject(result.data.id);

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  });
});