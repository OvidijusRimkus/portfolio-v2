// frontend/src/features/home/pages/HomePage.jsx

import { ContactPreview } from '../../contact/components/ContactPreview.jsx';
import { usePageTitle } from '../../../shared/hooks/usePageTitle.js';
import { Footer } from '../../../shared/layouts/Footer.jsx';
import { Header } from '../../../shared/layouts/Header.jsx';
import { AboutSection } from '../components/AboutSection.jsx';
import { FeaturedProjects } from '../components/FeaturedProjects.jsx';
import { Hero } from '../components/Hero.jsx';
import { ProcessSection } from '../components/ProcessSection.jsx';
import { TechStack } from '../components/TechStack.jsx';

/**
 * Public homepage.
 *
 * Sudeda visas pagrindines portfolio sekcijas:
 * - Header
 * - Hero
 * - About
 * - Process
 * - Tech stack
 * - Featured projects
 * - Contact preview
 * - Footer
 */
export function HomePage() {
  usePageTitle('Ovidijus Rimkus | Full Stack Developer Portfolio');

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />
      <Hero />
      <AboutSection />
      <ProcessSection />
      <TechStack />
      <FeaturedProjects />
      <ContactPreview />
      <Footer />
    </main>
  );
}