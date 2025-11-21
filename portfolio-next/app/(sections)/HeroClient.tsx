/**
 * HeroClient - Client-side interactive elements for the Hero section
 */
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

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
          <button
            onClick={scrollToProjects}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]"
          >
            View Projects
          </button>
          <a
            href="mailto:afnusha.r@gmail.com"
            className="px-8 py-3 bg-transparent border border-gray-500 hover:border-white text-gray-300 hover:text-white rounded-full font-medium transition-all"
          >
            Contact Me
          </a>
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