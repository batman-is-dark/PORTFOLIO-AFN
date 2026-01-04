/**
 * ProjectsSection - Server component for the Projects section
 */
'use client';

import FlightPath from '../../components/ui/FlightPath';
import { projects } from '../../content/projects';

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative bg-bg overflow-hidden border-t border-white/5">
      <div className="relative w-full max-w-7xl mx-auto px-6 pt-32 mb-12 z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-accent font-sans text-xs uppercase tracking-[0.4em] block">
              Portfolio
            </span>
            <h2
              id="projects-heading"
              className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tighter"
            >
              Selected<br />Works
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-secondary text-lg font-sans leading-relaxed">
              A collection of projects exploring the intersection of AI, Robotics, and human-centric design.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-[1px] w-12 bg-accent"></div>
              <span className="text-accent text-[10px] font-sans uppercase tracking-[0.3em]">
                Scroll to navigate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Animation Container */}
      <div className="w-full relative z-0">
        <FlightPath />
      </div>

      {/* Fallback/Mobile List (Visible only on very small screens or if animation is hidden) */}
      <div className="sr-only">
        {projects.map((project, index) => (
          <article key={project.slug || index}>
             <h3>{project.title}</h3>
             <p>{project.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}