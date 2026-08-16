// frontend/src/features/admin/components/ProjectForm.jsx

import { useEffect, useState } from 'react';
import { FiPlusCircle, FiSave } from 'react-icons/fi';

import { Button } from '../../../shared/components/Button.jsx';

const initialFormState = {
  title: '',
  slug: '',
  type: '',
  description: '',
  stack: '',
  highlights: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: '',
  status: 'In progress',
  isFeatured: true,
  isPublished: true,
  sortOrder: 10,
};

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/ą/g, 'a')
    .replace(/č/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ė/g, 'e')
    .replace(/į/g, 'i')
    .replace(/š/g, 's')
    .replace(/ų/g, 'u')
    .replace(/ū/g, 'u')
    .replace(/ž/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function splitList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatProjectForForm(project) {
  if (!project) {
    return initialFormState;
  }

  return {
    title: project.title || '',
    slug: project.slug || '',
    type: project.type || '',
    description: project.description || '',
    stack: Array.isArray(project.stack) ? project.stack.join(', ') : '',
    highlights: Array.isArray(project.highlights)
      ? project.highlights.join(', ')
      : '',
    githubUrl: project.githubUrl || '',
    liveUrl: project.liveUrl || '',
    imageUrl: project.imageUrl || '',
    status: project.status || 'In progress',
    isFeatured: Boolean(project.isFeatured),
    isPublished: Boolean(project.isPublished),
    sortOrder: project.sortOrder ?? 10,
  };
}

/**
 * ProjectForm naudojama ir kūrimui, ir redagavimui.
 *
 * Jeigu perduodamas initialProject — forma veikia edit režimu.
 * Jeigu nėra — forma kuria naują projektą.
 */
export function ProjectForm({
  onSubmit,
  isSubmitting,
  initialProject = null,
  submitLabel,
}) {
  const [formData, setFormData] = useState(formatProjectForForm(initialProject));
  const [localError, setLocalError] = useState('');

  const isEditMode = Boolean(initialProject);

  useEffect(() => {
    setFormData(formatProjectForForm(initialProject));
  }, [initialProject]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setLocalError('');

    setFormData((currentData) => {
      const nextValue = type === 'checkbox' ? checked : value;

      if (name === 'title' && !isEditMode) {
        return {
          ...currentData,
          title: value,
          slug: currentData.slug ? currentData.slug : createSlug(value),
        };
      }

      return {
        ...currentData,
        [name]: nextValue,
      };
    });
  }

  function validateForm() {
    if (formData.title.trim().length < 2) {
      return 'Project title must be at least 2 characters long.';
    }

    if (formData.slug.trim().length < 2) {
      return 'Project slug is required.';
    }

    if (formData.type.trim().length < 2) {
      return 'Project type is required.';
    }

    if (formData.description.trim().length < 20) {
      return 'Description must be at least 20 characters long.';
    }

    if (splitList(formData.stack).length === 0) {
      return 'Add at least one technology to stack.';
    }

    if (splitList(formData.highlights).length === 0) {
      return 'Add at least one highlight.';
    }

    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setLocalError(validationError);
      return;
    }

    await onSubmit({
      title: formData.title.trim(),
      slug: createSlug(formData.slug),
      type: formData.type.trim(),
      description: formData.description.trim(),
      stack: splitList(formData.stack),
      highlights: splitList(formData.highlights),
      githubUrl: formData.githubUrl.trim() || null,
      liveUrl: formData.liveUrl.trim() || null,
      imageUrl: formData.imageUrl.trim() || null,
      status: formData.status.trim(),
      isFeatured: formData.isFeatured,
      isPublished: formData.isPublished,
      sortOrder: Number(formData.sortOrder) || 0,
    });

    if (!isEditMode) {
      setFormData(initialFormState);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Portfolio v2"
        />

        <FormField
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="portfolio-v2"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Full Stack Application"
        />

        <FormField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="In progress"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-white/70">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the project, its purpose and technical value..."
          className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-400/50 focus:bg-black/40"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label="Stack"
          name="stack"
          value={formData.stack}
          onChange={handleChange}
          placeholder="React, Express, PostgreSQL"
        />

        <FormField
          label="Highlights"
          name="highlights"
          value={formData.highlights}
          onChange={handleChange}
          placeholder="JWT Auth, Admin Dashboard"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <FormField
          label="GitHub URL"
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          placeholder="https://github.com/..."
        />

        <FormField
          label="Live URL"
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleChange}
          placeholder="https://..."
        />

        <FormField
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 sm:grid-cols-3">
        <label className="flex items-center gap-3 text-sm text-white/65">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="h-4 w-4 accent-amber-400"
          />
          Featured
        </label>

        <label className="flex items-center gap-3 text-sm text-white/65">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="h-4 w-4 accent-amber-400"
          />
          Published
        </label>

        <FormField
          label="Sort order"
          name="sortOrder"
          type="number"
          value={formData.sortOrder}
          onChange={handleChange}
          placeholder="10"
        />
      </div>

      {localError && (
        <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {localError}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isEditMode ? <FiSave /> : <FiPlusCircle />}
        {isSubmitting ? 'Saving...' : submitLabel || (isEditMode ? 'Save changes' : 'Create project')}
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
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-400/50 focus:bg-black/40"
      />
    </div>
  );
}