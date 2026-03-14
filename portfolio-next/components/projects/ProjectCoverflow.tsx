'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Github } from 'lucide-react';
import type { Project } from '../../types/content';

interface ProjectCoverflowProps {
  projects: Project[];
}

export default function ProjectCoverflow({ projects }: ProjectCoverflowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center overflow-hidden py-10">
      <div className="relative w-full max-w-6xl mx-auto h-[450px] flex items-center justify-center perspective-[1200px]">
        <AnimatePresence initial={false} mode="popLayout">
          {projects.map((project, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + projects.length) % projects.length;
            const isNext = index === (currentIndex + 1) % projects.length;
            const isHidden = !isActive && !isPrev && !isNext;

            if (isHidden) return null;

            // Coverflow 3D calculations
            let xPosition = 0;
            let zPosition = 0;
            let rotationY = 0;
            let opacity = 0;
            let scale = 1;

            if (isActive) {
              xPosition = 0;
              zPosition = 0;
              rotationY = 0;
              opacity = 1;
              scale = 1;
            } else if (isPrev) {
              xPosition = -40; // percentage
              zPosition = -150;
              rotationY = 35;
              opacity = 0.5;
              scale = 0.85;
            } else if (isNext) {
              xPosition = 40;
              zPosition = -150;
              rotationY = -35;
              opacity = 0.5;
              scale = 0.85;
            }

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: `${xPosition}%`,
                  z: zPosition,
                  rotateY: rotationY,
                  opacity: opacity,
                  scale: scale,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className={`absolute w-full max-w-3xl transform-style-3d cursor-pointer ${
                  isActive ? 'z-30' : 'z-10'
                }`}
                onClick={() => {
                  if (isPrev) prevSlide();
                  if (isNext) nextSlide();
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className={`relative group rounded-3xl overflow-hidden border ${
                    isActive ? 'border-accent/50 shadow-2xl shadow-accent/20' : 'border-white/10 shadow-lg'
                  } bg-surface/80 backdrop-blur-xl transition-colors duration-500`}
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    {isActive && project.links && project.links.length > 0 ? (
                      <a
                        href={project.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 w-full h-full cursor-pointer z-10 group/imagelink"
                      >
                        <Image
                          src={project.images?.hero ?? project.three?.fallbackImage ?? project.reel?.poster ?? '/images/projects/default.jpg'}
                          alt={project.title}
                          fill
                          className="object-cover group-hover/imagelink:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 800px"
                          priority={isActive}
                        />
                      </a>
                    ) : (
                      <Image
                        src={project.images?.hero ?? project.three?.fallbackImage ?? project.reel?.poster ?? '/images/projects/default.jpg'}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                        priority={isActive}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-secondary text-sm sm:text-base line-clamp-2 mb-4 max-w-2xl">
                          {project.role}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full border border-accent/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 4 && (
                            <span className="px-3 py-1 text-xs font-mono text-secondary bg-white/5 rounded-full border border-white/10">
                              +{project.stack.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {isActive && (
                        <div className="flex gap-3 shrink-0">
                          {project.links && project.links.length > 0 && (
                            <a
                              href={project.links[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors group/btn"
                              aria-label={project.links[0].label}
                            >
                              <Github className="w-5 h-5 text-primary group-hover/btn:scale-110 transition-transform" />
                            </a>
                          )}
                          <Link
                            href={`/projects/${project.slug}`}
                            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-background rounded-full font-bold transition-all group/btn"
                          >
                            Read Case Study
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Overlay for inactive slides */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors z-20" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-8 z-40">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-primary transition-all hover:scale-110"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-accent' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-primary transition-all hover:scale-110"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
