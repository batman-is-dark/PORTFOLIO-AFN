'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ParticleShape = 'cube' | 'sphere' | 'dna' | 'network' | 'ring';

interface ProjectParticlesProps {
  shape: ParticleShape;
  count?: number;
  color?: string;
  scale?: number;
}

export default function ProjectParticles({ 
  shape, 
  count = 150, 
  color = '#22d3ee',
  scale = 1 
}: ProjectParticlesProps) {
  const mesh = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      switch (shape) {
        case 'cube':
          // Distribute particles in a cube formation
          pos[ix] = (Math.random() - 0.5) * 3;
          pos[iy] = (Math.random() - 0.5) * 3;
          pos[iz] = (Math.random() - 0.5) * 3;
          break;

        case 'sphere':
          // Sphere distribution
          const phi = Math.acos(Math.random() * 2 - 1);
          const theta = Math.random() * Math.PI * 2;
          const radius = Math.pow(Math.random(), 1/3) * 1.5;
          pos[ix] = radius * Math.sin(phi) * Math.cos(theta);
          pos[iy] = radius * Math.sin(phi) * Math.sin(theta);
          pos[iz] = radius * Math.cos(phi);
          break;

        case 'dna':
          // Double helix
          const t = (i / count) * Math.PI * 6;
          const helixRadius = 1;
          const offset = i % 2 === 0 ? 0 : Math.PI;
          pos[ix] = helixRadius * Math.cos(t + offset);
          pos[iy] = ((i / count) - 0.5) * 4;
          pos[iz] = helixRadius * Math.sin(t + offset);
          break;

        case 'network':
          // Network grid pattern
          const gridSize = Math.ceil(Math.cbrt(count));
          const gx = i % gridSize;
          const gy = Math.floor(i / gridSize) % gridSize;
          const gz = Math.floor(i / (gridSize * gridSize));
          pos[ix] = (gx / (gridSize - 1) - 0.5) * 3 + (Math.random() - 0.5) * 0.3;
          pos[iy] = (gy / (gridSize - 1) - 0.5) * 3 + (Math.random() - 0.5) * 0.3;
          pos[iz] = (gz / (gridSize - 1) - 0.5) * 3 + (Math.random() - 0.5) * 0.3;
          break;

        case 'ring':
        default:
          // Ring formation
          const ringAngle = (i / count) * Math.PI * 2;
          const ringRadius = 1.5 + Math.random() * 0.5;
          pos[ix] = ringRadius * Math.cos(ringAngle);
          pos[iy] = (Math.random() - 0.5) * 0.4;
          pos[iz] = ringRadius * Math.sin(ringAngle);
          break;
      }
    }

    return pos;
  }, [shape, count]);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle rotation based on shape
    mesh.current.rotation.y = time * 0.2;
    
    if (shape === 'dna') {
      mesh.current.rotation.y = time * 0.3;
    } else if (shape === 'ring') {
      mesh.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <points ref={mesh} scale={scale}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}