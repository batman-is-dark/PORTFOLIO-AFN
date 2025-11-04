# Portfolio (Next.js App Router, TypeScript) — Scaffold

Baseline repository skeleton for a personal portfolio using Next.js App Router with strict TypeScript, ESLint, and Prettier.

## Prerequisites
- Node.js 18+ (includes npm)
- Recommended: VS Code + ESLint + Prettier extensions

## Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm start` — start production server
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript without emit
- `npm run format` — format with Prettier

## Structure
- App Router pages
  - `/` ([app/page.tsx](app/page.tsx))
  - `/about` ([app/about/page.tsx](app/about/page.tsx))
  - `/projects` ([app/projects/page.tsx](app/projects/page.tsx))
  - `/projects/[slug]` ([app/projects/[slug]/page.tsx](app/projects/[slug]/page.tsx))
  - `/writing` ([app/writing/page.tsx](app/writing/page.tsx))
  - `/contact` ([app/contact/page.tsx](app/contact/page.tsx))
  - `robots` ([app/robots.ts](app/robots.ts)) and `sitemap` ([app/sitemap.ts](app/sitemap.ts))
- Components: Header, Footer, SkipLink (with CSS Modules)
- Styles: global reset, tokens, theme hooks
- Lib: SEO constants, consent stubs, reduced-motion helper
- Types: basic content model
- Content stubs: `/content/projects`, `/content/writing`
- Public assets: `/public/images`, `/public/og/og-default.png`, `/public/models/README.txt`

## Notes
- Strict TypeScript enabled (`strict: true`, `moduleResolution: bundler`).
- ESLint: `next/core-web-vitals` + `jsx-a11y` recommended rules.
- Prettier with sensible defaults.
- No client-side JS required for baseline pages; pure SSR/SSG.
- ThemeToggle/ModeToggle components exist as placeholders and are not referenced yet.

## Getting Started
```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Roadmap (Out of scope for this scaffold)
- Design tokens expansion
- Media viewers, analytics
- Tests and CI
- Real content entries