'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { projects } from '../../content/projects';

function ProjectCard({ project }: { project: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const imageUrl = project.images?.hero || project.three?.fallbackImage || '/images/projects/skin-disease-hero-01.jpg';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    if (isExpanded) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group cursor-pointer"
        onClick={() => setIsExpanded(true)}
        onKeyDown={(e) => e.key === 'Enter' && setIsExpanded(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${project.title} project`}
      >
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-white/10 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(255,51,0,0.15)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
            
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent/20 backdrop-blur-md rounded-full border border-accent/30">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">
                {project.stack?.[0] || 'AI'}
              </span>
            </div>
          </div>
          
          <div className="p-5">
            <h3 className="text-xl font-display font-bold text-primary mb-1 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-secondary text-sm mb-3">{project.role}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.stack?.slice(0, 3).map((tech: string, i: number) => (
                <span 
                  key={i}
                  className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {isExpanded && (
        <button
          className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-xl cursor-default border-none"
          onClick={() => setIsExpanded(false)}
          aria-label="Close modal"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-surface border border-white/10 rounded-3xl m-4 md:m-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 rounded-full hover:bg-accent/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-primary" />
            </button>
            
            <div className="relative h-64 md:h-80 w-full">
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
            </div>
            
            <div className="p-8 -mt-20 relative">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-4xl font-display font-bold text-primary mb-2">
                    {project.title}
                  </h2>
                  <p className="text-accent font-medium">{project.role}</p>
                </div>
                <div className="px-4 py-2 bg-accent/10 rounded-full border border-accent/30">
                  <span className="text-accent text-sm font-bold">{project.timeframe}</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-primary font-bold mb-2">The Problem</h4>
                  <p className="text-secondary leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <h4 className="text-primary font-bold mb-2">The Approach</h4>
                  <p className="text-secondary leading-relaxed">{project.approach}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-primary font-bold mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack?.map((tech: string, i: number) => (
                    <span 
                      key={i}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-secondary text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {project.impact && (
                <div className="p-6 bg-accent/5 border border-accent/20 rounded-xl mb-8">
                  <h4 className="text-accent font-bold mb-2">Impact</h4>
                  <p className="text-secondary">{project.impact}</p>
                </div>
              )}
              
              <div className="flex gap-4">
                {project.links?.map((link: any, i: number) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-bg font-bold rounded-full hover:bg-accent transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 text-primary font-bold rounded-full hover:border-accent hover:text-accent transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        </button>
      )}
    </>
  );
}

export default function ProjectGallery() {
  return (
    <section 
      id="projects" 
      aria-labelledby="projects-heading"
      className="relative py-20 px-6 md:px-12 bg-bg"
    >
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-accent font-sans text-xs uppercase tracking-[0.5em] block">
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
              Explore my creative work in AI, Robotics, and innovative solutions. 
              Each project represents a unique challenge and creative solution.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <p className="text-secondary mb-4">Want to see more projects?</p>
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-bg font-bold rounded-full hover:bg-accent transition-colors"
        >
          View All Projects
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
