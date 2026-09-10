// backend/src/modules/analytics/analytics.service.js

import { prisma } from '../../db/prisma.js';

/**
 * Sukuria analytics įvykį.
 *
 * Šitas service bus naudojamas public endpointui:
 * POST /api/analytics/events
 */
export async function createAnalyticsEvent({ type, path, metadata, ipAddress, userAgent }) {
  const event = await prisma.analyticsEvent.create({
    data: {
      type,
      path,
      metadata,
      ipAddress,
      userAgent,
    },
    select: {
      id: true,
      type: true,
      path: true,
      createdAt: true,
    },
  });

  return event;
}

/**
 * Grąžina admin dashboard analytics santrauką.
 *
 * Kol kas paprasta versija:
 * - bendras events kiekis;
 * - page views kiekis;
 * - CV downloads kiekis;
 * - contact submits kiekis.
 */
export async function getAnalyticsSummary() {
  const [totalEvents, pageViews, cvDownloads, contactSubmits] = await Promise.all([
    prisma.analyticsEvent.count(),
    prisma.analyticsEvent.count({
      where: {
        type: 'page_view',
      },
    }),
    prisma.analyticsEvent.count({
      where: {
        type: 'cv_download',
      },
    }),
    prisma.analyticsEvent.count({
      where: {
        type: 'contact_submit',
      },
    }),
  ]);

  return {
    totalEvents,
    pageViews,
    cvDownloads,
    contactSubmits,
  };
}