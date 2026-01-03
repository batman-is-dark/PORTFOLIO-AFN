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
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            AFNAN K.A RAFI
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
          MBZUAI Aspirant & Full Stack Engineer
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <MagneticButton>
            <button
              onClick={scrollToProjects}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]"
            >
              View Projects
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <a
              href="/resume.docx"
              download="Afnan_CV.docx"
              className="px-8 py-3 bg-transparent border border-gray-500 hover:border-white text-gray-300 hover:text-white rounded-full font-medium transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download CV
            </a>
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="animate-bounce text-gray-500">
          <ArrowDown size={24} />
        </div>
      </motion.div>
    </div>
  );
}