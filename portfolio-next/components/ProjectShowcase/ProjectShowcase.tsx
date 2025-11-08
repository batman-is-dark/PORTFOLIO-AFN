'use client';

/**
 * ProjectShowcase - An immersive, interactive project showcase with 3D cards
 * Features: Parallax scrolling, 3D card flips, smooth animations, and cinematic transitions
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { CarouselItem } from '../../lib/mappers';

interface ProjectShowcaseProps {
  items: CarouselItem[];
}

export function ProjectShowcase({ items }: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showProjectList, setShowProjectList] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length]);

  // Touch/swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    }
  };

  const getProjectGradient = (index: number) => {
    const gradients = [
      'from-cyan-500/30 via-blue-500/30 to-purple-500/30',
      'from-purple-500/30 via-pink-500/30 to-red-500/30',
      'from-green-500/30 via-teal-500/30 to-cyan-500/30',
      'from-yellow-500/30 via-orange-500/30 to-red-500/30',
      'from-indigo-500/30 via-purple-500/30 to-pink-500/30',
      'from-blue-500/30 via-cyan-500/30 to-teal-500/30',
      'from-rose-500/30 via-fuchsia-500/30 to-purple-500/30',
      'from-amber-500/30 via-yellow-500/30 to-lime-500/30',
    ];
    return gradients[index % gradients.length];
  };

  const getCardStyle = (index: number) => {
    const isActive = index === activeIndex;
    const isHovered = index === hoveredIndex;
    const offset = index - activeIndex;
    
    return {
      transform: `
        translateX(${offset * 12}%)
        translateZ(${isActive ? 0 : -80 - Math.abs(offset) * 40}px)
        rotateY(${offset * -5}deg)
        scale(${isActive ? 1 : 0.88 - Math.abs(offset) * 0.04})
      `,
      opacity: Math.max(0.4, 1 - Math.abs(offset) * 0.15),
      zIndex: items.length - Math.abs(offset),
      filter: isActive ? 'none' : `blur(${Math.abs(offset) * 1.5}px)`,
      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };
  };


  return (
    <div ref={containerRef} className="relative min-h-screen py-24 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Project list button (desktop) */}
        <button
          onClick={() => setShowProjectList(!showProjectList)}
          className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-black/60 transition-all duration-300 z-50 group"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-xs font-semibold">Projects</span>
        </button>

        {/* Project list sidebar (desktop) */}
        {showProjectList && (
          <div className="hidden lg:block fixed left-24 top-1/2 -translate-y-1/2 w-72 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-4 z-50 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">All Projects</h3>
              <button
                onClick={() => setShowProjectList(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item, index) => (
                <button
                  key={item.slug}
                  onClick={() => {
                    setActiveIndex(index);
                    setShowProjectList(false);
                    try {
                      const el = document.getElementById('projects');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } catch (e) {
                      // noop
                    }
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-primary/30 border-2 border-primary shadow-lg shadow-primary/20'
                      : 'bg-white/5 border-2 border-transparent hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      activeIndex === index ? 'bg-primary text-black' : 'bg-white/20 text-white'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-xs">{item.role} • {item.timeframe}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile project selector */}
        <div className="lg:hidden mb-8">
          <select
            value={activeIndex}
            onChange={(e) => setActiveIndex(parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-gradient-to-r from-slate-900/90 to-purple-900/90 backdrop-blur-md border-2 border-primary/30 rounded-2xl text-white font-semibold text-lg appearance-none cursor-pointer"
          >
            {items.map((item, index) => (
              <option key={item.slug} value={index} className="bg-slate-900">
                {index + 1}. {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* Project counter */}
        <div className="text-center mb-12">
          <p className="text-lg text-[color:var(--color-text-muted)]">
            <span className="text-5xl font-bold text-primary">{activeIndex + 1}</span>
            <span className="mx-3 text-3xl">/</span>
            <span className="text-3xl">{items.length}</span>
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3 mb-16">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? 'w-16 bg-gradient-to-r from-primary to-cyan-400 shadow-lg shadow-primary/50'
                  : 'w-2 bg-[color:var(--color-border)] hover:bg-primary/50 hover:w-6'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* 3D Card Showcase */}
        <div 
          className="relative" 
          style={{ perspective: '2000px', perspectiveOrigin: 'center center' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative h-[600px] flex items-center justify-center">
            {items.map((item, index) => (
              <div
                key={item.slug}
                className="absolute w-[90%] max-w-2xl h-[500px]"
                style={getCardStyle(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 border-2 border-primary/30 shadow-2xl">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Dynamic gradient background based on project */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getProjectGradient(index)}`}>
                    <div className="absolute inset-0 backdrop-blur-3xl" />
                    {/* Animated orbs */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary/20 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-4 py-2 rounded-full bg-primary/20 border border-primary/50 text-primary text-sm font-semibold backdrop-blur-md">
                          {item.role}
                        </span>
                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm backdrop-blur-md">
                          {item.timeframe}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-4xl font-display font-bold text-white mb-4">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-300 text-lg mb-6 line-clamp-3">
                        {item.summary}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.stack.slice(0, 5).map((tech, i) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.stack.length > 5 && (
                          <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/10 border border-white/20 text-white/70 backdrop-blur-md">
                            +{item.stack.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* View project button */}
                      {index === activeIndex && (
                        <Link
                          href={`/projects/${item.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-slate-900 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/50"
                        >
                          <span>Explore Project</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary/30 to-transparent rounded-tr-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/50 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary hover:text-slate-900 transition-all duration-300 hover:scale-110 z-50"
            aria-label="Previous project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/50 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary hover:text-slate-900 transition-all duration-300 hover:scale-110 z-50"
            aria-label="Next project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Project counter and navigation hint */}
        <div className="text-center mt-16">
          <p className="text-sm text-[color:var(--color-text-muted)] flex items-center justify-center gap-6">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded text-xs">←</kbd>
              <kbd className="px-2 py-1 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded text-xs">→</kbd>
              <span>Arrow keys</span>
            </span>
            <span className="w-px h-4 bg-[color:var(--color-border)]" />
            <span>Swipe on mobile</span>
            <span className="w-px h-4 bg-[color:var(--color-border)]" />
            <span>Click cards to navigate</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.3;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg, #06B6D4 0%, #7C3AED 50%, #D6C3A5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}
