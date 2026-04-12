/**
 * Achievements - Server component for Awards and Volunteering
 * Completely redesigned with enhanced visuals and animations
 */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Trophy, Award, Heart, ArrowRight, Star, FileText } from 'lucide-react';
import { CertificateCarousel } from '../../components/CertificateCarousel';

export function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const [certView, setCertView] = useState<'grid' | 'carousel'>('carousel');

  const achievements = [
    {
      icon: Trophy,
      rank: '3rd Place',
      title: 'TechFest 2025 - Data Science Category',
      description: 'Awarded 3rd Place in the Data Science category at TechFest 2025 for the Environmental Data Analysis Project focusing on sustainable urban development and smart city solutions.',
      year: '2025',
      isCertificate: false,
    },
    {
      icon: Award,
      rank: 'Nominee',
      title: 'Best Innovation Award',
      description: 'Innovista Robot Fish Project exploring biomimetic propulsion systems for marine exploration.',
      year: '2024',
      color: 'from-purple-500 to-pink-500',
      isCertificate: false,
    },
    {
      icon: Heart,
      rank: 'Volunteer',
      title: 'Recognition (2024)',
      description: 'SciScape Science Fair Logistics & Mentoring for junior researchers and students.',
      year: '2024',
      color: 'from-green-500 to-emerald-500',
      isCertificate: false,
    },
    {
      icon: Trophy,
      rank: 'National Finalist',
      title: 'Bharat Innovation Challenge',
      description: 'National finalist in the Bharat Innovation Challenge organized by Lovely Professional University, showcasing innovative solutions and entrepreneurial excellence.',
      year: '2025',
      color: 'from-blue-500 to-cyan-500',
      isCertificate: false,
    },
    {
      icon: Award,
      rank: 'Round 2',
      title: 'GDG TechSprint Online Hackathon',
      description: 'Advanced to Round 2 (National Semi-Finals) of the prestigious online hackathon organized by Google Developer Group, demonstrating exceptional rapid-prototyping capabilities.',
      year: '2025',
      color: 'from-red-500 to-orange-500',
      isCertificate: false,
    },
    {
      icon: Trophy,
      rank: 'National Finalist',
      title: 'IIT-Kharagpur 6th Data Science Hackathon',
      description: 'Advanced to the national first round of India\'s premier data science competition organized by IIT-Kharagpur, competing with top data science talent globally.',
      year: '2026',
      color: 'from-amber-500 to-yellow-500',
      isCertificate: false,
    },
    {
      icon: Heart,
      rank: 'Runner-Up',
      title: 'Innovista 2025 - Debate Competition',
      description: 'Runner-Up in the Debate competition of INNOVISTA 2025, recognized for pioneering analysis of AI-human collaboration frameworks and ethical technology disruption.',
      year: '2025',
      color: 'from-pink-500 to-rose-500',
      isCertificate: false,
    },
    {
      icon: Award,
      rank: 'Rank #50',
      title: 'Elite Coders of Winter',
      description: 'Achieved Top 75% ranking (Rank #50+) globally in high-intensity AI-agentic engineering sprint among 1000+ international developers, demonstrating exceptional problem-solving and rapid prototyping capabilities.',
      year: '2025',
      color: 'from-indigo-500 to-purple-500',
      isCertificate: false,
    },
  ];

  const certificates = [
    {
      id: 'uae-innovaite',
      icon: FileText,
      rank: 'Participant',
      title: 'UAE InnovAIte Hackathon',
      organization: 'National Program for Coders',
      description: 'Certificate of participation in the UAE InnovAIte Hackathon (January 9-11, 2026), an international hackathon organized by the UAE to promote innovation and coding excellence among developers.',
      year: '2026',
      color: 'from-amber-500 to-yellow-500',
      imageUrl: '/certificates/Afnan K.A Rafi_CertificateOfParticipation_page-0001.jpg',
      techTags: ['Hackathon', 'Innovation', 'AI', 'Coding'],
    },
    {
      id: 'kdsh',
      icon: FileText,
      rank: 'Participant (Round 1)',
      title: 'Kharagpur Data Science Hackathon',
      organization: 'IIT Kharagpur (Kharagpur Data Analytics Group)',
      description: 'International data science competition focused on predictive modeling and analytics.',
      year: '2026',
      color: 'from-blue-500 to-cyan-500',
      imageUrl: '/certificates/KDSH_2026_afnan_rafi_page-0001.jpg',
      techTags: ['Data Analytics', 'Predictive Modeling', 'Python'],
    },
    {
      id: 'techsprint',
      icon: FileText,
      rank: 'Participant',
      title: 'TechSprint Online Hackathon',
      organization: 'Google Developer Group (GDG) - BPIT',
      description: 'Awarded for participation in TechSprint, an online hackathon organized by GDG BPIT, in recognition of active involvement and commitment to learning and innovation.',
      year: '2025',
      color: 'from-red-500 to-orange-500',
      imageUrl: '/certificates/certificate - AFN UPSURGE_page-0001.jpg',
      techTags: ['Software Engineering', 'Rapid Prototyping', 'Innovation'],
    },
    {
      id: 'watt',
      icon: FileText,
      rank: 'Participant',
      title: '"WATT\'s the Future?" Competition',
      organization: 'Heriot-Watt University (UK/Dubai)',
      description: 'Awarded for participating in the "WATT\'s the Future?" competition from The Indian High School.',
      year: '2024',
      color: 'from-green-500 to-teal-500',
      imageUrl: '/certificates/heriot_watt_pages-to-jpg-0001.jpg',
      techTags: ['Sustainability', 'Engineering Design', 'Future Tech'],
    },
    {
      id: 'innovista',
      icon: FileText,
      rank: 'Runner-Up',
      title: 'INNOVISTA 2025 - Debate Competition',
      organization: 'School',
      description: 'Runner-Up in the Debate – Clash of Ideas, Debate Competition segment of INNOVISTA 2025, showcasing oratory and critical thinking skills.',
      year: '2025',
      color: 'from-amber-500 to-orange-500',
      imageUrl: '/certificates/innovista_debate_2025.jpg',
      techTags: ['Debate', 'Public Speaking', 'Critical Thinking'],
    },
    {
      id: 'techfest',
      icon: FileText,
      rank: 'Participant',
      title: 'Group TechFest',
      organization: 'School',
      description: 'Participated in the Group TechFest held on 6 May 2025, demonstrating technical innovation and collaborative problem-solving.',
      year: '2025',
      color: 'from-purple-500 to-violet-500',
      imageUrl: '/certificates/techfest_2025.jpg',
      techTags: ['Technology', 'Team Collaboration', 'Innovation'],
    },
    {
      id: 'wellbeing',
      icon: FileText,
      rank: 'Recognition',
      title: 'Wellbeing Inspirer',
      organization: 'School',
      description: 'Recognized as Wellbeing Inspirer during the academic year 2024-25 for valuable contribution to student wellbeing and community support.',
      year: '2024-25',
      color: 'from-pink-500 to-rose-500',
      imageUrl: '/certificates/wellbeing_inspirer_2024-25.jpg',
      techTags: ['Leadership', 'Wellbeing', 'Community'],
    },
    {
      id: 'synergy',
      icon: FileText,
      rank: 'Participant',
      title: 'Synergy Explore - Project Exhibition',
      organization: 'School',
      description: 'Selected participant in the Synergy Explore - Project Exhibition, showcasing innovative project development and hands-on technical skills.',
      year: '2025',
      color: 'from-indigo-500 to-blue-500',
      imageUrl: '/certificates/synergy_explore_2025.jpg',
      techTags: ['Project Showcase', 'Technical Skills', 'Exhibition'],
    },
    {
      id: 'sciscape',
      icon: FileText,
      rank: 'Contributing Member',
      title: 'SciScape 2024-25',
      organization: 'School',
      description: 'Certificate of Appreciation in recognition of valuable contribution to the success of SciScape 2024-25, supporting science education initiatives.',
      year: '2024-25',
      color: 'from-cyan-500 to-sky-500',
      imageUrl: '/certificates/sciscape_2024-25.jpg',
      techTags: ['Science Fair', 'Mentoring', 'Education'],
    },
    {
      id: 'fcc-data-analysis',
      icon: FileText,
      rank: 'Certification',
      title: 'Data Analysis with Python',
      organization: 'FreeCodeCamp',
      description: 'Comprehensive certification in data analysis using Python, covering data manipulation, visualization, and statistical analysis techniques. Completed January 2, 2026, representing approximately 300 hours of work.',
      year: '2026',
      color: 'from-yellow-500 to-orange-500',
      imageUrl: '/certificates/data_ana_page-0001.jpg',
      techTags: ['Python', 'Data Analysis', 'Statistics'],
      certLink: {
        label: 'Verify Certificate',
        url: 'https://www.freecodecamp.org/certification/fccd1489690-8619-48c7-b91d-c32f74ae7dab/data-analysis-with-python-v7'
      }
    },
    {
      id: 'fcc-scientific-computing',
      icon: FileText,
      rank: 'Certification',
      title: 'Scientific Computing with Python',
      organization: 'FreeCodeCamp',
      description: 'Professional certification in scientific computing with Python, mastering numerical methods, algorithms, and scientific computation principles. Completed January 2, 2026, representing approximately 300 hours of work.',
      year: '2026',
      color: 'from-green-500 to-emerald-500',
      imageUrl: '/certificates/scientifi_page-0001.jpg',
      techTags: ['Python', 'Scientific Computing', 'Algorithms'],
      certLink: {
        label: 'Verify Certificate',
        url: 'https://www.freecodecamp.org/certification/fccd1489690-8619-48c7-b91d-c32f74ae7dab/scientific-computing-with-python-v7'
      }
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

        {/* Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 space-y-8"
        >
          <div className="text-center space-y-4 mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-accent font-sans text-xs tracking-[0.5em] uppercase block"
            >
              Professional Credentials
            </motion.span>
            <h3 className="text-5xl md:text-6xl font-display font-bold text-primary tracking-tighter">
              Certifications & Awards
            </h3>
            
            {/* View Toggle */}
            <div className="flex justify-center gap-3 mt-8">
              <motion.button
                onClick={() => setCertView('carousel')}
                className={`px-6 py-2 font-sans font-semibold text-sm rounded-lg transition-all ${
                  certView === 'carousel'
                    ? 'bg-accent text-background border border-accent'
                    : 'bg-white/5 text-secondary border border-white/10 hover:border-accent/50 hover:text-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Carousel View
              </motion.button>
              <motion.button
                onClick={() => setCertView('grid')}
                className={`px-6 py-2 font-sans font-semibold text-sm rounded-lg transition-all ${
                  certView === 'grid'
                    ? 'bg-accent text-background border border-accent'
                    : 'bg-white/5 text-secondary border border-white/10 hover:border-accent/50 hover:text-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Grid View
              </motion.button>
            </div>
          </div>

          {certView === 'carousel' ? (
            <CertificateCarousel certificates={certificates} />
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-surface/50 border border-white/10 p-8 overflow-hidden transition-all duration-500 hover:border-accent/50 hover:bg-surface/80 h-full hover:shadow-lg hover:shadow-accent/20">
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cert.color}`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${cert.color} bg-opacity-10 mb-6`}>
                      <cert.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    
                    {/* Rank Badge */}
                    <div className={`inline-block text-[9px] font-sans font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1 rounded-full bg-gradient-to-r ${cert.color} bg-clip-text text-transparent border border-white/10`}>
                      {cert.rank}
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {cert.title}
                    </h4>
                    
                    {/* Organization */}
                    <p className="text-secondary font-sans text-sm mb-3">
                      {cert.organization}
                    </p>
                    
                    {/* Description */}
                    <p className="text-secondary font-sans text-xs leading-relaxed mb-4">
                      {cert.description}
                    </p>
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.techTags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-secondary font-sans">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Year */}
                    <div className="absolute top-6 right-6">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-secondary text-xs font-sans">
                        {cert.year}
                      </span>
                    </div>
                  </div>

                  {/* Download Link */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 right-4"
                  >
                    <a
                      href={cert.certLink?.url || cert.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/40 rounded-lg group-hover:bg-accent/30 transition-all"
                    >
                      <FileText className="w-4 h-4 text-accent" />
                      <span className="text-xs font-sans text-accent font-semibold">{cert.certLink?.label || 'View'}</span>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </motion.div>

        {/* Bottom visual element */}
        <motion.div 
          style={{ y }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <div className="flex -space-x-2">
              {[Trophy, Award, Heart, FileText].map((Icon, index) => (
                <div 
                  key={index}
                  className="w-8 h-8 rounded-full bg-surface border border-white/20 flex items-center justify-center"
                >
                  <Icon className="w-4 h-4 text-secondary" />
                </div>
              ))}
            </div>
            <span className="text-secondary text-sm font-sans">Continuous learning & recognition</span>
            <Star className="w-4 h-4 text-accent animate-pulse" />
          </div>
        </motion.div>


      </div>
    </section>
  );
}
