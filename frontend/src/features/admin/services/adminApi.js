// frontend/src/features/admin/services/adminApi.js

import { apiClient } from '../../../shared/api/axios.js';

/**
 * Admin API service.
 *
 * Čia laikome admin dashboard HTTP užklausas.
 * Axios klientas jau turi:
 * - baseURL
 * - withCredentials: true
 *
 * Todėl HttpOnly cookie bus siunčiamas automatiškai.
 */

export async function getContactMessages(params = {}) {
  const response = await apiClient.get('/admin/contact-messages', {
    params,
  });

  return response.data;
}

export async function markContactMessageAsRead(id) {
  const response = await apiClient.patch(`/admin/contact-messages/${id}/read`);

  return response.data;
}