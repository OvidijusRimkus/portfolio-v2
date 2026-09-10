// frontend/src/shared/hooks/usePageTitle.js

import { useEffect } from 'react';

const defaultTitle = 'Ovidijus Rimkus | Full Stack Developer Portfolio';

/**
 * usePageTitle centralizuotai valdo browser tab title.
 *
 * Vietoje to, kad kiekviename puslapyje tiesiogiai rašytume document.title,
 * naudojame vieną reusable hook.
 */
export function usePageTitle(title = defaultTitle) {
  useEffect(() => {
    document.title = title || defaultTitle;
  }, [title]);
}