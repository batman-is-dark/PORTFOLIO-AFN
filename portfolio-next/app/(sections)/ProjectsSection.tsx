/**
 * ProjectsSection - Server component for the Projects section
 */
'use client';

import FlightPath from '../../components/ui/FlightPath';
import { projects } from '../../content/projects';

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative bg-gray-950 overflow-hidden">
      <div className="relative w-full max-w-[1400px] mx-auto px-4 pt-24 mb-12 z-20">
        <h2
          id="projects-heading"
          className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
        >
          Featured Projects
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg">
          Navigating the strategic landscape of AI, Robotics, and Software Engineering.
          <span className="block mt-2 text-cyan-500 text-sm font-mono uppercase tracking-widest">
            [SCROLL TO INITIATE DEPLOYMENT FLIGHT]
          </span>
        </p>
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