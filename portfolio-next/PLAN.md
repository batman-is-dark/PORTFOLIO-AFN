# Portfolio Redesign Plan

This document outlines the phased plan to redesign the Next.js portfolio application.

## Phase 1: Setup and Theming

### 1.1: Dependency Plan

**Runtime Dependencies:**
```
tailwindcss postcss autoprefixer framer-motion embla-carousel-react three @react-three/fiber @react-three/drei
```

**Development Dependencies:**
```
vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test @types/three eslint-plugin-jsx-a11y
```

**Installation Commands (Windows CMD):**
Run these from the `portfolio-next` directory.

*Install Runtime Dependencies:*
```bash
npm install tailwindcss postcss autoprefixer framer-motion embla-carousel-react three @react-three/fiber @react-three/drei
```

*Install Development Dependencies:*
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test @types/three eslint-plugin-jsx-a11y
```

### 1.2: Tailwind CSS Configuration

**1. Create `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        grotesk: ['var(--font-space-grotesk)'],
      },
    },
  },
  plugins: [],
};
```

**2. Create `postcss.config.js`:**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**3. Update `styles/globals.css`:**
Replace the content of `styles/globals.css` with the following. This integrates Tailwind's base styles and defines the color theme using CSS variables.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-background: #0B1120;
    --color-surface: #111827;
    --color-primary: #06B6D4;
    --color-secondary: #7C3AED;
    --color-accent: #D6C3A5;
    --color-text-primary: #E5E7EB;
    --color-text-secondary: #94A3B8;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
  }
}
```

### 1.3: Next.js Image Configuration

Update `portfolio-next/next.config.mjs` to allow remote images from Unsplash and Pexels.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
```

### 1.4: Fonts and Layout

Update `portfolio-next/app/layout.tsx` to load the Inter and Space Grotesk fonts and set the default dark mode.

```tsx
import { Inter, Space_Grotesk } from 'next/font/google';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkipLink from '../components/SkipLink';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

---

## Phase 2: Core Component & Section Implementation

This phase focuses on building the reusable UI components and the main sections of the portfolio.

### 2.1: UI Primitives (Component Architecture)

Create the following stateless, styled, and accessible UI components in `portfolio-next/components/ui/`.

**1. `components/ui/Button.tsx`**
- **Props:** `variant ('primary' | 'secondary')`, `as ('button' | 'a')`, standard button/anchor attributes.
- **Styling:** Use `clsx` to apply Tailwind classes for different variants.
- **Accessibility:** Renders a `button` or `a` tag as specified. Forwards `ref`.

**2. `components/ui/Card.tsx`**
- **Props:** `children`, `className`.
- **Styling:** A flexible container with a subtle border, rounded corners, and a background color of `var(--color-surface)`.

**3. `components/ui/Badge.tsx`**
- **Props:** `children`, `className`.
- **Styling:** Small, pill-shaped element for displaying skills or tags.

### 2.2: Section Implementations (File Map)

**1. Hero Section: `app/(sections)/Hero.tsx`**
- **Component:** A server component that contains the main value proposition and CTAs.
- **Animation:** Use Framer Motion on client-side sub-components for subtle text and button animations on page load.
- **Content:** Admission-focused value statement, "View Projects" and "Download CV" buttons.

**2. Projects Carousel: `components/ProjectsCarousel/ProjectsCarousel.tsx`**
- **Component:** A client component (`'use client'`).
- **Library:** Use `embla-carousel-react`.
- **Features:**
    - Continuous loop.
    - Autoplay with a 5-second interval, pausing on hover.
    - Keyboard navigable (arrow keys).
    - Touch and drag support.
- **Data:** Fetches project data from `content/projects/index.ts`. Each slide will be a `Card` component displaying project title, a brief description, and a link to the case study.
- **Content Update:** Augment `content/projects/index.ts` to include 6-8 projects, each with a `problem`, `approach`, `impact`, `tools` fields, and an image URL from Unsplash/Pexels.

**3. 3D Portfolio Scene: `app/(sections)/ThreeSection.tsx` and `components/three/ThreeScene.tsx`**
- **`app/(sections)/ThreeSection.tsx` (Server Component):**
    - Dynamically imports `ThreeScene` with `ssr: false`.
    - Provides a fallback loading skeleton or a static placeholder image (e.g., `public/images/3d-fallback.png`).
- **`components/three/ThreeScene.tsx` (Client Component):**
    - Renders a lightweight `three.js` scene using `@react-three/fiber` and `@react-three/drei`.
    - **Scene Idea:** An interactive network graph of skills and projects, or a simple, elegant glTF model representing AI.
    - **Controls:** Use `<OrbitControls />` from `@react-three/drei`.
    - **Performance:** Limit device pixel ratio (`dpr`) for performance on high-res screens.

**4. About Section: `app/(sections)/About.tsx`**
- **Component:** A server component.
- **Content:** Text focused on the applicant's interests, relevant coursework, and specific reasons for applying to MBZUAI.

**5. Skills Section: `app/(sections)/Skills.tsx`**
- **Component:** A server component.
- **Content:** Displays skills using the `Badge` component, categorized into groups like "Programming Languages," "Frameworks & Libraries," and "Tools."

**6. Posts/Research Section: `app/(sections)/Posts.tsx`**
- **Component:** A server component.
- **Content:** Lists 2-3 featured blog posts or research highlights from `content/writing/index.ts`. Each item will be a `Card`.

**7. Contact Section: `app/(sections)/Contact.tsx`**
- **Component:** A server component.
- **Content:** Provides clear, accessible links for Email, LinkedIn, and GitHub.

### 2.3: Routing

The main page (`app/page.tsx`) will be a server component that composes these new section components (`Hero`, `ThreeSection`, `About`, etc.) to build the single-page layout. Client boundaries will be strictly limited to interactive components like the carousel and the 3D scene.

---

## Phase 3: SEO, Accessibility, and Performance

This phase ensures the portfolio is discoverable, usable by everyone, and performs well.

### 3.1: SEO and Metadata

**1. Centralized Metadata (`app/layout.tsx`):**
- Use the Next.js Metadata API to define site-wide metadata.
- **`metadata` object:**
    - `title`: A template for page titles (e.g., `%s | [Applicant Name] - AI & Data Science Portfolio`).
    - `description`: A concise summary of the applicant's profile and goals.
    - `openGraph`:
        - `title`, `description`.
        - `images`: An array pointing to a high-quality Open Graph image (e.g., `/og/og-image.png`).
        - `siteName`, `type: 'website'`.
    - `twitter`: Twitter card metadata.
- **Favicon:** Add `favicon.ico`, `apple-touch-icon.png`, and other relevant icon files to the `public` directory and reference them in the metadata.

**2. Structured Data (JSON-LD):**
- In `app/page.tsx`, include a `<script>` tag with JSON-LD structured data for a `Person` and `CreativeWork` (the portfolio itself). This improves how search engines understand the content.

### 3.2: Carousel Accessibility & Interaction Spec

The `ProjectsCarousel` must meet the following criteria:

- **Keyboard Navigation:**
    - The carousel container should be focusable (`tabIndex="0"`).
    - Left/Right arrow keys must navigate between slides.
    - Enter/Space should activate the link within the focused slide.
- **ARIA Roles:**
    - Use `role="region"`, `aria-roledescription="carousel"`, and `aria-label` for the main container.
    - Slides should have `role="group"` and `aria-roledescription="slide"`.
- **Focus Management:** When navigating with arrows, focus should move to the new slide.
- **Reduced Motion:** If `prefers-reduced-motion` is enabled, disable the autoplay feature and any slide animations.
- **Autoplay Control:** The autoplay feature must pause on `mouseenter` and resume on `mouseleave`.

### 3.3: Performance and Accessibility Checklist

- **Image Optimization:**
    - Use `next/image` for all images.
    - Provide `sizes` and `priority` props where appropriate (e.g., for the Hero image).
    - Serve images in modern formats like AVIF/WebP.
- **Lazy Loading:**
    - Heavy components (3D scene) and off-screen images should be lazy-loaded.
- **Route Prefetching:**
    - Use `<Link>` for internal navigation to enable automatic prefetching of routes.
- **WCAG AA Compliance:**
    - All text must have a contrast ratio of at least 4.5:1 against its background.
    - All interactive elements must have a visible focus state.
- **Lighthouse Scores:**
    - Aim for scores of 90+ in Performance, Accessibility, Best Practices, and SEO.

---

## Phase 4: Testing and Validation

This phase ensures the application is robust and works as expected.

### 4.1: Unit & Integration Testing (Vitest + React Testing Library)

**1. Test Setup:**
- Configure Vitest in `vitest.config.ts`.
- Create a test setup file to include `@testing-library/jest-dom` matchers.

**2. Test Directory Structure:**
- Place test files alongside the components they are testing (e.g., `Button.test.tsx` next to `Button.tsx`).

**3. Test Cases:**
- **`Button.tsx`:** Test rendering with different variants and `as` props.
- **`Card.tsx` / `Badge.tsx`:** Simple rendering tests.
- **`ProjectsCarousel.tsx`:**
    - Mock the project data.
    - Test that the correct number of slides are rendered.
- **`Posts.tsx`:** Test that the component renders a list of posts from mocked data.

### 4.2: End-to-End (E2E) Testing (Playwright)

**1. Test Setup:**
- Initialize Playwright with `npx playwright install`.
- Configure `playwright.config.ts`.

**2. Test Scenarios:**
- **Navigation:**
    - A smoke test that loads the homepage and verifies the Hero section title is visible.
- **Carousel Interaction:**
    - Navigate to the carousel.
    - Test keyboard navigation (press right arrow and verify the next slide is visible).
- **3D Scene Fallback:**
    - Test with JavaScript disabled to ensure the fallback image/skeleton for the 3D scene is rendered.
    - Test with `prefers-reduced-motion` enabled to verify any specific fallback behavior.

### 4.3: Final Validation

- **Lighthouse:** Run a Lighthouse audit in Chrome DevTools and ensure scores are ≥90 for Performance, Accessibility, Best Practices, and SEO.
- **WCAG:** Manually review the site against WCAG 2.1 AA criteria, checking color contrast, keyboard navigation, and screen reader output.