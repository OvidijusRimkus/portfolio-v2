// frontend/src/features/home/components/TechStack.jsx

import { motion } from 'motion/react';

import { Container } from '../../../shared/components/Container.jsx';
import { SectionHeading } from '../../../shared/components/SectionHeading.jsx';

const techGroups = [
  {
    title: 'Frontend',
    description: 'Modern interfaces, smooth UI and responsive layouts.',
    items: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'React Router', 'Zustand'],
  },
  {
    title: 'Backend',
    description: 'Structured APIs, authentication and clean service layers.',
    items: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'JWT', 'Zod'],
  },
  {
    title: 'Workflow',
    description: 'Production-style setup, version control and deployment mindset.',
    items: ['Docker', 'GitHub', 'ES Modules', 'ESLint', 'Prettier', 'Feature Branches'],
  },
];

export function TechStack() {
  return (
    <section className="relative border-t border-white/10 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Stack"
          title="Technologies I use to build real full stack applications."
          description="The focus is not only on writing code, but on structuring projects like maintainable products: clean folders, service layers, validation, authentication and scalable UI components."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {techGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:border-amber-400/30 hover:bg-white/[0.06]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-lg font-semibold text-amber-300">
                0{index + 1}
              </div>

              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                {group.title}
              </h3>

              <p className="mt-3 min-h-14 text-sm leading-6 text-white/50">
                {group.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs font-medium text-white/55 transition group-hover:border-white/15 group-hover:text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}