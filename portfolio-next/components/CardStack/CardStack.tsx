'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CarouselItem } from '../../types/ui';
import styles from './CardStack.module.css';

export interface CardStackProps {
  items: CarouselItem[];
  onProjectSelect?: (item: CarouselItem) => void;
}

/**
 * CardStack Component
 * Manages card stack state, animations, and navigation logic.
 * Supports keyboard, touch, and click interactions.
 */
export function CardStack({ items, onProjectSelect }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Navigate to next card or collapse if expanded
  const handleNext = useCallback(() => {
    if (expandedIndex !== null) {
      setExpandedIndex(null);
      return;
    }

    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [expandedIndex, items.length]);

  // Navigate to previous card or collapse if expanded
  const handlePrev = useCallback(() => {
    if (expandedIndex !== null) {
      setExpandedIndex(null);
      return;
    }

    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [expandedIndex, items.length]);

  // Jump directly to specific card
  const handleJumpToCard = useCallback((index: number) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 'next' : 'prev');
    }
    setCurrentIndex(index);
    setExpandedIndex(null);
  }, [currentIndex]);

  // Toggle card expansion
  const handleToggleExpand = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Enter' && expandedIndex !== null) {
        e.preventDefault();
        const item = items[expandedIndex];
        onProjectSelect?.(item);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, expandedIndex, items, onProjectSelect]);

  // Touch handling
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (touchStart === null) return;

      const touchEnd = e.changedTouches[0].clientX;
      const distance = touchStart - touchEnd;
      const threshold = 50;

      if (Math.abs(distance) > threshold) {
        if (distance > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }

      setTouchStart(0);
    },
    [touchStart, handleNext, handlePrev]
  );

  if (items.length === 0) {
    return (
      <div className={styles.stackContainer} role="region" aria-label="Card stack">
        <div className={styles.emptyState}>No items available</div>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div
      className={styles.stackContainer}
      ref={containerRef}
      role="region"
      aria-label="Interactive card stack with project showcase"
      aria-live="polite"
      aria-atomic="false"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Stack container with cards */}
      <div className={styles.stack}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{
              opacity: 0,
              x: direction === 'next' ? 400 : -400,
              rotateY: direction === 'next' ? -20 : 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              x: direction === 'next' ? -400 : 400,
              rotateY: direction === 'next' ? 20 : -20,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            style={{
              perspective: 1200,
            }}
          >
            <div
              className={styles.card}
              onClick={() => handleToggleExpand(currentIndex)}
              role="button"
              tabIndex={0}
              aria-pressed={expandedIndex === currentIndex}
              aria-label={`${currentItem.title} - ${currentItem.role}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleExpand(currentIndex);
                }
              }}
            >
              <div className={styles.cardContent}>
                {currentItem.image && (
                  <div className={styles.cardImage}>
                    <img
                      src={currentItem.image}
                      alt={currentItem.title}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{currentItem.title}</h3>
                  <p className={styles.cardRole}>{currentItem.role}</p>

                  {currentItem.timeframe && (
                    <p className={styles.cardTimeframe}>{currentItem.timeframe}</p>
                  )}

                  {expandedIndex === currentIndex && currentItem.summary && (
                    <motion.p
                      className={styles.cardSummary}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentItem.summary}
                    </motion.p>
                  )}

                  {expandedIndex === currentIndex && currentItem.description && (
                    <motion.p
                      className={styles.cardDescription}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentItem.description}
                    </motion.p>
                  )}

                   {currentItem.stack.length > 0 && (
                     <div className={styles.cardStack}>
                       {currentItem.stack.map((tech, index) => (
                         <span key={`${currentItem.id}-${tech}-${index}`} className={styles.stackTag}>
                           {tech}
                         </span>
                       ))}
                    </div>
                  )}
                </div>
              </div>

              {expandedIndex !== currentIndex && (
                <div className={styles.cardHint}>Click to expand</div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className={styles.navigation}>
        <button
          onClick={handlePrev}
          className={styles.navButton}
          aria-label="Previous card"
          title="Previous (← Arrow Left)"
        >
          ← Previous
        </button>

        <div className={styles.indicatorContainer}>
          <span className={styles.position}>
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          onClick={handleNext}
          className={styles.navButton}
          aria-label="Next card"
          title="Next (→ Arrow Right)"
        >
          Next →
        </button>
      </div>

      {/* Keyboard hint */}
      <div className={styles.keyboardHint} aria-hidden="true">
        <small>← → to navigate · Enter to view · Click to expand</small>
      </div>
    </div>
  );
}
