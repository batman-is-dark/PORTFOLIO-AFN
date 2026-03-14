import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/batman-is-dark', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/afnan-rafi-99aa03301/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:afnusha.r@gmail.com', label: 'Email' },
  ];

  const quickLinks: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Writing', href: '/writing' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative py-24 px-6 bg-bg border-t border-white/5 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AK</span>
              </div>
              <div>
                <span className="text-primary font-display font-bold tracking-tight text-2xl block">
                  AFNAN K.A RAFI
                </span>
                <span className="text-secondary text-[10px] uppercase tracking-[0.3em]">
                  Aspirant @ MBZUAI
                </span>
              </div>
            </div>
            <p className="text-secondary text-sm leading-relaxed max-w-xs">
              Building the future of AI and Robotics, one algorithm at a time. Let's create something extraordinary together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-primary font-sans font-bold uppercase tracking-[0.2em] text-xs">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href as any}
                  className="group flex items-center gap-3 text-secondary hover:text-accent transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary/50 group-hover:bg-accent transition-colors" />
                  <span className="font-sans text-sm">{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h3 className="text-primary font-sans font-bold uppercase tracking-[0.2em] text-xs">
              Connect
            </h3>
            <p className="text-secondary text-sm">
              Feel free to reach out for collaborations, projects, or just to say hello.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group p-3 bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <a 
              href="mailto:afnusha.r@gmail.com"
              className="inline-flex items-center gap-2 text-accent font-sans text-sm font-medium hover:underline"
            >
              afnusha.r@gmail.com
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-secondary/40 font-sans text-xs uppercase tracking-[0.3em]">
            &copy; {currentYear} Afnan K.A Rafi. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-secondary/40 text-xs">
              Built with
            </span>
            <div className="flex items-center gap-3">
              {['Next.js', 'TypeScript', 'Framer'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-secondary/60 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <a 
            href="#hero-section"
            className="group flex items-center gap-2 text-secondary hover:text-accent transition-colors"
          >
            <span className="text-xs uppercase tracking-wider">Back to top</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
              <svg 
                className="w-4 h-4 group-hover:-translate-y-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
