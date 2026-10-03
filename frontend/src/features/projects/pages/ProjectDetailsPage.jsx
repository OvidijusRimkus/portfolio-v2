// frontend/src/features/projects/pages/ProjectDetailsPage.jsx

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiGithub,
  FiImage,
  FiLayers,
  FiLayout,
  FiShield,
  FiTool,
} from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import { Container } from '../../../shared/components/Container.jsx';
import { usePageTitle } from '../../../shared/hooks/usePageTitle.js';
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

  usePageTitle(
    project
      ? `${project.title} | Ovidijus Rimkus Portfolio`
      : 'Project | Ovidijus Rimkus Portfolio',
  );

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

  if (isLoading) {
    return <ProjectDetailsLoading />;
  }

  if (error || !project) {
    return <ProjectDetailsError message={error} />;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />

      <ProjectHero project={project} />
      <ProjectPreviewSection project={project} />
      <ProjectCaseStudy project={project} />
      <ProjectGallery project={project} />
      <ProjectFinalCta project={project} />

      <Footer />
    </main>
  );
}

function ProjectHero({ project }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-12 pt-32 sm:pb-16">
      <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-[22rem] w-[22rem] rounded-full bg-white/[0.04] blur-3xl" />

      <Container>
        <div className="relative">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/55 transition hover:border-amber-400/30 hover:text-white"
          >
            <FiArrowLeft />
            Back to projects
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.52fr] lg:items-end">
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

              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/55 sm:text-lg">
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
              <InfoRow icon={<FiLayers />} label="Project type" value={project.type} />

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

              <div className="mt-6 rounded-[1.5rem] border border-amber-400/15 bg-amber-400/[0.06] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/80">
                  Case study
                </p>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  Built to show architecture, workflow, implementation decisions and
                  practical problem solving.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProjectPreviewSection({ project }) {
  const previewImage = project.imageUrl || project.images?.[0]?.url;

  return (
    <section className="border-b border-white/10 py-12 sm:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt={`${project.title} project preview`}
              className="max-h-[760px] w-full rounded-[1.5rem] object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/30 text-white/35">
              <div className="text-center">
                <FiImage className="mx-auto mb-3 text-4xl" />
                <p className="text-sm font-medium">Project preview coming soon</p>
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
function ProjectCaseStudy({ project }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.38fr_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <ProjectSummaryCard project={project} />
          </aside>

          <div className="grid gap-8">
            <CaseStudySection
              eyebrow="Overview"
              title="Project overview"
              icon={<FiLayout />}
              content={project.overview || project.description}
            />

            <HighlightsCard project={project} />

            <TechStackCard project={project} />

            <CaseStudySection
              eyebrow="Role"
              title="My role and responsibilities"
              icon={<FiShield />}
              content={project.role}
            />

            <CaseStudySection
              eyebrow="Workflow"
              title="Methodology and project management"
              icon={<FiLayers />}
              content={project.methodology}
              secondaryContent={project.projectManagement}
            />

            <CaseStudySection
              eyebrow="Build process"
              title="Development process"
              icon={<FiTool />}
              content={project.developmentProcess}
            />

            <CaseStudySection
              eyebrow="Quality"
              title="Testing and validation"
              icon={<FiCheckCircle />}
              content={project.testingProcess}
            />

            <ListSection
              eyebrow="Problem solving"
              title="Problems solved"
              icon={<FiCpu />}
              items={project.problemsSolved}
            />

            <ListSection
              eyebrow="Technology"
              title="Technical details"
              icon={<FiCode />}
              items={project.techDetails}
            />

            <CaseStudySection
              eyebrow="Reflection"
              title="What I learned"
              icon={<FiLayers />}
              content={project.lessonsLearned}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProjectSummaryCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
        Project summary
      </p>

      <div className="mt-6 grid gap-3">
        <SummaryItem label="Type" value={project.type} />
        <SummaryItem label="Status" value={project.status} />
        <SummaryItem label="Stack" value={`${project.stack.length} technologies`} />
        <SummaryItem
          label="Highlights"
          value={`${project.highlights.length} key points`}
        />
      </div>

      <div className="mt-6 grid gap-3">
        {project.liveUrl && (
          <Button
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
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
            className="w-full"
          >
            Source code
            <FiGithub />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-6 text-white/70">{value}</p>
    </div>
  );
}

function TechStackCard({ project }) {
  if (!project.stack?.length) {
    return null;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
    >
      <SectionHeader eyebrow="Stack" title="Technologies used" icon={<FiCode />} />

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
    </motion.article>
  );
}

function HighlightsCard({ project }) {
  if (!project.highlights?.length) {
    return null;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
    >
      <SectionHeader
        eyebrow="Highlights"
        title="Key project features"
        icon={<FiCheckCircle />}
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {project.highlights.map((highlight) => (
          <div
            key={highlight}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
          >
            <span className="text-sm text-white/65">{highlight}</span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.8)]" />
          </div>
        ))}
      </div>
    </motion.article>
  );
}
function CaseStudySection({ eyebrow, title, icon, content, secondaryContent }) {
  if (!content && !secondaryContent) {
    return null;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
    >
      <SectionHeader eyebrow={eyebrow} title={title} icon={icon} />

      <div className="mt-6 space-y-5 text-base leading-8 text-white/58">
        {content && <p>{content}</p>}
        {secondaryContent && <p>{secondaryContent}</p>}
      </div>
    </motion.article>
  );
}

function ListSection({ eyebrow, title, icon, items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
    >
      <SectionHeader eyebrow={eyebrow} title={title} icon={icon} />

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4"
          >
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.75)]" />
            <p className="text-sm leading-6 text-white/62">{item}</p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function ProjectGallery({ project }) {
  if (!project.images?.length) {
    return null;
  }

  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-16 sm:py-24">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
            Gallery
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Project screenshots
          </h2>
          <p className="mt-5 text-base leading-8 text-white/50">
            A visual look at the main screens and presentation assets used in this
            project.
          </p>
        </div>

        <div className="grid gap-6">
          {project.images.map((image, index) => (
            <motion.figure
              key={image.id || image.url}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.45, delay: index * 0.03 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-3 shadow-2xl shadow-black/30"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="max-h-[720px] w-full rounded-[1.5rem] object-cover object-top"
                loading="lazy"
              />

              {(image.caption || image.alt) && (
                <figcaption className="px-3 py-4 text-sm leading-6 text-white/45">
                  {image.caption || image.alt}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectFinalCta({ project }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[2rem] border border-amber-400/15 bg-amber-400/[0.06] p-8 shadow-2xl shadow-black/25 sm:p-10"
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
                Next project
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Want to see more work?
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/55">
                Explore other projects or view the source code to see how the
                application is structured.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href="/#projects" variant="secondary">
                Back to projects
                <FiArrowLeft />
              </Button>

              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source
                  <FiGithub />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function SectionHeader({ eyebrow, title, icon }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-xl text-amber-300">
        {icon}
      </span>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
          {title}
        </h2>
      </div>
    </div>
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