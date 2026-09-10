// frontend/src/features/admin/components/AdminDashboardTabs.jsx

import { FiBarChart2, FiFolder, FiInbox } from 'react-icons/fi';

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <FiBarChart2 />,
    description: 'Analytics summary',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <FiFolder />,
    description: 'Portfolio project management',
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: <FiInbox />,
    description: 'Contact form submissions',
  },
];

/**
 * AdminDashboardTabs valdo dashboard sekcijas.
 *
 * Kol kas naudojame React state, ne atskirus route'us.
 * Taip dashboard lieka paprastas, bet daug patogesnis naudoti.
 */
export function AdminDashboardTabs({ activeTab, onTabChange }) {
  return (
    <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="grid gap-2 md:grid-cols-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`group rounded-[1.5rem] border px-5 py-4 text-left transition ${
                isActive
                  ? 'border-amber-400/30 bg-amber-400/10 text-white'
                  : 'border-transparent bg-transparent text-white/45 hover:border-white/10 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
                    isActive
                      ? 'border-amber-400/20 bg-amber-400/10 text-amber-300'
                      : 'border-white/10 bg-black/20 text-white/40 group-hover:text-white/70'
                  }`}
                >
                  {tab.icon}
                </span>

                <div>
                  <p className="text-sm font-semibold">{tab.label}</p>
                  <p className="mt-1 text-xs text-white/35">{tab.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}