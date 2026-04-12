/**
 * Academic - Server component for the Academic section
 * Completely redesigned with enhanced visuals and animations
 */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, BookOpen, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

export function Academic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const education = {
    school: 'The Indian High School, Dubai',
    curriculum: 'CBSE Science Stream (Physics, Chemistry, Mathematics, Artificial Intelligence)',
    period: '2012-2026',
    expectedGraduation: 'April 2026',
    expectedAggregate: '84%',
    coursework: ['Physics', 'Chemistry', 'Mathematics', 'Artificial Intelligence', 'English Core', 'Calculus', 'Linear Algebra'],
  };

  const certifications = [
    { name: 'CS50P: Introduction to Programming with Python', issuer: 'Harvard University', url: '#' },
    { name: 'Scientific Computing with Python', issuer: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/certification/fccd1489690-8619-48c7-b91d-c32f74ae7dab/scientific-computing-with-python-v7' },
    { name: 'Data Analysis with Python', issuer: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/certification/fccd1489690-8619-48c7-b91d-c32f74ae7dab/data-analysis-with-python-v7' },
    { name: 'Machine Learning & Scientific Computing with Python', issuer: 'FreeCodeCamp', url: '#' },
    { name: 'Foundations of Generative AI Learning', issuer: 'Google Cloud', url: '#' },
    { name: 'Data Science Coursework', issuer: 'IBM', url: '#' },
  ];

  return (
    <section 
      id="academic" 
      aria-labelledby="academic-heading" 
      className="relative py-40 px-6 overflow-hidden bg-bg"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} 
        />
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-accent font-sans text-xs tracking-[0.5em] uppercase block"
          >
            Foundations
          </motion.span>
          <h2
            id="academic-heading"
            className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tighter"
          >
            Academic Summary
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Education - Left Column */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <GraduationCap className="w-6 h-6 text-accent" strokeWidth={1.5} />
              <h3 className="text-[10px] font-sans font-bold text-accent uppercase tracking-[0.4em]">
                Education
              </h3>
            </motion.div>

            {/* Main Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-surface to-bg border border-white/10 p-12 overflow-hidden">
                {/* Animated background */}
                <motion.div 
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-accent/5 bg-[length:200%_200%]"
                />
                
                {/* Number background */}
                <div className="absolute top-0 right-0 p-8">
                  <motion.span 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-8xl font-display font-bold text-primary/5 group-hover:text-accent/10 transition-colors"
                  >
                    01
                  </motion.span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-4xl font-display font-bold text-primary leading-tight">
                      {education.school}
                    </h4>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-secondary text-xs font-sans">{education.period}</span>
                    </div>
                  </div>
                  
                  <p className="text-secondary font-sans text-lg italic mb-8">
                    {education.curriculum} (2012-2026)
                  </p>

                  {/* Stats */}
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white/5 border border-white/10 p-6">
                      <span className="font-sans text-secondary uppercase tracking-[0.2em] text-[10px] font-bold block mb-2">Expected Aggregate</span>
                      <span className="text-5xl font-display font-bold text-accent">{education.expectedAggregate}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6">
                      <span className="font-sans text-secondary uppercase tracking-[0.2em] text-[10px] font-bold block mb-2">Status</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-primary font-sans font-medium">In Progress</span>
                      </div>
                    </div>
                  </div>

                  {/* Coursework */}
                  <div className="space-y-4">
                    <h5 className="font-sans font-bold text-primary uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent" />
                      Relevant Coursework
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {education.coursework.map((course, index) => (
                        <motion.span
                          key={course}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-white/5 border border-white/10 text-secondary text-xs font-sans uppercase tracking-widest hover:border-accent hover:text-primary transition-all cursor-default"
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certifications - Right Column */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Award className="w-6 h-6 text-accent" strokeWidth={1.5} />
              <h3 className="text-[10px] font-sans font-bold text-accent uppercase tracking-[0.4em]">
                Certifications
              </h3>
            </motion.div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group bg-surface/50 border border-white/10 p-6 hover:border-accent/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h5 className="font-display font-bold text-xl text-primary group-hover:text-accent transition-colors">
                        {cert.name}
                      </h5>
                      <p className="text-secondary text-xs font-sans uppercase tracking-[0.2em] mt-2 font-bold">
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary/20 font-display font-bold text-xl group-hover:text-accent/30 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-secondary/50 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual element */}
            <motion.div 
              style={{ y }}
              className="flex justify-center pt-8"
            >
              <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-secondary text-xs font-sans">Continuously learning</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
