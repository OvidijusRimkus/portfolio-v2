// frontend/src/shared/components/Container.jsx

/**
 * Container komponentas suvienodina puslapio plotį.
 *
 * Kodėl naudinga?
 * Vietoje to, kad kiekvienoje sekcijoje rašytume:
 * mx-auto max-w-7xl px-6 sm:px-10 lg:px-16
 *
 * Naudojame vieną bendrą komponentą.
 */
export function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}