// backend/src/modules/auth/auth.routes.js

import { Router } from 'express';

import { login, logout, me } from './auth.controller.js';

const router = Router();

/**
 * Auth routes.
 *
 * /login ir /logout bus public.
 * /me kitame pakete apsaugosime su auth middleware.
 */
router.post('/login', login);
router.post('/logout', logout);

// Kitame pakete čia pridėsime protect middleware:
// router.get('/me', protect, me);
router.get('/me', me);

export { router as authRoutes };