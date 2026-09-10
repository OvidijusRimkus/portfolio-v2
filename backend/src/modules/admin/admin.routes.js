// backend/src/modules/admin/admin.routes.js

import { Router } from 'express';

import { protect } from '../../middleware/auth.middleware.js';
import {
  getContactMessagesHandler,
  markContactMessageAsReadHandler,
} from './admin.controller.js';

const router = Router();

/**
 * Visi admin route'ai turi būti apsaugoti.
 *
 * Tai reiškia, kad prieš bet kurį /api/admin endpointą
 * vartotojas turi turėti galiojantį JWT HttpOnly cookie.
 */
router.use(protect);

router.get('/contact-messages', getContactMessagesHandler);
router.patch('/contact-messages/:id/read', markContactMessageAsReadHandler);

export { router as adminRoutes };