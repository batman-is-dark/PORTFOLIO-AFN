/**
 * Content model types and validators for projects and writing posts.
 * Keep fields compact; expand as needs evolve.
 *
 * TODO: metrics (views, stars, CTR), richer media fields, durations, i18n, image metadata.
 */

import { z } from 'zod';

/* ---------- Reel assets (video showreel snippets) ---------- */

export const ReelSourceSchema = z.object({
  src: z.string().min(1),
  type: z.string().min(1),
});
export type ReelSource = z.infer<typeof ReelSourceSchema>;

export const ReelAssetSchema = z.object({
  poster: z.string().min(1),
  sources: z.array(ReelSourceSchema).nonempty(),
  width: z.number().positive(),
  height: z.number().positive(),
  durationSec: z.number().positive().optional(), // TODO: derive from media when available
});
export type ReelAsset = z.infer<typeof ReelAssetSchema>;

/* ---------- Three.js assets (interactive models) ---------- */

export const ThreeAssetSchema = z.object({
  model: z.string().min(1),
  draco: z.boolean().optional(),
  fallbackImage: z.string().min(1),
  width: z.number().positive(),
  height: z.number().positive(),
  alt: z.string().min(1),
});
export type ThreeAsset = z.infer<typeof ThreeAssetSchema>;

/* ---------- External links ---------- */

export const ExternalLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});
export type ExternalLink = z.infer<typeof ExternalLinkSchema>;

/* ---------- Project ---------- */

export const ProjectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  role: z.string().min(1),
  timeframe: z.string().min(1),
  stack: z.array(z.string()),
  problem: z.string().min(1),
  approach: z.string().min(1),
  outcomes: z.string().min(1),
  impact: z.string().min(1),
  reel: ReelAssetSchema.nullable().optional(),
  three: ThreeAssetSchema.nullable().optional(),
  links: z.array(ExternalLinkSchema).optional(),
  featured: z.boolean().optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

/* ---------- Writing post ---------- */

export const WritingPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  dateISO: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), { message: 'Invalid ISO date' }),
  tags: z.array(z.string()),
  url: z.string().url(),
});
export type WritingPost = z.infer<typeof WritingPostSchema>;