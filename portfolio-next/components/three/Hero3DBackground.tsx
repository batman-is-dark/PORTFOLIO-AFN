"use client";
import { Canvas } from '@react-three/fiber';
import { Float, Stars, Environment } from '@react-three/drei';
import { useState, useEffect } from 'react';

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
          count={isMobile ? 400 : 1200}
          factor={isMobile ? 1 : 2}
          fade
          speed={isMobile ? 0.5 : 1}
        />
        {/* Floating orbs - reduced on mobile */}
        <Float speed={isMobile ? 1 : 2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[-2, 1, 0]}>
            <sphereGeometry args={[0.7, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
            <meshStandardMaterial
              color="#06B6D4"
              emissive="#06B6D4"
              emissiveIntensity={isMobile ? 0.2 : 0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
        <Float speed={isMobile ? 0.8 : 1.5} rotationIntensity={0.3} floatIntensity={0.7}>
          <mesh position={[2, -1, 0]}>
            <sphereGeometry args={[0.5, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
            <meshStandardMaterial
              color="#7C3AED"
              emissive="#7C3AED"
              emissiveIntensity={isMobile ? 0.2 : 0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
        {!isMobile && (
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh position={[0, 2, -1]}>
              <sphereGeometry args={[0.4, 32, 32]} />
              <meshStandardMaterial
                color="#D6C3A5"
                emissive="#D6C3A5"
                emissiveIntensity={0.2}
                transparent
                opacity={0.5}
              />
            </mesh>
          </Float>
        )}
      </Canvas>
    </div>
  );
}
