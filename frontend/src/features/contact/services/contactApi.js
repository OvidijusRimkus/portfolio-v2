// frontend/src/features/contact/services/contactApi.js

import { apiClient } from '../../../shared/api/axios.js';

/**
 * Išsiunčia kontaktų formos duomenis į backend.
 *
 * Backend endpoint:
 * POST /api/contact
 */
export async function submitContactMessage(payload) {
  const response = await apiClient.post('/contact', payload);

  return response.data;
}