// frontend/src/features/home/components/TechBadge.jsx

/**
 * Mažas technologijos badge komponentas.
 *
 * Naudosime ne tik Hero sekcijoje,
 * bet vėliau ir Tech Stack / Projects dalyse.
 */
export function TechBadge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/45 backdrop-blur-xl">
      {children}
    </span>
  );
}