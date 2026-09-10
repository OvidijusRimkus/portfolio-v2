// backend/src/modules/analytics/analytics.routes.js

import { Router } from 'express';

import { protect } from '../../middleware/auth.middleware.js';
import {
  createAnalyticsEventHandler,
  getAnalyticsSummaryHandler,
} from './analytics.controller.js';

const router = Router();

/**
 * Public analytics event endpoint.
 */
router.post('/events', createAnalyticsEventHandler);

/**
 * Protected analytics summary endpoint.
 */
router.get('/summary', protect, getAnalyticsSummaryHandler);

export { router as analyticsRoutes };