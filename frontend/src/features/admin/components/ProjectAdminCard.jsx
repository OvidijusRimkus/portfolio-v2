// frontend/src/features/admin/components/ProjectAdminCard.jsx

import { FiEdit3, FiExternalLink, FiGithub, FiTrash2 } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';

/**
 * Vieno projekto kortelė admin dashboarde.
 *
 * Dabar turi:
 * - edit;
 * - delete;
 * - project info.
 */
export function ProjectAdminCard({ project, onEdit, onDelete, isDeleting }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5 transition hover:border-amber-400/25 hover:bg-white/[0.04]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
              {project.title}
            </h3>

            {project.isFeatured && (
              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                Featured
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-white/40">{project.type}</p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            project.isPublished
              ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
              : 'border-red-400/20 bg-red-400/10 text-red-300'
          }`}
        >
          {project.isPublished ? 'Published' : 'Hidden'}
        </span>
      </div>

      <p className="text-sm leading-6 text-white/55">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
          Highlights
        </p>

        <div className="flex flex-wrap gap-2">
          {project.highlights.map((highlight) => (
            <span key={highlight} className="text-sm text-white/55">
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 transition hover:border-amber-400/30 hover:text-white"
          >
            <FiGithub />
            Source
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 transition hover:border-amber-400/30 hover:text-white"
          >
            <FiExternalLink />
            Live
          </a>
        )}

        <Button
          type="button"
          variant="secondary"
          onClick={() => onEdit(project)}
          className="px-4 py-2"
        >
          <FiEdit3 />
          Edit
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => onDelete(project)}
          disabled={isDeleting}
          className="border-red-400/20 px-4 py-2 text-red-300 hover:bg-red-400/10 hover:text-red-200"
        >
          <FiTrash2 />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </article>
  );
}