'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../content/projects';

export function FlightPathView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div ref={containerRef} className="relative py-20 min-h-[200vh]">
      {/* SVG Path - Fixed positioning */}
      <svg
        className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 pointer-events-none"
        style={{ height: '100%' }}
        viewBox="0 0 10 100"
        preserveAspectRatio="none"
      >
        {/* Background line (dim) */}
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="100"
          stroke="rgba(0,240,255,0.1)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
        {/* Animated line (bright) */}
        <motion.line
          x1="5"
          y1="0"
          x2="5"
          y2="100"
          stroke="url(#flightGradientVertical)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="flightGradientVertical" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#FFB800" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Projects */}
      <div className="space-y-48 relative z-10">
        {projects.map((project, index) => {
          const imageUrl = project.images?.hero || project.three?.fallbackImage || '/images/projects/skin-disease-hero-01.jpg';
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={project.slug}
              className={`flex items-center gap-8 lg:gap-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Waypoint marker on the line */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4">
                <motion.div 
                  className="w-full h-full rounded-full bg-[#FFB800] border-2 border-[var(--color-bg)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                />
              </div>
              
              {/* Screenshot */}
              <div className={`relative w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden border border-white/10 group ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/80 to-transparent" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  {project.links?.find(l => l.label.toLowerCase().includes('live') || l.label.toLowerCase().includes('demo')) && (
                    <a
                      href={project.links.find(l => l.label.toLowerCase().includes('live') || l.label.toLowerCase().includes('demo'))?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-[#FFB800] text-black font-semibold rounded-full hover:bg-[#CC9300] transition-colors"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className={`w-full lg:w-1/2 space-y-4 ${isEven ? 'lg:pl-16' : 'lg:pr-16'}`}>
                <span className="text-[#00F0FF] text-sm font-medium">{project.stack?.[0]}</span>
                <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                <p className="text-[var(--color-muted)]">{project.role} • {project.timeframe}</p>
                <p className="text-secondary leading-relaxed">{project.problem}</p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack?.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-white/5 rounded-full text-sm text-[#00F0FF]/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-4 pt-2">
                  {project.links?.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        link.label.toLowerCase().includes('github')
                          ? 'border border-white/20 hover:border-[#00F0FF] text-white'
                          : 'bg-[#FFB800] text-black hover:bg-[#CC9300] font-semibold'
                      }`}
                    >
                      {link.label.toLowerCase().includes('github') && <Github className="w-4 h-4" />}
                      <span>{link.label}</span>
                      {!link.label.toLowerCase().includes('github') && <ExternalLink className="w-4 h-4" />}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
