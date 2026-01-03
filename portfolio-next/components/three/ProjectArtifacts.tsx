'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Float, MeshDistortMaterial, Trail, Html } from '@react-three/drei';

/**
 * Skin Disease Detection - "The Cell"
 * A pulsing, organic sphere representing biological analysis.
 */
export function BioCellArtifact({ position, scale = 1 }: { position?: [number, number, number], scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group position={position} scale={scale}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#FF4D4D"
            emissive="#8B0000"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
        
        {/* Nucleus */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#500000"
            emissive="#FF0000"
            emissiveIntensity={1}
          />
        </mesh>

        {/* Floating particles/DNA bits */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[
            Math.sin(i) * 2.5,
            Math.cos(i * 2) * 2.5,
            Math.sin(i * 3) * 2.5
          ]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#FFaaaa" emissive="#FF4D4D" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

/**
 * Environmental Data Analysis - "The Digital Earth"
 * A wireframe globe with floating data points.
 */
export function DataGlobeArtifact({ position, scale = 1 }: { position?: [number, number, number], scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        {/* Wireframe Globe */}
        <mesh>
          <icosahedronGeometry args={[1.8, 2]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#059669"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Data Points */}
        <mesh>
          <sphereGeometry args={[1.7, 32, 32]} />
          <meshBasicMaterial color="#000" transparent opacity={0.9} />
        </mesh>
        
        {[...Array(20)].map((_, i) => {
           const phi = Math.acos(-1 + (2 * i) / 20);
           const theta = Math.sqrt(20 * Math.PI) * phi;
           const r = 1.8;
           const x = r * Math.cos(theta) * Math.sin(phi);
           const y = r * Math.sin(theta) * Math.sin(phi);
           const z = r * Math.cos(phi);
           
           return (
             <mesh key={i} position={[x, y, z]}>
               <boxGeometry args={[0.1, Math.random() * 0.5 + 0.1, 0.1]} />
               <meshStandardMaterial color="#34D399" emissive="#10B981" emissiveIntensity={0.8} />
             </mesh>
           );
        })}
        
        {/* Orbital Rings */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Robot Fish - "The Bionic Fish"
 * A mechanical fish constructed from geometric primitives.
 */
export function RobotFishArtifact({ position, scale = 1 }: { position?: [number, number, number], scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Swimming motion simulating forward movement (though static in place)
      groupRef.current.position.y = (position?.[1] || 0) + Math.sin(state.clock.elapsedTime) * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (tailRef.current) {
      // Tail flapping
      tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        {/* Main Body */}
        <mesh rotation={[0, 0, -Math.PI / 2]}>
          <capsuleGeometry args={[0.6, 2, 4, 8]} />
          <meshStandardMaterial
            color="#60A5FA"
            metalness={0.8}
            roughness={0.2}
            emissive="#2563EB"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Mechanical Head */}
        <mesh position={[1.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.65, 0.8, 8]} />
          <meshStandardMaterial color="#93C5FD" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Eye */}
        <mesh position={[1.4, 0.2, 0.4]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#000" />
          <mesh position={[0.05, 0, 0]}>
             <sphereGeometry args={[0.05]} />
             <meshBasicMaterial color="#FF0000" /> {/* Laser eye */}
          </mesh>
        </mesh>

        {/* Tail Segment */}
        <group ref={tailRef} position={[-1.2, 0, 0]}>
           <mesh rotation={[0, 0, -Math.PI / 2]}>
             <coneGeometry args={[0.5, 0.8, 4]} />
             <meshStandardMaterial color="#60A5FA" metalness={0.8} />
           </mesh>
           {/* Fin */}
           <mesh position={[-0.5, 0, 0]} rotation={[0, 0, 0]}>
             <boxGeometry args={[0.8, 1.2, 0.1]} />
             <meshStandardMaterial color="#93C5FD" transparent opacity={0.8} />
           </mesh>
        </group>

        {/* Dorsal Fin */}
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.8, 0.6, 0.1]} />
          <meshStandardMaterial color="#93C5FD" transparent opacity={0.8} />
        </mesh>
        
        {/* Bubbles trail */}
        <Trail width={0.2} length={4} color="#60A5FA" attenuation={(t) => t * t}>
           <mesh visible={false} />
        </Trail>
      </Float>
    </group>
  );
}

export function ProjectArtifact({ type, ...props }: { type: string } & any) {
  switch (type) {
    case 'skin-disease-detection':
      return <BioCellArtifact {...props} />;
    case 'environmental-data-analysis':
      return <DataGlobeArtifact {...props} />;
    case 'robot-fish':
      return <RobotFishArtifact {...props} />;
    default:
      return <DataGlobeArtifact {...props} />;
  }
}
