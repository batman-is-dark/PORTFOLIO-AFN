'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarView } from '../../components/projects/RadarView';
import { FlightPathView } from '../../components/projects/FlightPathView';
import { HangarView } from '../../components/projects/HangarView';
import { ViewToggle } from '../../components/projects/ViewToggle';

type ViewMode = 'radar' | 'path' | 'hangar';

export function ProjectsSection() {
  const [currentView, setCurrentView] = useState<ViewMode>('radar');

  return (
    <section 
      id="projects" 
      aria-labelledby="projects-heading"
      className="relative py-20 px-6 md:px-12 bg-[var(--color-bg)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-radar-grid opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 space-y-6">
          <motion.span 
            className="text-[#00F0FF] font-sans text-xs uppercase tracking-[0.5em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Portfolio
          </motion.span>
          
          <motion.h2
            id="projects-heading"
            className="text-5xl md:text-7xl font-display font-bold text-primary tracking-tighter text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Selected Works
          </motion.h2>
          
          <motion.p
            className="text-secondary text-lg max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore my projects in AI, Data Science, and innovative solutions.
            Each represents a unique challenge and creative approach.
          </motion.p>
          
          {/* View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
          </motion.div>
        </div>
        
        {/* View Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'radar' && <RadarView />}
            {currentView === 'path' && <FlightPathView />}
            {currentView === 'hangar' && <HangarView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
