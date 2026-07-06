// frontend/src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './app/router.jsx';
import './styles/index.css';

/**
 * React aplikacijos įėjimo taškas.
 *
 * Čia prijungiame:
 * - React StrictMode;
 * - React Router;
 * - globalius Tailwind / CSS stilius.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);