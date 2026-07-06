// frontend/src/features/home/pages/HomePage.jsx

import { ContactPreview } from '../../contact/components/ContactPreview.jsx';
import { FeaturedProjects } from '../components/FeaturedProjects.jsx';
import { Hero } from '../components/Hero.jsx';
import { TechStack } from '../components/TechStack.jsx';
import { Footer } from '../../../shared/layouts/Footer.jsx';

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
      <ContactPreview />
      <Footer />
    </main>
  );
}