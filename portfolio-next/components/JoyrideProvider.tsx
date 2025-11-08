"use client";
import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

const steps: Step[] = [
  {
    target: '#hero-section',
    content: 'Welcome! This is the immersive Hero section with 3D and animated backgrounds showcasing my AI journey.',
    disableBeacon: true,
    placement: 'center',
  },
  {
    target: '#projects',
    content: 'Explore my projects in both card and 3D immersive views. Click to interact and see detailed information!',
    placement: 'top',
  },
  {
    target: '#about-heading',
    content: 'Learn about my background, research interests, and coursework in AI and machine learning.',
    placement: 'bottom',
  },
  {
    target: '#skills-heading',
    content: 'See my technical skills and tools across Python, ML frameworks, and modern web technologies.',
    placement: 'bottom',
  },
  {
    target: '#posts-heading',
    content: 'Browse my writing and articles on AI, ML, computer vision, and natural language processing.',
    placement: 'bottom',
  },
  {
    target: '#contact-heading',
    content: 'Get in touch or connect with me on LinkedIn and GitHub. Let\'s discuss AI research opportunities!',
    placement: 'top',
  },
];

export default function JoyrideProvider() {
  const [run, setRun] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStartTour = () => {
    setRun(true);
    // Scroll to top on mobile for better experience
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <button
        onClick={handleStartTour}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full shadow-lg font-bold hover:scale-105 transition-transform text-sm md:text-base"
        aria-label="Start guided tour of the portfolio"
      >
        <span className="hidden md:inline">🚀 Take a Tour</span>
        <span className="md:hidden">🚀 Tour</span>
      </button>

      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        disableOverlayClose
        disableCloseOnEsc={false}
        spotlightClicks={false}
        hideCloseButton={false}
        styles={{
          options: {
            zIndex: 9999,
            primaryColor: '#7C3AED',
            backgroundColor: '#0B1120',
            textColor: '#E5E7EB',
            arrowColor: '#7C3AED',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            spotlightShadow: '0 0 15px rgba(124, 58, 237, 0.5)',
            beaconSize: isMobile ? 30 : 36,
          },
          tooltip: {
            fontSize: isMobile ? '14px' : '16px',
            padding: isMobile ? '15px' : '20px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonNext: {
            backgroundColor: '#7C3AED',
            fontSize: isMobile ? '14px' : '16px',
            borderRadius: '8px',
            padding: isMobile ? '8px 16px' : '10px 20px',
          },
          buttonBack: {
            color: '#94A3B8',
            fontSize: isMobile ? '14px' : '16px',
            marginRight: '10px',
          },
          buttonSkip: {
            color: '#94A3B8',
            fontSize: isMobile ? '14px' : '16px',
          },
          buttonClose: {
            height: '14px',
            width: '14px',
            right: '10px',
            top: '10px',
          },
        }}
        floaterProps={{
          disableAnimation: isMobile, // Disable animations on mobile for performance
        }}
        callback={(data: CallBackProps) => {
          const { status, step, index } = data;

          if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            setRun(false);
          }

          // Auto-scroll to target on mobile for better visibility
          if (isMobile && step?.target && status === 'running') {
            setTimeout(() => {
              const targetElement = document.querySelector(step.target as string);
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'nearest'
                });
              }
            }, 300);
          }
        }}
      />
    </>
  );
}
