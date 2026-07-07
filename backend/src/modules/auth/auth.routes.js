// backend/src/modules/auth/auth.routes.js

import { Router } from 'express';

import { protect } from '../../middleware/auth.middleware.js';
import { login, logout, me } from './auth.controller.js';

const router = Router();

/**
 * Public auth routes.
 */
router.post('/login', login);
router.post('/logout', logout);

/**
 * Protected auth route.
 *
 * /me patikrina cookie esantį JWT ir grąžina prisijungusį admin.
 */
router.get('/me', protect, me);

export { router as authRoutes };