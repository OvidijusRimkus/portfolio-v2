// backend/src/modules/projects/projects.routes.js

import { Router } from 'express';

import { protect } from '../../middleware/auth.middleware.js';
import {
  createProjectHandler,
  deleteProjectHandler,
  getAdminProjectsHandler,
  getProjectBySlugHandler,
  getProjectsHandler,
  updateProjectHandler,
} from './projects.controller.js';

const router = Router();

/**
 * Public project routes.
 */
router.get('/', getProjectsHandler);

/**
 * Protected admin project routes.
 *
 * Svarbu: šitas route turi būti prieš /:slug,
 * nes kitaip Express palaikytų "admin" kaip slug.
 */
router.get('/admin/all', protect, getAdminProjectsHandler);

router.post('/', protect, createProjectHandler);
router.patch('/:id', protect, updateProjectHandler);
router.delete('/:id', protect, deleteProjectHandler);

/**
 * Public single project route.
 *
 * Šitą laikome po admin routes.
 */
router.get('/:slug', getProjectBySlugHandler);

export { router as projectRoutes };