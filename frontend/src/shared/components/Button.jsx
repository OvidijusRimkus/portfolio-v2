// frontend/src/shared/components/Button.jsx

/**
 * Universalus Button / Link komponentas.
 *
 * Jeigu perduodame href — renderiname <a>.
 * Jeigu href nėra — renderiname <button>.
 *
 * variant:
 * - primary: auksinis pagrindinis CTA
 * - secondary: glassmorphism mygtukas
 * - ghost: minimalus tekstinis mygtukas
 */
const variants = {
  primary:
    'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_40px_rgba(251,191,36,0.18)]',
  secondary:
    'border border-white/10 bg-white/[0.04] text-white hover:border-amber-400/50 hover:bg-white/[0.07]',
  ghost: 'border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.04]',
};

export function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  className = '',
  target,
  rel,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200';

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}