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
      className={`site-topbar ${isScrolled ? 'scrolled' : ''}`}
      style={{ ['--header-accent' as any]: accent || '#7c3aed' }}
      initial={false}
      animate={isScrolled ? 'scrolled' : 'normal'}
      variants={{
        normal: {
          width: '100%',
          height: 64,
          borderRadius: 0,
          top: 0,
          left: 0,
          right: 0,
          position: 'fixed',
          zIndex: 50,
        },
        scrolled: {
          width: 200,
          height: 40,
          borderRadius: 20,
          top: 20,
          left: '50%',
          x: '-50%',
          position: 'fixed',
          zIndex: 50,
        },
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="logo" width={36} height={36} className="block" />
          <span className="text-white font-bold select-none">Your Name</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
        <a href="#projects" className="text-white/80 hover:text-white">Projects</a>
        <a href="#about" className="text-white/80 hover:text-white">About</a>
        <a href="#contact" className="text-white/80 hover:text-white">Contact</a>
      </nav>

      <div className="flex items-center gap-3">
        <a href="/resume.pdf" className="topbar-cta inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold">
          Resume
        </a>
        <button className="md:hidden text-white/80">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </motion.header>
  );
}
