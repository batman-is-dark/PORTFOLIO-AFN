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
        {/* Floating geometric elements - Brutalist style */}
        <Float speed={isMobile ? 1 : 2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-3, 1, -2]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial
              color="#FF3300"
              emissive="#FF3300"
              emissiveIntensity={isMobile ? 0.3 : 0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
        <Float speed={isMobile ? 0.8 : 1.5} rotationIntensity={0.8} floatIntensity={0.7}>
          <mesh position={[3, -1, -1]} rotation={[0, Math.PI / 3, Math.PI / 6]}>
            <tetrahedronGeometry args={[0.6]} />
            <meshStandardMaterial
              color="#F8FAFC"
              emissive="#F8FAFC"
              emissiveIntensity={isMobile ? 0.2 : 0.4}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
        {!isMobile && (
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh position={[0, 2, -3]} rotation={[Math.PI / 6, 0, Math.PI / 4]}>
              <octahedronGeometry args={[0.5]} />
              <meshStandardMaterial
                color="#94A3B8"
                emissive="#0B1221"
                emissiveIntensity={0.5}
                transparent
                opacity={0.4}
              />
            </mesh>
          </Float>
        )}
      </Canvas>
    </div>
  );
}
