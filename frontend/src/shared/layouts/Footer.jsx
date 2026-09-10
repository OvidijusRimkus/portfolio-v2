// frontend/src/shared/layouts/Footer.jsx

import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

import { Container } from '../components/Container.jsx';

const footerLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/OvidijusRimkus',
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ovidijus-rimkus',
    icon: FiLinkedin,
  },
  {
    label: 'Email',
    href: 'mailto:ovd.rmk@gmail.com',
    icon: FiMail,
  },
];

/**
 * Public puslapio Footer.
 *
 * Kol kas naudojame statinius linkus.
 * Vėliau email ir social links galėsime laikyti config arba DB.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Ovidijus Rimkus</p>
            <p className="mt-2 text-sm text-white/40">
              Full Stack Developer Portfolio · {year}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {footerLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50 transition hover:border-amber-400/30 hover:text-white"
                >
                  <Icon />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}