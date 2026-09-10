// frontend/src/shared/pages/NotFoundPage.jsx

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

import { Button } from '../components/Button.jsx';
import { Container } from '../components/Container.jsx';

/**
 * Branded 404 page.
 *
 * Naudojamas tada, kai vartotojas nueina į neegzistuojantį frontend route.
 * Pvz:
 * /random-page
 * /cv/Ovidijus-Rimkus-CV.pdf kai PDF dar neįdėtas į public/cv
 */
export function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-white/5 blur-3xl" />

      <Container>
        <section className="relative flex min-h-screen items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-amber-400/20 bg-amber-400/10 text-3xl font-semibold text-amber-300 shadow-2xl shadow-amber-400/10">
              404
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300/80">
              Page not found
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
              This page does not exist.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              The page you are trying to open may have been moved, deleted or not
              created yet. Return to the homepage and continue exploring the portfolio.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/">
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