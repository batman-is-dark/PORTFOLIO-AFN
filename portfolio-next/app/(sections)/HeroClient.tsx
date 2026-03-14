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
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Colorful gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12 relative z-10"
      >
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-block px-4 py-1 border border-accent/50 bg-accent/10 mb-6"
          >
            <span className="text-accent font-sans text-[10px] tracking-[0.5em] uppercase font-bold">
              ● Aspirant @ MBZUAI • 2026
            </span>
          </motion.div>
          <h1 className="text-7xl md:text-[10rem] font-display font-bold tracking-tighter leading-[0.9]">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-yellow-400 bg-clip-text text-transparent">
              AFNAN<br />K.A RAFI
            </span>
          </h1>
        </div>

        <p className="text-2xl md:text-3xl text-secondary max-w-3xl mx-auto font-sans font-light leading-relaxed">
          Engineering <span className="font-bold italic bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Autonomous Systems</span> and <span className="font-bold italic bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Human-AI Interaction</span> with mathematical precision.
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
              href="/Afnan_CV.pdf"
              download="Afnan_CV.pdf"
              className="px-12 py-5 bg-transparent border border-white/10 hover:border-accent text-primary rounded-none font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2"
            >
              Resume
            </a>
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden"
        onClick={scrollToProjects}
        role="button"
        tabIndex={0}
        aria-label="Scroll to explore works"
      >
        <div className="flex flex-col items-center gap-3 group relative">
          {/* Pulsing ring background for visibility */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent/5 rounded-full blur-xl animate-pulse group-hover:bg-accent/10 transition-colors" />
          
          <span className="relative text-xs font-sans uppercase tracking-[0.3em] font-bold text-secondary group-hover:text-accent transition-colors drop-shadow-md bg-bg/50 px-2 py-1 rounded backdrop-blur-sm border border-transparent group-hover:border-accent/20">
            Scroll to Explore
          </span>
          <ArrowDown className="relative w-6 h-6 text-accent animate-bounce mt-1 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,51,0,0.5)]" />
        </div>
      </motion.div>
    </div>
  );
}