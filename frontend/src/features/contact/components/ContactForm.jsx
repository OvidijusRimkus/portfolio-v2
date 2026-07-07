// frontend/src/features/contact/components/ContactForm.jsx

import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';
import { submitContactMessage } from '../services/contactApi.js';

const initialFormState = {
  name: '',
  email: '',
  message: '',
};

/**
 * ContactForm yra reali kontaktų forma.
 *
 * Ji:
 * - saugo input reikšmes React state;
 * - daro paprastą frontend validaciją;
 * - siunčia duomenis į backend /api/contact;
 * - parodo success arba error žinutę.
 */
export function ContactForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({
    type: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function validateForm() {
    if (formData.name.trim().length < 2) {
      return 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim().includes('@')) {
      return 'Please provide a valid email address.';
    }

    if (formData.message.trim().length < 10) {
      return 'Message must be at least 10 characters long.';
    }

    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setStatus({
        type: 'error',
        message: validationError,
      });

      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({
        type: 'idle',
        message: '',
      });

      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setFormData(initialFormState);
      setStatus({
        type: 'success',
        message: 'Message sent successfully. Thank you for reaching out!',
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Something went wrong. Please try again later.';

      setStatus({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/70">
          Message
        </label>

        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about the opportunity, project or idea..."
          rows={6}
          className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-400/50 focus:bg-black/40"
        />
      </div>

      {status.message && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status.type === 'success'
              ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
              : 'border-red-400/20 bg-red-400/10 text-red-300'
          }`}
        >
          {status.message}
        </div>
      )}

      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
        <FiSend />
        {isSubmitting ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-white/70">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-400/50 focus:bg-black/40"
      />
    </div>
  );
}