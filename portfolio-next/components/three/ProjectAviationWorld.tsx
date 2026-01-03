'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, PerspectiveCamera, Float, useHelper, Trail } from '@react-three/drei';
import { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { ProjectArtifact } from './ProjectArtifacts';
import { projects } from '../../content/projects';
import { BioLabHub, EcoForestHub, DeepSeaHub } from './EnvironmentStations';

/**
 * Airplane Component - A simple 3D flyer
 */
function Airplane({ position, rotation }: { position: THREE.Vector3, rotation: THREE.Euler }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle flight tilting/bobbing
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(t * 2) * 0.05;
      meshRef.current.rotation.z = Math.sin(t) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} ref={meshRef}>
      {/* Fuselage */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.2, 1, 4, 8]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.02, 2.5]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      
      {/* Tail Fin */}
      <mesh position={[-0.4, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.02]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* Propeller (Spinning) */}
      <group position={[0.6, 0, 0]}>
        <Propeller />
      </group>

      {/* Jet Trails / Engine Glow */}
      <pointLight position={[-0.5, 0, 0]} intensity={2} color="#60a5fa" distance={2} />
    </group>
  );
}

function Propeller() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.x += 0.5;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.02, 0.8, 0.05]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
  );
}

function PathContent() {
  const scroll = useScroll();
  const planeRef = useRef<THREE.Group>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Define the flight path stations
  const stations = useMemo(() => [
    { pos: new THREE.Vector3(0, 10, 0), env: 'start' },
    { pos: new THREE.Vector3(10, 0, -20), env: 'bio-lab' },
    { pos: new THREE.Vector3(-10, -5, -40), env: 'eco-forest' },
    { pos: new THREE.Vector3(15, -10, -60), env: 'deep-sea' },
    { pos: new THREE.Vector3(0, -15, -80), env: 'end' }
  ], []);

  // Create a spline curve for the flight path
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(stations.map(s => s.pos));
  }, [stations]);

  const planePos = useRef(new THREE.Vector3());
  const planeRot = useRef(new THREE.Euler());

  useFrame((state) => {
    const offset = scroll.offset; // 0 to 1
    
    // Get position along curve
    const point = curve.getPointAt(offset);
    const tangent = curve.getTangentAt(offset);
    
    planePos.current.copy(point);
    
    // Calculate rotation based on tangent
    const matrix = new THREE.Matrix4();
    matrix.lookAt(point, point.clone().add(tangent), new THREE.Vector3(0, 1, 0));
    planeRot.current.setFromRotationMatrix(matrix);

    // Camera follow plane
    const camOffset = new THREE.Vector3(-8, 5, 12);
    camOffset.applyEuler(planeRot.current);
    state.camera.position.lerp(point.clone().add(camOffset), 0.1);
    state.camera.lookAt(point);

    // Update active project index based on scroll range
    const segment = 1 / (projects.length + 1);
    const index = Math.min(Math.floor(offset / segment), projects.length);
    if (index !== activeProjectIndex) setActiveProjectIndex(index);
  });

  return (
    <>
      <Airplane position={planePos.current} rotation={planeRot.current} />
      
      {/* Flight Path Visualization */}
      <mesh>
        <bufferGeometry>
            <bufferAttribute
                attach="attributes-position"
                count={100}
                array={new Float32Array(curve.getPoints(100).flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
            />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>

      {/* Project Stations */}
      {projects.map((project, i) => {
        const station = stations[i + 1];
        return (
          <group key={project.slug} position={station.pos}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
              <ProjectArtifact type={project.slug} scale={1.2} />
              
              {/* Project Info Panel */}
              <group position={[3.5, 0, 0]}>
                <Text fontSize={0.7} color="#fff" anchorX="left" fontWeight="bold">
                  {project.title.toUpperCase()}
                </Text>
                <Text position={[0, -0.6, 0]} fontSize={0.3} color="#94a3b8" anchorX="left">
                  {project.role}
                </Text>
                
                {/* Landing Marker */}
                <mesh position={[-3.5, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                   <ringGeometry args={[2, 2.2, 32]} />
                   <meshBasicMaterial color={i === activeProjectIndex - 1 ? "#06b6d4" : "#334155"} transparent opacity={0.5} />
                </mesh>
              </group>
            </Float>

            {/* Hub Environments */}
            {i === 0 && <BioLabHub />}
            {i === 1 && <EcoForestHub />}
            {i === 2 && <DeepSeaHub />}
          </group>
        );
      })}

      {/* Navigation Instruction Overlay (3D) */}
      {scroll.offset < 0.05 && (
        <Text position={[0, 12, -2]} fontSize={0.5} color="#06b6d4">
          [SCROLL TO INITIATE FLIGHT]
        </Text>
      )}
    </>
  );
}

export default function ProjectAviationWorld() {
  return (
    <div className="w-full h-[85vh] relative bg-[#020617] overflow-hidden border-y border-white/5">
       <Canvas shadows camera={{ position: [0, 15, 20], fov: 45 }}>
         <color attach="background" args={['#020617']} />
         <ambientLight intensity={0.4} />
         <pointLight position={[20, 30, 10]} intensity={1} />
         <fog attach="fog" args={['#020617', 20, 100]} />
         
         <ScrollControls pages={5} damping={0.2}>
           <Suspense fallback={null}>
              <PathContent />
           </Suspense>
         </ScrollControls>
       </Canvas>

       {/* HUD Overlays */}
       <div className="absolute top-8 left-8 z-10 font-mono text-[10px] text-white/30 tracking-widest uppercase">
          STRATEGIC_FLIGHT_LOG // v1.0
          <br/>
          DEPLOIMENT_STATUS: ACTIVE
       </div>
    </div>
  );
}
