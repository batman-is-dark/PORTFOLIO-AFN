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
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? 'top-4 left-4 right-4 bg-surface/80 backdrop-blur-md border-2 border-accent/60 py-4 rounded-xl shadow-2xl shadow-accent/20' 
          : 'top-0 left-0 right-0 bg-transparent py-8'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`${isScrolled ? 'px-8' : 'max-w-7xl mx-auto px-6'} flex items-center justify-between`}>
        <Link href="/" className="flex items-center gap-4 group">
          <div className={`w-10 h-10 flex items-center justify-center text-white font-display font-bold text-2xl transition-all duration-300 ${
            isScrolled 
              ? 'bg-accent/80 shadow-lg shadow-accent/40 rounded-lg' 
              : 'bg-primary group-hover:bg-accent'
          }`}>
            A
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-bold tracking-tight text-lg leading-none transition-colors ${
              isScrolled 
                ? 'text-accent' 
                : 'text-primary group-hover:text-accent'
            }`}>
              AFNAN K.A RAFI
            </span>
            <span className="text-[8px] font-sans font-bold uppercase tracking-[0.4em] text-secondary mt-1">
              Aspirant @ MBZUAI
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-12" aria-label="Main navigation">
          <a href="#projects" className={`text-[10px] font-sans font-bold uppercase tracking-[0.3em] transition-colors ${
            isScrolled 
              ? 'text-accent/80 hover:text-accent' 
              : 'text-secondary hover:text-accent'
          }`}>Works</a>
          <a href="#about" className={`text-[10px] font-sans font-bold uppercase tracking-[0.3em] transition-colors ${
            isScrolled 
              ? 'text-accent/80 hover:text-accent' 
              : 'text-secondary hover:text-accent'
          }`}>About</a>
          <a href="#contact" className={`text-[10px] font-sans font-bold uppercase tracking-[0.3em] transition-colors ${
            isScrolled 
              ? 'text-accent/80 hover:text-accent' 
              : 'text-secondary hover:text-accent'
          }`}>Contact</a>
        </nav>

        <div className="flex items-center gap-8">
          <a 
            href="/Afnan_CV.pdf" 
            download="Afnan_CV.pdf" 
            className={`hidden md:block text-[10px] font-sans font-bold uppercase tracking-[0.3em] transition-colors relative group ${
              isScrolled 
                ? 'text-accent' 
                : 'text-primary hover:text-accent'
            }`}
          >
            Resume
            <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
              isScrolled 
                ? 'w-full' 
                : 'w-0 group-hover:w-full'
            }`}></span>
          </a>
          <button className={`md:hidden font-display font-bold ${isScrolled ? 'text-accent' : 'text-primary'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
