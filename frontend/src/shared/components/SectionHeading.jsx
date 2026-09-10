// frontend/src/shared/components/SectionHeading.jsx

/**
 * Bendras sekcijų antraštės komponentas.
 *
 * Naudosime Home, Projects, Contact ir vėliau Admin UI dalyse,
 * kad dizainas būtų vientisas ir nereikėtų kartoti tų pačių Tailwind klasių.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-amber-300/80">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-white/55 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}