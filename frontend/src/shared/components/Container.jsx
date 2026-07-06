// frontend/src/shared/components/Container.jsx

/**
 * Container komponentas suvienodina puslapio plotį.
 *
 * Vietoje to, kad kiekvienoje sekcijoje kartotume tas pačias Tailwind klases,
 * naudojame vieną bendrą layout komponentą.
 */
export function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}