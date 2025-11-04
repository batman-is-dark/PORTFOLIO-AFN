'use client';

/**
 * CoverFlowViewer - Apple Cover Flow style 3D carousel with perspective
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { CarouselItem } from '../../lib/mappers';

export interface CoverFlowViewerProps {
  items: CarouselItem[];
}

export function CoverFlowViewer({ items }: CoverFlowViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Calculate visible items (center ± 2)
  const getVisibleItems = () => {
    const visible = [];
    for (let offset = -2; offset <= 2; offset++) {
      const index = (currentIndex + offset + items.length) % items.length;
      visible.push({ item: items[index], offset, index });
    }
    return visible;
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="relative w-full">
      {/* Cover Flow Container */}
      <div 
        className="relative h-[500px] lg:h-[600px] overflow-hidden"
        style={{ perspective: '2000px' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {visibleItems.map(({ item, offset, index }) => (
              <CoverFlowCard
                key={index}
                item={item}
                offset={offset}
                isActive={offset === 0}
                onClick={() => goToIndex(index)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-[color:var(--color-surface)]/90 backdrop-blur-md border border-[color:var(--color-border)] flex items-center justify-center hover:bg-[color:var(--color-surface)] hover:scale-110 transition-all duration-300 shadow-2xl group"
          aria-label="Previous project"
        >
          <svg className="w-7 h-7 text-[color:var(--color-text)] group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-[color:var(--color-surface)]/90 backdrop-blur-md border border-[color:var(--color-border)] flex items-center justify-center hover:bg-[color:var(--color-surface)] hover:scale-110 transition-all duration-300 shadow-2xl group"
          aria-label="Next project"
        >
          <svg className="w-7 h-7 text-[color:var(--color-text)] group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[color:var(--color-bg)] to-transparent pointer-events-none z-40" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[color:var(--color-bg)] to-transparent pointer-events-none z-40" />
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-12 h-2 bg-primary'
                : 'w-2 h-2 bg-[color:var(--color-border)] hover:bg-[color:var(--color-text-muted)]'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Current Project Info */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mt-8 text-center max-w-3xl mx-auto"
      >
        <h3 className="text-3xl font-display font-bold gradient-text mb-3">
          {items[currentIndex].title}
        </h3>
        <p className="text-[color:var(--color-text-muted)] mb-6">
          {items[currentIndex].summary}
        </p>
        <Link
          href={`/projects/${items[currentIndex].slug}`}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-[#0B1120] font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-primary/50"
        >
          View Full Case Study
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}

function CoverFlowCard({ 
  item, 
  offset, 
  isActive, 
  onClick 
}: { 
  item: CarouselItem; 
  offset: number; 
  isActive: boolean;
  onClick: () => void;
}) {
  // Calculate transforms based on offset
  const getTransform = () => {
    const baseX = offset * 320; // Spacing between cards
    const baseZ = isActive ? 0 : -200 - Math.abs(offset) * 50;
    const rotateY = offset * -45; // Rotation angle
    const scale = isActive ? 1 : 0.85 - Math.abs(offset) * 0.1;
    
    return {
      x: baseX,
      z: baseZ,
      rotateY,
      scale,
      opacity: Math.max(0, 1 - Math.abs(offset) * 0.25)
    };
  };

  const transform = getTransform();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        x: transform.x,
        z: transform.z,
        rotateY: transform.rotateY,
        scale: transform.scale,
        opacity: transform.opacity,
      }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30,
      }}
      onClick={onClick}
      className={`absolute w-80 h-[450px] cursor-pointer ${
        isActive ? 'z-30' : 'z-10'
      }`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className={`relative w-full h-full rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
          isActive
            ? 'border-primary shadow-2xl shadow-primary/30'
            : 'border-[color:var(--color-border)] shadow-xl'
        }`}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-[color:var(--color-surface)] to-secondary/20" />
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col p-6 z-10">
          {/* Role Badge */}
          <div className="inline-block self-start px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold mb-4">
            {item.role}
          </div>

          {/* Title */}
          <h4 className="text-2xl font-display font-bold text-[color:var(--color-text)] mb-3 leading-tight">
            {item.title}
          </h4>

          {/* Timeframe */}
          <p className="text-sm text-[color:var(--color-text-muted)] mb-4">
            {item.timeframe}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.stack.slice(0, 4).map((tech, i) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md text-xs font-medium border backdrop-blur-sm"
                style={{
                  borderColor: i % 3 === 0 ? 'var(--color-primary)' : i % 3 === 1 ? 'var(--color-secondary)' : 'var(--color-accent)',
                  background: i % 3 === 0 ? 'rgba(6, 182, 212, 0.15)' : i % 3 === 1 ? 'rgba(124, 58, 237, 0.15)' : 'rgba(214, 195, 165, 0.15)',
                  color: i % 3 === 0 ? 'var(--color-primary)' : i % 3 === 1 ? 'var(--color-secondary)' : 'var(--color-accent)',
                }}
              >
                {tech}
              </span>
            ))}
            {item.stack.length > 4 && (
              <span className="px-2 py-1 rounded-md text-xs font-medium text-[color:var(--color-text-muted)] border border-[color:var(--color-border)]">
                +{item.stack.length - 4}
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="text-sm text-[color:var(--color-text)] leading-relaxed line-clamp-4 mb-auto">
            {item.summary}
          </p>

          {/* Status Indicator */}
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-4 flex items-center justify-center gap-2 text-primary text-sm font-semibold"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Click to view details
            </motion.div>
          )}
        </div>

        {/* Shine Effect on Active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}