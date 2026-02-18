'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RadarBlip } from './RadarBlip';
import { projects } from '../../content/projects';

export function RadarView() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  
  // Calculate positions for radar layout (circular)
  const projectPositions = useMemo(() => {
    const count = projects.length;
    const radius = 30; // Percentage from center
    
    return projects.map((_, index) => {
      // Center project is always at index 0
      if (index === centerIndex) {
        return {
          x: 50,
          y: 50,
          rotation: 0,
          scale: 1,
          isCenter: true,
        };
      }
      
      // Other projects arranged in circle
      const angle = ((index - centerIndex + count) % count) * (360 / count) * (Math.PI / 180);
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      
      // Rotation points toward center
      const rotation = (angle * 180 / Math.PI) + 90;
      
      return {
        x,
        y,
        rotation,
        scale: 0.85,
        isCenter: false,
      };
    });
  }, [centerIndex]);
  
  const handleCardClick = (index: number) => {
    if (index !== centerIndex) {
      setCenterIndex(index);
    }
  };

  return (
    <div className="relative w-full h-[700px] lg:h-[800px] overflow-hidden">
      {/* Radar background */}
      <div className="absolute inset-0 bg-radar-grid">
        {/* Range rings */}
        {[20, 40, 60].map((radius, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00F0FF]/10"
            style={{
              width: `${radius * 2}%`,
              height: `${radius * 2}%`,
            }}
          />
        ))}
        
        {/* Crosshairs */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#00F0FF]/5" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[#00F0FF]/5" />
        </div>
        
        {/* Radar sweep */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-1/2 h-1 origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.3) 50%, rgba(0,240,255,0.8) 100%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      {/* Project cards */}
      {projects.map((project, index) => {
        const pos = projectPositions[index];
        return (
          <button
            key={project.slug}
            onClick={() => handleCardClick(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(index);
              }
            }}
            className="cursor-pointer bg-transparent border-none p-0"
            aria-label={`Focus on ${project.title} project`}
          >
            <RadarBlip
              project={project}
              position={{ x: pos.x, y: pos.y }}
              rotation={pos.rotation}
              scale={pos.scale}
              isCenter={pos.isCenter}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              isHovered={hoveredIndex === index}
            />
          </button>
        );
      })}
      
      {/* Center marker */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
        <div className="w-full h-full rounded-full bg-[#FFB800] animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-[#FFB800] animate-ping opacity-20" />
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest">
          Click cards to focus • Hover for details
        </p>
      </div>
    </div>
  );
}
