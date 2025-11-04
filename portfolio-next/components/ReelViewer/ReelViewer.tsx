'use client';

/**
 * ReelViewer - Instagram-style project reel with focus/dim effect
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { CarouselItem } from '../../lib/mappers';

export interface ReelViewerProps {
  items: CarouselItem[];
}

export function ReelViewer({ items }: ReelViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="relative w-full">
      {/* Progress indicators */}
      <div className="flex gap-1 mb-6 max-w-4xl mx-auto px-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className="flex-1 h-1 rounded-full overflow-hidden bg-[color:var(--color-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={`Go to project ${index + 1}`}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ width: index === currentIndex ? '100%' : '0%' }}
              animate={{ width: index === currentIndex ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      {/* Reel container */}
      <div className="relative w-full h-[600px] lg:h-[700px] bg-gradient-to-br from-primary/10 via-[color:var(--color-surface)] to-secondary/10 rounded-3xl overflow-hidden border border-[color:var(--color-border)] shadow-2xl">
        {/* Background dimmed items preview */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Previous item (dimmed) */}
          {currentIndex > 0 && (
            <div className="absolute left-0 w-full h-full transform -translate-x-full scale-90 opacity-20 blur-sm">
              <ProjectCard item={items[currentIndex - 1]} />
            </div>
          )}
          
          {/* Next item (dimmed) */}
          {currentIndex < items.length - 1 && (
            <div className="absolute right-0 w-full h-full transform translate-x-full scale-90 opacity-20 blur-sm">
              <ProjectCard item={items[currentIndex + 1]} />
            </div>
          )}
        </div>

        {/* Main focused item */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <ProjectCard item={items[currentIndex]} isFocused />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[color:var(--color-surface)]/80 backdrop-blur-sm border border-[color:var(--color-border)] flex items-center justify-center hover:bg-[color:var(--color-surface)] hover:scale-110 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary z-10"
          aria-label="Previous project"
        >
          <svg className="w-6 h-6 text-[color:var(--color-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[color:var(--color-surface)]/80 backdrop-blur-sm border border-[color:var(--color-border)] flex items-center justify-center hover:bg-[color:var(--color-surface)] hover:scale-110 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary z-10"
          aria-label="Next project"
        >
          <svg className="w-6 h-6 text-[color:var(--color-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[color:var(--color-surface)]/80 backdrop-blur-sm border border-[color:var(--color-border)] text-sm text-[color:var(--color-text)] z-10">
          {currentIndex + 1} / {items.length}
        </div>
      </div>

      {/* Navigation hints */}
      <div className="mt-6 text-center text-sm text-[color:var(--color-text-muted)] max-w-4xl mx-auto px-4">
        Use arrow keys or click arrows to navigate • {items.length} projects
      </div>
    </div>
  );
}

function ProjectCard({ item, isFocused = false }: { item: CarouselItem; isFocused?: boolean }) {
  return (
    <div className="h-full flex flex-col p-8 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      {/* Animated circles */}
      {isFocused && (
        <>
          <motion.div
            className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-secondary/20 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <motion.div
            className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-medium mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {item.role}
          </motion.div>

          <motion.h3
            className="text-3xl md:text-4xl font-display font-bold text-[color:var(--color-text)] mb-3 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {item.title}
          </motion.h3>

          <motion.p
            className="text-[color:var(--color-text-muted)] text-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {item.timeframe}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {item.stack.map((tech, i) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  borderColor: i % 3 === 0 ? 'var(--color-primary)' : i % 3 === 1 ? 'var(--color-secondary)' : 'var(--color-accent)',
                  background: i % 3 === 0 ? 'rgba(6, 182, 212, 0.1)' : i % 3 === 1 ? 'rgba(124, 58, 237, 0.1)' : 'rgba(214, 195, 165, 0.1)',
                  color: i % 3 === 0 ? 'var(--color-primary)' : i % 3 === 1 ? 'var(--color-secondary)' : 'var(--color-accent)',
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.p
            className="text-[color:var(--color-text)] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {item.summary}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href={`/projects/${item.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-[#0B1120] font-medium hover:scale-105 transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}