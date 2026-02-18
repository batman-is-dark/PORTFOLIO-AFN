/**
 * Achievements - Server component for Awards and Volunteering
 * Completely redesigned with enhanced visuals and animations
 */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Award, Heart, ArrowRight, Star } from 'lucide-react';

export function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const achievements = [
    {
      icon: Trophy,
      rank: '3rd Place',
      title: 'TechFest 2025',
      description: 'Environmental Data Analysis Project focusing on sustainable urban development and smart city solutions.',
      year: '2025',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Award,
      rank: 'Nominee',
      title: 'Best Innovation Award',
      description: 'Innovista Robot Fish Project exploring biomimetic propulsion systems for marine exploration.',
      year: '2024',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Heart,
      rank: 'Volunteer',
      title: 'Recognition (2024)',
      description: 'SciScape Science Fair Logistics & Mentoring for junior researchers and students.',
      year: '2024',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section 
      id="achievements" 
      aria-labelledby="achievements-heading" 
      className="relative py-40 px-6 overflow-hidden bg-bg"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]"
        />
        
        {/* Stars pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
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
          className="space-y-6 mb-24 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-accent font-sans text-xs tracking-[0.5em] uppercase block"
          >
            Milestones
          </motion.span>
          <h2
            id="achievements-heading"
            className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tighter"
          >
            Key Achievements
          </h2>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-surface/50 border border-white/10 p-10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-surface h-full">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${achievement.color}`} />
                
                {/* Number background */}
                <div className="absolute -bottom-4 -right-4 text-[10rem] font-display font-bold text-primary/[0.03] group-hover:text-accent/[0.08] transition-all duration-700 leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Year */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${achievement.color} bg-opacity-10`}>
                      <achievement.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          className={`w-1 h-1 rounded-full bg-gradient-to-r ${achievement.color}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Rank */}
                  <div className={`text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-4 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                    {achievement.rank}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-3xl font-display font-bold text-primary mb-4 group-hover:text-accent transition-colors leading-tight">
                    {achievement.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-secondary font-sans text-base leading-relaxed">
                    {achievement.description}
                  </p>
                  
                  {/* Year badge */}
                  <div className="absolute top-10 right-10">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-secondary text-xs font-sans">
                      {achievement.year}
                    </span>
                  </div>
                </div>

                {/* Arrow on hover */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 right-6"
                >
                  <div className={`p-2 rounded-full bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom visual element */}
        <motion.div 
          style={{ y }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <div className="flex -space-x-2">
              {[Trophy, Award, Heart].map((Icon, index) => (
                <div 
                  key={index}
                  className="w-8 h-8 rounded-full bg-surface border border-white/20 flex items-center justify-center"
                >
                  <Icon className="w-4 h-4 text-secondary" />
                </div>
              ))}
            </div>
            <span className="text-secondary text-sm font-sans">More achievements coming soon</span>
            <Star className="w-4 h-4 text-accent animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
