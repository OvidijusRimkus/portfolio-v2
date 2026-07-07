// frontend/src/shared/api/axios.js

import axios from 'axios';

/**
 * Bendras Axios klientas visai frontend aplikacijai.
 *
 * Kodėl geriau turėti vieną failą?
 * - nereikia kiekviename service kartoti baseURL;
 * - vėliau lengvai pridėsime interceptorius;
 * - auth etape galėsime siųsti HttpOnly cookie su credentials.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});