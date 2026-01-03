'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Stars, PerspectiveCamera, Environment, Float, Html } from '@react-three/drei';
import { useRef, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { ProjectArtifact } from './ProjectArtifacts';
import { projects } from '../../content/projects';

/**
 * SceneContent - Handles the scroll animation and object placement
 */
function SceneContent() {
  const scroll = useScroll();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Define project stations clearly in 3D space
  // We place them along a path that the camera will "visit"
  const stations = useMemo(() => [
    { position: [0, 0, 0], rotation: [0, 0, 0] },     // Project 1
    { position: [15, -2, -10], rotation: [0, Math.PI / 4, 0] }, // Project 2
    { position: [-15, 3, -20], rotation: [0, -Math.PI / 4, 0] }, // Project 3
    { position: [0, 8, -30], rotation: [0, 0, 0] }    // End view / Summary
  ], []);

  useFrame((state) => {
    // Current scroll progress (0 to 1)
    const r1 = scroll.range(0 / 3, 1 / 3);
    const r2 = scroll.range(1 / 3, 1 / 3);
    const r3 = scroll.range(2 / 3, 1 / 3);

    // Calculate camera position based on scroll
    // Interpolate between stations
    // Simple smooth stepping for now
    const totalPath = stations.length - 1;
    const progress = scroll.offset * totalPath;
    const currentIndex = Math.min(Math.floor(progress), totalPath - 1);
    const nextIndex = currentIndex + 1;
    const localProgress = progress - currentIndex; // 0 to 1 between stations

    const currentStation = stations[currentIndex];
    const nextStation = stations[nextIndex];

    if (currentStation && nextStation) {
      const targetPos = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(...currentStation.position as [number, number, number]),
        new THREE.Vector3(...nextStation.position as [number, number, number]),
        localProgress
      );
      
      // Move camera slightly back from the target position to view it
      state.camera.position.lerp(new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z + 10), 0.1);
      state.camera.lookAt(targetPos);
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        // Map project slug to specific artifacts or default
        // We only have 3 stations defined above for 3 projects, so we limit or loop
        const stationIndex = index % 3; 
        const station = stations[stationIndex];
        
        return (
          <group key={project.slug} position={station.position as [number, number, number]}>
            {/* The 3D Artifact */}
            <ProjectArtifact type={project.slug} scale={1.5} />
            
            {/* Project Title & Info (Floating Text) */}
            <group position={[3.5, 0.5, 0]} rotation={[0, -0.2, 0]}>
               <Text
                 fontSize={0.8}
                 color="#fff"
                 anchorX="left"
                 anchorY="bottom"
                 maxWidth={6}
               >
                 {project.title.toUpperCase()}
               </Text>
               <Text
                 position={[0, -0.6, 0]}
                 fontSize={0.4}
                 color="#94a3b8" // Slate-400
                 anchorX="left"
                 anchorY="top"
                 maxWidth={6}
               >
                 {project.role}
               </Text>
               <Text
                 position={[0, -1.2, 0]}
                 fontSize={0.3}
                 color="#06b6d4" // Cyan-500
                 anchorX="left"
                 anchorY="top"
                 maxWidth={5}
               >
                 {project.stack.slice(0, 4).join(' • ')}
               </Text>

                {/* Interactive 'View' Button (Mesh) */}
                <group position={[0, -2.5, 0]} 
                       onClick={() => window.open(project.links?.[0]?.url || '#', '_blank')}
                       onPointerOver={() => document.body.style.cursor = 'pointer'}
                       onPointerOut={() => document.body.style.cursor = 'auto'}
                >
                  {/* Holographic Glow */}
                  <mesh position={[0, 0, -0.1]}>
                    <planeGeometry args={[2, 2]} />
                    <meshBasicMaterial 
                      color="#06b6d4" 
                      transparent 
                      opacity={0.2} 
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                  <mesh rotation={[0, 0, Math.PI/2]}>
                    <capsuleGeometry args={[0.3, 1.5, 4, 8]} />
                    <meshStandardMaterial 
                      color="#06b6d4" 
                      emissive="#06b6d4"
                      emissiveIntensity={2}
                      toneMapped={false}
                    />
                  </mesh>
                  <Text position={[0, 0, 0.31]} fontSize={0.25} color="#000" fontWeight="bold">
                    VIEW PROJECT
                  </Text>
                </group>
            </group>
          </group>
        );
      })}

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
      <spotLight position={[0, 15, 0]} angle={0.5} penumbra={1} intensity={1} castShadow />

      {/* Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#050505', 5, 50]} />
    </group>
  );
}

export default function ProjectWorld() {
  return (
    <div className="w-full h-[80vh] relative bg-black overflow-hidden border-y border-gray-800">
       <div className="absolute top-4 left-4 z-10 text-white/50 text-sm font-mono tracking-widest pointer-events-none">
          {'/// PROJECT_DATABASE_V1.0 initialized'}
          <br/>
          {'/// SCROLL_TO_NAVIGATE'}
       </div>

       <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
         <color attach="background" args={['#050505']} />
         
         <ScrollControls pages={3} damping={0.3}>
           <Suspense fallback={null}>
              <SceneContent />
           </Suspense>
         </ScrollControls>
       </Canvas>
       
       <div className="absolute bottom-4 right-4 z-10 text-right pointer-events-none">
          <div className="text-cyan-500 font-bold text-lg">THE LAB</div>
          <div className="text-xs text-gray-500">PROTOTYPE GALLERY</div>
       </div>
    </div>
  );
}
