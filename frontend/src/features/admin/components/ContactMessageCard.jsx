// frontend/src/features/admin/components/ContactMessageCard.jsx

import { FiCheckCircle, FiClock, FiMail } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';

function formatDate(dateValue) {
  return new Intl.DateTimeFormat('lt-LT', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateValue));
}

/**
 * Vienos kontaktų žinutės kortelė.
 *
 * Rodo:
 * - vardą;
 * - email;
 * - žinutę;
 * - datą;
 * - ar perskaityta;
 * - mygtuką "Mark as read".
 */
export function ContactMessageCard({ message, onMarkAsRead, isUpdating }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5 transition hover:border-amber-400/25 hover:bg-white/[0.04]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-semibold text-white">
              {message.name}
            </h3>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                message.isRead
                  ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                  : 'border-amber-400/20 bg-amber-400/10 text-amber-300'
              }`}
            >
              {message.isRead ? 'Read' : 'Unread'}
            </span>
          </div>

          <a
            href={`mailto:${message.email}`}
            className="mt-2 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-amber-300"
          >
            <FiMail />
            {message.email}
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/35">
          <FiClock />
          {formatDate(message.createdAt)}
        </div>
      </div>

      <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-white/60">
        {message.message}
      </p>

      {!message.isRead && (
        <div className="mt-5">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onMarkAsRead(message.id)}
            disabled={isUpdating}
            className="px-4 py-2.5"
          >
            <FiCheckCircle />
            {isUpdating ? 'Updating...' : 'Mark as read'}
          </Button>
        </div>
      )}
    </article>
  );
}