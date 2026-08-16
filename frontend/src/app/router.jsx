// frontend/src/app/router.jsx

import { createBrowserRouter, Outlet } from 'react-router-dom';

import { DashboardPage } from '../features/admin/pages/DashboardPage.jsx';
import { usePageViewTracking } from '../features/analytics/hooks/usePageViewTracking.js';
import { AuthInitializer } from '../features/auth/components/AuthInitializer.jsx';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute.jsx';
import { LoginPage } from '../features/auth/pages/LoginPage.jsx';
import { HomePage } from '../features/home/pages/HomePage.jsx';
import { ProjectDetailsPage } from '../features/projects/pages/ProjectDetailsPage.jsx';

function RootRoute() {
  usePageViewTracking();

  return (
    <AuthInitializer>
      <Outlet />
    </AuthInitializer>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootRoute />,
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
]);