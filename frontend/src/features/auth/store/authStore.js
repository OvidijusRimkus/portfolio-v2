// frontend/src/features/auth/store/authStore.js

import { create } from 'zustand';

import { loginRequest, logoutRequest, meRequest } from '../services/authApi.js';

/**
 * Zustand auth store.
 *
 * JWT nėra saugomas localStorage.
 * Jis saugomas backend nustatytame HttpOnly cookie.
 *
 * Frontend tik klausia backend:
 * GET /api/auth/me
 *
 * Jeigu cookie galioja, backend grąžina admin.
 */
export const useAuthStore = create((set) => ({
  admin: null,
  isAuthenticated: false,
  isLoading: false,
  hasCheckedAuth: false,
  error: null,

  login: async ({ username, password }) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await loginRequest({
        username,
        password,
      });

      set({
        admin: data.data.admin,
        isAuthenticated: true,
        isLoading: false,
        hasCheckedAuth: true,
        error: null,
      });

      return data.data.admin;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';

      set({
        admin: null,
        isAuthenticated: false,
        isLoading: false,
        hasCheckedAuth: true,
        error: errorMessage,
      });

      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await logoutRequest();

      set({
        admin: null,
        isAuthenticated: false,
        isLoading: false,
        hasCheckedAuth: true,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Logout failed. Please try again.';

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw new Error(errorMessage);
    }
  },

  checkAuth: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await meRequest();

      set({
        admin: data.data.admin,
        isAuthenticated: true,
        isLoading: false,
        hasCheckedAuth: true,
        error: null,
      });

      return data.data.admin;
    } catch (error) {
      set({
        admin: null,
        isAuthenticated: false,
        isLoading: false,
        hasCheckedAuth: true,
        error: null,
      });

      return null;
    }
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));