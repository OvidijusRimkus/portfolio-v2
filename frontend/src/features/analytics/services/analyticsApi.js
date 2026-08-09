// frontend/src/features/analytics/services/analyticsApi.js

import { apiClient } from '../../../shared/api/axios.js';

/**
 * Frontend analytics API service.
 *
 * Šitas service siunčia įvykius į backend:
 * POST /api/analytics/events
 *
 * Naudosime:
 * - page_view
 * - cv_download
 * - contact_submit
 */
export async function trackAnalyticsEvent(payload) {
  try {
    const response = await apiClient.post('/analytics/events', payload);

    return response.data;
  } catch (error) {
    /**
     * Analytics neturi laužyti vartotojo patirties.
     *
     * Jei tracking nepavyko, tik parodom warning console,
     * bet nemetam klaidos į komponentą.
     */
    console.warn('Analytics tracking failed:', error.response?.data || error.message);

    return null;
  }
}