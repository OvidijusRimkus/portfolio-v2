// frontend/src/features/projects/pages/ProjectDetailsPage.jsx

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiCode,
  FiGithub,
  FiLayers,
} from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import { Container } from '../../../shared/components/Container.jsx';
import { Footer } from '../../../shared/layouts/Footer.jsx';
import { Header } from '../../../shared/layouts/Header.jsx';
import { getProjectBySlug } from '../services/projectsApi.js';

/**
 * Public projekto detalių puslapis.
 *
 * Route:
 * /projects/:slug
 */
export function ProjectDetailsPage() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

   useEffect(() => {
    async function loadProject() {
      try {
        setIsLoading(true);
        setError('');

        const projectData = await getProjectBySlug(slug);

        setProject(projectData);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          'Project not found or failed to load.';

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  useEffect(() => {
    if (!project) {
      return;
    }

    document.title = `${project.title} | Ovidijus Rimkus Portfolio`;

    return () => {
      document.title = 'Ovidijus Rimkus | Full Stack Developer Portfolio';
    };
  }, [project]);

  if (isLoading) {
    return <ProjectDetailsLoading />;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />

      <section className="relative overflow-hidden border-b border-white/10 pb-10 pt-32">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

        <Container>
          <div className="relative">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/55 transition hover:border-amber-400/30 hover:text-white"
            >
              <FiArrowLeft />
              Back to projects
            </Link>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    {project.status}
                  </span>

                  {project.isFeatured && (
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/50">
                      Featured
                    </span>
                  )}

                  <span className="text-sm text-white/40">{project.type}</span>
                </div>

                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
                  {project.title}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {project.liveUrl && (
                    <Button href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live preview
                      <FiArrowUpRight />
                    </Button>
                  )}

                  {project.githubUrl && (
                    <Button
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                    >
                      Source code
                      <FiGithub />
                    </Button>
                  )}
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
              >
                <InfoRow
                  icon={<FiLayers />}
                  label="Project type"
                  value={project.type}
                />

                <InfoRow
                  icon={<FiCode />}
                  label="Technologies"
                  value={`${project.stack.length} technologies`}
                />

                <InfoRow
                  icon={<FiCalendar />}
                  label="Last updated"
                  value={formatDate(project.updatedAt)}
                />
              </motion.aside>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
                Tech stack
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm font-medium text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
                Highlights
              </p>

              <div className="mt-6 grid gap-3">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
                  >
                    <span className="text-sm text-white/65">{highlight}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.8)]" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="border-b border-white/10 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
          {icon}
        </span>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium text-white/70">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#050505] py-20 text-white">
      <Header />

      <Container>
        <div className="mt-20 rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-amber-300" />

          <p className="text-sm font-semibold text-white">Loading project...</p>
          <p className="mt-2 text-sm text-white/45">
            Fetching project details from the API.
          </p>
        </div>
      </Container>
    </main>
  );
}

function ProjectDetailsError({ message }) {
  return (
    <main className="min-h-screen bg-[#050505] py-20 text-white">
      <Header />

      <Container>
        <div className="mt-20 rounded-[2rem] border border-red-400/20 bg-red-400/10 p-10 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
          <p className="text-lg font-semibold text-red-200">Project not found</p>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-red-100/70">
            {message}
          </p>

          <div className="mt-6">
            <Button href="/#projects" variant="secondary">
              <FiArrowLeft />
              Back to homepage
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}