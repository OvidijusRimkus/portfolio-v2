// frontend/src/features/admin/pages/DashboardPage.jsx

import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import { Container } from '../../../shared/components/Container.jsx';
import { useAuthStore } from '../../auth/store/authStore.js';
import { AdminDashboardTabs } from '../components/AdminDashboardTabs.jsx';
import { AnalyticsSummaryCards } from '../components/AnalyticsSummaryCards.jsx';
import { ContactMessagesPanel } from '../components/ContactMessagesPanel.jsx';
import { ProjectsPanel } from '../components/ProjectsPanel.jsx';

/**
 * Admin Dashboard puslapis.
 *
 * Dashboard dabar turi tabus:
 * - Overview;
 * - Projects;
 * - Messages.
 */
export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const admin = useAuthStore((state) => state.admin);
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    await logout();
    window.location.href = '/login';
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 py-8">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
                Admin Dashboard
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                Welcome, {admin?.username || 'admin'}
              </h1>

              <p className="mt-2 text-sm text-white/45">
                Portfolio analytics, project management and contact messages.
              </p>
            </div>

            <Button variant="secondary" onClick={handleLogout}>
              <FiLogOut />
              Logout
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <AdminDashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'overview' && <AnalyticsSummaryCards />}

          {activeTab === 'projects' && <ProjectsPanel />}

          {activeTab === 'messages' && <ContactMessagesPanel />}
        </Container>
      </section>
    </main>
  );
}