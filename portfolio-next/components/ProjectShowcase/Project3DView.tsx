'use client';

/**
 * Project3DView - An immersive 3D environment showcasing projects in 3D space
 * Features: Floating project cards, particle systems, interactive 3D navigation
 */

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Float, Html, Stars, Environment } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import Link from 'next/link';
import type { CarouselItem } from '../../lib/mappers';

interface Project3DCardProps {
  item: CarouselItem;
  position: [number, number, number];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
}

function Project3DCard({ item, position, index, isHovered, onHover, onUnhover }: Project3DCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.2;
      
      // Keep card facing camera when hovered
      if (isHovered && meshRef.current) {
        const targetScale = 1.2;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      } else if (meshRef.current) {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const colors = [
    ['#06B6D4', '#3B82F6'], // cyan to blue
    ['#7C3AED', '#EC4899'], // purple to pink
    ['#10B981', '#06B6D4'], // green to cyan
    ['#F59E0B', '#EF4444'], // orange to red
    ['#8B5CF6', '#7C3AED'], // violet to purple
    ['#06B6D4', '#10B981'], // cyan to green
    ['#EC4899', '#F97316'], // pink to orange
    ['#3B82F6', '#8B5CF6'], // blue to violet
  ];

  const [color1, color2] = colors[index % colors.length];

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        {/* Main card mesh - even smaller card */}
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover();
          }}
          onPointerOut={onUnhover}
          onClick={() => setClicked(!clicked)}
        >
          <boxGeometry args={[3.5, 4.5, 0.15]} />
          <meshStandardMaterial
            color={isHovered ? '#1a1a2e' : '#0a0a0a'}
            emissive={color1}
            emissiveIntensity={isHovered ? 0.6 : 0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Glowing frame - perfectly aligned */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[3.6, 4.6, 0.08]} />
          <meshStandardMaterial 
            color={color1} 
            emissive={color1}
            emissiveIntensity={0.5}
            transparent 
            opacity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Corner accents */}
        <mesh position={[1.5, 2, 0.12]}>
          <boxGeometry args={[0.4, 0.4, 0.05]} />
          <meshBasicMaterial color={color1} transparent opacity={0.6} />
        </mesh>
        <mesh position={[-1.5, -2, 0.12]}>
          <boxGeometry args={[0.4, 0.4, 0.05]} />
          <meshBasicMaterial color={color2} transparent opacity={0.6} />
        </mesh>

        {/* HTML Content overlay - text fills entire card */}
        <Html
          transform
          distanceFactor={0.6}
          position={[0, 0, 0.16]}
          style={{
            width: '800px',
            height: '900px',
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          <div className="w-full h-full flex flex-col justify-between p-4 text-white pointer-events-none">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="px-4 py-2 rounded-full text-3xl font-bold backdrop-blur-md border-2"
                  style={{
                    backgroundColor: `${color1}40`,
                    borderColor: color1,
                    color: color1,
                  }}
                >
                  {item.role}
                </span>
                <span className="px-4 py-2 rounded-full bg-white/20 border-2 border-white/40 text-3xl font-semibold backdrop-blur-md">
                  {item.timeframe}
                </span>
              </div>
              
              <h3 className="text-7xl font-bold mb-4 leading-tight">{item.title}</h3>
              
              <p className="text-4xl text-white leading-tight line-clamp-3">
                {item.summary}
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-2xl font-semibold rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
                {item.stack.length > 4 && (
                  <span className="px-4 py-2 text-2xl font-bold rounded-full bg-white/20 border-2 border-white/30">
                    +{item.stack.length - 4}
                  </span>
                )}
              </div>

              {/* View button */}
              {isHovered && (
                <Link
                  href={`/projects/${item.slug}`}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-3xl transition-all duration-300 hover:scale-105 pointer-events-auto shadow-lg"
                  style={{
                    backgroundColor: color1,
                    color: '#0a0a0a',
                  }}
                >
                  <span>View Project</span>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </Html>

        {/* Index number badge on card */}
        <Text
          position={[-1.4, -1.9, 0.2]}
          fontSize={0.6}
          color={color1}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {(index + 1).toString().padStart(2, '0')}
        </Text>
      </group>
    </Float>
  );
}

function ConnectionLines({ projects }: { projects: { position: [number, number, number] }[] }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Create connections between nearby projects
  const connections = useMemo(() => {
    const conns: [number, number][] = [];
    for (let i = 0; i < projects.length; i++) {
      for (let j = i + 1; j < projects.length; j++) {
        const dist = Math.sqrt(
          Math.pow(projects[i].position[0] - projects[j].position[0], 2) +
          Math.pow(projects[i].position[1] - projects[j].position[1], 2) +
          Math.pow(projects[i].position[2] - projects[j].position[2], 2)
        );
        if (dist < 12) {
          conns.push([i, j]);
        }
      }
    }
    return conns;
  }, [projects]);

  return (
    <group ref={linesRef}>
      {connections.map(([i, j], idx) => {
        const points = [
          new THREE.Vector3(...projects[i].position),
          new THREE.Vector3(...projects[j].position),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <primitive key={idx} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: '#06B6D4',
            transparent: true,
            opacity: 0.15,
            linewidth: 1,
          }))} />
        );
      })}
    </group>
  );
}

interface Project3DViewProps {
  items: CarouselItem[];
}

export function Project3DView({ items }: Project3DViewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const controlsRef = useRef<any>(null);

  // Arrange projects in a 3D spiral/galaxy pattern
  const projectPositions = useMemo(() => {
    return items.map((_, index) => {
      const angle = (index / items.length) * Math.PI * 2;
      const radius = 8 + (index % 3) * 2;
      const height = Math.sin(angle * 2) * 3;
      
      return {
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
      };
    });
  }, [items]);

  // Focus on specific project
  const focusOnProject = (index: number) => {
    setFocusedIndex(index);
    if (controlsRef.current) {
      const pos = projectPositions[index].position;
      // Animate camera to look at the project
      controlsRef.current.target.set(pos[0], pos[1], pos[2]);
    }
  };

  return (
    <div className="w-full h-[700px] lg:h-[800px] rounded-3xl overflow-hidden relative bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Project navigation sidebar */}
      <div className="absolute left-4 top-4 bottom-4 w-64 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 z-10 overflow-y-auto">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Projects
        </h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <button
              key={item.slug}
              onClick={() => focusOnProject(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                focusedIndex === index
                  ? 'bg-primary/30 border-2 border-primary shadow-lg shadow-primary/20'
                  : hoveredIndex === index
                  ? 'bg-white/10 border-2 border-white/20'
                  : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  focusedIndex === index ? 'bg-primary text-black' : 'bg-white/20 text-white'
                }`}>
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">{item.title}</h4>
                  <p className="text-gray-400 text-xs line-clamp-1">{item.role}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Reset view button */}
        <button
          onClick={() => {
            setFocusedIndex(null);
            if (controlsRef.current) {
              controlsRef.current.target.set(0, 0, 0);
            }
          }}
          className="w-full mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-semibold transition-all duration-300"
        >
          Reset View
        </button>
      </div>

      {/* Mobile project selector */}
      <div className="absolute top-4 right-4 lg:hidden z-10">
        <select
          onChange={(e) => focusOnProject(parseInt(e.target.value))}
          value={focusedIndex ?? ''}
          className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold"
        >
          <option value="">All Projects</option>
          {items.map((item, index) => (
            <option key={item.slug} value={index}>
              {index + 1}. {item.title}
            </option>
          ))}
        </select>
      </div>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 20], fov: 60 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06B6D4" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#7C3AED" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#EC4899" />
        <spotLight
          position={[0, 20, 0]}
          angle={0.5}
          penumbra={1}
          intensity={1}
          color="#06B6D4"
          castShadow
        />

        {/* Environment lighting */}
        <Environment preset="city" />

        {/* Stars background */}
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Connection lines */}
        <ConnectionLines projects={projectPositions} />

        {/* Project cards */}
        {items.map((item, index) => (
          <Project3DCard
            key={item.slug}
            item={item}
            position={projectPositions[index].position}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onUnhover={() => setHoveredIndex(null)}
          />
        ))}

        {/* Camera controls */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={30}
          autoRotate={focusedIndex === null}
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping
          maxPolarAngle={Math.PI * 0.8}
          minPolarAngle={Math.PI * 0.2}
        />
      </Canvas>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-sm hidden lg:block">
        <p className="text-center flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-semibold">Click projects in list</span>
          </span>
          <span className="w-px h-4 bg-white/30" />
          <span>Drag to rotate</span>
          <span className="w-px h-4 bg-white/30" />
          <span>Scroll to zoom</span>
        </p>
      </div>
      
      {/* Mobile instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs lg:hidden">
        <p>Tap dropdown • Drag to rotate • Pinch to zoom</p>
      </div>
    </div>
  );
}
