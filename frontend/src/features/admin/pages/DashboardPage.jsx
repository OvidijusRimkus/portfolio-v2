// frontend/src/features/admin/pages/DashboardPage.jsx

import { FiActivity, FiBarChart2, FiInbox, FiLogOut } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import { Container } from '../../../shared/components/Container.jsx';
import { useAuthStore } from '../../auth/store/authStore.js';
import { ContactMessagesPanel } from '../components/ContactMessagesPanel.jsx';

/**
 * Admin Dashboard puslapis.
 *
 * Dabar jau rodo realias kontaktų žinutes iš backend:
 * GET /api/admin/contact-messages
 */
export function DashboardPage() {
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
                Portfolio analytics and admin tools.
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
          <div className="grid gap-5 md:grid-cols-3">
            <DashboardCard
              icon={<FiActivity />}
              title="Visits"
              value="Soon"
              description="Analytics module will track portfolio visits."
            />

            <DashboardCard
              icon={<FiInbox />}
              title="Messages"
              value="Live"
              description="Contact messages are now connected to PostgreSQL."
            />

            <DashboardCard
              icon={<FiBarChart2 />}
              title="CV downloads"
              value="Soon"
              description="CV download events will be counted later."
            />
          </div>

          <div className="mt-8">
            <ContactMessagesPanel />
          </div>
        </Container>
      </section>
    </main>
  );
}

function DashboardCard({ icon, title, value, description }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
        {icon}
      </div>

      <p className="text-sm text-white/45">{title}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
        {value}
      </h2>
      <p className="mt-3 text-sm leading-6 text-white/50">{description}</p>
    </article>
  );
}