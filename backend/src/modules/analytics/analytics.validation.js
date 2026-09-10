// backend/src/modules/analytics/analytics.validation.js

import { z } from 'zod';

export const createAnalyticsEventSchema = z.object({
  type: z.enum(['page_view', 'cv_download', 'contact_submit']),

  path: z
    .string()
    .trim()
    .max(500, 'Path must be at most 500 characters long')
    .optional(),

  metadata: z.record(z.string(), z.unknown()).optional(),
});