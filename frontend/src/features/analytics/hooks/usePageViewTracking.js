// frontend/src/features/analytics/hooks/usePageViewTracking.js

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { trackAnalyticsEvent } from '../services/analyticsApi.js';

/**
 * usePageViewTracking seka route pasikeitimus.
 *
 * Kai vartotojas atsidaro:
 * - /
 * - /login
 * - /admin
 *
 * siunčiam page_view į backend.
 */
export function usePageViewTracking() {
  const location = useLocation();

  useEffect(() => {
    trackAnalyticsEvent({
      type: 'page_view',
      path: `${location.pathname}${location.search}`,
      metadata: {
        source: 'frontend',
      },
    });
  }, [location.pathname, location.search]);
}