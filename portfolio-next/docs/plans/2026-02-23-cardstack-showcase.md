# CardStack Interactive Showcase Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Replace the broken 3D gallery with an interactive Tinder-style card stack that showcases 6 projects with smooth animations, expandable details, full keyboard/screen reader accessibility, and retro-cyberpunk visual style.

**Architecture:** A React-based card stack system using Framer Motion for animations (no Three.js). Cards stack with offset; users swipe/click to navigate. Each card expands inline to reveal full project details. CSS animations handle visual effects (glow, parallax). Full WCAG AA accessibility with keyboard navigation, ARIA labels, and reduced-motion support.

**Tech Stack:**
- React hooks (useState, useCallback, useRef)
- Framer Motion (spring animations, AnimatePresence)
- CSS Modules (animations, glassmorphism, glow effects)
- Tailwind CSS (utility classes)
- TypeScript (type safety)

---

## Task 1: Create CardStack.tsx Main Component

**Files:**
- Create: `components/CardStack/CardStack.tsx`
- Modify: `app/(sections)/ProjectsSection.tsx` (later)
- Test: Interactive card navigation and state management

**Step 1: Create main component structure**

```typescript
'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CarouselItem } from '../../types/ui';
import { Card } from './Card';
import { Navigation } from './Navigation';
import { StackIndicator } from './StackIndicator';
import styles from './CardStack.module.css';

interface CardStackProps {
  items: CarouselItem[];
  onProjectSelect: (slug: string) => void;
}

export function CardStack({ items, onProjectSelect }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Navigate to next card
  const handleNext = useCallback(() => {
    if (expandedIndex !== null) {
      setExpandedIndex(null);
      return;
    }
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [expandedIndex, items.length]);

  // Navigate to previous card
  const handlePrev = useCallback(() => {
    if (expandedIndex !== null) {
      setExpandedIndex(null);
      return;
    }
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [expandedIndex, items.length]);

  // Jump to specific card
  const handleJumpToCard = useCallback((index: number) => {
    setExpandedIndex(null);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  }, [currentIndex]);

  // Toggle card expansion
  const handleToggleExpand = useCallback((index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  }, [expandedIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Enter' && expandedIndex === currentIndex) {
        onProjectSelect(items[currentIndex].slug);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, expandedIndex, handleNext, handlePrev, items, onProjectSelect]);

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.stackContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Project showcase carousel"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* Stack display */}
      <div className={styles.stack}>
        <AnimatePresence mode="wait">
          {items.map((item, index) => {
            const isActive = index === currentIndex;
            const isExpanded = expandedIndex === index;
            let stackPosition = index - currentIndex;

            // Wrap around
            if (stackPosition < -1) stackPosition += items.length;
            if (stackPosition > 1) stackPosition -= items.length;

            // Only render visible cards (current, next, prev, and some off-screen)
            if (Math.abs(stackPosition) > 2) return null;

            return (
              <Card
                key={item.id}
                item={item}
                isActive={isActive}
                isExpanded={isExpanded}
                stackPosition={stackPosition}
                direction={direction}
                onSelect={() => onProjectSelect(item.slug)}
                onToggleExpand={() => handleToggleExpand(index)}
                onJumpTo={() => handleJumpToCard(index)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <Navigation
        currentIndex={currentIndex}
        totalItems={items.length}
        isExpanded={expandedIndex !== null}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Stack indicator */}
      <StackIndicator
        currentIndex={currentIndex}
        totalItems={items.length}
        isExpanded={expandedIndex !== null}
      />
    </div>
  );
}
```

**Step 2: Create CSS Module for animations**

```css
/* components/CardStack/CardStack.module.css */

.stackContainer {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 1rem;
  perspective: 1200px;
  touch-action: pan-y;
}

.stack {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 500px;
  perspective: 1200px;
}

/* Reduce motion support */
@media (prefers-reduced-motion: reduce) {
  .stackContainer {
    perspective: none;
  }

  .stack {
    perspective: none;
  }
}
```

**Step 3: Test component renders without errors**

- Verify `CardStack.tsx` imports and exports correctly
- Verify no TypeScript errors
- Ensure folder `components/CardStack/` exists

---

## Task 2: Create Card.tsx Individual Card Component

**Files:**
- Create: `components/CardStack/Card.tsx`
- Reference: `CardStack.module.css`

**Code:**

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { CarouselItem } from '../../types/ui';
import styles from './Card.module.css';

interface CardProps {
  item: CarouselItem;
  isActive: boolean;
  isExpanded: boolean;
  stackPosition: number;
  direction: 'next' | 'prev' | null;
  onSelect: () => void;
  onToggleExpand: () => void;
  onJumpTo: () => void;
}

export function Card({
  item,
  isActive,
  isExpanded,
  stackPosition,
  direction,
  onSelect,
  onToggleExpand,
  onJumpTo,
}: CardProps) {
  // Calculate position and rotation based on stack position
  const getPositionVars = () => {
    const baseY = stackPosition * 20; // Offset for stack effect
    const baseRotation = stackPosition * 5; // Slight rotation
    const baseScale = 1 - Math.abs(stackPosition) * 0.05;
    const baseOpacity = 1 - Math.abs(stackPosition) * 0.2;

    return {
      y: baseY,
      rotate: baseRotation,
      scale: baseScale,
      opacity: baseOpacity,
      zIndex: 10 - Math.abs(stackPosition),
    };
  };

  const positionVars = getPositionVars();

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'next' ? 100 : -100,
      scale: 0.8,
    },
    visible: {
      opacity: positionVars.opacity,
      y: positionVars.y,
      scale: positionVars.scale,
      rotate: positionVars.rotate,
    },
    exit: {
      opacity: 0,
      y: direction === 'next' ? -100 : 100,
      scale: 0.8,
    },
  };

  const expandedVariants = {
    collapsed: {
      height: 350,
      overflow: 'hidden',
    },
    expanded: {
      height: 'auto',
      overflow: 'visible',
    },
  };

  return (
    <motion.div
      className={`${styles.card} ${isActive ? styles.active : ''} ${isExpanded ? styles.expanded : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // Custom spring-like curve
      }}
      style={positionVars as any}
      role="article"
      aria-label={`Project: ${item.title}`}
      onClick={() => {
        if (isActive) onToggleExpand();
      }}
      onKeyDown={(e) => {
        if (isActive && e.key === 'Enter') {
          e.preventDefault();
          onToggleExpand();
        }
      }}
      tabIndex={isActive ? 0 : -1}
    >
      {/* Card header with gradient */}
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.role}>{item.role}</p>
          </div>
          <div className={styles.timeframe}>{item.timeframe}</div>
        </div>
        <div className={styles.glowLine} />
      </div>

      {/* Card image */}
      {item.image && (
        <div className={styles.imageWrapper}>
          <img
            src={item.image}
            alt={`${item.title} preview`}
            className={styles.image}
          />
          <div className={styles.imageOverlay} />
        </div>
      )}

      {/* Card body (summary) */}
      <div className={styles.cardBody}>
        <p className={styles.summary}>{item.summary}</p>

        {/* Tech stack */}
        <div className={styles.stackTags}>
          {item.stack?.slice(0, 4).map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded details section */}
      <motion.div
        className={styles.expandedSection}
        variants={expandedVariants}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        transition={{ duration: 0.3 }}
      >
        {isExpanded && (
          <div className={styles.expandedContent}>
            <p className={styles.expandedText}>
              Swipe or use arrow keys to explore other projects. Click the card to collapse.
            </p>
            <button
              className={styles.viewButton}
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              aria-label={`View full details for ${item.title}`}
            >
              View Full Project
            </button>
          </div>
        )}
      </motion.div>

      {/* Active indicator */}
      {isActive && !isExpanded && (
        <div className={styles.activeIndicator}>
          <span className={styles.indicatorText}>Tap to expand</span>
        </div>
      )}
    </motion.div>
  );
}
```

**Step 4: Add Card styles**

```css
/* Append to components/CardStack/CardStack.module.css */

.card {
  position: absolute;
  width: 100%;
  max-width: 450px;
  height: 350px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  transform-origin: center;
  will-change: transform;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 1px;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.5), rgba(139, 92, 246, 0.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card.active::before {
  opacity: 1;
}

.card.active {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3);
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 240, 255, 0.1);
}

.headerContent {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.titleSection {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.role {
  font-size: 0.875rem;
  color: #00f0ff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeframe {
  font-size: 0.75rem;
  color: #94a3b8;
  text-align: right;
  white-space: nowrap;
}

.glowLine {
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, #00f0ff, transparent);
  border-radius: 1px;
}

.imageWrapper {
  position: relative;
  width: 100%;
  height: 120px;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(0, 240, 255, 0.15);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.imageOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
}

.cardBody {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: hidden;
}

.summary {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #cbd5e1;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stackTags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 9999px;
  color: #00f0ff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.expandedSection {
  overflow: hidden;
}

.expandedContent {
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 240, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.expandedText {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 0;
  font-style: italic;
}

.viewButton {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #00f0ff 0%, #8b5cf6 100%);
  border: none;
  border-radius: 0.5rem;
  color: #000;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.viewButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 240, 255, 0.3);
}

.viewButton:active {
  transform: translateY(0);
}

.activeIndicator {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  font-size: 0.75rem;
  color: #00f0ff;
  animation: pulse 2s ease-in-out infinite;
}

.indicatorText {
  opacity: 0.7;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }

  .viewButton {
    transition: none;
  }

  .activeIndicator {
    animation: none;
    opacity: 0.7;
  }
}
```

**Step 5: Test Card renders correctly**

- Verify imports work
- Check for TypeScript errors
- Ensure card displays with proper styling

---

## Task 3: Create Navigation.tsx Controls

**Files:**
- Create: `components/CardStack/Navigation.tsx`

**Code:**

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentIndex: number;
  totalItems: number;
  isExpanded: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export function Navigation({
  currentIndex,
  totalItems,
  isExpanded,
  onNext,
  onPrev,
}: NavigationProps) {
  return (
    <div className={styles.navigationContainer}>
      <motion.button
        className={styles.navButton}
        onClick={onPrev}
        aria-label="Previous project"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isExpanded}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </motion.button>

      <motion.button
        className={styles.navButton}
        onClick={onNext}
        aria-label="Next project"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isExpanded}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </motion.button>

      {/* Keyboard hint */}
      <div className={styles.keyboardHint}>
        <span className={styles.hintText}>Use ← → arrows to navigate</span>
      </div>
    </div>
  );
}
```

**Step 6: Add Navigation styles**

```css
/* Append to components/CardStack/CardStack.module.css */

.navigationContainer {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.navButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 0.5rem;
  color: #00f0ff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.25rem;
}

.navButton:hover:not(:disabled) {
  background: rgba(0, 240, 255, 0.2);
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.3);
}

.navButton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.keyboardHint {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hintText {
  opacity: 0.7;
}

@media (max-width: 640px) {
  .navigationContainer {
    gap: 1rem;
  }

  .navButton {
    width: 40px;
    height: 40px;
  }

  .keyboardHint {
    display: none;
  }
}
```

---

## Task 4: Create StackIndicator.tsx Position Display

**Files:**
- Create: `components/CardStack/StackIndicator.tsx`

**Code:**

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './StackIndicator.module.css';

interface StackIndicatorProps {
  currentIndex: number;
  totalItems: number;
  isExpanded: boolean;
}

export function StackIndicator({
  currentIndex,
  totalItems,
  isExpanded,
}: StackIndicatorProps) {
  return (
    <motion.div
      className={styles.indicator}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className={styles.counterContainer}>
        <motion.span
          className={styles.counter}
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {currentIndex + 1}
        </motion.span>
        <span className={styles.divider}>/</span>
        <span className={styles.total}>{totalItems}</span>
      </div>

      {/* Progress dots */}
      <div className={styles.dotsContainer} role="presentation">
        {Array.from({ length: totalItems }).map((_, index) => (
          <motion.div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Status text for screen readers */}
      <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
        Project {currentIndex + 1} of {totalItems}
        {isExpanded ? ', expanded' : ', collapsed'}
      </div>
    </motion.div>
  );
}
```

**Step 7: Add StackIndicator styles**

```css
/* Append to components/CardStack/CardStack.module.css */

.indicator {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.counterContainer {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-variant-numeric: tabular-nums;
}

.counter {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00f0ff;
  min-width: 2.5rem;
}

.divider {
  color: rgba(0, 240, 255, 0.5);
}

.total {
  font-size: 1rem;
  color: #94a3b8;
}

.dotsContainer {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #00f0ff;
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
}

.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Task 5: Create index.ts Barrel Export

**Files:**
- Create: `components/CardStack/index.ts`

**Code:**

```typescript
export { CardStack } from './CardStack';
export { Card } from './Card';
export { Navigation } from './Navigation';
export { StackIndicator } from './StackIndicator';
```

---

## Task 6: Update ProjectsSection to Use CardStack

**Files:**
- Modify: `app/(sections)/ProjectsSection.tsx`

**Step 8: Replace ProjectShowcase with CardStack**

Find the import section (lines 1-13) and replace:

```typescript
// OLD - line 10:
import { ProjectShowcase } from '../../components/ProjectShowcase/ProjectShowcase';

// NEW:
import { CardStack } from '../../components/CardStack';
```

Find the view content section (lines 107-111) and replace:

```typescript
// OLD:
{currentView === 'showcase' && <ProjectShowcase items={projectItems} onProjectSelect={handleProjectSelect} />}

// NEW:
{currentView === 'showcase' && <CardStack items={projectItems} onProjectSelect={handleProjectSelect} />}
```

Remove the unused ProjectShowcase import completely.

**Step 9: Verify ProjectsSection compiles**

- Check for TypeScript errors
- Verify imports resolve correctly

---

## Task 7: Remove Old Components

**Files:**
- Delete: `components/ProjectShowcase/` (entire folder)
- Delete: `components/projects/ViewToggle.tsx` (if not used elsewhere)

**Step 10: Check for references**

Run: `grep -r "ProjectShowcase\|ProjectShowcase\|Project3DView" app/ components/ --include="*.tsx" --include="*.ts"`

If found, update imports or remove unused code.

---

## Task 8: Build and Verify

**Step 11: Run development build**

```bash
npm run dev
```

Expected: Development server starts on port 3000/3002 without errors.

**Step 12: Test in browser**

1. Navigate to portfolio page
2. Scroll to Projects section
3. Verify CardStack displays with 6 projects
4. Click arrow buttons → cards should swipe/animate
5. Click on active card → should expand with details
6. Click "View Full Project" → should navigate to project page
7. Use keyboard arrows → cards should navigate
8. On mobile, swipe left/right → cards should swipe

**Step 13: Production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 14: Commit**

```bash
git add components/CardStack/ app/(sections)/ProjectsSection.tsx
git commit -m "feat: replace 3D gallery with interactive CardStack showcase

- Implement Tinder-style card stack with swipe animations
- Add expandable card details panel
- Full keyboard navigation and screen reader support
- Retro-cyberpunk visual style with neon cyan/purple accents
- Touch gesture support for mobile
- Respects prefers-reduced-motion
- Remove broken Project3DView and ProjectShowcase components"
```

---

## Testing Checklist

- [ ] CardStack displays all 6 projects
- [ ] Click arrow buttons navigates forward/backward
- [ ] Keyboard left/right arrows navigate
- [ ] Click active card expands details
- [ ] Click "View Full Project" navigates to `/projects/[slug]`
- [ ] Swipe on mobile (left/right) navigates
- [ ] Stack indicator shows correct position
- [ ] Progress dots update on navigation
- [ ] Reduced motion respected (no animations when enabled)
- [ ] Tab navigation works
- [ ] Screen reader announces project names and state
- [ ] No console errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Production build succeeds

---

## Accessibility Checklist (WCAG AA)

- [ ] Keyboard-only navigation works
- [ ] Arrow keys and Tab work
- [ ] Focus indicators visible
- [ ] ARIA labels on buttons
- [ ] Role attributes correct (region, article, button)
- [ ] aria-live region for state updates
- [ ] Screen reader friendly text
- [ ] Color contrast meets AA standard (>4.5:1)
- [ ] Respects prefers-reduced-motion
- [ ] Alt text on project images

---

## File Structure After Completion

```
components/CardStack/
├── CardStack.tsx (main component)
├── Card.tsx (individual card)
├── Navigation.tsx (arrow buttons)
├── StackIndicator.tsx (position display)
├── CardStack.module.css (all styles)
└── index.ts (barrel export)

app/(sections)/
└── ProjectsSection.tsx (updated to use CardStack)
```

