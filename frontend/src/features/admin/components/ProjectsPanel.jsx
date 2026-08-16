// frontend/src/features/admin/components/ProjectsPanel.jsx

import { useEffect, useState } from 'react';
import { FiFolder, FiRefreshCw } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import {
  createAdminProject,
  getAdminProjects,
} from '../services/adminProjectsApi.js';
import { ProjectAdminCard } from './ProjectAdminCard.jsx';
import { ProjectForm } from './ProjectForm.jsx';

/**
 * ProjectsPanel leidžia adminui matyti ir sukurti portfolio projektus.
 *
 * Šiame etape:
 * - GET projektai;
 * - POST naujas projektas.
 *
 * Kitame etape:
 * - edit;
 * - delete;
 * - publish toggle.
 */
export function ProjectsPanel() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function loadProjects() {
    try {
      setIsLoading(true);
      setError('');

      const response = await getAdminProjects();

      setProjects(response.data.projects);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load projects. Please try again.';

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateProject(payload) {
    try {
      setIsCreating(true);
      setError('');
      setSuccessMessage('');

      const response = await createAdminProject(payload);
      const newProject = response.data.project;

      setProjects((currentProjects) => [newProject, ...currentProjects]);
      setSuccessMessage('Project created successfully.');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to create project. Please try again.';

      setError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
            Projects
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            Portfolio projects
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Manage projects that appear in the public portfolio.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={loadProjects}
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

      {successMessage && (
        <div className="mb-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
          {successMessage}
        </div>
      )}

      <div className="mb-8 rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
            <FiFolder />
          </span>

          <div>
            <h3 className="text-base font-semibold text-white">
              Create new project
            </h3>
            <p className="mt-1 text-sm text-white/40">
              This will immediately create a project in PostgreSQL.
            </p>
          </div>
        </div>

        <ProjectForm onSubmit={handleCreateProject} isSubmitting={isCreating} />
      </div>

      {isLoading ? (
        <ProjectsLoadingState />
      ) : projects.length === 0 ? (
        <ProjectsEmptyState />
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectAdminCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectsLoadingState() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-8 text-center">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-amber-300" />
      <p className="text-sm font-semibold text-white">Loading projects...</p>
      <p className="mt-2 text-sm text-white/40">
        Fetching projects from the API.
      </p>
    </div>
  );
}

function ProjectsEmptyState() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-8 text-center">
      <p className="text-sm font-semibold text-white">No projects yet</p>
      <p className="mt-2 text-sm text-white/40">
        Create your first portfolio project using the form above.
      </p>
    </div>
  );
}