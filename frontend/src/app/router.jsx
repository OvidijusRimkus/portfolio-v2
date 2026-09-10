// frontend/src/app/router.jsx

import { createBrowserRouter, Outlet } from 'react-router-dom';

import { DashboardPage } from '../features/admin/pages/DashboardPage.jsx';
import { usePageViewTracking } from '../features/analytics/hooks/usePageViewTracking.js';
import { AuthInitializer } from '../features/auth/components/AuthInitializer.jsx';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute.jsx';
import { LoginPage } from '../features/auth/pages/LoginPage.jsx';
import { HomePage } from '../features/home/pages/HomePage.jsx';
import { ProjectDetailsPage } from '../features/projects/pages/ProjectDetailsPage.jsx';
import { AppErrorPage } from '../shared/pages/AppErrorPage.jsx';
import { NotFoundPage } from '../shared/pages/NotFoundPage.jsx';

/**
 * RootRoute naudojamas visai aplikacijai.
 *
 * Čia paliekame tik page view tracking.
 * Auth check čia NEBETURI būti, nes public puslapiams nereikia
 * kiekvieną kartą kviesti /api/auth/me.
 */
function RootRoute() {
  usePageViewTracking();

  return <Outlet />;
}

/**
 * AuthRoute apgaubia tik login/admin dalį.
 *
 * Taip /api/auth/me kviečiamas tik ten, kur tikrai reikia:
 * - /login
 * - /admin
 */
function AuthRoute() {
  return (
    <AuthInitializer>
      <Outlet />
    </AuthInitializer>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootRoute />,
    errorElement: <AppErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/projects/:slug',
        element: <ProjectDetailsPage />,
      },
      {
        element: <AuthRoute />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/admin',
            element: (
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);