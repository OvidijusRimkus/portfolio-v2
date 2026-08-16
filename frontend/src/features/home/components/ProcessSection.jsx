// frontend/src/features/home/components/ProcessSection.jsx

import { motion } from 'motion/react';
import {
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiLayout,
  FiSearch,
} from 'react-icons/fi';

import { Container } from '../../../shared/components/Container.jsx';
import { SectionHeading } from '../../../shared/components/SectionHeading.jsx';

const processSteps = [
  {
    icon: <FiSearch />,
    step: '01',
    title: 'Understand the problem',
    description:
      'Before coding, I define what the feature should solve, what data it needs and how the user will interact with it.',
  },
  {
    icon: <FiDatabase />,
    step: '02',
    title: 'Design the backend',
    description:
      'I plan the database model, API routes, validation, authentication rules and error handling before connecting the UI.',
  },
  {
    icon: <FiLayout />,
    step: '03',
    title: 'Build the interface',
    description:
      'I create responsive React components with clear state management, reusable UI elements and clean user flows.',
  },
  {
    icon: <FiCheckCircle />,
    step: '04',
    title: 'Test and improve',
    description:
      'I test happy paths, error states, protected routes, forms and API responses before merging the feature.',
  },
];

const workflowItems = [
  {
    icon: <FiGitBranch />,
    title: 'Git workflow',
    text: 'Feature branches, commits, pull requests and clean merge flow.',
  },
  {
    icon: <FiCode />,
    title: 'Clean code',
    text: 'Separated modules, service layers, validation and reusable components.',
  },
  {
    icon: <FiDatabase />,
    title: 'Database-backed features',
    text: 'PostgreSQL and Prisma for real persistent data, not only static UI.',
  },
];

/**
 * ProcessSection parodo, kaip kuriamas projektas.
 *
 * Šita sekcija svarbi portfolio, nes parodo ne tik technologijas,
 * bet ir darbo mąstymą: nuo problemos iki testavimo.
 */
export function ProcessSection() {
  return (
    <section id="process" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="absolute right-0 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-amber-400/5 blur-3xl" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <SectionHeading
              eyebrow="Process"
              title="I build features step by step, not randomly."
              description="A good full stack project is not only about writing code. It needs structure, API planning, database thinking, UI polish, testing and a workflow that can be continued later without chaos."
            />

            <div className="mt-8 grid gap-4">
              {workflowItems.map((item, index) => (
                <WorkflowItem key={item.title} item={item} index={index} />
              ))}
            </div>
          </motion.div>

          <div className="grid gap-5">
            {processSteps.map((step, index) => (
              <ProcessStep key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProcessStep({ step, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:border-amber-400/25 hover:bg-white/[0.06]"
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-400/5 blur-3xl transition group-hover:bg-amber-400/10" />

      <div className="relative flex items-start gap-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-xl text-amber-300">
          {step.icon}
        </span>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300/70">
            Step {step.step}
          </p>

          <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
            {step.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/55">
            {step.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function WorkflowItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/55">
          {item.icon}
        </span>

        <div>
          <h3 className="text-base font-semibold tracking-[-0.03em] text-white">
            {item.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-white/50">{item.text}</p>
        </div>
      </div>
    </motion.div>
  );
}