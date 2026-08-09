// backend/src/modules/analytics/analytics.controller.js

import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import {
  createAnalyticsEvent,
  getAnalyticsSummary,
} from './analytics.service.js';
import { createAnalyticsEventSchema } from './analytics.validation.js';

/**
 * POST /api/analytics/events
 *
 * Public endpointas.
 * Naudosime iš frontend, kai vartotojas:
 * - atsidaro puslapį;
 * - atsisiunčia CV;
 * - išsiunčia kontaktų formą.
 */
export const createAnalyticsEventHandler = catchAsync(async (req, res) => {
  const result = createAnalyticsEventSchema.safeParse(req.body);

  if (!result.success) {
    const firstError =
      result.error.issues[0]?.message || 'Invalid analytics event data';

    throw new AppError(firstError, 400);
  }

  const event = await createAnalyticsEvent({
    ...result.data,
    ipAddress: req.ip,
    userAgent: req.get('user-agent') || null,
  });

  res.status(201).json({
    success: true,
    message: 'Analytics event created',
    data: {
      event,
    },
  });
});

/**
 * GET /api/analytics/summary
 *
 * Admin endpointas.
 * Šitą route apsaugosime su protect middleware routes faile.
 */
export const getAnalyticsSummaryHandler = catchAsync(async (req, res) => {
  const summary = await getAnalyticsSummary();

  res.status(200).json({
    success: true,
    data: {
      summary,
    },
  });
});