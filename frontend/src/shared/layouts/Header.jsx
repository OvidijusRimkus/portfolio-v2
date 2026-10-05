// frontend/src/shared/layouts/Header.jsx

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiGrid, FiMenu, FiX } from 'react-icons/fi';

import { Container } from '../components/Container.jsx';

const navLinks = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/#about',
  },
  {
    label: 'Process',
    href: '/#process',
  },
  {
    label: 'Projects',
    href: '/#projects',
  },
  {
    label: 'Contact',
    href: '/#contact',
  },
];

/**
 * Public portfolio header.
 *
 * Desktop:
 * - header remains visible.
 *
 * Mobile:
 * - scroll down hides the header;
 * - scroll up shows the header;
 * - top of page always shows the header;
 * - opened mobile menu keeps the header visible.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const lastScrollYRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const isMobileViewport = window.innerWidth < 768;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      const hasScrolledEnough = currentScrollY > 96;

      if (!isMobileViewport || isOpen) {
        setIsHeaderVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (!hasScrolledEnough) {
        setIsHeaderVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      setIsHeaderVisible(!isScrollingDown);
      lastScrollYRef.current = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
    setIsHeaderVisible(true);
  }

  function toggleMenu() {
    setIsHeaderVisible(true);
    setIsOpen((currentValue) => !currentValue);
  }

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-2xl transition-transform duration-300 ease-out md:translate-y-0 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            onClick={closeMenu}
            className="group inline-flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300 shadow-2xl shadow-amber-400/10 transition group-hover:border-amber-400/40">
              <FiGrid />
            </span>

            <span>
              <span className="block text-sm font-semibold tracking-[-0.02em] text-white">
                Ovidijus Rimkus
              </span>
              <span className="block text-xs text-white/40">
                Full Stack Developer
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <HeaderLink key={link.href} href={link.href}>
                {link.label}
              </HeaderLink>
            ))}

            <a
              href="https://github.com/OvidijusRimkus"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/60 transition hover:border-amber-400/30 hover:bg-white/[0.04] hover:text-white"
            >
              <FiGithub />
              GitHub
            </a>
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition hover:border-amber-400/30 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <MobileHeaderLink
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </MobileHeaderLink>
              ))}

              <a
                href="https://github.com/OvidijusRimkus"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/65 transition hover:border-amber-400/30 hover:text-white"
              >
                GitHub
                <FiGithub />
              </a>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}

function HeaderLink({ href, children }) {
  return (
    <a
      href={href}
      className="rounded-full px-4 py-2 text-sm font-semibold text-white/55 transition hover:bg-white/[0.04] hover:text-white"
    >
      {children}
    </a>
  );
}

function MobileHeaderLink({ href, onClick, children }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/65 transition hover:border-amber-400/30 hover:text-white"
    >
      {children}
    </a>
  );
}