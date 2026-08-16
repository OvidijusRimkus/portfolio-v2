// frontend/src/features/home/pages/HomePage.jsx

import { ContactPreview } from '../../contact/components/ContactPreview.jsx';
import { AboutSection } from '../components/AboutSection.jsx';
import { FeaturedProjects } from '../components/FeaturedProjects.jsx';
import { Hero } from '../components/Hero.jsx';
import { ProcessSection } from '../components/ProcessSection.jsx';
import { TechStack } from '../components/TechStack.jsx';
import { Footer } from '../../../shared/layouts/Footer.jsx';
import { Header } from '../../../shared/layouts/Header.jsx';

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