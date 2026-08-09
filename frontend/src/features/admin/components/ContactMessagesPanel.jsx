// frontend/src/features/admin/components/ContactMessagesPanel.jsx

import { useEffect, useState } from 'react';
import { FiInbox, FiRefreshCw } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import {
  getContactMessages,
  markContactMessageAsRead,
} from '../services/adminApi.js';
import { ContactMessageCard } from './ContactMessageCard.jsx';

const initialPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

/**
 * ContactMessagesPanel užkrauna ir rodo kontaktų žinutes admin dashboarde.
 *
 * Kol kas turime:
 * - loading state;
 * - error state;
 * - empty state;
 * - refresh;
 * - mark as read;
 * - paprastą pagination pasiruošimą.
 */
export function ContactMessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingMessageId, setUpdatingMessageId] = useState(null);

  async function loadMessages(page = 1) {
    try {
      setIsLoading(true);
      setError('');

      const response = await getContactMessages({
        page,
        limit: 10,
      });

      setMessages(response.data.messages);
      setPagination(response.data.pagination);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load contact messages. Please try again.';

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMarkAsRead(id) {
    try {
      setUpdatingMessageId(id);

      const response = await markContactMessageAsRead(id);
      const updatedMessage = response.data.contactMessage;

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id ? updatedMessage : message,
        ),
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to update message. Please try again.';

      setError(errorMessage);
    } finally {
      setUpdatingMessageId(null);
    }
  }

  useEffect(() => {
    loadMessages(1);
  }, []);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
            Messages
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            Contact messages
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Messages submitted through the public portfolio contact form.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => loadMessages(pagination.page)}
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

      {isLoading ? (
        <LoadingState />
      ) : messages.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <ContactMessageCard
              key={message.id}
              message={message}
              onMarkAsRead={handleMarkAsRead}
              isUpdating={updatingMessageId === message.id}
            />
          ))}
        </div>
      )}

      {!isLoading && pagination.total > 0 && (
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">
            Showing page {pagination.page} of {pagination.totalPages || 1} ·{' '}
            {pagination.total} total messages
          </p>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              disabled={!pagination.hasPreviousPage}
              onClick={() => loadMessages(pagination.page - 1)}
              className="px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </Button>

            <Button
              type="button"
              variant="ghost"
              disabled={!pagination.hasNextPage}
              onClick={() => loadMessages(pagination.page + 1)}
              className="px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

function LoadingState() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-8 text-center">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-amber-300" />
      <p className="text-sm font-semibold text-white">Loading messages...</p>
      <p className="mt-2 text-sm text-white/40">
        Fetching latest contact submissions.
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/45">
        <FiInbox />
      </div>

      <p className="text-sm font-semibold text-white">No messages yet</p>
      <p className="mt-2 text-sm text-white/40">
        New contact form submissions will appear here.
      </p>
    </div>
  );
}