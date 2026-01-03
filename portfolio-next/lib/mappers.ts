/**
 * Content mapping helpers for transforming content types into component props.
 * Server-only utilities.
 */

import type { Project } from '../types/content';
import type { CarouselItem } from '../types/ui';

/**
 * Maps a Project to a carousel item shape.
 */
export function toCarouselItem(p: Project): CarouselItem {
  return {
    id: p.slug,
    title: p.title,
    role: p.role,
    stack: p.stack,
    description: p.outcomes,
    image: p.reel?.poster,
  };
}