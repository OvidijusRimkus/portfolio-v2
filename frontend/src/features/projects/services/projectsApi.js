// frontend/src/features/projects/services/projectsApi.js

import { apiClient } from '../../../shared/api/axios.js';

/**
 * Projects API service.
 *
 * Public portfolio puslapis naudos šitą service,
 * kad projektai būtų kraunami iš backend, o ne iš statinio data failo.
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