import type { Project } from '../../types/content';
import { ProjectSchema } from '../../types/content';

import { creditMateProject } from './credit-mate';
import { poliseeProject } from './polisee';
import { resilienceAIProject } from './resilience-ai';
import { digiAddictProject } from './digi-addict';
import { misinformationSimulatorProject } from './misinformation-simulator';
import { skinDiseaseProject } from './skin-disease-detection';

const raw = [
  skinDiseaseProject,
  creditMateProject,
  poliseeProject,
  resilienceAIProject,
  digiAddictProject,
  misinformationSimulatorProject
] as const;

export const projects: Project[] = raw.map((p) => {
  try {
    ProjectSchema.parse(p);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[content] Project schema validation failed for', p.slug, err);
    }
  }
  return p as Project;
});

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}