// frontend/src/features/home/pages/HomePage.jsx

import { FeaturedProjects } from '../components/FeaturedProjects.jsx';
import { Hero } from '../components/Hero.jsx';
import { TechStack } from '../components/TechStack.jsx';

/**
 * HomePage yra puslapio kompozicija.
 *
 * Šitas failas tik sudeda sekcijas į vieną puslapį.
 * Konkreti UI logika ir markup gyvena atskiruose komponentuose.
 */
export function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Hero />
      <TechStack />
      <FeaturedProjects />

      <section id="contact" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 text-white/50 sm:px-10 lg:px-16">
          Contact section will be added later.
        </div>
      </section>
    </main>
  );
}