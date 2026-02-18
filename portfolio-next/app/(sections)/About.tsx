/**
 * About - Server component for the About section
 * Completely redesigned with enhanced visuals and animations
 */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Github, MapPin, Award, BookOpen, Users } from 'lucide-react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    { icon: Award, value: '10+', label: 'Projects' },
    { icon: BookOpen, value: '3+', label: 'Years Learning' },
    { icon: Users, value: '50+', label: 'Students Mentored' },
    { icon: MapPin, value: 'UAE', label: 'Location' },
  ];

  return (
    <section 
      id="about" 
      aria-labelledby="about-heading" 
      className="relative py-40 px-6 overflow-hidden bg-bg"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-12">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-accent font-sans text-xs tracking-[0.5em] uppercase block">
                The Narrative
              </span>
              <h2
                id="about-heading"
                className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tighter"
              >
                About Me
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-2xl text-primary/90">
                I am an aspiring Artificial Intelligence undergraduate from <span className="text-accent font-semibold">The Indian High School, Dubai</span>, with a profound passion for <span className="text-primary font-semibold italic">Machine Learning</span> and <span className="text-primary font-semibold italic">Robotics</span>.
              </p>
              <p className="text-lg text-secondary leading-relaxed">
                My journey in AI has been shaped by hands-on experience with Python, TensorFlow, and Scikit-Learn. I've built impactful projects ranging from <span className="text-accent">skin-disease detectors</span> to <span className="text-accent">environmental analytics dashboards</span>. I actively mentor peers in ML and coding, believing that <span className="text-primary italic">shared knowledge amplifies innovation</span>.
              </p>
              <p className="text-lg text-secondary leading-relaxed">
                Currently, I'm deepening my mathematical foundations to excel in rigorous AI programs, with a specific goal of joining <span className="text-blue-400 font-semibold">MBZUAI</span> to contribute to the future of artificial intelligence.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group p-6 bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-300"
                >
                  <stat.icon className="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <div className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs font-sans uppercase tracking-wider text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex gap-6 pt-4"
            >
              <a
                href="https://github.com/batman-is-dark"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-primary font-sans font-bold uppercase tracking-[0.2em] text-sm hover:text-accent transition-colors"
              >
                <div className="p-3 bg-white/5 border border-white/10 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                  <Github className="h-5 w-5" />
                </div>
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-primary font-sans font-bold uppercase tracking-[0.2em] text-sm hover:text-accent transition-colors"
              >
                <div className="p-3 bg-white/5 border border-white/10 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Image/Visual */}
          <motion.div 
            style={{ y, opacity }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="sticky top-32">
              {/* Main Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] bg-gradient-to-br from-surface to-bg border border-white/10 p-8 overflow-hidden group"
              >
                {/* Animated background gradient */}
                <motion.div 
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-blue-500/5 bg-[length:200%_200%]"
                />
                
                {/* Geometric shapes */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute top-10 right-10 w-40 h-40 border border-white/5 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-20 left-10 w-24 h-24 border border-accent/10 rotate-45"
                />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Top - Initials */}
                  <div className="flex justify-between items-start">
                    <div className="text-8xl font-display font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                      AK
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center"
                    >
                      <span className="text-accent text-2xl font-bold">AI</span>
                    </motion.div>
                  </div>

                  {/* Middle - Name */}
                  <div className="text-center">
                    <h3 className="text-4xl font-display font-bold text-primary mb-2">Afnan K.A Rafi</h3>
                    <p className="text-secondary text-sm tracking-[0.3em] uppercase">AI Enthusiast</p>
                  </div>

                  {/* Bottom - Quote */}
                  <div className="p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
                    <p className="text-secondary text-sm italic leading-relaxed">
                      "The future of AI isn't just about machines thinking&mdash;it's about <span className="text-accent">machines and humans thinking together</span>."
                    </p>
                  </div>
                </div>

                {/* Hover overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity duration-500 pointer-events-none"
                />
              </motion.div>

              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -right-6 p-6 bg-surface border border-accent/30 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                  <span className="text-primary font-sans text-sm font-medium">Open to Opportunities</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
