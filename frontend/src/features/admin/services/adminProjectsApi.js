// frontend/src/features/admin/services/adminProjectsApi.js

import { apiClient } from '../../../shared/api/axios.js';

/**
 * Admin Projects API service.
 *
 * Public GET /api/projects route grąžina publikuotus projektus.
 * Admin POST /api/projects route leidžia sukurti naują projektą,
 * nes backend jį saugo su protect middleware.
 */

export async function getAdminProjects() {
  const response = await apiClient.get('/projects');

  return response.data;
}

export async function createAdminProject(payload) {
  const response = await apiClient.post('/projects', payload);

  return response.data;
}