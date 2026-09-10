// backend/src/modules/contact/contact.controller.js

import { catchAsync } from '../../utils/catchAsync.js';
import { AppError } from '../../utils/AppError.js';
import { createContactMessage } from './contact.service.js';
import { createContactMessageSchema } from './contact.validation.js';

/**
 * POST /api/contact
 *
 * Controlleris:
 * - validuoja request body;
 * - kviečia service;
 * - grąžina response.
 *
 * Business logikos čia nelaikome.
 */
export const submitContactMessage = catchAsync(async (req, res) => {
  const result = createContactMessageSchema.safeParse(req.body);

  if (!result.success) {
    const firstError =
      result.error.issues[0]?.message || 'Invalid contact form data';

    throw new AppError(firstError, 400);
  }

  const contactMessage = await createContactMessage(result.data);

  res.status(201).json({
    success: true,
    message: 'Contact message submitted successfully',
    data: {
      contactMessage,
    },
  });
});