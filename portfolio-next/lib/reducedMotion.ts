/**
 * CSS media query string for reduced motion preferences.
 * Useful for matching in CSS or future JS checks.
 */
export const PREFERS_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Returns true if the environment indicates reduced motion is preferred.
 * Server-safe: falls back to false when window/matchMedia are unavailable.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(PREFERS_REDUCED_MOTION_QUERY).matches;
}