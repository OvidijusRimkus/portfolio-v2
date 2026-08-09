// backend/src/modules/projects/projects.routes.js

import { Router } from 'express';

import { protect } from '../../middleware/auth.middleware.js';
import {
  createProjectHandler,
  deleteProjectHandler,
  getProjectBySlugHandler,
  getProjectsHandler,
  updateProjectHandler,
} from './projects.controller.js';

const router = Router();

/**
 * Public project routes.
 */
router.get('/', getProjectsHandler);
router.get('/:slug', getProjectBySlugHandler);

/**
 * Protected admin project routes.
 */
router.post('/', protect, createProjectHandler);
router.patch('/:id', protect, updateProjectHandler);
router.delete('/:id', protect, deleteProjectHandler);

export { router as projectRoutes };