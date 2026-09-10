// frontend/src/features/auth/components/AuthInitializer.jsx

import { useEffect } from 'react';

import { useAuthStore } from '../store/authStore.js';

/**
 * AuthInitializer paleidžia /api/auth/me patikrinimą,
 * kai aplikacija pirmą kartą užsikrauna.
 *
 * Kam to reikia?
 * Jeigu admin buvo prisijungęs ir refreshina /admin puslapį,
 * Zustand state išsivalo, bet HttpOnly cookie vis dar yra.
 *
 * Todėl reikia paklausti backend:
 * "Ar šitas vartotojas vis dar prisijungęs?"
 */
export function AuthInitializer({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);

  useEffect(() => {
    if (!hasCheckedAuth) {
      checkAuth();
    }
  }, [checkAuth, hasCheckedAuth]);

  if (!hasCheckedAuth && isLoading) {
    return <AuthLoadingScreen />;
  }

  return children;
}

function AuthLoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-amber-300" />

        <p className="text-sm font-semibold text-white">Checking session...</p>
        <p className="mt-2 text-sm text-white/45">
          Verifying admin authentication.
        </p>
      </div>
    </main>
  );
}