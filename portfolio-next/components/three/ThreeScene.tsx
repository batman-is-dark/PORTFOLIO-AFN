'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Float, MeshDistortMaterial, Sphere, Box, Octahedron, Tetrahedron, Icosahedron, Stars } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Node {
  id: string;
  position: [number, number, number];
  label: string;
  color: string;
  size: number;
  shape: 'sphere' | 'cube' | 'octahedron' | 'tetrahedron' | 'icosahedron';
}

interface Connection {
  from: string;
  to: string;
}

interface FloatingShape {
  id: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  shape: 'box' | 'octahedron' | 'tetrahedron';
}

function AnimatedNode({ node, isHovered, onHover, onUnhover }: {
  node: Node;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime + node.position[0]) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + node.position[0]) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + node.position[1]) * 0.2;
      
      // Scale on hover
      const targetScale = hovered || isHovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const renderGeometry = () => {
    switch (node.shape) {
      case 'sphere':
        return <sphereGeometry args={[node.size, 32, 32]} />;
      case 'cube':
        return <boxGeometry args={[node.size * 2, node.size * 2, node.size * 2]} />;
      case 'octahedron':
        return <octahedronGeometry args={[node.size, 0]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[node.size, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[node.size, 0]} />;
      default:
        return <sphereGeometry args={[node.size, 32, 32]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={[node.position[0], node.position[1], node.position[2]]}>
        {/* Outer glow sphere */}
        <Sphere args={[node.size * 1.8, 32, 32]}>
          <meshBasicMaterial color={node.color} transparent opacity={0.08} />
        </Sphere>
        
        {/* Main node */}
        <mesh
          ref={meshRef}
          onPointerOver={() => {
            setHovered(true);
            onHover();
          }}
          onPointerOut={() => {
            setHovered(false);
            onUnhover();
          }}
        >
          {renderGeometry()}
          <MeshDistortMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
            distort={0.2}
            speed={1.5}
          />
        </mesh>
        
        {/* Inner glow */}
        <mesh>
          {renderGeometry()}
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Label */}
        {(hovered || isHovered) && (
          <Text
            position={[0, node.size + 0.8, 0]}
            fontSize={0.25}
            color="#F3F4F6"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter.woff"
          >
            {node.label}
          </Text>
        )}
      </group>
    </Float>
  );
}

function AnimatedConnection({ from, to, isHighlighted }: {
  from: [number, number, number];
  to: [number, number, number];
  isHighlighted: boolean;
}) {
  const lineRef = useRef<any>(null);
  
  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      // Pulsing effect
      material.opacity = isHighlighted
        ? 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.2
        : 0.3;
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(...from),
    new THREE.Vector3(...to),
  ], [from, to]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial
        attach="material"
        color={isHighlighted ? "#06B6D4" : "#7C3AED"}
        linewidth={isHighlighted ? 3 : 1}
        transparent
      />
    </line>
  );
}

function FloatingShape({ shape }: { shape: FloatingShape }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + shape.id) * 0.002;
    }
  });

  const renderGeometry = () => {
    switch (shape.shape) {
      case 'box':
        return <boxGeometry args={[shape.scale, shape.scale, shape.scale]} />;
      case 'octahedron':
        return <octahedronGeometry args={[shape.scale, 0]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[shape.scale, 0]} />;
      default:
        return <boxGeometry args={[shape.scale, shape.scale, shape.scale]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={shape.position}
      rotation={shape.rotation}
    >
      {renderGeometry()}
      <meshBasicMaterial
        color={shape.color}
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  );
}

function BackgroundElements() {
  const floatingShapes: FloatingShape[] = useMemo(() => [
    { id: 1, position: [-8, 2, -5], rotation: [0, 0, 0], scale: 0.8, color: '#06B6D4', shape: 'octahedron' },
    { id: 2, position: [8, -3, -6], rotation: [0.5, 0.8, 0], scale: 1.2, color: '#7C3AED', shape: 'tetrahedron' },
    { id: 3, position: [-6, -4, 4], rotation: [1, 0.3, 0.7], scale: 0.6, color: '#D6C3A5', shape: 'box' },
    { id: 4, position: [7, 4, 3], rotation: [0.2, 1.2, 0.5], scale: 0.9, color: '#06B6D4', shape: 'octahedron' },
    { id: 5, position: [-9, 1, 2], rotation: [0.8, 0.1, 1], scale: 0.7, color: '#7C3AED', shape: 'tetrahedron' },
    { id: 6, position: [5, -5, -3], rotation: [0.3, 0.9, 0.4], scale: 1.0, color: '#D6C3A5', shape: 'box' },
    { id: 7, position: [-4, 5, -7], rotation: [1.1, 0.6, 0.2], scale: 0.5, color: '#06B6D4', shape: 'octahedron' },
    { id: 8, position: [9, 0, 5], rotation: [0.7, 1.5, 0.8], scale: 0.8, color: '#7C3AED', shape: 'tetrahedron' },
  ], []);

  return (
    <group>
      {floatingShapes.map((shape) => (
        <FloatingShape key={shape.id} shape={shape} />
      ))}
    </group>
  );
}

function NetworkGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // AI/ML concept nodes with enhanced properties
  const nodes: Node[] = useMemo(() => [
    { id: 'ml', position: [0, 0, 0], label: 'Machine Learning', color: '#06B6D4', size: 0.4, shape: 'icosahedron' },
    { id: 'cv', position: [2.5, 1.5, -1], label: 'Computer Vision', color: '#7C3AED', size: 0.35, shape: 'octahedron' },
    { id: 'nlp', position: [-2.5, 1.5, 1], label: 'NLP', color: '#D6C3A5', size: 0.35, shape: 'cube' },
    { id: 'data', position: [0, -2.5, 0], label: 'Data Science', color: '#06B6D4', size: 0.35, shape: 'tetrahedron' },
    { id: 'dl', position: [1.5, -1.5, 2.5], label: 'Deep Learning', color: '#7C3AED', size: 0.38, shape: 'sphere' },
    { id: 'ai', position: [-1.5, 2.5, -2], label: 'AI Systems', color: '#D6C3A5', size: 0.35, shape: 'octahedron' },
    { id: 'rl', position: [2, -2, -1.5], label: 'Reinforcement Learning', color: '#06B6D4', size: 0.3, shape: 'cube' },
    { id: 'neural', position: [-2, -1, 2], label: 'Neural Networks', color: '#7C3AED', size: 0.32, shape: 'icosahedron' },
  ], []);

  const connections: Connection[] = useMemo(() => [
    { from: 'ml', to: 'cv' },
    { from: 'ml', to: 'nlp' },
    { from: 'ml', to: 'data' },
    { from: 'ml', to: 'dl' },
    { from: 'ml', to: 'ai' },
    { from: 'cv', to: 'dl' },
    { from: 'nlp', to: 'dl' },
    { from: 'data', to: 'dl' },
    { from: 'dl', to: 'neural' },
    { from: 'dl', to: 'rl' },
    { from: 'ai', to: 'rl' },
    { from: 'neural', to: 'rl' },
  ], []);

  // Find connections for highlighted node
  const highlightedConnections = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    return new Set(
      connections
        .filter(c => c.from === hoveredNode || c.to === hoveredNode)
        .map(c => `${c.from}-${c.to}`)
    );
  }, [hoveredNode, connections]);

  return (
    <group>
      {/* Background elements */}
      <BackgroundElements />
      
      {/* Render nodes */}
      {nodes.map((node) => (
        <AnimatedNode
          key={node.id}
          node={node}
          isHovered={hoveredNode === node.id}
          onHover={() => setHoveredNode(node.id)}
          onUnhover={() => setHoveredNode(null)}
        />
      ))}

      {/* Render connections */}
      {connections.map((conn) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return null;

        const connKey = `${conn.from}-${conn.to}`;
        return (
          <AnimatedConnection
            key={connKey}
            from={fromNode.position}
            to={toNode.position}
            isHighlighted={highlightedConnections.has(connKey)}
          />
        );
      })}

      {/* Enhanced lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#06B6D4" />
      <pointLight position={[-10, -10, -10]} intensity={1.0} color="#7C3AED" />
      <pointLight position={[0, -10, 10]} intensity={0.8} color="#D6C3A5" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#06B6D4" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={1}
        intensity={0.7}
        color="#7C3AED"
      />
      
      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  );
}

export default function ThreeScene() {
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
    <div className="w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-cyan-900/20" />
      
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          autoRotate={!prefersReducedMotion}
          autoRotateSpeed={0.5}
        />
        <NetworkGraph />
      </Canvas>
    </div>
  );
}