// frontend/src/features/home/components/Hero.jsx

import { motion } from 'motion/react';
import { FiArrowUpRight, FiDownload, FiGithub, FiMail } from 'react-icons/fi';

import { trackAnalyticsEvent } from '../../analytics/services/analyticsApi.js';
import { Button } from '../../../shared/components/Button.jsx';
import { Container } from '../../../shared/components/Container.jsx';

const techStack = ['React', 'Express', 'PostgreSQL', 'Prisma', 'Docker'];

export function Hero() {
  function handleCvDownloadClick() {
    trackAnalyticsEvent({
      type: 'cv_download',
      path: '/cv/Ovidijus-Rimkus-CV.pdf',
      metadata: {
        source: 'hero_button',
      },
    });
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-20">
      <HeroBackground />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.9)]" />
              Full Stack Developer Portfolio v2
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Building clean, fast and premium web experiences.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
              I design and build full stack applications with React, Express,
              PostgreSQL and Prisma — focused on clean architecture, modern UI
              and real-world product thinking.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="#projects">
                View projects
                <FiArrowUpRight />
              </Button>

              <Button href="#contact" variant="secondary">
                <FiMail />
                Contact me
              </Button>

              <Button
                href="/cv/Ovidijus-Rimkus-CV.pdf"
                variant="ghost"
                onClick={handleCvDownloadClick}
              >
                <FiDownload />
                Download CV
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/45 backdrop-blur-xl"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <HeroCodeCard />
        </div>
      </Container>
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-500/15 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />
    </div>
  );
}

function HeroCodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-amber-400/20 via-white/5 to-transparent blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>

          <span className="text-xs text-white/40">portfolio-v2</span>
        </div>

        <div className="space-y-4 font-mono text-sm">
          <CodeBlock label="// current focus">
            <span className="text-amber-300">
              const role = &quot;Full Stack Developer&quot;;
            </span>
          </CodeBlock>

          <CodeBlock label="// stack">
            <span className="text-white/75">
              React + Node.js + PostgreSQL + Docker
            </span>
          </CodeBlock>

          <CodeBlock label="// goal">
            <span className="text-white/75">
              Build products that feel fast, useful and polished.
            </span>
          </CodeBlock>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <MetricCard number="01" label="Portfolio" />
          <MetricCard number="02" label="Admin" />
          <MetricCard number="03" label="Analytics" />
        </div>
      </div>

      <a
        href="https://github.com/OvidijusRimkus"
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
      >
        <FiGithub />
        GitHub profile
      </a>
    </motion.div>
  );
}

function CodeBlock({ label, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-white/35">{label}</p>
      <p className="mt-2">{children}</p>
    </div>
  );
}

function MetricCard({ number, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-2xl font-semibold text-white">{number}</p>
      <p className="mt-1 text-xs text-white/45">{label}</p>
    </div>
  );
}