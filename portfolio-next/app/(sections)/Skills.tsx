/**
 * Skills - Server component for the Skills section
 * Completely redesigned with enhanced visuals and animations
 */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, 
  BrainCircuit, 
  Wrench, 
  Cpu, 
  Database, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code2,
      skills: ['Python', 'C++', 'SQL', 'HTML', 'JavaScript', 'Arabic', 'English'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI & Machine Learning',
      icon: BrainCircuit,
      skills: ['TensorFlow', 'Keras', 'Scikit-Learn', 'NLTK', 'Pandas', 'NumPy', 'OpenCV'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Tools & Platforms',
      icon: Wrench,
      skills: ['Git', 'Docker', 'Power BI', 'Streamlit', 'Arduino', 'Robotics', 'IBM Data Science'],
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Core Competencies',
      icon: Cpu,
      skills: ['Data Analysis', 'Deductive Reasoning', 'Circuit Design', 'Scientific Computing'],
      color: 'from-green-500 to-emerald-500',
    }
  ];

  return (
    <section 
      id="skills" 
      aria-labelledby="skills-heading" 
      className="relative py-40 px-6 overflow-hidden bg-bg"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[180px]"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12"
        >
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-accent font-sans text-xs tracking-[0.5em] uppercase block"
            >
              Technical Stack
            </motion.span>
            <h2
              id="skills-heading"
              className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tighter"
            >
              Expertise
            </h2>
          </div>
          <div className="max-w-md">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-secondary text-xl font-sans leading-relaxed"
            >
              A comprehensive toolkit developed through rigorous academic study and hands-on project engineering.
            </motion.p>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-accent to-blue-500 mt-6"
            />
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.15, duration: 0.8 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-surface/50 border border-white/10 p-10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-surface">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${category.color} opacity-10 blur-2xl`} />
                
                {/* Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} bg-opacity-10`}>
                    <category.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-2 text-secondary/50">
                    <span className="text-xs tracking-wider uppercase">{category.skills.length} skills</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-[10px] font-sans font-bold text-accent uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                  {category.title}
                  <motion.span 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </h3>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.05 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(255,51,0,0.2)"
                      }}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 text-primary font-sans text-xs uppercase tracking-widest hover:border-accent/50 hover:text-accent transition-all cursor-default group-hover:bg-white/10"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                
                {/* Bottom line accent */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.15 + 0.5, duration: 0.8 }}
                  className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r ${category.color} origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional visual element */}
        <motion.div 
          style={{ y }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-secondary text-sm font-sans">Continuously learning and expanding my toolkit</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
