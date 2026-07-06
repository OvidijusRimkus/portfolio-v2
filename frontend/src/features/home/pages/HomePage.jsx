// frontend/src/features/home/pages/HomePage.jsx

import { Hero } from '../components/Hero.jsx';

/**
 * HomePage dabar tampa puslapio kompozicija.
 *
 * Čia vėliau dėliosime sekcijas:
 * - Hero
 * - About
 * - TechStack
 * - FeaturedProjects
 * - ContactPreview
 *
 * Svarbu: puslapio failas neturi būti milžiniškas.
 * Jis turi jungti sekcijas, o ne laikyti visą UI logiką savyje.
 */
export function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Hero />

      <section id="projects" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 text-white/50 sm:px-10 lg:px-16">
          Projects section will be added next.
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 text-white/50 sm:px-10 lg:px-16">
          Contact section will be added later.
        </div>
      </section>
    </main>
  );
}