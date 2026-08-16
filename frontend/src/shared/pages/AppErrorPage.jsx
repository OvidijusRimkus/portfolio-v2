// frontend/src/shared/pages/AppErrorPage.jsx

import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiArrowLeft, FiHome, FiRefreshCw } from 'react-icons/fi';

import { Button } from '../components/Button.jsx';
import { Container } from '../components/Container.jsx';

/**
 * AppErrorPage pagauna React Router klaidas.
 *
 * Pvz:
 * - route error;
 * - loader/action error ateityje;
 * - netyčinis frontend render crash.
 */
export function AppErrorPage() {
  const error = useRouteError();

  const errorInfo = getErrorInfo(error);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-red-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-amber-400/5 blur-3xl" />

      <Container>
        <section className="relative flex min-h-screen items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-red-400/20 bg-red-400/10 text-3xl font-semibold text-red-300 shadow-2xl shadow-red-400/10">
              {errorInfo.status}
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-300/80">
              Application error
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
              {errorInfo.title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              {errorInfo.message}
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button type="button" onClick={() => window.location.reload()}>
                <FiRefreshCw />
                Reload page
              </Button>

              <Button href="/" variant="secondary">
                <FiHome />
                Back home
              </Button>

              <Link
                to="/#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-amber-400/30 hover:bg-white/[0.04] hover:text-white"
              >
                <FiArrowLeft />
                View projects
              </Link>
            </div>
          </motion.div>
        </section>
      </Container>
    </main>
  );
}

function getErrorInfo(error) {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return {
        status: 404,
        title: 'This page does not exist.',
        message:
          'The route you opened was not found. It may have been moved, deleted or not created yet.',
      };
    }

    return {
      status: error.status,
      title: error.statusText || 'Something went wrong.',
      message:
        error.data?.message ||
        'The application encountered a route error. Please try again.',
    };
  }

  return {
    status: 500,
    title: 'Something went wrong.',
    message:
      error?.message ||
      'The application encountered an unexpected error. Please reload the page or return home.',
  };
}