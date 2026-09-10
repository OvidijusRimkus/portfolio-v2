// frontend/src/features/projects/services/projectsApi.js

import { apiClient } from '../../../shared/api/axios.js';

/**
 * Projects API service.
 *
 * Public portfolio puslapiai naudoja šitą service,
 * kad projektai būtų kraunami iš backend.
 */

export async function getProjects(params = {}) {
  const response = await apiClient.get('/projects', {
    params,
  });

  return response.data;
}

export async function getFeaturedProjects() {
  const response = await getProjects({
    featured: true,
  });

  return response.data.projects;
}

export async function getProjectBySlug(slug) {
  const response = await apiClient.get(`/projects/${slug}`);

  return response.data.data.project;
}