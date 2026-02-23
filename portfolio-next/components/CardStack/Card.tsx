'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { CarouselItem } from '../../types/ui';
import styles from './CardStack.module.css';

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

/**
 * Card Component
 * Renders individual cards in the card stack with animations and expansion functionality.
 * Supports keyboard navigation, click interactions, and accessibility features.
 */
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
  // Calculate position based on stack position
  const getPositionVars = () => {
    const baseY = stackPosition * 20;
    const baseRotation = stackPosition * 5;
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
    collapsed: { height: 350, overflow: 'hidden' as const },
    expanded: { height: 'auto', overflow: 'visible' as const },
  };

  return (
    <motion.div
      className={`${styles.card} ${isActive ? styles.active : ''} ${isExpanded ? styles.expanded : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        y: positionVars.y,
        rotate: positionVars.rotate,
        scale: positionVars.scale,
        opacity: positionVars.opacity,
        zIndex: positionVars.zIndex,
      } as unknown as React.CSSProperties}
      role="article"
      aria-label={`Project: ${item.title}`}
      onClick={() => {
        if (isActive) {
          onToggleExpand();
        }
      }}
      onKeyDown={(e) => {
        if (isActive && e.key === 'Enter') {
          e.preventDefault();
          onToggleExpand();
        }
      }}
      tabIndex={isActive ? 0 : -1}
    >
      {/* Card content wrapper */}
      <div className={styles.cardContent}>
        {/* Card Image */}
        {item.image && (
          <div className={styles.cardImage}>
            <img
              src={item.image}
              alt={`${item.title} preview`}
              loading="lazy"
            />
          </div>
        )}

        {/* Card Header with Title, Role, Timeframe, and Glow Line */}
        <div className={styles.cardHeader}>
          <div className={styles.headerContent}>
            <div className={styles.titleSection}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardRole}>{item.role}</p>
            </div>
            {item.timeframe && (
              <div className={styles.timeframe}>{item.timeframe}</div>
            )}
          </div>
          <div className={styles.glowLine} />
        </div>

        {/* Card Text Content */}
        <div className={styles.cardText}>

          {/* Summary */}
          {item.summary && (
            <p className={styles.cardSummary}>{item.summary}</p>
          )}

          {/* Tech Stack Tags */}
          {item.stack && item.stack.length > 0 && (
            <div className={styles.cardStack}>
              {item.stack.slice(0, 4).map((tech, index) => (
                 <span
                   key={`${item.id}-${tech}`}
                   className={styles.stackTag}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Expanded section with helper text and button */}
        <motion.div
          className={styles.expandedSection}
          variants={expandedVariants}
          animate={isExpanded ? 'expanded' : 'collapsed'}
          transition={{ duration: 0.3 }}
        >
          {isExpanded && (
            <div className={styles.expandedContent}>
              {item.description && (
                <p className={styles.cardDescription}>
                  {item.description}
                </p>
              )}
              {!item.description && (
                <p className={styles.cardDescription}>
                  Swipe or use arrow keys to explore other projects. Click the card to collapse.
                </p>
              )}
              {item.link && (
                <button
                  className={styles.navButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                  }}
                  aria-label={`View full details for ${item.title}`}
                >
                  View Full Project
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Active indicator - shows pulse animation when active and not expanded */}
      {isActive && !isExpanded && (
        <div className={styles.cardHint} aria-hidden="true">
          Click to expand
        </div>
      )}
    </motion.div>
  );
}
