'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../content/projects';

export function HangarView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => {
        const imageUrl = project.images?.hero || project.three?.fallbackImage || '/images/projects/skin-disease-hero-01.jpg';
        
        return (
          <motion.div
            key={project.slug}
            className="group relative bg-[var(--color-surface)] rounded-xl overflow-hidden border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {/* Screenshot */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />
              
              {/* Tech badge */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md">
                <span className="text-xs text-[#00F0FF] font-medium">{project.stack?.[0]}</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
              <p className="text-sm text-[var(--color-muted)] mb-3">{project.role}</p>
              
              {/* Problem preview */}
              <p className="text-sm text-secondary line-clamp-2 mb-4">{project.problem}</p>
              
              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack?.slice(0, 4).map((tech, i) => (
                  <span 
                    key={i}
                    className="px-2 py-0.5 bg-white/5 rounded text-xs text-[#00F0FF]/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2">
                {project.links?.find(l => l.label.toLowerCase().includes('live') || l.label.toLowerCase().includes('demo')) && (
                  <a
                    href={project.links.find(l => l.label.toLowerCase().includes('live') || l.label.toLowerCase().includes('demo'))?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#FFB800] text-black font-semibold rounded-lg hover:bg-[#CC9300] transition-colors text-sm"
                  >
                    <span>Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                
                {project.links?.find(l => l.label.toLowerCase().includes('github')) && (
                  <a
                    href={project.links.find(l => l.label.toLowerCase().includes('github'))?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2.5 border border-white/20 rounded-lg hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
