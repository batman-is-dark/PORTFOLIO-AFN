'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useState } from 'react';

interface CertificateLink {
  label: string;
  url: string;
}

interface Certificate {
  id: string;
  icon: any;
  rank: string;
  title: string;
  organization: string;
  description: string;
  year: string;
  color: string;
  imageUrl: string;
  techTags: string[];
  certLink?: CertificateLink;
}

interface CertificateCarouselProps {
  certificates: Certificate[];
}

export function CertificateCarousel({ certificates }: CertificateCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + certificates.length) % certificates.length);
  };

  const currentCert = certificates[currentIndex];

  return (
    <div className="relative w-full">
      {/* Main Carousel - Certificate Image Viewer */}
      <div className="relative w-full bg-surface/30 border border-white/10 rounded-xl overflow-hidden" style={{ height: '800px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            {/* Certificate Image */}
            <img
              src={currentCert.imageUrl}
              alt={`${currentCert.title} Certificate`}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: '800px' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all hover:border-accent/50 group"
          aria-label="Previous certificate"
        >
          <ChevronLeft className="w-6 h-6 group-hover:text-accent transition-colors" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all hover:border-accent/50 group"
          aria-label="Next certificate"
        >
          <ChevronRight className="w-6 h-6 group-hover:text-accent transition-colors" />
        </button>
      </div>

      {/* Certificate Details Section */}
      <div className="mt-8 bg-surface/30 border border-white/10 rounded-xl p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Title & Organization */}
          <div>
            <div className={`text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-4 bg-gradient-to-r ${currentCert.color} bg-clip-text text-transparent`}>
              {currentCert.rank}
            </div>
            <h3 className="text-2xl font-display font-bold text-primary mb-2">
              {currentCert.title}
            </h3>
            <p className="text-secondary font-sans text-sm mb-4">
              {currentCert.organization}
            </p>
            <p className="text-secondary font-sans text-sm leading-relaxed mb-4">
              {currentCert.description}
            </p>
          </div>

          {/* Right: Tags & Link */}
          <div>
            {/* Tech Tags */}
            <div className="mb-6">
              <p className="text-secondary font-sans text-xs uppercase tracking-wide mb-3">Skills & Technologies</p>
              <div className="flex flex-wrap gap-2">
                {currentCert.techTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-secondary font-sans">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification Link */}
            {currentCert.certLink && (
              <a
                href={currentCert.certLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/40 hover:bg-accent/30 rounded-lg transition-all group"
              >
                <FileText className="w-4 h-4 text-accent" />
                <span className="text-sm font-sans text-accent font-semibold">{currentCert.certLink.label}</span>
                <svg className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            {/* Year Badge */}
            <div className="mt-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full inline-block">
              <span className="text-secondary text-xs font-sans">{currentCert.year}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 mt-10">
        {certificates.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`transition-all ${
              index === currentIndex
                ? 'bg-accent w-8'
                : 'bg-white/20 hover:bg-white/30 w-2.5'
            } h-2.5 rounded-full`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-6 text-secondary font-sans text-sm">
        <span className="font-semibold text-primary">{currentIndex + 1}</span>
        <span> / </span>
        <span>{certificates.length}</span>
      </div>
    </div>
  );
}
