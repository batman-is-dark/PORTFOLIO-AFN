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
    offset: ["start end", "end start"]
  });
  
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative py-20">
      {/* SVG Path */}
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 10 90 Q 30 70 50 50 T 90 10"
          fill="none"
          stroke="url(#flightGradient)"
          strokeWidth="0.5"
          strokeDasharray="1 1"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="flightGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#FFB800" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Projects */}
      <div className="space-y-32">
        {projects.map((project, index) => {
          const imageUrl = project.images?.hero || project.three?.fallbackImage || '/images/projects/skin-disease-hero-01.jpg';
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={project.slug}
              className={`flex items-center gap-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Screenshot */}
              <div className="relative w-1/2 aspect-video rounded-2xl overflow-hidden border border-white/10 group">
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
              <div className="w-1/2 space-y-4">
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
