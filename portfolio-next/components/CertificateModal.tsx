'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const CertificateViewer = dynamic(() => import('./CertificateViewer'), { ssr: false });

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  organization: string;
  pdfUrl: string;
  description?: string;
}

export function CertificateModal({
  isOpen,
  onClose,
  title,
  organization,
  pdfUrl,
  description
}: CertificateModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div
            className="fixed inset-0 z-50 overflow-auto bg-transparent"
            onClick={onClose}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
            role="presentation"
          >
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[95vh] flex flex-col bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/10 bg-surface/80 backdrop-blur-md flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-primary mb-1">
                    {title}
                  </h2>
                  <p className="text-secondary text-xs sm:text-sm font-sans">
                    {organization}
                  </p>
                  {description && (
                    <p className="hidden sm:block text-secondary text-xs mt-2 max-w-md">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-secondary" />
                </button>
              </div>

              {/* PDF Viewer - React-PDF */}
              <div className="bg-black/20 relative p-4 sm:p-6">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full max-w-3xl bg-white rounded-xl overflow-auto shadow-2xl" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                    <CertificateViewer pdfUrl={pdfUrl} />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 border-t border-white/10 bg-surface/80 backdrop-blur-md flex-shrink-0">
                <p className="hidden sm:block text-xs text-secondary font-sans">
                  Certificate from {organization}
                </p>
                <div className="flex w-full sm:w-auto gap-3">
                  <a
                    href={pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/50 rounded-lg transition-colors text-accent text-sm font-sans whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-secondary text-sm font-sans whitespace-nowrap"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
