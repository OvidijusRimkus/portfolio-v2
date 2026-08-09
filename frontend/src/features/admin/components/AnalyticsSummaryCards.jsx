// frontend/src/features/admin/components/AnalyticsSummaryCards.jsx

import { useEffect, useState } from 'react';
import { FiActivity, FiBarChart2, FiDownload, FiInbox, FiRefreshCw } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import { getAnalyticsSummary } from '../services/adminApi.js';

const initialSummary = {
  totalEvents: 0,
  pageViews: 0,
  cvDownloads: 0,
  contactSubmits: 0,
};

/**
 * AnalyticsSummaryCards rodo realius analytics skaičius iš backend.
 *
 * Backend endpoint:
 * GET /api/analytics/summary
 */
export function AnalyticsSummaryCards() {
  const [summary, setSummary] = useState(initialSummary);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadSummary() {
    try {
      setIsLoading(true);
      setError('');

      const response = await getAnalyticsSummary();

      setSummary(response.data.summary);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load analytics summary. Please try again.';

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  const cards = [
    {
      icon: <FiBarChart2 />,
      title: 'Total events',
      value: summary.totalEvents,
      description: 'All tracked portfolio analytics events.',
    },
    {
      icon: <FiActivity />,
      title: 'Page views',
      value: summary.pageViews,
      description: 'Public and admin route visits.',
    },
    {
      icon: <FiInbox />,
      title: 'Contact submits',
      value: summary.contactSubmits,
      description: 'Successful contact form submissions.',
    },
    {
      icon: <FiDownload />,
      title: 'CV downloads',
      value: summary.cvDownloads,
      description: 'CV download button clicks.',
    },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
            Analytics
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            Portfolio summary
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Real event counts collected from the public portfolio.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={loadSummary}
          disabled={isLoading}
          className="px-4 py-2.5"
        >
          <FiRefreshCw className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <AnalyticsCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            value={isLoading ? '...' : card.value}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}

function AnalyticsCard({ icon, title, value, description }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5 transition hover:border-amber-400/25 hover:bg-white/[0.04]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
        {icon}
      </div>

      <p className="text-sm text-white/45">{title}</p>

      <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
        {value}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/50">{description}</p>
    </article>
  );
}