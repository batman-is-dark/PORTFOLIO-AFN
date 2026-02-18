"use client";
import { Canvas } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import { useState, useEffect } from 'react';
import HeroParticles from './HeroParticles';

export default function Hero3DBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: !isMobile,
          powerPreference: isMobile ? "low-power" : "high-performance",
          alpha: true
        }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={isMobile ? 0.5 : 0.7} />
        <directionalLight position={[5, 5, 5]} intensity={isMobile ? 0.5 : 0.7} />
        <Environment preset="city" />
        <Stars
          radius={30}
          depth={40}
          count={isMobile ? 300 : 800}
          factor={isMobile ? 1 : 1.5}
          fade
          speed={isMobile ? 0.3 : 0.5}
        />
        
        {/* Interactive Magnetic Particles */}
        <HeroParticles isMobile={isMobile} count={isMobile ? 800 : 2500} />
      </Canvas>
    </div>
  );
}
