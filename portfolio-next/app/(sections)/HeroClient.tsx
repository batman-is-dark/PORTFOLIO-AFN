/**
 * HeroClient - Client-side interactive elements for the Hero section
 */
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import MagneticButton from '../../components/ui/MagneticButton';

export function HeroClient() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12"
      >
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-block px-4 py-1 border border-accent/30 bg-accent/5 mb-6"
          >
            <span className="text-accent font-sans text-[10px] tracking-[0.5em] uppercase font-bold">
              Aspirant @ MBZUAI • 2026
            </span>
          </motion.div>
          <h1 className="text-7xl md:text-[10rem] font-display font-bold tracking-tighter text-primary leading-[0.9]">
            AFNAN<br />K.A RAFI
          </h1>
        </div>

        <p className="text-2xl md:text-3xl text-secondary max-w-3xl mx-auto font-sans font-light leading-relaxed">
          Engineering <span className="text-primary font-bold italic">Autonomous Systems</span> and <span className="text-primary font-bold italic">Human-AI Interaction</span> with mathematical precision.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-16">
          <MagneticButton>
            <button
              onClick={scrollToProjects}
              className="px-12 py-5 bg-primary text-bg hover:bg-accent hover:text-white rounded-none font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl"
            >
              Explore Works
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <a
              href="/resume.docx"
              download="Afnan_CV.docx"
              className="px-12 py-5 bg-transparent border border-white/10 hover:border-accent text-primary rounded-none font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2"
            >
              Resume
            </a>
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-secondary/50 rotate-90 mb-8">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent"></div>
        </div>
      </motion.div>
    </div>
  );
}