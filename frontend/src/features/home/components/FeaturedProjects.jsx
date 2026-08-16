// frontend/src/features/home/components/FeaturedProjects.jsx

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FiArrowUpRight, FiGithub, FiRefreshCw } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import { Container } from '../../../shared/components/Container.jsx';
import { SectionHeading } from '../../../shared/components/SectionHeading.jsx';
import { getFeaturedProjects } from '../../projects/services/projectsApi.js';

/**
 * FeaturedProjects dabar krauna projektus iš backend:
 * GET /api/projects?featured=true
 *
 * Tai reiškia, kad projektų turinys ateina iš PostgreSQL,
 * o ne iš statinio frontend data failo.
 */
export function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProjects() {
    try {
      setIsLoading(true);
      setError('');

      const projectsData = await getFeaturedProjects();

      setProjects(projectsData);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load projects. Please try again later.';

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <section id="projects" className="relative border-t border-white/10 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work built with product thinking."
            description="These projects are loaded from the backend API and stored in PostgreSQL, showing a real full stack portfolio structure instead of static frontend-only data."
          />

          <Button
            href="https://github.com/OvidijusRimkus"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            View GitHub
            <FiGithub />
          </Button>
        </div>

        <div className="mt-14">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {isLoading ? (
            <ProjectsLoadingState />
          ) : projects.length === 0 ? (
            <ProjectsEmptyState onRetry={loadProjects} />
          ) : (
            <div className="grid gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl transition hover:border-amber-400/30 hover:bg-white/[0.06] sm:p-8"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl transition group-hover:bg-amber-400/20" />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
              {project.status}
            </span>

            <span className="text-sm text-white/40">{project.type}</span>
          </div>

          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white/55">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs font-medium text-white/55"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            Highlights
          </p>

          <div className="grid gap-3">
            {project.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="text-sm text-white/65">{highlight}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.8)]" />
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300"
              >
                Live preview
                <FiArrowUpRight />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/[0.05] hover:text-white"
              >
                Source
                <FiGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectsLoadingState() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-amber-300" />

      <p className="text-sm font-semibold text-white">Loading projects...</p>
      <p className="mt-2 text-sm text-white/45">
        Fetching featured projects from the API.
      </p>
    </div>
  );
}

function ProjectsEmptyState({ onRetry }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
      <p className="text-sm font-semibold text-white">No featured projects yet</p>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/45">
        There are no published featured projects in the database yet. Create a
        project through the API or seed projects later.
      </p>

      <div className="mt-6 flex justify-center">
        <Button type="button" variant="secondary" onClick={onRetry}>
          <FiRefreshCw />
          Try again
        </Button>
      </div>
    </div>
  );
}