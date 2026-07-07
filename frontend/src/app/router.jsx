// frontend/src/app/router.jsx

import { createBrowserRouter } from 'react-router-dom';

import { DashboardPage } from '../features/admin/pages/DashboardPage.jsx';
import { AuthInitializer } from '../features/auth/components/AuthInitializer.jsx';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute.jsx';
import { LoginPage } from '../features/auth/pages/LoginPage.jsx';
import { HomePage } from '../features/home/pages/HomePage.jsx';

/**
 * Aplikacijos routing konfigūracija.
 *
 * AuthInitializer apgaubia routes, kad aplikacija startuodama
 * patikrintų /api/auth/me.
 *
 * ProtectedRoute saugo /admin.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthInitializer>
        <HomePage />
      </AuthInitializer>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthInitializer>
        <LoginPage />
      </AuthInitializer>
    ),
  },
  {
    path: '/admin',
    element: (
      <AuthInitializer>
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </AuthInitializer>
    ),
  },
]);