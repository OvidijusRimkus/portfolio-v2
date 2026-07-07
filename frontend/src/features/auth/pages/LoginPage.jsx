// frontend/src/features/auth/pages/LoginPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiLogIn, FiUser } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import { useAuthStore } from '../store/authStore.js';

const initialFormState = {
  username: '',
  password: '',
};

/**
 * Admin login puslapis.
 *
 * Registracijos nėra.
 * Prisijungti gali tik admin vartotojas, sukurtas per backend seed iš .env.
 */
export function LoginPage() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const storeError = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [formData, setFormData] = useState(initialFormState);
  const [localError, setLocalError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    clearError();
    setLocalError('');

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function validateForm() {
    if (formData.username.trim().length < 3) {
      return 'Username must be at least 3 characters long.';
    }

    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setLocalError(validationError);
      return;
    }

    try {
      await login({
        username: formData.username.trim(),
        password: formData.password,
      });

      navigate('/admin');
    } catch (error) {
      setLocalError(error.message);
    }
  }

  const errorMessage = localError || storeError;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-500/15 blur-[130px]" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
        </div>

        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
              <FiLock />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
              Admin
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
              Sign in to dashboard
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/50">
              This area is protected with JWT stored in an HttpOnly cookie.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <LoginField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              icon={<FiUser />}
              placeholder="admin"
              autoComplete="username"
            />

            <LoginField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              icon={<FiLock />}
              placeholder="••••••••"
              autoComplete="current-password"
            />

            {errorMessage && (
              <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              <FiLogIn />
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

function LoginField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  icon,
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-white/70">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pl-11 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-400/50 focus:bg-black/40"
        />
      </div>
    </div>
  );
}