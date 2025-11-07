'use client';

/**
 * ProjectsSection - Toggle between Card Showcase and Immersive 3D View
 */

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ProjectShowcase } from '../../components/ProjectShowcase/ProjectShowcase';
import type { CarouselItem } from '../../lib/mappers';

const ProjectEnvironment = dynamic(() => import('../../components/ProjectShowcase/ProjectEnvironment'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[700px] lg:h-[800px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-white animate-pulse">Loading 3D Environment...</p>
      </div>
    </div>
  ),
});

type ViewMode = 'showcase' | 'environment';

interface ProjectsSectionProps {
  items: CarouselItem[];
}

export function ProjectsSection({ items }: ProjectsSectionProps) {
  const [mode, setMode] = useState<ViewMode>('showcase');

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with toggle */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2
            id="projects-heading"
            className="text-5xl lg:text-7xl font-display font-bold mb-6 gradient-text"
          >
            Featured Projects
          </h2>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-2xl mx-auto mb-8">
            Experience my work in {mode === 'showcase' ? 'an interactive card showcase' : 'an immersive 3D environment'}
          </p>

          {/* View Mode Toggle */}
          <div className="inline-flex items-center gap-3 p-2 rounded-full bg-gradient-to-r from-slate-900/90 to-purple-900/90 backdrop-blur-md border-2 border-primary/30 shadow-2xl shadow-primary/20">
            <button
              onClick={() => setMode('showcase')}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2
                ${mode === 'showcase'
                  ? 'bg-gradient-to-r from-primary to-cyan-400 text-slate-900 shadow-lg shadow-primary/50 scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
                }
              `}
              aria-pressed={mode === 'showcase'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Card Showcase</span>
            </button>
            
            <button
              onClick={() => setMode('environment')}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2
                ${mode === 'environment'
                  ? 'bg-gradient-to-r from-primary to-cyan-400 text-slate-900 shadow-lg shadow-primary/50 scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
                }
              `}
              aria-pressed={mode === 'environment'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>3D Environment</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          {mode === 'showcase' ? (
            <div key="showcase" className="animate-fade-in">
              <ProjectShowcase items={items} />
            </div>
          ) : (
            <div key="environment" className="animate-fade-in">
              <ProjectEnvironment />
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
        .gradient-text {
          background: linear-gradient(135deg, #06B6D4 0%, #7C3AED 50%, #EC4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}