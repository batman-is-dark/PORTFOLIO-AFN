import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className="py-32 px-6 bg-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="space-y-4 text-center md:text-left">
          <span className="text-primary font-display font-bold tracking-tighter text-3xl">
            AFNAN K.A RAFI
          </span>
          <p className="text-secondary font-sans text-[10px] uppercase tracking-[0.5em] font-bold">
            Aspirant @ MBZUAI • 2026
          </p>
        </div>
        
        <nav className="flex gap-12" aria-label="Footer">
          <Link href="#projects" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-secondary hover:text-accent transition-colors">
            Works
          </Link>
          <Link href="#about" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-secondary hover:text-accent transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-secondary hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>

        <div className="text-secondary/50 font-sans text-[8px] uppercase tracking-[0.5em] font-bold">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>
    </footer>
  );
}