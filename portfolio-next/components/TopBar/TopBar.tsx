'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function TopBar({ accent }: { accent?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-surface/70 backdrop-blur-md border border-white/10 py-4 mx-6 top-4 left-6 right-6 rounded-xl shadow-lg shadow-black/40' 
          : 'bg-transparent py-8'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`${isScrolled ? 'mx-0' : 'max-w-7xl mx-auto'} px-6 flex items-center justify-between`}>
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-primary group-hover:bg-accent flex items-center justify-center text-bg group-hover:text-white font-display font-bold text-2xl transition-all duration-300">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-primary font-display font-bold tracking-tight text-lg leading-none group-hover:text-accent transition-colors">
              AFNAN K.A RAFI
            </span>
            <span className="text-[8px] font-sans font-bold uppercase tracking-[0.4em] text-secondary mt-1">
              Aspirant @ MBZUAI
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-12" aria-label="Main navigation">
          <a href="#projects" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-secondary hover:text-accent transition-colors">Works</a>
          <a href="#about" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-secondary hover:text-accent transition-colors">About</a>
          <a href="#contact" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-secondary hover:text-accent transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-8">
          <a 
            href="/Afnan_CV.pdf" 
            download="Afnan_CV.pdf" 
            className="hidden md:block text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary hover:text-accent transition-colors relative group"
          >
            Resume
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"></span>
          </a>
          <button className="md:hidden text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
