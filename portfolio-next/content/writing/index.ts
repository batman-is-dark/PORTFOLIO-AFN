import type { WritingPost } from '../../types/content';
import { WritingPostSchema } from '../../types/content';

import postTypography from './post-typography';
import postA11y from './post-a11y';

const raw = [postTypography, postA11y] as const;

export const posts: WritingPost[] = raw.map((p) => {
  try {
    WritingPostSchema.parse(p);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[content] WritingPost schema validation failed for', p.slug, err);
    }
  }
  return p;
});

export function allPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getPostBySlug(slug: string): WritingPost | undefined {
  return posts.find((p) => p.slug === slug);
}