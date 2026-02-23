'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './CardStack.module.css';

interface NavigationProps {
  currentIndex: number;
  totalItems: number;
  isExpanded: boolean;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Navigation Component
 * Renders arrow buttons for card navigation with keyboard hint.
 * Buttons are disabled when a card is expanded.
 */
export function Navigation({
  currentIndex,
  totalItems,
  isExpanded,
  onNext,
  onPrev,
}: NavigationProps) {
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === totalItems - 1;

  return (
    <div className={styles.navigationContainer}>
      {/* Previous button */}
      <motion.button
        className={styles.navButton}
        onClick={onPrev}
        disabled={isExpanded}
        aria-label="Previous project (← Arrow Left)"
        title="Previous (← Arrow Left)"
        whileHover={!isExpanded ? { scale: 1.05 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        transition={{ duration: 0.2 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </motion.button>

      {/* Next button */}
      <motion.button
        className={styles.navButton}
        onClick={onNext}
        disabled={isExpanded}
        aria-label="Next project (→ Arrow Right)"
        title="Next (→ Arrow Right)"
        whileHover={!isExpanded ? { scale: 1.05 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        transition={{ duration: 0.2 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
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
