'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // By removing height: 100% from html/body, window.scrollY will actually update now
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Check initial position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed left-0 right-0 z-50 pointer-events-none transition-all duration-500 ease-in-out ${isScrolled ? 'top-4 px-4 sm:px-6' : 'top-0 px-0'}`}>
      <header
        className={`mx-auto max-w-7xl w-full pointer-events-auto transition-all duration-500 flex items-center justify-between ${
          isScrolled 
            ? 'rounded-2xl bg-surface/90 backdrop-blur-md border border-accent/60 shadow-[0_4px_30px_rgba(255,51,0,0.15)] py-3 px-6' 
            : 'rounded-none bg-gradient-to-b from-bg/90 to-transparent border-transparent shadow-none py-6 px-6 md:px-12'
        }`}
      >
        <Link href="/" className="flex items-center gap-4 group">
          <div className={`w-10 h-10 flex items-center justify-center text-white font-display font-bold text-xl transition-all duration-500 rounded-lg ${
            isScrolled ? 'bg-accent shadow-lg shadow-accent/40' : 'bg-white/10 group-hover:bg-accent/80'
          }`}>
            A
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-bold tracking-tight text-lg line-clamp-1 transition-colors duration-500 ${
              isScrolled ? 'text-accent' : 'text-primary'
            }`}>
              AFNAN K.A RAFI
            </span>
            <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-secondary mt-0.5">
              Aspirant @ MBZUAI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {['Works', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-xs font-sans font-bold uppercase tracking-[0.2em] transition-colors duration-300 relative group py-2 ${
                isScrolled ? 'text-white hover:text-accent' : 'text-secondary hover:text-white'
              }`}
            >
              {item}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                isScrolled ? 'bg-accent' : 'bg-primary'
              }`}></span>
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center">
          <a 
            href="/Afnan_CV.pdf" 
            download="Afnan_CV.pdf" 
            className={`hidden md:flex items-center justify-center px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-widest transition-all duration-300 rounded ${
              isScrolled 
                ? 'bg-accent text-white hover:bg-accent/80 shadow-md shadow-accent/20' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Resume
          </a>
          
          {/* Mobile Menu Button */}
          <button className={`md:hidden p-2 rounded transition-colors ${
            isScrolled ? 'text-accent hover:bg-accent/10' : 'text-primary hover:bg-white/10'
          }`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
