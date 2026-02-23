'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './CardStack.module.css';

interface StackIndicatorProps {
  currentIndex: number;
  totalItems: number;
  isExpanded: boolean;
}

/**
 * StackIndicator Component
 * Displays current position (X / Y) and animated progress dots.
 * Updates with screen reader announcements.
 */
export function StackIndicator({
  currentIndex,
  totalItems,
  isExpanded,
}: StackIndicatorProps) {
  const displayIndex = currentIndex + 1; // 1-indexed for display

  return (
    <motion.div
      className={styles.indicator}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Counter display with animation */}
      <div className={styles.counterContainer}>
        <motion.span
          key={displayIndex}
          className={styles.counter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {displayIndex}
        </motion.span>
        <span className={styles.divider}>/</span>
        <span className={styles.total}>{totalItems}</span>
      </div>

      {/* Progress dots */}
      <div className={styles.dotsContainer}>
        {Array.from({ length: totalItems }).map((_, index) => (
          <motion.div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              opacity: index === currentIndex ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Screen reader only text */}
      <span className={styles.srOnly}>
        Project {displayIndex} of {totalItems}, {isExpanded ? 'expanded' : 'collapsed'}
      </span>
    </motion.div>
  );
}
