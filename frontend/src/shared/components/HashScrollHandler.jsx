// frontend/src/shared/components/HashScrollHandler.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles scrolling to hash anchors after route changes.
 *
 * Example:
 * /#process
 * /#projects
 * /#contact
 *
 * This is needed because React Router can change the route before
 * the target section is mounted in the DOM.
 */
export function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return;
    }

    const targetId = location.hash.replace('#', '');

    const scrollToTarget = () => {
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        return;
      }

      const headerOffset = 96;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    };

    const timeoutId = window.setTimeout(scrollToTarget, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname, location.hash]);

  return null;
}