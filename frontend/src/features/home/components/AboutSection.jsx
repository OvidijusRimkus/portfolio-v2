// frontend/src/features/home/components/AboutSection.jsx

import { motion } from 'motion/react';
import {
  FiAward,
  FiLayers,
  FiSettings,
  FiTool,
} from 'react-icons/fi';

import { Container } from '../../../shared/components/Container.jsx';
import { SectionHeading } from '../../../shared/components/SectionHeading.jsx';

const highlights = [
  {
    icon: <FiAward />,
    title: 'Full Stack diploma',
    description:
      'Completed full stack programming studies and built practical projects with React, Node.js, PostgreSQL and Docker.',
  },
  {
    icon: <FiTool />,
    title: 'Real technical background',
    description:
      'Hands-on experience with service workflows, diagnostics, maintenance planning and real-world problem solving.',
  },
  {
    icon: <FiLayers />,
    title: 'Clean architecture focus',
    description:
      'I build applications with separated modules, clear responsibilities and maintainable project structure.',
  },
];

const stats = [
  {
    value: 'React',
    label: 'Frontend',
  },
  {
    value: 'Express',
    label: 'Backend',
  },
  {
    value: 'Prisma',
    label: 'ORM',
  },
  {
    value: 'Docker',
    label: 'Dev environment',
  },
];

/**
 * AboutSection pristato portfolio savininką kaip programuotoją.
 *
 * scroll-mt-28 reikalingas dėl fixed headerio,
 * kad paspaudus /#about sekcijos neuždengtų navigacija.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-28 border-t border-white/10 py-24 sm:py-32"
    >
      <div className="absolute left-0 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-amber-400/5 blur-3xl" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <SectionHeading
              eyebrow="About"
              title="I connect real-world technical thinking with full stack development."
              description="My background is not only code. I have worked with technical systems, maintenance workflows and problem solving under real conditions. That helps me design practical applications that are not just visually clean, but also useful, structured and maintainable."
            />

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
                  <FiSettings />
                </span>

                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                    Product mindset
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    I like building systems that solve actual problems: admin
                    dashboards, booking flows, service management tools,
                    analytics, authentication and database-backed features.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {highlights.map((item, index) => (
              <AboutHighlight key={item.title} item={item} index={index} />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="grid gap-4 rounded-[2rem] border border-white/10 bg-black/25 p-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-lg font-semibold tracking-[-0.04em] text-white">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AboutHighlight({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:border-amber-400/25 hover:bg-white/[0.06]"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-white/55 transition group-hover:border-amber-400/20 group-hover:bg-amber-400/10 group-hover:text-amber-300">
          {item.icon}
        </span>

        <div>
          <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/55">
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}