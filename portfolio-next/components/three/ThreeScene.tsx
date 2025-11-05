'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Node {
  id: string;
  position: [number, number, number];
  label: string;
  color: string;
  size: number;
}

interface Connection {
  from: string;
  to: string;
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
      
      // Scale on hover
      const targetScale = hovered || isHovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={[node.position[0], node.position[1], node.position[2]]}>
        {/* Outer glow sphere */}
        <Sphere args={[node.size * 1.5, 32, 32]}>
          <meshBasicMaterial color={node.color} transparent opacity={0.1} />
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
          <sphereGeometry args={[node.size, 32, 32]} />
          <MeshDistortMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
            distort={0.3}
            speed={2}
          />
        </mesh>
        
        {/* Label */}
        {(hovered || isHovered) && (
          <Text
            position={[0, node.size + 0.5, 0]}
            fontSize={0.3}
            color="#E5E7EB"
            anchorX="center"
            anchorY="middle"
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

function NetworkGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // AI/ML concept nodes with enhanced properties
  const nodes: Node[] = useMemo(() => [
    { id: 'ml', position: [0, 0, 0], label: 'Machine Learning', color: '#06B6D4', size: 0.4 },
    { id: 'cv', position: [2.5, 1.5, -1], label: 'Computer Vision', color: '#7C3AED', size: 0.35 },
    { id: 'nlp', position: [-2.5, 1.5, 1], label: 'NLP', color: '#D6C3A5', size: 0.35 },
    { id: 'data', position: [0, -2.5, 0], label: 'Data Science', color: '#06B6D4', size: 0.35 },
    { id: 'dl', position: [1.5, -1.5, 2.5], label: 'Deep Learning', color: '#7C3AED', size: 0.38 },
    { id: 'ai', position: [-1.5, 2.5, -2], label: 'AI Systems', color: '#D6C3A5', size: 0.35 },
    { id: 'rl', position: [2, -2, -1.5], label: 'Reinforcement Learning', color: '#06B6D4', size: 0.3 },
    { id: 'neural', position: [-2, -1, 2], label: 'Neural Networks', color: '#7C3AED', size: 0.32 },
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
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#06B6D4" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#7C3AED" />
      <pointLight position={[0, -10, 10]} intensity={0.6} color="#D6C3A5" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#06B6D4"
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
    <div className="w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-[color:var(--color-surface)] border border-[color:var(--color-border)]">
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true }}
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