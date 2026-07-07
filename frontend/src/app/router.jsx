// frontend/src/app/router.jsx

import { createBrowserRouter } from 'react-router-dom';

import { DashboardPage } from '../features/admin/pages/DashboardPage.jsx';
import { LoginPage } from '../features/auth/pages/LoginPage.jsx';
import { HomePage } from '../features/home/pages/HomePage.jsx';

/**
 * Aplikacijos routing konfigūracija.
 *
 * Kol kas /admin dar nėra apsaugotas ProtectedRoute komponentu.
 * Tai padarysime kitame pakete, kai pridėsime auth bootstrapping logiką.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <DashboardPage />,
  },
]);