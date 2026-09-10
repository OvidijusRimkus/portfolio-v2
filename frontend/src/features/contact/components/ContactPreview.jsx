// frontend/src/features/contact/components/ContactPreview.jsx

import { motion } from 'motion/react';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

import { Container } from '../../../shared/components/Container.jsx';
import { SectionHeading } from '../../../shared/components/SectionHeading.jsx';
import { ContactForm } from './ContactForm.jsx';

const contactLinks = [
  {
    label: 'Email',
    value: 'ovd.rmk@gmail.com',
    href: 'mailto:ovd.rmk@gmail.com',
    icon: FiMail,
  },
  {
    label: 'GitHub',
    value: 'github.com/OvidijusRimkus',
    href: 'https://github.com/OvidijusRimkus',
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    value: 'LinkedIn profile',
    href: 'https://www.linkedin.com/in/ovidijus-rimkus',
    icon: FiLinkedin,
  },
];

/**
 * ContactPreview dabar turi tikrą kontaktų formą.
 *
 * Forma siunčia duomenis į backend:
 * POST /api/contact
 */
export function ContactPreview() {
  return (
    <section id="contact" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_34rem)]" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s build something clean, useful and production-ready."
              description="I’m interested in full stack development opportunities, internships, junior developer roles and real product work where clean architecture matters."
            />

            <div className="mt-8 grid gap-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-amber-400/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-white/70 transition group-hover:text-amber-300">
                        <Icon />
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm text-white/45">
                          {item.value}
                        </p>
                      </div>
                    </div>

                    <FiArrowUpRight className="text-white/35 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-300" />
                  </a>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8"
          >
            <div className="mb-8 rounded-[1.5rem] border border-amber-400/20 bg-amber-400/10 p-5">
              <p className="text-sm font-semibold text-amber-300">
                Send a message
              </p>

              <p className="mt-3 text-sm leading-6 text-white/60">
                This form is connected to the Express API and stores messages in
                PostgreSQL through the contact module.
              </p>
            </div>

            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}