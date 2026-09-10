// frontend/src/features/auth/components/ProtectedRoute.jsx

import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '../store/authStore.js';

/**
 * ProtectedRoute saugo admin puslapius.
 *
 * Jeigu vartotojas neprisijungęs:
 * - nukreipiame į /login
 *
 * Jeigu prisijungęs:
 * - leidžiame matyti children
 */
export function ProtectedRoute({ children }) {
  const location = useLocation();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (!hasCheckedAuth || isLoading) {
    return <RouteLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function RouteLoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-amber-300" />

        <p className="text-sm font-semibold text-white">Loading protected area...</p>
      </div>
    </main>
  );
}