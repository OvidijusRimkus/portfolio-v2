// frontend/src/features/admin/services/adminProjectsApi.js

import { apiClient } from '../../../shared/api/axios.js';

/**
 * Admin Projects API service.
 *
 * Šitas service apgaubia projektų backend endpointus.
 */

export async function getAdminProjects() {
  const response = await apiClient.get('/projects');

  return response.data;
}

export async function createAdminProject(payload) {
  const response = await apiClient.post('/projects', payload);

  return response.data;
}

export async function updateAdminProject(id, payload) {
  const response = await apiClient.patch(`/projects/${id}`, payload);

  return response.data;
}

export async function deleteAdminProject(id) {
  const response = await apiClient.delete(`/projects/${id}`);

  return response.data;
}