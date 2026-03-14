'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '../types/content';

interface CardFlowProps {
  projects: Project[];
}

export function CardFlow({ projects }: CardFlowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      container?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scroll-smooth scrollbar-hide flex gap-6 pb-4"
        onScroll={checkScroll}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-96"
          >
            <Link href={`/projects/${project.slug}`}>
              <div className="group relative h-full bg-surface/50 border border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 hover:bg-surface/80 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/20">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent"></div>

                {/* Content */}
                <div className="p-8 space-y-6 h-full flex flex-col">
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="inline-flex w-fit">
                      <span className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-accent text-xs font-sans font-semibold uppercase tracking-[0.2em]">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-primary group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-secondary text-sm font-sans">
                      {project.role} • {project.timeframe}
                    </p>
                  </div>

                  {/* Problem */}
                  <div className="flex-1">
                    <p className="text-secondary font-sans text-sm leading-relaxed">
                      {project.problem.substring(0, 120)}
                      {project.problem.length > 120 ? '...' : ''}
                    </p>
                  </div>

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-secondary font-sans"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-secondary font-sans">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-accent text-sm font-sans font-semibold group-hover:gap-3 transition-all">
                    View Project
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <motion.button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-surface border border-white/10 hover:border-accent/50 hover:bg-surface/80 transition-all disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5 text-secondary hover:text-accent" />
      </motion.button>

      <motion.button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-surface border border-white/10 hover:border-accent/50 hover:bg-surface/80 transition-all disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5 text-secondary hover:text-accent" />
      </motion.button>
    </div>
  );
}
