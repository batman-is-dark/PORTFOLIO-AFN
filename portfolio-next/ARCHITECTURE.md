# Portfolio Architecture Specification

## Executive Summary

This specification defines a minimalist, high-performance Next.js developer portfolio with optional Reel and 3D project presentation modes. The architecture prioritizes Core Web Vitals compliance, WCAG 2.2 AA accessibility, and progressive enhancement with zero decorative effects (no particles, cursor trails, confetti, or emojis).

**Performance Targets:**
- LCP ≤ 2s on Fast 3G
- CLS < 0.1
- TTI ≤ 3s
- Main-thread JS < 100KB
- Lighthouse scores ≥ 95 across all categories

---

## 1. Information Architecture and Routing

### Route Structure

```
portfolio-next/app/
├── layout.tsx                 # Root layout with theme provider, skip link
├── page.tsx                   # Home (SSG)
├── about/page.tsx            # About (SSG)
├── projects/
│   ├── page.tsx              # Projects list (SSG with ISR, revalidate: 3600)
│   └── [slug]/page.tsx       # Project detail (SSG via generateStaticParams)
├── writing/
│   └── page.tsx              # Writing index (SSG with ISR, revalidate: 3600)
├── contact/page.tsx          # Contact (SSG)
├── robots.ts                 # Dynamic robots.txt
├── sitemap.ts                # Dynamic sitemap.xml
└── api/
    └── revalidate/route.ts   # On-demand ISR webhook
```

**Navigation Model:**
- [`Header.tsx`](portfolio-next/components/Header.tsx): Site-wide navigation with skip link target
- [`SkipLink.tsx`](portfolio-next/components/SkipLink.tsx): Jump to main content (#main-content)
- Logical tab order: Skip link → Header nav → Main content → Footer
- All routes server-rendered with static generation where possible

**generateStaticParams Strategy:**
- Project slugs: read from [`content/projects/*.ts`](portfolio-next/content/projects)
- ISR revalidation: 3600s for projects/writing, on-demand via webhook

---

## 2. Design System and Tokens

### CSS Variables Structure

**[`styles/tokens.css`](portfolio-next/styles/tokens.css)**
```css
:root {
  /* Typography scale (fluid, clamped) */
  --font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --font-size-sm: clamp(0.875rem, 0.85rem + 0.125vw, 1rem);
  --font-size-lg: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --font-size-xl: clamp(1.75rem, 1.5rem + 1vw, 2.5rem);
  --font-size-2xl: clamp(2.5rem, 2rem + 2vw, 4rem);
  --line-height-tight: 1.2;
  --line-height-base: 1.6;
  --line-height-loose: 1.8;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing scale (8px base) */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 4rem;
  --space-8: 6rem;

  /* Layout */
  --container-max: 1280px;
  --content-max: 65ch;
  --grid-gap: var(--space-4);

  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  /* Shadows (subtle) */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Z-index scale */
  --z-base: 0;
  --z-header: 100;
  --z-modal: 200;
  --z-skip-link: 300;

  /* Transitions (respect prefers-reduced-motion) */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0ms;
    --transition-base: 0ms;
    --transition-slow: 0ms;
  }
}
```

**[`styles/theme.css`](portfolio-next/styles/theme.css)**
```css
:root {
  color-scheme: light;
  
  /* Light theme colors (WCAG AA compliant) */
  --color-bg: hsl(0, 0%, 100%);
  --color-surface: hsl(0, 0%, 98%);
  --color-text: hsl(0, 0%, 10%);
  --color-text-muted: hsl(0, 0%, 40%);
  --color-primary: hsl(220, 90%, 50%);
  --color-primary-hover: hsl(220, 90%, 45%);
  --color-border: hsl(0, 0%, 88%);
  --color-focus: hsl(220, 90%, 50%);
}

[data-theme="dark"] {
  color-scheme: dark;
  
  /* Dark theme colors (WCAG AA compliant, 4.5:1 contrast) */
  --color-bg: hsl(0, 0%, 8%);
  --color-surface: hsl(0, 0%, 12%);
  --color-text: hsl(0, 0%, 95%);
  --color-text-muted: hsl(0, 0%, 65%);
  --color-primary: hsl(220, 90%, 60%);
  --color-primary-hover: hsl(220, 90%, 65%);
  --color-border: hsl(0, 0%, 22%);
  --color-focus: hsl(220, 90%, 60%);
}

/* Auto-detect system preference on first visit */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
    --color-bg: hsl(0, 0%, 8%);
    --color-surface: hsl(0, 0%, 12%);
    --color-text: hsl(0, 0%, 95%);
    --color-text-muted: hsl(0, 0%, 65%);
    --color-primary: hsl(220, 90%, 60%);
    --color-primary-hover: hsl(220, 90%, 65%);
    --color-border: hsl(0, 0%, 22%);
    --color-focus: hsl(220, 90%, 60%);
  }
}
```

**[`styles/globals.css`](portfolio-next/styles/globals.css)**
```css
@import './tokens.css';
@import './theme.css';

/* Modern CSS reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  overflow-x: hidden;
}

/* Focus styles (WCAG 2.2 AA) */
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* Skip to content link */
.skip-link {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  z-index: var(--z-skip-link);
  padding: var(--space-2) var(--space-3);
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-md);
  transform: translateY(-200%);
  transition: transform var(--transition-fast);
}

.skip-link:focus {
  transform: translateY(0);
}

/* Semantic landmarks */
main { display: block; }
article, aside, footer, header, nav, section { display: block; }

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

a {
  color: var(--color-primary);
  text-decoration: underline;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-primary-hover);
}

/* Utility classes */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.container {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-4);
}
```

**Theme Persistence:**
- Client-side hook in [`lib/useTheme.ts`](portfolio-next/lib/useTheme.ts)
- Reads `localStorage.getItem('theme')` and `matchMedia('(prefers-color-scheme: dark)')`
- Sets `<html data-theme="light|dark">`
- Inline script in [`layout.tsx`](portfolio-next/app/layout.tsx) to prevent FOUC

---

## 3. Component Architecture

### Shell Components

**[`components/Header.tsx`](portfolio-next/components/Header.tsx)**
- Site-wide navigation with current route indicator
- [`ThemeToggle`](portfolio-next/components/ThemeToggle.tsx) and [`ModeToggle`](portfolio-next/components/ModeToggle.tsx)
- Sticky positioning (z-index: var(--z-header))
- ARIA landmark: `<header role="banner">`
- CSS Module: [`Header.module.css`](portfolio-next/components/Header.module.css)

**[`components/Footer.tsx`](portfolio-next/components/Footer.tsx)**
- Copyright, social links, accessibility statement link
- ARIA landmark: `<footer role="contentinfo">`
- CSS Module: [`Footer.module.css`](portfolio-next/components/Footer.module.css)

**[`components/SkipLink.tsx`](portfolio-next/components/SkipLink.tsx)**
- `<a href="#main-content">Skip to content</a>`
- Positioned absolutely, visible on focus
- CSS Module: [`SkipLink.module.css`](portfolio-next/components/SkipLink.module.css)

**[`components/ThemeToggle.tsx`](portfolio-next/components/ThemeToggle.tsx)**
- Button with `aria-pressed`, updates `data-theme` on `<html>`
- Persists to `localStorage.setItem('theme', 'light|dark')`
- Icon: sun/moon SVG with `aria-hidden="true"`
- Accessible label: "Toggle theme"

**[`components/ModeToggle.tsx`](portfolio-next/components/ModeToggle.tsx)**
- Toggle between "Reel" / "3D" / "Default" modes
- Persists to `localStorage.setItem('viewerMode', 'reel|3d|default')`
- Radio buttons styled as segmented control
- `aria-label="Select project presentation mode"`
- CSS Module: [`ModeToggle.module.css`](portfolio-next/components/ModeToggle.module.css)

### Content Components

**[`components/Hero.tsx`](portfolio-next/components/Hero.tsx)**
- Large headline, subheadline, CTA buttons
- Props: `{ title, subtitle, cta?: { text, href } }`
- CSS Module: [`Hero.module.css`](portfolio-next/components/Hero.module.css)

**[`components/Grid.tsx`](portfolio-next/components/Grid.tsx)**
- CSS Grid layout with responsive columns
- Props: `{ children, columns?: 2 | 3 | 4, gap?: 'sm' | 'md' | 'lg' }`
- CSS Module: [`Grid.module.css`](portfolio-next/components/Grid.module.css)

**[`components/ProjectCard.tsx`](portfolio-next/components/ProjectCard.tsx)**
- Display: title, role, stack tags, excerpt, thumbnail
- Props: `{ project: Project, priority?: boolean }`
- Uses [`SmartImage`](portfolio-next/components/SmartImage.tsx) for thumbnail
- Link to [`/projects/[slug]`](portfolio-next/app/projects/[slug]/page.tsx)
- CSS Module: [`ProjectCard.module.css`](portfolio-next/components/ProjectCard.module.css)

**[`components/PostCard.tsx`](portfolio-next/components/PostCard.tsx)**
- Display: title, date, excerpt
- Props: `{ post: WritingPost }`
- CSS Module: [`PostCard.module.css`](portfolio-next/components/PostCard.module.css)

### Viewer Components

**[`components/viewers/ReelViewer.tsx`](portfolio-next/components/viewers/ReelViewer.tsx)**
- Vertical scroll-snap container for video sections
- IntersectionObserver to preload adjacent videos
- Keyboard: ArrowUp/Down, PageUp/Down
- Wheel: throttled scroll
- Videos: autoplay muted loop playsInline, hover/focus to unmute with `aria-live="polite"` announcement
- Pause on blur event
- `prefers-reduced-motion`: freeze to poster frames
- No-JS: renders static stack with posters
- Props: `{ assets: ReelAsset[], reducedMotion: boolean }`
- CSS Module: [`ReelViewer.module.css`](portfolio-next/components/viewers/ReelViewer.module.css)

**[`components/viewers/ThreeViewer.tsx`](portfolio-next/components/viewers/ThreeViewer.tsx)**
- React Three Fiber Canvas with single glTF model (Draco compressed)
- `devicePixelRatio` clamped to `Math.min(window.devicePixelRatio, 1.5)`
- OrbitControls: damping, limited polar/azimuth angles
- Baked lighting (no realtime lights)
- Dynamic import with SSR: `false`
- Fallback: [`ViewerFallback.tsx`](portfolio-next/components/viewers/ViewerFallback.tsx) renders static WebP with descriptive alt
- No-JS: `<noscript>` with fallback image
- Dispose resources on unmount
- Props: `{ modelSrc: string, fallbackSrc: string, altText: string }`
- CSS Module: [`ThreeViewer.module.css`](portfolio-next/components/viewers/ThreeViewer.module.css)

**[`components/viewers/ViewerFallback.tsx`](portfolio-next/components/viewers/ViewerFallback.tsx)**
- Static image with detailed alt text and ARIA description
- Props: `{ src: string, alt: string, description?: string }`
- CSS Module: [`ViewerFallback.module.css`](portfolio-next/components/viewers/ViewerFallback.module.css)

### Accessibility Component

**[`components/A11yAnnouncer.tsx`](portfolio-next/components/A11yAnnouncer.tsx)**
- Live region for dynamic announcements: `<div role="status" aria-live="polite" aria-atomic="true">`
- Used by viewers for state changes (e.g., "Video unmuted")
- CSS: `.visually-hidden` class

### Media Components

**[`components/SmartImage.tsx`](portfolio-next/components/SmartImage.tsx)**
- Wraps `next/image` with AVIF/WebP sources via `<picture>` if needed
- Responsive `sizes` attribute
- Blur placeholder: LQIP base64
- Props: `{ src, alt, width, height, priority?, sizes? }`
- CSS Module: [`SmartImage.module.css`](portfolio-next/components/SmartImage.module.css)

**[`components/SmartVideo.tsx`](portfolio-next/components/SmartVideo.tsx)**
- `<video>` with poster, preload policies
- Props: `{ src, poster, muted, autoplay, loop, playsInline, onUnmute?, a11yLabel }`
- CSS Module: [`SmartVideo.module.css`](portfolio-next/components/SmartVideo.module.css)

---

## 4. Data Model and Content Loading

### TypeScript Types

**[`types/content.ts`](portfolio-next/types/content.ts)**
```typescript
export interface Project {
  slug: string;
  title: string;
  role: string;
  timeframe: string;
  stack: string[];
  problem: string;
  approach: string;
  outcomes: string;
  impact?: string; // measurable metrics
  thumbnail: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  reelAssets?: ReelAsset[];
  threeAsset?: ThreeAsset;
  demoUrl?: string;
  codeUrl?: string;
}

export interface ReelAsset {
  type: 'video' | 'image';
  src: string;
  poster?: string;
  width: number;
  height: number;
  duration?: number; // seconds
  alt: string;
}

export interface ThreeAsset {
  modelSrc: string; // .glb path
  fallbackSrc: string; // WebP image
  altText: string;
  description?: string;
}

export interface WritingPost {
  slug: string;
  title: string;
  date: string; // ISO 8601
  excerpt: string;
  content: string; // MDX or markdown
  tags?: string[];
}
```

### Content Source

**[`content/projects/*.ts`](portfolio-next/content/projects)**
- Each project as a TS module exporting `Project` object
- Example: [`content/projects/energy-predictor.ts`](portfolio-next/content/projects/energy-predictor.ts)

**[`content/writing/*.ts`](portfolio-next/content/writing)**
- Each post as TS module exporting `WritingPost`

**Content Utilities:**
- [`lib/content.ts`](portfolio-next/lib/content.ts): `getAllProjects()`, `getProjectBySlug(slug)`, `getAllWriting()`
- Uses dynamic imports to load content modules
- Returns sorted arrays (projects by date, writing by date desc)

**Static Generation:**
```typescript
// portfolio-next/app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export const revalidate = 3600; // ISR: 1 hour
```

---

## 5. Viewer Specifications

### Reel Viewer

**Implementation:** [`components/viewers/ReelViewer.tsx`](portfolio-next/components/viewers/ReelViewer.tsx)

**Behavior:**
1. **Scroll-Snap:** CSS `scroll-snap-type: y mandatory` on container, `scroll-snap-align: start` on sections
2. **Preloading:** IntersectionObserver on each section, preload poster and first 5s of adjacent videos when section is 50% visible
3. **Keyboard Navigation:**
   - ArrowDown / PageDown: scroll to next section
   - ArrowUp / PageUp: scroll to previous section
   - Home / End: scroll to first / last section
4. **Wheel Navigation:** Throttled (300ms) to prevent jank
5. **Video Policies:**
   - Autoplay muted loop playsInline on section enter
   - Hover or focus on video: unmute with `aria-live="polite"` announcement via [`A11yAnnouncer`](portfolio-next/components/A11yAnnouncer.tsx)
   - Blur: pause video
6. **Reduced Motion:**
   - If `prefers-reduced-motion: reduce`, videos freeze to poster frames
   - Scroll-snap remains, but no autoplay
7. **No-JS Fallback:**
   - Server-renders static vertical stack with `<img>` posters and `alt` text
   - Functional scrolling without JavaScript

**CSS Module:** [`ReelViewer.module.css`](portfolio-next/components/viewers/ReelViewer.module.css)
- Scroll-snap properties
- Reduced-motion media queries
- Transition tokens from `globals.css`

---

### 3D Viewer

**Implementation:** [`components/viewers/ThreeViewer.tsx`](portfolio-next/components/viewers/ThreeViewer.tsx)

**Behavior:**
1. **Model Loading:**
   - Single Draco-compressed glTF from [`public/models/scene.glb`](portfolio-next/public/models/scene.glb)
   - Baked lighting (no realtime lights to save perf)
   - `useGLTF` from `@react-three/drei` with `draco` loader
2. **Performance:**
   - `devicePixelRatio` clamped: `Math.min(window.devicePixelRatio, 1.5)`
   - OrbitControls with damping, limited polar (10°-170°) and azimuth (±90°) angles
   - Dispose geometry/materials on unmount
3. **SSR Fallback:**
   - Dynamic import with `ssr: false`
   - Fallback component renders [`ViewerFallback.tsx`](portfolio-next/components/viewers/ViewerFallback.tsx) with static image
4. **No-JS:**
   - `<noscript>` tag with `<img src={fallbackSrc} alt={altText} />`
5. **Lazy Load:**
   - Component loaded on `requestIdleCallback` or when project detail page is visible
   - Prefetch model on idle if user has selected "3D" mode in [`ModeToggle`](portfolio-next/components/ModeToggle.tsx)

**CSS Module:** [`ThreeViewer.module.css`](portfolio-next/components/viewers/ThreeViewer.module.css)
- Canvas sizing, aspect ratio
- Fallback styling

**Dependencies:**
- `three` (peer dependency)
- `@react-three/fiber`
- `@react-three/drei` (OrbitControls, useGLTF)

---

## 6. Performance Plan

### Fonts
- **System Stack First:** `font-family: system-ui, -apple-system, 'Segoe UI', sans-serif`
- **Optional Variable Font:** Single woff2 file, self-hosted in [`public/fonts/`](portfolio-next/public/fonts)
- **Preload Critical:** `<link rel="preload" as="font" type="font/woff2" crossorigin>`
- **Font Display:** `font-display: swap`

### Images
- **Next.js Image:** All images via [`next/image`](https://nextjs.org/docs/api-reference/next/image) or [`SmartImage`](portfolio-next/components/SmartImage.tsx)
- **Formats:** AVIF with WebP fallback (Next.js auto-converts)
- **Responsive Srcset:** `sizes` attribute for viewport-based sizing
- **Blur Placeholder:** LQIP base64 for CLS prevention
- **Priority:** `priority` prop on hero LCP image

### Preconnect and Preload
- Preconnect critical origins (analytics, fonts if external)
- Preload critical CSS via Next.js automatic inlining
- Prefetch project data on projects index page hover

### Code Splitting
- Route-level automatic by Next.js App Router
- Dynamic imports for heavy components (3D viewer, reel viewer)
- Tree-shake R3F: import only used Drei components

### Non-Critical Hydration
- `requestIdleCallback` for optional interactive controls (theme/mode toggles)
- Defer analytics script until consent

### Budgets
- **Main-thread JS:** < 100KB (gzipped)
- **Critical CSS:** < 30KB (inlined in `<head>`)
- **Lighthouse CI Thresholds:** ≥ 95 for Performance, Accessibility, Best Practices, SEO

**Monitoring:**
- CI step: Lighthouse CI on production build
- Performance budget enforcement in [`lighthouserc.json`](portfolio-next/lighthouserc.json)

---

## 7. Accessibility Plan

### WCAG 2.2 AA Compliance

**Focus Management:**
- `:focus-visible` outlines (3px solid, 2px offset)
- Skip link to `#main-content`
- Logical tab order: Header → Main → Footer

**Keyboard Operability:**
- All interactive elements reachable via Tab
- Viewer keyboard controls (arrows, PageUp/Down)
- Escape to close modals/dialogs

**Semantic HTML:**
- `<header role="banner">`, `<main id="main-content">`, `<footer role="contentinfo">`
- `<nav aria-label="Main navigation">`
- Headings hierarchy (h1 → h2 → h3)

**ARIA:**
- `aria-label` on icon buttons (ThemeToggle, ModeToggle)
- `aria-pressed` for toggle states
- `aria-live="polite"` for dynamic announcements (video unmute)
- `aria-describedby` for complex 3D fallback descriptions

**Color Contrast:**
- All text ≥ 4.5:1 against background
- Focus indicators ≥ 3:1 against adjacent colors

**Motion Alternatives:**
- Respect `prefers-reduced-motion: reduce`
- Reel viewer: freeze to posters
- 3D viewer: optional, not required for content access
- CSS transitions set to 0ms when reduced motion preferred

**Media Accessibility:**
- Video captions or transcripts if narration present
- Alt text for all images
- Descriptive labels for 3D fallbacks

**Testing:**
- Axe DevTools in CI via Playwright
- Manual keyboard navigation tests
- Screen reader testing (NVDA, JAWS, VoiceOver)

**CI Integration:**
- Axe checks in Playwright E2E tests: [`__tests__/a11y.spec.ts`](portfolio-next/__tests__/a11y.spec.ts)
- Lighthouse Accessibility score ≥ 95

---

## 8. SEO Plan

### Metadata

**Route-Level Metadata:** Each page exports `generateMetadata()` function

**[`app/layout.tsx`](portfolio-next/app/layout.tsx):**
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://yourportfolio.com'),
  title: {
    default: 'Your Name - Developer Portfolio',
    template: '%s | Your Name'
  },
  description: 'Minimalist developer portfolio showcasing projects...',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourportfolio.com',
    siteName: 'Your Name Portfolio',
    images: [{ url: '/og/og-default.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourhandle',
    creator: '@yourhandle'
  }
};
```

**Project Detail Pages:** Per-project Open Graph images from [`public/og/project-{slug}.png`](portfolio-next/public/og)

### Structured Data

**JSON-LD:**
- [`lib/seo.ts`](portfolio-next/lib/seo.ts): helper functions for Person, CreativeWork schemas
- Injected via `<script type="application/ld+json">` in layout and project pages

**Example Person Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "jobTitle": "Full-Stack Developer",
  "url": "https://yourportfolio.com",
  "sameAs": [
    "https://github.com/yourhandle",
    "https://linkedin.com/in/yourhandle"
  ]
}
```

**Example CreativeWork Schema (Project):**
```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Project Title",
  "creator": { "@type": "Person", "name": "Your Name" },
  "dateCreated": "2024-01-01",
  "description": "Project description...",
  "keywords": ["Next.js", "React", "TypeScript"]
}
```

### Sitemap and Robots

**[`app/robots.ts`](portfolio-next/app/robots.ts):**
```typescript
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://yourportfolio.com/sitemap.xml'
  };
}
```

**[`app/sitemap.ts`](portfolio-next/app/sitemap.ts):**
```typescript
export default async function sitemap() {
  const projects = await getAllProjects();
  const projectUrls = projects.map(p => ({
    url: `https://yourportfolio.com/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  return [
    { url: 'https://yourportfolio.com', lastModified: new Date(), priority: 1 },
    { url: 'https://yourportfolio.com/about', priority: 0.9 },
    { url: 'https://yourportfolio.com/projects', priority: 0.9 },
    { url: 'https://yourportfolio.com/writing', priority: 0.8 },
    { url: 'https://yourportfolio.com/contact', priority: 0.7 },
    ...projectUrls
  ];
}
```

### Social Images

- Default: [`public/og/og-default.png`](portfolio-next/public/og/og-default.png) (1200×630)
- Per-project: [`public/og/project-{slug}.png`](portfolio-next/public/og)

---

## 9. Analytics and Consent

### Privacy-Friendly Analytics

**Provider:** Plausible or Umami (lightweight, GDPR-compliant)

**Implementation:**
- Script loaded only after user consent
- [`components/ConsentBanner.tsx`](portfolio-next/components/ConsentBanner.tsx): banner with Accept/Decline buttons
- Consent state persisted in `localStorage.setItem('analytics-consent', 'granted|denied')`
- Honor Do Not Track header

**[`lib/consent.ts`](portfolio-next/lib/consent.ts):**
```typescript
export function getConsentStatus(): 'granted' | 'denied' | null {
  if (typeof window === 'undefined') return null;
  if (navigator.doNotTrack === '1') return 'denied';
  return localStorage.getItem('analytics-consent') as 'granted' | 'denied' | null;
}

export function setConsentStatus(status: 'granted' | 'denied') {
  localStorage.setItem('analytics-consent', status);
  if (status === 'granted') loadAnalytics();
}

function loadAnalytics() {
  // Inject Plausible or Umami script
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://plausible.io/js/script.js';
  script.dataset.domain = 'yourportfolio.com';
  document.head.appendChild(script);
}
```

**ConsentBanner:**
- Appears on first visit if consent not set
- Dismissible, persists choice
- Accessible: `role="dialog"`, `aria-labelledby`, `aria-describedby`

---

## 10. Testing and CI

### Unit Tests

**Framework:** Vitest + React Testing Library

**Location:** [`__tests__/unit/`](portfolio-next/__tests__/unit)

**Coverage:**
- Component rendering (Hero, Grid, ProjectCard, etc.)
- Theme toggle state management
- Consent logic in [`lib/consent.ts`](portfolio-next/lib/consent.ts)
- Content utilities in [`lib/content.ts`](portfolio-next/lib/content.ts)

**Example:** [`__tests__/unit/ThemeToggle.test.tsx`](portfolio-next/__tests__/unit/ThemeToggle.test.tsx)

### Integration/E2E Tests

**Framework:** Playwright

**Location:** [`__tests__/e2e/`](portfolio-next/__tests__/e2e)

**Scenarios:**
- Navigation: all routes accessible, back/forward buttons work
- Viewer toggle: mode persists across page reloads
- Lazy loading: images/videos load on scroll
- Keyboard operability: tab order, skip link, viewer controls
- Reduced motion: videos freeze when `prefers-reduced-motion: reduce`
- No-JS: content accessible without JavaScript

**Accessibility Tests:**
- Axe checks on all pages: [`__tests__/e2e/a11y.spec.ts`](portfolio-next/__tests__/e2e/a11y.spec.ts)
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations on homepage', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

### Linting and Type Checking

**ESLint:**
- `@typescript-eslint` rules (strict)
- `eslint-plugin-jsx-a11y` for accessibility linting
- `eslint-config-next`

**Prettier:** Code formatting

**TypeScript:** Strict mode enabled in [`tsconfig.json`](portfolio-next/tsconfig.json)

### CI Workflow

**File:** [`portfolio-next/.github/workflows/ci.yml`](portfolio-next/.github/workflows/ci.yml)

**Steps:**
1. Checkout code
2. Setup Node.js (matrix: LTS versions)
3. Install dependencies (`npm ci`)
4. Type check (`tsc --noEmit`)
5. Lint (`npm run lint`)
6. Unit tests (`npm test`)
7. Build production (`npm run build`)
8. E2E tests (Playwright headless)
9. Lighthouse CI (thresholds ≥ 95)

**Lighthouse CI Config:** [`lighthouserc.json`](portfolio-next/lighthouserc.json)
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000", "http://localhost:3000/projects"],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.95}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.95}]
      }
    }
  }
}
```

---

## 11. File and Folder Structure

```
portfolio-next/
├── .github/
│   └── workflows/
│       └── ci.yml                  # CI pipeline
├── __tests__/
│   ├── unit/                       # Vitest unit tests
│   │   ├── ThemeToggle.test.tsx
│   │   ├── content.test.ts
│   │   └── consent.test.ts
│   └── e2e/                        # Playwright E2E tests
│       ├── navigation.spec.ts
│       ├── viewer-toggle.spec.ts
│       ├── lazy-load.spec.ts
│       └── a11y.spec.ts
├── app/
│   ├── layout.tsx                  # Root layout, theme provider
│   ├── page.tsx                    # Home page
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx                # Projects index
│   │   └── [slug]/
│   │       └── page.tsx            # Project detail
│   ├── writing/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts            # ISR webhook
│   ├── robots.ts                   # Dynamic robots.txt
│   └── sitemap.ts                  # Dynamic sitemap.xml
├── components/
│   ├── Header.tsx
│   ├── Header.module.css
│   ├── Footer.tsx
│   ├── Footer.module.css
│   ├── SkipLink.tsx
│   ├── SkipLink.module.css
│   ├── ThemeToggle.tsx
│   ├── ModeToggle.tsx
│   ├── ModeToggle.module.css
│   ├── Hero.tsx
│   ├── Hero.module.css
│   ├── Grid.tsx
│   ├── Grid.module.css
│   ├── ProjectCard.tsx
│   ├── ProjectCard.module.css
│   ├── PostCard.tsx
│   ├── PostCard.module.css
│   ├── SmartImage.tsx
│   ├── SmartImage.module.css
│   ├── SmartVideo.tsx
│   ├── SmartVideo.module.css
│   ├── ConsentBanner.tsx
│   ├── ConsentBanner.module.css
│   ├── A11yAnnouncer.tsx
│   └── viewers/
│       ├── ReelViewer.tsx
│       ├── ReelViewer.module.css
│       ├── ThreeViewer.tsx
│       ├── ThreeViewer.module.css
│       ├── ViewerFallback.tsx
│       └── ViewerFallback.module.css
├── content/
│   ├── projects/
│   │   ├── energy-predictor.ts
│   │   ├── gan-art-series.ts
│   │   └── ml-interpretability.ts
│   └── writing/
│       ├── post-one.ts
│       └── post-two.ts
├── lib/
│   ├── content.ts                  # Content loading utilities
│   ├── seo.ts                      # JSON-LD helpers
│   ├── consent.ts                  # Analytics consent logic
│   ├── reducedMotion.ts            # Reduced motion detection
│   └── useTheme.ts                 # Theme hook
├── public/
│   ├── fonts/                      # Self-hosted fonts (optional)
│   ├── images/
│   │   ├── three-fallback.webp
│   │   └── ...
│   ├── models/
│   │   └── scene.glb               # Draco-compressed 3D model
│   └── og/
│       ├── og-default.png
│       └── project-*.png
├── styles/
│   ├── globals.css                 # Reset, focus styles, utilities
│   ├── tokens.css                  # Design tokens
│   └── theme.css                   # Light/dark themes
├── types/
│   └── content.ts                  # TypeScript interfaces
├── .eslintrc.json
├── .prettierrc
├── lighthouserc.json               # Lighthouse CI config
├── next.config.ts
├── package.json
├── playwright.config.ts
├── README.md
├── tsconfig.json
└── vitest.config.ts
```

---

## 12. Dependencies

**Core:**
- `next` (latest App Router)
- `react`, `react-dom`
- `typescript`

**3D Rendering (optional):**
- `three`
- `@react-three/fiber`
- `@react-three/drei`

**Utilities:**
- `clsx` (classname utility)
- `zod` (runtime validation)

**Analytics:**
- Plausible or Umami (script via CDN, no package needed)

**Testing:**
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@playwright/test`
- `@axe-core/playwright`

**Linting:**
- `eslint`
- `eslint-config-next`
- `eslint-plugin-jsx-a11y`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `prettier`

**CI:**
- `@lhci/cli` (Lighthouse CI)

**Types:**
- `@types/react`
- `@types/react-dom`
- `@types/three`

---

## 13. Implementation Roadmap

### Phase 1: Foundation (Week 1)
1. Scaffold Next.js project with TypeScript
2. Configure ESLint, Prettier, tsconfig (strict mode)
3. Set up CI workflow skeleton ([`.github/workflows/ci.yml`](portfolio-next/.github/workflows/ci.yml))

### Phase 2: Design System (Week 1)
4. Create design tokens ([`styles/tokens.css`](portfolio-next/styles/tokens.css))
5. Implement theme system ([`styles/theme.css`](portfolio-next/styles/theme.css), [`lib/useTheme.ts`](portfolio-next/lib/useTheme.ts))
6. Build global styles and reset ([`styles/globals.css`](portfolio-next/styles/globals.css))
7. Implement [`ThemeToggle`](portfolio-next/components/ThemeToggle.tsx) with localStorage persistence

### Phase 3: Layout and Navigation (Week 2)
8. Build root layout ([`app/layout.tsx`](portfolio-next/app/layout.tsx)) with skip link, theme provider
9. Create [`Header`](portfolio-next/components/Header.tsx), [`Footer`](portfolio-next/components/Footer.tsx), [`SkipLink`](portfolio-next/components/SkipLink.tsx)
10. Implement [`ModeToggle`](portfolio-next/components/ModeToggle.tsx) with localStorage

### Phase 4: Content Model (Week 2)
11. Define TypeScript types ([`types/content.ts`](portfolio-next/types/content.ts))
12. Create sample content (2-3 projects, 2 writing posts in [`content/`](portfolio-next/content))
13. Build content utilities ([`lib/content.ts`](portfolio-next/lib/content.ts))

### Phase 5: Core Pages (Week 3)
14. Implement Home page ([`app/page.tsx`](portfolio-next/app/page.tsx)) with [`Hero`](portfolio-next/components/Hero.tsx)
15. Build Projects index ([`app/projects/page.tsx`](portfolio-next/app/projects/page.tsx)) with [`Grid`](portfolio-next/components/Grid.tsx), [`ProjectCard`](portfolio-next/components/ProjectCard.tsx)
16. Create Project detail ([`app/projects/[slug]/page.tsx`](portfolio-next/app/projects/[slug]/page.tsx))
17. Implement About, Writing, Contact pages

### Phase 6: Viewers (Week 4)
18. Build [`ReelViewer`](portfolio-next/components/viewers/ReelViewer.tsx) with scroll-snap, keyboard, IntersectionObserver
19. Implement [`SmartVideo`](portfolio-next/components/SmartVideo.tsx) with policies
20. Create [`ThreeViewer`](portfolio-next/components/viewers/ThreeViewer.tsx) with R3F, OrbitControls, SSR fallback
21. Add [`ViewerFallback`](portfolio-next/components/viewers/ViewerFallback.tsx), no-JS `<noscript>`
22. Integrate viewers into project detail page based on `viewerMode`

### Phase 7: Media Optimization (Week 5)
23. Implement [`SmartImage`](portfolio-next/components/SmartImage.tsx) with next/image, AVIF/WebP
24. Add blur placeholders (LQIP)
25. Configure `priority` on hero LCP image
26. Preconnect critical origins in layout

### Phase 8: SEO (Week 5)
27. Add metadata to all routes (generateMetadata)
28. Implement [`robots.ts`](portfolio-next/app/robots.ts), [`sitemap.ts`](portfolio-next/app/sitemap.ts)
29. Create JSON-LD helpers ([`lib/seo.ts`](portfolio-next/lib/seo.ts))
30. Generate social images ([`public/og/`](portfolio-next/public/og))

### Phase 9: Analytics and Consent (Week 6)
31. Build [`ConsentBanner`](portfolio-next/components/ConsentBanner.tsx)
32. Implement consent logic ([`lib/consent.ts`](portfolio-next/lib/consent.ts))
33. Integrate Plausible/Umami script (gated by consent)

### Phase 10: Testing (Week 6-7)
34. Write unit tests (Vitest) for components and utilities
35. Write E2E tests (Playwright): navigation, viewer toggle, lazy-load, keyboard
36. Add Axe accessibility checks
37. Configure Lighthouse CI with thresholds

### Phase 11: Performance Optimization (Week 7)
38. Audit bundle size, tree-shake R3F
39. Defer non-critical hydration (`requestIdleCallback`)
40. Clamp DPR for 3D viewer
41. Verify budgets (JS < 100KB, CSS < 30KB)
42. Run Lighthouse on Fast 3G throttle

### Phase 12: Documentation and Deployment (Week 8)
43. Write [`README.md`](portfolio-next/README.md) with setup, scripts, deployment steps
44. Document design tokens and theming
45. Add instructions to extend project catalog
46. Deploy to Vercel/Netlify with environment variables
47. Run final CI checks

---

## 14. Acceptance Criteria

### Performance
- [ ] LCP ≤ 2s on Fast 3G throttle (Lighthouse)
- [ ] CLS < 0.1 across all pages
- [ ] TTI ≤ 3s on Fast 3G
- [ ] Main-thread blocking JS < 100KB (gzipped)
- [ ] Lighthouse scores ≥ 95 in all categories (CI enforced)

### Accessibility
- [ ] All routes keyboard-navigable with visible focus
- [ ] Skip link functional
- [ ] Logical tab order maintained
- [ ] Color contrast ≥ 4.5:1 for all text
- [ ] `prefers-reduced-motion` honored (videos freeze, transitions disabled)
- [ ] Axe checks pass with zero violations

### Functionality
- [ ] Viewer mode toggle persists across sessions
- [ ] Reel viewer: keyboard/wheel navigation works
- [ ] 3D viewer: loads with SSR fallback, no-JS renders static image
- [ ] Theme toggle persists and syncs with system preference
- [ ] No-JS: all content accessible (functional degradation)

### SEO
- [ ] All routes have unique titles, descriptions, Open Graph metadata
- [ ] Sitemap and robots.txt present and valid
- [ ] JSON-LD structured data (Person, CreativeWork) validates
- [ ] Social images (1200×630) present for default and per-project

### Analytics
- [ ] Analytics script loads only after consent granted
- [ ] Do Not Track honored
- [ ] Consent persists in localStorage

### Testing
- [ ] Unit tests pass for all critical components
- [ ] E2E tests cover navigation, viewer toggle, lazy-load, keyboard
- [ ] Accessibility tests (Axe) pass in CI
- [ ] Lighthouse CI enforces thresholds ≥ 95

### Documentation
- [ ] README includes setup, dev scripts, build, deployment instructions
- [ ] Design tokens documented
- [ ] Instructions to add new projects without layout changes

---

## Summary

This architecture specification delivers a **minimalist, typographic, grid-first developer portfolio** built with Next.js App Router and TypeScript. It includes:

- **Optional Reel and 3D viewers** with persisted user toggle and full accessibility
- **Design token system** with light/dark themes synced to system preferences
- **Performance-first approach** meeting Core Web Vitals targets (LCP ≤2s, CLS <0.1, TTI ≤3s)
- **WCAG 2.2 AA compliance** with keyboard operability, focus management, reduced-motion support
- **SEO optimization** with structured data, Open Graph, sitemaps, and social images
- **Privacy-friendly analytics** with consent management and Do Not Track support
- **Comprehensive testing** (unit, E2E, accessibility) and CI pipeline with Lighthouse thresholds

The specification uses exact file paths for all artifacts, making it implementation-ready for a development team. All requirements from the original task are addressed with concise technical detail.
