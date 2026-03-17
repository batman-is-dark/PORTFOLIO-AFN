'use client';

import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import { 
  Float, 
  Sphere, 
  MeshDistortMaterial, 
  Points, 
  PointMaterial, 
  PerspectiveCamera, 
  Html,
  Text,
  Line,
  Environment,
  ContactShadows,
  OrbitControls,
  BakeShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { impactRoles, ImpactRole } from '../../content/impact';
import { motion } from 'framer-motion-3d';

/**
 * Centered Wireframe Core
 */
function CentralCore() {
  const meshRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
    }
    if (sphereRef.current) {
        sphereRef.current.rotation.y = -t * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Glow Layer */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial 
          color="#FF3300" 
          wireframe 
          transparent 
          opacity={0.05} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Solid Inner Core */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Floating Particles around core */}
      <Points count={200}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <PointMaterial 
            transparent 
            color="#FF3300" 
            size={0.05} 
            sizeAttenuation={true} 
            blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Orbit Rings */}
      {[5, 10, 15].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius, radius + 0.02, 128]} />
              <meshBasicMaterial color="#FF3300" transparent opacity={0.15} side={THREE.DoubleSide} />
          </mesh>
      ))}
    </group>
  );
}


/**
 * Starfield with faint movement
 */
function StarField() {
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 60 + Math.random() * 40;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Impact Station (Satellite)
 */
function ImpactStation({ 
    role, 
    active, 
    onClick 
}: { 
    role: ImpactRole, 
    active: boolean, 
    onClick: (id: string | null) => void 
}) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Calculate polar coordinates for a spherical layout
  const pos = useMemo(() => {
      const index = impactRoles.findIndex(r => r.id === role.id);
      const total = impactRoles.length;
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const radius = 8 + (index % 2) * 4; // Alternate orbits
      
      return new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
  }, [role.id]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = pos.y + Math.sin(t + role.id.length) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={pos} ref={meshRef}>
      <Float speed={2} rotationIntensity={active ? 1.5 : 0.5} floatIntensity={1}>
        {/* The Station Core */}
        <mesh onClick={(e) => {
            e.stopPropagation();
            onClick(role.id);
        }}>
          <octahedronGeometry args={[active ? 0.6 : 0.4, 0]} />
          <meshStandardMaterial 
            color={role.color} 
            emissive={role.color} 
            emissiveIntensity={active ? 2 : 0.5}
            wireframe={!active}
          />
        </mesh>

        {/* Outer Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.8, 0.01, 16, 64]} />
            <meshBasicMaterial color={role.color} transparent opacity={active ? 0.8 : 0.2} />
        </mesh>

        {/* Connection to center */}
        {active && (
            <Line
                points={[new THREE.Vector3(0, 0, 0), pos.clone().negate()]}
                color={role.color}
                lineWidth={1}
                transparent
                opacity={0.3}
            />
        )}

        {/* Label Hovering */}
        <Html position={[0, 1, 0]} center distanceFactor={10}>
          <div 
            className={`transition-all duration-500 pointer-events-none whitespace-nowrap px-3 py-1 rounded-full border border-white/10 backdrop-blur-md ${
              active ? 'opacity-100 scale-110 translate-y-0' : 'opacity-40 scale-90 translate-y-2'
            }`}
            style={{ 
                backgroundColor: active ? `${role.color}22` : 'rgba(0,0,0,0.5)',
                color: active ? role.color : 'white'
            }}
          >
            <span className="text-[10px] font-mono tracking-tighter uppercase font-bold">{role.title}</span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

/**
 * Camera Controller for smooth travel
 */
function CameraController({ activeId }: { activeId: string | null }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(20, 15, 20));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (activeId) {
      const role = impactRoles.find(r => r.id === activeId);
      if (role) {
          // Find position (copy from ImpactStation logic)
          const index = impactRoles.findIndex(r => r.id === role.id);
          const total = impactRoles.length;
          const phi = Math.acos(-1 + (2 * index) / total);
          const theta = Math.sqrt(total * Math.PI) * phi;
          const radius = 8 + (index % 2) * 4;
          
          const pos = new THREE.Vector3(
            radius * Math.cos(theta) * Math.sin(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(phi)
          );

          // Position camera slightly offset from station
          const camOffset = pos.clone().normalize().multiplyScalar(5);
          targetPos.current.copy(pos).add(camOffset);
          lookAt.current.set(0, 0, 0); // Still look at center for gravity feel
      }
    } else {
      targetPos.current.set(20, 15, 20);
      lookAt.current.set(0, 0, 0);
    }
  }, [activeId]);

  useFrame((state, delta) => {
    camera.position.lerp(targetPos.current, 0.05);
    state.camera.lookAt(lookAt.current);
  });

  return null;
}

export default function ImpactWorld({ activeId, setActiveId }: { 
  activeId: string | null; 
  setActiveId: (id: string | null) => void 
}) {
  return (
    <Canvas 
      shadows 
      dpr={[1, 2]} 
      gl={{ antialias: true, alpha: true }}
    >
      <PerspectiveCamera makeDefault position={[20, 15, 20]} fov={45} />
      
      <ambientLight opacity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FF3300" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#FFFFFF" />

      <Suspense fallback={null}>
        <CentralCore />
        <StarField />
        
        {impactRoles.map((role) => (
          <ImpactStation 
            key={role.id} 
            role={role} 
            active={activeId === role.id} 
            onClick={setActiveId} 
          />
        ))}

        <CameraController activeId={activeId} />
        
        <Constellation />

        <Environment preset="night" />
        <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        <BakeShadows />
      </Suspense>

      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={5} 
        maxDistance={40}
        autoRotate={!activeId}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

/**
 * Constellation Lines connecting the sequence of impact
 */
function Constellation() {
  const points = useMemo(() => {
    return impactRoles.map((role, index) => {
        const total = impactRoles.length;
        const phi = Math.acos(-1 + (2 * index) / total);
        const theta = Math.sqrt(total * Math.PI) * phi;
        const radius = 8 + (index % 2) * 4;
        
        return new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        );
    });
  }, []);

  return (
    <group>
      <Line
        points={points}
        color="#FF3300"
        lineWidth={1}
        transparent
        opacity={0.3}
      />
      {/* Dashed completion ring */}
      <Line
        points={[points[points.length - 1], points[0]]}
        color="#FF3300"
        lineWidth={1}
        dashed
        dashScale={2}
        transparent
        opacity={0.15}
      />
    </group>
  );
}

