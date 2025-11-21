import type { Project } from '../../types/content';
import { ProjectSchema } from '../../types/content';

import skinDisease from './skin-disease';
import environmentalAnalysis from './environmental-analysis';
import robotFish from './robot-fish';

const raw = [skinDisease, environmentalAnalysis, robotFish] as const;

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