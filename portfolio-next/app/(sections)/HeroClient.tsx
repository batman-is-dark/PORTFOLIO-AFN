'use client';

/**
 * HeroClient - Client component with enhanced animations and gradients
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Hero3DBackground = dynamic(() => import('../../components/three/Hero3DBackground'), { ssr: false });

export function HeroClient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 overflow-hidden">
      {/* 3D immersive background */}
      <Hero3DBackground />
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #06B6D4 0%, transparent 50%),
                       radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, #7C3AED 0%, transparent 50%)`,
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? '#06B6D4' : '#7C3AED',
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #06B6D4 0%, #7C3AED 50%, #D6C3A5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            AI Engineer & Innovator
          </motion.h1>
        </motion.div>
        
        <motion.p
          className="text-lg md:text-xl text-[color:var(--color-text-muted)] max-w-3xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          Passionate about <span className="text-primary font-semibold">Machine Learning</span>, <span className="text-secondary font-semibold">Computer Vision</span>, and <span className="text-accent font-semibold">Natural Language Processing</span>.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-[color:var(--color-text-muted)] max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          Building intelligent systems to solve real-world problems. Preparing for advanced studies at <span className="font-bold text-[color:var(--color-text)]">MBZUAI</span>.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(6, 182, 212, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/projects">
              <Button variant="primary" size="lg">
                View Projects →
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(124, 58, 237, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button as="a" href="/cv.pdf" variant="secondary" size="lg">
              Download CV ↓
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}