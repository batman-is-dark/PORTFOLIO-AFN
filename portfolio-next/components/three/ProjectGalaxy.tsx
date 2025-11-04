'use client';

/**
 * ProjectGalaxy - Unique 3D visualization with floating project cards and particles
 */

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Html } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { projects } from '../../content/projects';

interface ProjectCard {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  role: string;
  color: string;
}

function Particle({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3 + position[2]) * 0.2;
      
      // Gentle rotation
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial
        color={hovered ? '#06B6D4' : '#7C3AED'}
        emissive={hovered ? '#06B6D4' : '#7C3AED'}
        emissiveIntensity={hovered ? 0.8 : 0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function FloatingProjectCard({ card, onClick }: { card: ProjectCard; onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = card.position[1] + Math.sin(state.clock.elapsedTime * 0.8 + card.position[0]) * 0.2;
      
      // Gentle rotation on hover
      if (hovered) {
        groupRef.current.rotation.y += 0.01;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={card.position}
      rotation={card.rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Card background */}
      <mesh>
        <planeGeometry args={[2.5, 1.5]} />
        <meshStandardMaterial
          color={card.color}
          emissive={card.color}
          emissiveIntensity={hovered ? 0.4 : 0.2}
          transparent
          opacity={hovered ? 0.95 : 0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshBasicMaterial
          color={card.color}
          transparent
          opacity={hovered ? 0.3 : 0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML Content Overlay */}
      <Html
        transform
        distanceFactor={1.5}
        position={[0, 0, 0.01]}
        style={{
          width: '250px',
          pointerEvents: hovered ? 'auto' : 'none',
          transition: 'all 0.3s',
        }}
      >
        <div className={`p-4 transition-all duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}>
          <div className="text-xs font-bold text-primary mb-1">{card.role}</div>
          <div className="text-sm font-display font-bold text-white leading-tight mb-2">
            {card.title}
          </div>
          {hovered && (
            <div className="text-xs text-cyan-200 font-semibold animate-pulse">
              Click to explore →
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function ParticleField() {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 20,
        ] as [number, number, number],
      });
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <Particle key={i} position={p.position} />
      ))}
    </>
  );
}

function ProjectCards() {
  const cards: ProjectCard[] = useMemo(() => {
    const colors = ['#06B6D4', '#7C3AED', '#D6C3A5'];
    
    return projects.map((project, index) => {
      const angle = (index / projects.length) * Math.PI * 2;
      const radius = 5;
      const height = Math.sin(angle * 2) * 2;
      
      return {
        id: project.slug,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [0, -angle + Math.PI / 2, 0] as [number, number, number],
        title: project.title,
        role: project.role,
        color: colors[index % colors.length],
      };
    });
  }, []);

  const handleCardClick = (slug: string) => {
    window.location.href = `/projects/${slug}`;
  };

  return (
    <>
      {cards.map((card) => (
        <FloatingProjectCard
          key={card.id}
          card={card}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </>
  );
}

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color="#06B6D4"
        emissive="#06B6D4"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <group>
      <CentralOrb />
      <ProjectCards />
      <ParticleField />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#06B6D4" />
      <pointLight position={[-10, -5, -10]} intensity={0.6} color="#7C3AED" />
      <pointLight position={[0, -10, 5]} intensity={0.4} color="#D6C3A5" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.6}
        penumbra={1}
        intensity={0.5}
        color="#06B6D4"
        castShadow
      />
    </group>
  );
}

export default function ProjectGalaxy() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#0B1120] to-[#1a1f35] border border-[color:var(--color-border)] shadow-2xl">
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <color attach="background" args={['#0B1120']} />
        <fog attach="fog" args={['#0B1120', 10, 30]} />
        
        <PerspectiveCamera makeDefault position={[0, 3, 12]} fov={60} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          autoRotate={!prefersReducedMotion}
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
        <Scene />
      </Canvas>
    </div>
  );
}