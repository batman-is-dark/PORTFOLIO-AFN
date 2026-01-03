'use client';

import * as THREE from 'three';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, GradientTexture, Sky } from '@react-three/drei';

/**
 * Bio-Lab Hub (Skin Disease Detection)
 * Clean, clinical, and high-tech environment.
 */
export function BioLabHub() {
  return (
    <group>
      {/* Clinical Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.1} />
      </mesh>
      
      {/* Laboratory Scanners (Vertical Beams) */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i) * 5, 2, Math.sin(i) * 5]}>
          <cylinderGeometry args={[0.05, 0.05, 8, 8]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Floating Data Panels (Abstract) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[4, 1, -2]}>
          <boxGeometry args={[1, 1.5, 0.05]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Eco-Forest Hub (Environmental Data Analysis)
 * Lush, green, and natural environment.
 */
export function EcoForestHub() {
  return (
    <group>
      {/* Grassy Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <circleGeometry args={[15, 32]} />
        <meshStandardMaterial color="#14532d" roughness={1} />
      </mesh>
      
      {/* Voxel Trees */}
      {[...Array(12)].map((_, i) => {
        const x = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        // Keep center clear for landing
        if (Math.sqrt(x*x + z*z) < 4) return null;
        
        return (
          <group key={i} position={[x, -1, z]} scale={0.5 + Math.random() * 0.5}>
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[1, 2, 1]} />
              <meshStandardMaterial color="#166534" />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
          </group>
        );
      })}

      <Sky sunPosition={[100, 20, 100]} />
    </group>
  );
}

/**
 * Deep-Sea Hub (Robot Fish)
 * Blue, atmospheric, and aquatic environment.
 */
export function DeepSeaHub() {
  return (
    <group>
      {/* Sandy Bottom */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
      </mesh>

      {/* Underwater Bubbles */}
      {[...Array(30)].map((_, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={2}>
          <mesh position={[
            (Math.random() - 0.5) * 20,
            Math.random() * 10,
            (Math.random() - 0.5) * 20
          ]}>
            <sphereGeometry args={[0.05 + Math.random() * 0.1, 16, 16]} />
            <meshStandardMaterial color="#60a5fa" transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}

      {/* Caustic Reflections (Abstract) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial transparent opacity={0.1}>
           <GradientTexture stops={[0, 0.5, 1]} colors={['#1e3a8a', '#3b82f6', '#1e3a8a']} />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}
