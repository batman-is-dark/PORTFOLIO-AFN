'use client';

/**
 * ProjectsSection - Toggle between Cover Flow and 3D Galaxy views with inline toggle
 */

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CoverFlowViewer } from '../../components/CoverFlowViewer/CoverFlowViewer';
import type { CarouselItem } from '../../lib/mappers';

const ProjectGalaxy = dynamic(() => import('../../components/three/ProjectGalaxy'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#0B1120] to-[#1a1f35] border border-[color:var(--color-border)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-[color:var(--color-text-muted)] animate-pulse">Loading 3D Galaxy...</p>
      </div>
    </div>
  ),
});

type ViewMode = 'coverflow' | 'galaxy';

interface ProjectsSectionProps {
  items: CarouselItem[];
}

export function ProjectsSection({ items }: ProjectsSectionProps) {
  const [mode, setMode] = useState<ViewMode>('coverflow');

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with inline toggle */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2
            id="projects-heading"
            className="text-4xl lg:text-6xl font-display font-bold mb-6 gradient-text"
          >
            Featured Projects
          </h2>
          <p className="text-[color:var(--color-text-muted)] text-lg mb-8 max-w-2xl mx-auto">
            Explore my AI and data science work through an interactive experience
          </p>

          {/* View Mode Toggle */}
          <div className="inline-flex items-center gap-3 p-2 rounded-full bg-[color:var(--color-surface)]/80 backdrop-blur-md border border-[color:var(--color-border)] shadow-lg">
            <button
              onClick={() => setMode('coverflow')}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2
                ${mode === 'coverflow'
                  ? 'bg-primary text-[#0B1120] shadow-lg shadow-primary/50 scale-105'
                  : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-surface)]'
                }
              `}
              aria-pressed={mode === 'coverflow'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Cover Flow</span>
            </button>
            
            <button
              onClick={() => setMode('galaxy')}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2
                ${mode === 'galaxy'
                  ? 'bg-primary text-[#0B1120] shadow-lg shadow-primary/50 scale-105'
                  : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-surface)]'
                }
              `}
              aria-pressed={mode === 'galaxy'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>3D Galaxy</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          {mode === 'coverflow' ? (
            <div key="coverflow" className="animate-fade-in">
              <CoverFlowViewer items={items} />
              <p className="text-center text-[color:var(--color-text-muted)] text-sm mt-8">
                Use arrow keys or click to navigate • {items.length} projects
              </p>
            </div>
          ) : (
            <div key="galaxy" className="animate-fade-in">
              <ProjectGalaxy />
              <p className="text-center text-[color:var(--color-text-muted)] text-sm mt-8">
                Drag to rotate • Scroll to zoom • Click cards to explore
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}