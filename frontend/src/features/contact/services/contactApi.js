// frontend/src/features/contact/services/contactApi.js

import { trackAnalyticsEvent } from '../../analytics/services/analyticsApi.js';
import { apiClient } from '../../../shared/api/axios.js';

/**
 * Išsiunčia kontaktų formos duomenis į backend.
 *
 * Backend endpoint:
 * POST /api/contact
 */
export async function submitContactMessage(payload) {
  const response = await apiClient.post('/contact', payload);

  /**
   * Kai kontaktų forma sėkmingai išsiųsta,
   * užregistruojame analytics įvykį.
   */
  trackAnalyticsEvent({
    type: 'contact_submit',
    path: '/#contact',
    metadata: {
      source: 'contact_form',
    },
  });

  return response.data;
}