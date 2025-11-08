/**
 * Hero - Server component wrapper for the Hero section
 */

import { HeroClient } from './HeroClient';

export function Hero() {
  return (
    <section id="hero-section" aria-label="Hero section">
      <HeroClient />
    </section>
  );
}