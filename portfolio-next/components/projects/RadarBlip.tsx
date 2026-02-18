'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../types/content';

interface RadarBlipProps {
  project: Project;
  position: { x: number; y: number };
  rotation: number;
  scale: number;
  isCenter: boolean;
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
}

export function RadarBlip({
  project,
  position,
  rotation,
  scale,
  isCenter,
  onHover,
  onLeave,
  isHovered,
}: RadarBlipProps) {
  const imageUrl = project.images?.hero || project.three?.fallbackImage || '/images/projects/skin-disease-hero-01.jpg';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: isHovered ? 1.05 : scale }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Card container */}
      <div 
        className={`relative w-64 lg:w-72 bg-[var(--color-surface)] rounded-xl overflow-hidden transition-all duration-300 ${
          isCenter 
            ? 'border-2 border-[#FFB800] shadow-[0_0_30px_rgba(255,184,0,0.3)]' 
            : isHovered 
              ? 'border-2 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
              : 'border border-white/10'
        }`}
        style={{
          transform: `rotate(${-rotation}deg)`, // Counter-rotate content
        }}
      >
        {/* Screenshot */}
        <div className="relative h-36 lg:h-40 overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/50 to-transparent" />
          
          {/* Tech stack badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md">
            <span className="text-xs text-[#00F0FF] font-medium">{project.stack?.[0]}</span>
          </div>
          
          {/* GitHub link (top-right) */}
          {project.links?.find(l => l.label.toLowerCase().includes('github')) && (
            <a
              href={project.links.find(l => l.label.toLowerCase().includes('github'))?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-[#00F0FF]/20 transition-colors z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4 text-white" />
            </a>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-base lg:text-lg font-bold text-white mb-1 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs lg:text-sm text-[var(--color-muted)] mb-3">{project.role}</p>
          
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack?.slice(0, 3).map((tech, i) => (
              <span 
                key={i}
                className="px-2 py-0.5 bg-white/5 rounded text-xs text-[#00F0FF]/80"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Live demo button */}
          {project.links?.find(l => l.label.toLowerCase().includes('live') || l.label.toLowerCase().includes('demo')) && (
            <a
              href={project.links.find(l => l.label.toLowerCase().includes('live') || l.label.toLowerCase().includes('demo'))?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-[#FFB800] text-black font-semibold rounded-lg hover:bg-[#CC9300] transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Visit Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        
        {/* Hover glow effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-[#00F0FF] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>
    </motion.div>
  );
}
