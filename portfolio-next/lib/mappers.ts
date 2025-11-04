/**
 * Content mapping helpers for transforming content types into component props.
 * Server-only utilities.
 */

import type { Project } from '../types/content';

export interface CarouselItem {
  slug: string;
  title: string;
  role: string;
  timeframe: string;
  stack: string[];
  summary: string;
}

/**
 * Maps a Project to a carousel item shape.
 * Uses outcomes field as the summary.
 */
export function toCarouselItem(p: Project): CarouselItem {
  return {
    slug: p.slug,
    title: p.title,
    role: p.role,
    timeframe: p.timeframe,
    stack: p.stack,
    summary: p.outcomes,
  };
}