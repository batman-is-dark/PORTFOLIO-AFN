'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroParticles({ count = 2000, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const mesh = useRef<THREE.Points>(null!);
  const { viewport, mouse } = useThree();

  // Generate initial positions and target positions
  const [positions, targets, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const tar = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random cloud for initial state
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;

      // Target shape: DNA Helix / Double Spiral
      // We map i to a position along the helix
      const t = (i / count) * Math.PI * 10; // 5 turns
      const radius = 2.5;
      const height = 10;
      
      // Normalize i to -0.5 to 0.5 for height distribution
      const yNorm = (i / count) - 0.5; 
      
      // Double Helix logic: Even particles on strand A, Odd on strand B
      const offset = i % 2 === 0 ? 0 : Math.PI;
      
      tar[i * 3] = radius * Math.cos(t + offset); // x
      tar[i * 3 + 1] = yNorm * height;            // y
      tar[i * 3 + 2] = radius * Math.sin(t + offset); // z
    }
    return [pos, tar, init];
  }, [count]);

  const dummy = new THREE.Vector3();
  const mouseC = new THREE.Vector3();

  useFrame((state) => {
    if (!mesh.current) return;
    
    // Map mouse to 3D roughly at z=0 plane
    mouseC.set(
       (state.mouse.x * viewport.width) / 2,
       (state.mouse.y * viewport.height) / 2,
       0
    );

    const time = state.clock.getElapsedTime();
    const positionsAttribute = mesh.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Current pos
      dummy.set(
        positionsAttribute.array[ix],
        positionsAttribute.array[iy],
        positionsAttribute.array[iz]
      );

      // Animation: Slowly rotate the helix
      const rotationSpeed = 0.2;
      const cosR = Math.cos(time * rotationSpeed);
      const sinR = Math.sin(time * rotationSpeed);

      // Apply rotation to target (Y-axis rotation)
      const txRaw = targets[ix];
      const tzRaw = targets[iz];
      const ty = targets[iy];

      const tx = txRaw * cosR - tzRaw * sinR;
      const tz = txRaw * sinR + tzRaw * cosR;

      // Magnet/Interaction Logic
      const dist = dummy.distanceTo(mouseC);
      const isHovering = Math.abs(state.mouse.x) < 0.9 && Math.abs(state.mouse.y) < 0.9;
      
      let targetX = tx;
      let targetY = ty;
      let targetZ = tz;

      // When hovering and close, particles break formation and curl towards mouse
      if (isHovering && dist < 3) {
         // Attraction with a twist
         const force = (3 - dist) / 3; 
         targetX = mouseC.x + (Math.sin(time * 2 + ix) * 0.5); 
         targetY = mouseC.y + (Math.cos(time * 2 + iy) * 0.5); 
         targetZ = mouseC.z + (Math.sin(time * 3) * 0.5); // Flatten z
      }

      // Lerp stiffness - faster return when not hovering
      const stiffness = (isHovering && dist < 3) ? 0.08 : 0.03;

      // Lerp towards target
      positionsAttribute.array[ix] += (targetX - dummy.x) * stiffness;
      positionsAttribute.array[iy] += (targetY - dummy.y) * stiffness;
      positionsAttribute.array[iz] += (targetZ - dummy.z) * stiffness;
    }

    positionsAttribute.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.03 : 0.05}
        color="#57c0db" // Medical/Tech blue-cyan
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
