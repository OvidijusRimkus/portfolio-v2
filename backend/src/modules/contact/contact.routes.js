// backend/src/modules/contact/contact.routes.js

import { Router } from 'express';

import { submitContactMessage } from './contact.controller.js';

const router = Router();

/**
 * Public kontaktų formos endpointas.
 *
 * Registracijos ar prisijungimo nereikia.
 */
router.post('/', submitContactMessage);

export { router as contactRoutes };