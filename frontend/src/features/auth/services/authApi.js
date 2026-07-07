// frontend/src/features/auth/services/authApi.js

import { apiClient } from '../../../shared/api/axios.js';

/**
 * Auth API service.
 *
 * Čia laikome tik HTTP užklausas.
 * Zustand store naudos šitas funkcijas, bet pats nežinos Axios detalių.
 */

export async function loginRequest(payload) {
  const response = await apiClient.post('/auth/login', payload);

  return response.data;
}

export async function logoutRequest() {
  const response = await apiClient.post('/auth/logout');

  return response.data;
}

export async function meRequest() {
  const response = await apiClient.get('/auth/me');

  return response.data;
}