/**
 * Contact - Server component for the Contact section
 * Completely redesigned with enhanced visuals and animations
 */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Send,
  Clock,
  Globe,
  Cpu
} from 'lucide-react';

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'afnusha.r@gmail.com',
      href: 'mailto:afnusha.r@gmail.com',
      description: 'Drop me an email anytime',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+971 55 808 5931',
      href: 'tel:+971558085931',
      description: 'Available for calls',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Dubai, UAE',
      href: '#',
      description: 'Based in Dubai',
    },
  ];

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading" 
      className="relative py-40 px-6 overflow-hidden bg-bg"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent/15 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Left Column - Header & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="space-y-6">
              <span className="text-accent font-sans text-xs tracking-[0.5em] uppercase block">
                Contact
              </span>
              <h2
                id="contact-heading"
                className="text-7xl md:text-9xl font-display font-bold text-primary tracking-tighter leading-none"
              >
                Let's<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                  Talk.
                </span>
              </h2>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-secondary font-sans leading-relaxed max-w-lg"
            >
              I'm always open to discussing new projects, research opportunities, or collaborations.
            </motion.p>

            {/* Contact Methods */}
            <div className="space-y-6 pt-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group block"
                >
                  <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300">
                    <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                      <method.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <span className="text-accent font-sans text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">
                        {method.label}
                      </span>
                      <div className="text-primary text-xl md:text-2xl font-display font-bold group-hover:text-accent transition-colors">
                        {method.value}
                      </div>
                      <div className="text-secondary text-sm mt-1">{method.description}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-secondary/50 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Status Card */}
          <motion.div 
            style={{ y, opacity }}
            className="relative"
          >
            <div className="sticky top-32">
              {/* Main Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-gradient-to-br from-surface to-bg border border-white/10 p-12 overflow-hidden"
              >
                {/* Animated background */}
                <motion.div 
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-blue-500/5 bg-[length:200%_200%]"
                />
                
                {/* Decorative elements */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-20 left-20 w-20 h-20 border border-accent/10 rotate-12"
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Status indicator */}
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-3xl font-display font-bold text-primary italic">
                      Current Status
                    </h3>
                    <div className="flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 bg-accent rounded-full"
                      />
                      <span className="text-accent text-sm font-sans font-medium">Available</span>
                    </div>
                  </div>

                  {/* Status details */}
                  <div className="space-y-8 mb-12">
                    <div className="flex items-center gap-4">
                      <Globe className="w-5 h-5 text-secondary" />
                      <div>
                        <div className="text-secondary text-sm">Based in</div>
                        <div className="text-primary font-sans font-medium">Dubai, UAE</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Clock className="w-5 h-5 text-secondary" />
                      <div>
                        <div className="text-secondary text-sm">Availability</div>
                        <div className="text-primary font-sans font-medium">Open to opportunities</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Cpu className="w-5 h-5 text-secondary" />
                      <div>
                        <div className="text-secondary text-sm">Focus</div>
                        <div className="text-primary font-sans font-medium">AI & Robotics</div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-secondary font-sans text-lg leading-relaxed mb-10 border-l-2 border-accent/30 pl-6">
                    Specializing in AI and Robotics. Available for remote collaboration worldwide. Let's build something amazing together.
                  </p>

                  {/* CTA Button */}
                  <motion.a
                    href="mailto:afnusha.r@gmail.com"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,51,0,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full py-6 bg-primary text-bg text-center font-sans font-bold uppercase tracking-[0.15em] overflow-hidden flex items-center justify-center gap-3"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Send Message
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.span>
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-accent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </div>

                {/* Hover glow effect */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity duration-500 pointer-events-none"
                />
              </motion.div>

              {/* Floating accent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="absolute -bottom-8 -left-8 p-6 bg-accent/20 border border-accent/30 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary font-sans text-sm">Response time: ~24 hours</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
