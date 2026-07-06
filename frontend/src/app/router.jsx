// frontend/src/app/router.jsx

import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '../features/home/pages/HomePage.jsx';

/**
 * Aplikacijos routing konfigūracija.
 *
 * Kol kas turime tik public Home page.
 * Vėliau čia pridėsime:
 * - /login
 * - /admin
 * - protected admin routes
 * - 404 page
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);