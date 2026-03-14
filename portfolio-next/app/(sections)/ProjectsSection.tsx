/**
 * ProjectsSection - Server component for the Projects section
 */
'use client';

'use client';

import { useState } from 'react';
import ProjectCoverflow from '../../components/projects/ProjectCoverflow';
import { ViewToggle } from '../../components/projects/ViewToggle';
import { HangarView } from '../../components/projects/HangarView';
import { projects } from '../../content/projects';

type ViewMode = 'path' | 'hangar' | 'showcase';

export function ProjectsSection() {
  const [currentView, setCurrentView] = useState<ViewMode>('showcase');

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative bg-bg overflow-hidden border-t border-white/5">
      <div className="relative w-full max-w-7xl mx-auto px-6 pt-32 pb-12 z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
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
          <div className="flex flex-col items-end gap-4">
            <div className="max-w-md">
              <p className="text-secondary text-lg font-sans leading-relaxed">
                A collection of projects exploring the intersection of AI, Robotics, and human-centric design. Navigate through each showcase.
              </p>
            </div>
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
          </div>
        </div>
      </div>

      {/* Dynamic View Rendering */}
      <div className="relative w-full py-20 z-10">
        {currentView === 'showcase' && <ProjectCoverflow projects={projects} />}
        {currentView === 'hangar' && <HangarView projects={projects} />}
        {currentView === 'path' && <div className="text-center text-secondary">Flight Path view coming soon...</div>}
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