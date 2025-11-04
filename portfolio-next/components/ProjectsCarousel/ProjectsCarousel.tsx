'use client';

/**
 * ProjectsCarousel - Auto-scrolling, keyboard-accessible carousel using Embla.
 * Pauses on hover, focus-within, and pointerDown.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import type { CarouselItem } from '../../lib/mappers';

export interface ProjectsCarouselProps {
  items: CarouselItem[];
}

export function ProjectsCarousel({ items }: ProjectsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollRef = useRef<number | null>(null);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  // Auto-scroll logic
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const startAutoScroll = () => {
      autoScrollRef.current = window.setInterval(() => {
        scrollNext();
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current !== null) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };
  }, [emblaApi, isPaused, scrollNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!emblaApi) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      }
    };

    const container = emblaApi.containerNode();
    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [emblaApi, scrollNext, scrollPrev]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handlePointerDown = () => setIsPaused(true);
  const handlePointerUp = () => setIsPaused(false);
  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  return (
    <div
      ref={emblaRef}
      className="overflow-hidden relative"
      role="region"
      aria-label="Projects carousel"
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Gradient overlays for depth */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[color:var(--color-bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[color:var(--color-bg)] to-transparent z-10 pointer-events-none" />
      
      <div className="flex gap-4">
        {items.map((item, index) => (
          <div
            key={item.slug}
            className="flex-[0_0_90%] min-w-0 md:flex-[0_0_45%] lg:flex-[0_0_30%]"
            style={{
              animation: isPaused ? 'none' : undefined,
            }}
          >
            <Link
              href={`/projects/${item.slug}`}
              className="group block relative rounded-xl overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-2xl hover:shadow-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-display font-bold text-[color:var(--color-text)] group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                
                <p className="text-sm text-[color:var(--color-text-muted)] mb-3 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {item.role} • {item.timeframe}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.stack.slice(0, 3).map((tech, i) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300"
                      style={{
                        borderColor: i === 0 ? 'var(--color-primary)' : i === 1 ? 'var(--color-secondary)' : 'var(--color-accent)',
                        background: i === 0 ? 'rgba(6, 182, 212, 0.1)' : i === 1 ? 'rgba(124, 58, 237, 0.1)' : 'rgba(214, 195, 165, 0.1)',
                        color: i === 0 ? 'var(--color-primary)' : i === 1 ? 'var(--color-secondary)' : 'var(--color-accent)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {item.stack.length > 3 && (
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-muted)]">
                      +{item.stack.length - 3}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed line-clamp-3 group-hover:text-[color:var(--color-text)] transition-colors duration-300">
                  {item.summary}
                </p>

                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 pointer-events-none" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}