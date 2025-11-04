import type { Project } from '../../types/content';
import { ProjectSchema } from '../../types/content';

import alpha from './alpha';
import beta from './beta';
import gamma from './gamma';
import delta from './delta';
import epsilon from './epsilon';
import zeta from './zeta';
import eta from './eta';
import theta from './theta';

const raw = [alpha, beta, gamma, delta, epsilon, zeta, eta, theta] as const;

export const projects: Project[] = raw.map((p) => {
  try {
    ProjectSchema.parse(p);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[content] Project schema validation failed for', p.slug, err);
    }
  }
  return p;
});

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}