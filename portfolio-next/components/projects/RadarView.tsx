'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RadarBlip } from './RadarBlip';
import { projects } from '../../content/projects';

export function RadarView() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  
  // Calculate positions for radar layout (circular with larger radius)
  const projectPositions = useMemo(() => {
    const count = projects.length;
    const radius = 38; // Increased radius to prevent clumping
    
    return projects.map((_, index) => {
      // Center project
      if (index === centerIndex) {
        return {
          x: 50,
          y: 50,
          rotation: 0,
          scale: 1.1,
          isCenter: true,
          zIndex: 10,
        };
      }
      
      // Calculate angle - distribute evenly around circle
      // Start from top ( -90 degrees ) and go clockwise
      const angleOffset = -Math.PI / 2; // Start from top
      const angleStep = (2 * Math.PI) / count;
      const angle = angleOffset + ((index - centerIndex + count) % count) * angleStep;
      
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      
      // Rotation points toward center
      const rotation = (angle * 180 / Math.PI) + 90;
      
      return {
        x,
        y,
        rotation,
        scale: 0.9,
        isCenter: false,
        zIndex: 5,
      };
    });
  }, [centerIndex]);
  
  const handleCardClick = (index: number) => {
    if (index !== centerIndex) {
      setCenterIndex(index);
    }
  };

  return (
    <div className="relative w-full min-h-[800px] lg:min-h-[900px] overflow-hidden py-8">
      {/* Radar background */}
      <div className="absolute inset-0 bg-radar-grid">
        {/* Range rings - larger to accommodate spread out projects */}
        {[25, 45, 65].map((radius, i) => (
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
          className="absolute left-1/2 top-1/2 w-[45%] h-1 origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.3) 50%, rgba(0,240,255,0.8) 100%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      {/* Project cards container */}
      <div className="absolute inset-0">
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
              className="absolute cursor-pointer bg-transparent border-none p-0"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: pos.zIndex,
              }}
              aria-label={`Focus on ${project.title} project`}
            >
              <RadarBlip
                project={project}
                position={{ x: 0, y: 0 }} // Position is now handled by button
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
      </div>
      
      {/* Center marker */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
        <div className="w-full h-full rounded-full bg-[#FFB800] animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-[#FFB800] animate-ping opacity-20" />
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest">
          Click cards to focus • Hover for details
        </p>
      </div>
    </div>
  );
}
