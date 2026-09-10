// backend/src/modules/admin/admin.controller.js

import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import {
  getContactMessages,
  markContactMessageAsRead,
} from './admin.service.js';
import {
  contactMessageParamsSchema,
  getContactMessagesQuerySchema,
} from './admin.validation.js';

/**
 * GET /api/admin/contact-messages
 *
 * Grąžina kontaktų žinutes admin dashboardui.
 */
export const getContactMessagesHandler = catchAsync(async (req, res) => {
  const result = getContactMessagesQuerySchema.safeParse(req.query);

  if (!result.success) {
    const firstError =
      result.error.issues[0]?.message || 'Invalid contact messages query';

    throw new AppError(firstError, 400);
  }

  const data = await getContactMessages(result.data);

  res.status(200).json({
    success: true,
    data,
  });
});

/**
 * PATCH /api/admin/contact-messages/:id/read
 *
 * Pažymi vieną žinutę kaip perskaitytą.
 */
export const markContactMessageAsReadHandler = catchAsync(async (req, res) => {
  const result = contactMessageParamsSchema.safeParse(req.params);

  if (!result.success) {
    const firstError =
      result.error.issues[0]?.message || 'Invalid contact message id';

    throw new AppError(firstError, 400);
  }

  const contactMessage = await markContactMessageAsRead(result.data.id);

  res.status(200).json({
    success: true,
    message: 'Contact message marked as read',
    data: {
      contactMessage,
    },
  });
});