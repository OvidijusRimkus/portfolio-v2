// frontend/src/features/home/components/FeaturedProjects.jsx

import { motion } from 'motion/react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import { Container } from '../../../shared/components/Container.jsx';
import { SectionHeading } from '../../../shared/components/SectionHeading.jsx';
import { featuredProjects } from '../../projects/data/projects.js';

export function FeaturedProjects() {
  return (
    <section id="projects" className="relative border-t border-white/10 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work built with product thinking."
            description="These projects are designed to show more than UI. They show routing, API structure, authentication, database design and maintainable full stack architecture."
          />

          <Button href="https://github.com/OvidijusRimkus" target="_blank" rel="noreferrer" variant="secondary">
            View GitHub
            <FiGithub />
          </Button>
        </div>

        <div className="mt-14 grid gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
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
            {project.metrics.map((metric) => (
              <div
                key={metric}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="text-sm text-white/65">{metric}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.8)]" />
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={project.liveUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300"
            >
              Live preview
              <FiArrowUpRight />
            </a>

            <a
              href={project.githubUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/[0.05] hover:text-white"
            >
              Source
              <FiGithub />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}