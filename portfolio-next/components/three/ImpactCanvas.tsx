'use client';

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { Text, Float, OrthographicCamera, Line, Plane, Grid, OrbitControls } from '@react-three/drei';
import { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { impactRoles, ImpactRole } from '../../content/impact';

// Relevant Objects - Floating around waypoints based on category
function AchievementObjects() {
  const objectsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (objectsRef.current) {
      objectsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <group ref={objectsRef}>
      {impactRoles.map((role, idx) => {
        const pos = role.coordinates;
        const offset = 3; // Distance from waypoint
        
        return (
          <group key={role.id} position={pos}>
            {/* Category-specific objects orbiting each waypoint */}
            {role.category === 'Leadership' && (
              <>
                {/* Trophy/Award */}
                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
                  <mesh position={[offset, 1, 0]}>
                    <coneGeometry args={[0.3, 0.6, 4]} />
                    <meshStandardMaterial color={role.color} emissive={role.color} emissiveIntensity={0.3} />
                  </mesh>
                </Float>
                {/* Star badge */}
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                  <mesh position={[-offset, 0.5, offset]}>
                    <octahedronGeometry args={[0.25, 0]} />
                    <meshStandardMaterial color={role.color} emissive={role.color} emissiveIntensity={0.5} wireframe />
                  </mesh>
                </Float>
              </>
            )}
            
            {role.category === 'Technical' && (
              <>
                {/* Circuit board representation */}
                <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
                  <group position={[offset, 0, offset]}>
                    <mesh>
                      <boxGeometry args={[0.6, 0.05, 0.4]} />
                      <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} />
                    </mesh>
                    {/* Circuit traces */}
                    <mesh position={[0, 0.03, 0]}>
                      <boxGeometry args={[0.5, 0.02, 0.02]} />
                      <meshBasicMaterial color={role.color} />
                    </mesh>
                    <mesh position={[0, 0.03, 0]} rotation={[0, Math.PI / 2, 0]}>
                      <boxGeometry args={[0.3, 0.02, 0.02]} />
                      <meshBasicMaterial color={role.color} />
                    </mesh>
                  </group>
                </Float>
                {/* Microchip */}
                <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.5}>
                  <mesh position={[-offset, 1, -offset]}>
                    <boxGeometry args={[0.3, 0.1, 0.3]} />
                    <meshStandardMaterial color={role.color} metalness={0.8} roughness={0.2} />
                  </mesh>
                </Float>
              </>
            )}
            
            {role.category === 'Editorial' && (
              <>
                {/* Floating document/page */}
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.6}>
                  <mesh position={[offset, 0.5, -offset]} rotation={[0.2, 0.3, 0]}>
                    <planeGeometry args={[0.4, 0.6]} />
                    <meshStandardMaterial color="#f8fafc" emissive={role.color} emissiveIntensity={0.1} side={THREE.DoubleSide} />
                  </mesh>
                </Float>
                {/* Pen/pencil */}
                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
                  <mesh position={[-offset, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                    <meshStandardMaterial color={role.color} />
                  </mesh>
                </Float>
              </>
            )}
            
            {role.category === 'Community' && (
              <>
                {/* Heart/helping hands symbol */}
                <Float speed={1.7} rotationIntensity={0.3} floatIntensity={0.5}>
                  <mesh position={[offset, 0.8, offset]}>
                    <sphereGeometry args={[0.25, 16, 16]} />
                    <meshStandardMaterial color={role.color} emissive={role.color} emissiveIntensity={0.4} />
                  </mesh>
                </Float>
                {/* Star for community impact */}
                <Float speed={2.1} rotationIntensity={0.4} floatIntensity={0.6}>
                  <mesh position={[-offset, 0.5, -offset]}>
                    <tetrahedronGeometry args={[0.3, 0]} />
                    <meshStandardMaterial color={role.color} emissive={role.color} emissiveIntensity={0.3} />
                  </mesh>
                </Float>
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}

// Altitude Rings - Distance markers
function AltitudeRings() {
  return (
    <group>
      {[0, -5, -10, -15].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[15 + i * 5, 15.2 + i * 5, 64]} />
          <meshBasicMaterial
            color="#1e293b"
            transparent
            opacity={0.15 - i * 0.03}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Waypoint: A geometric beacon marker
function Waypoint({ role, active, onClick }: { 
  role: ImpactRole, 
  active: boolean, 
  onClick: (id: string | null) => void 
}) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Bobbing motion like a floating marker
      meshRef.current.position.y = role.coordinates[1] + Math.sin(t + role.coordinates[0]) * 0.2;
    }
  });

  return (
    <group position={role.coordinates}>
      <group ref={meshRef}>
        {/* Interaction target */}
        <mesh 
          onClick={(e) => {
            e.stopPropagation();
            onClick(active ? null : role.id);
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Beacon Core (Diamond shape) */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial 
            color={active ? '#ffffff' : role.color} 
            emissive={role.color}
            emissiveIntensity={active ? 2 : 1}
            wireframe={!active}
          />
        </mesh>

        {/* Inner solid core if active */}
        {active && (
          <mesh rotation={[0, Math.PI / 4, 0]} scale={0.5}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshBasicMaterial color={role.color} />
          </mesh>
        )}

        {/* Base Ring */}
        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.4, 32]} />
          <meshBasicMaterial color={role.color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>

        {/* Label */}
        <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
          <group position={[1.2, 0, 0]}>
             <Text
              position={[0, 0.2, 0]}
              fontSize={0.35}
              color="white"
              anchorX="left"
              anchorY="bottom"
            >
              {role.title.toUpperCase()}
            </Text>
             <Text
              position={[0, -0.1, 0]}
              fontSize={0.2}
              color={role.color}
              anchorX="left"
              anchorY="top"
            >
              {role.agency.toUpperCase()}
            </Text>
            {/* Connecting line to label */}
            <mesh position={[-0.6, 0, 0]}>
              <boxGeometry args={[1, 0.02, 0.02]} />
              <meshBasicMaterial color="gray" opacity={0.5} transparent />
            </mesh>
          </group>
        </Float>
      </group>
      
      {/* Vertical 'Ground' Line to show height on grid */}
      <Line
        points={[[0, 0, 0], [0, -10 - role.coordinates[1], 0]]} // Extend down to a theoretical floor
        color={role.color}
        opacity={0.1}
        transparent
        lineWidth={1}
        dashed
        dashScale={2}
      />
    </group>
  );
}

function FlightPath() {
  const points = useMemo(() => impactRoles.map(r => new THREE.Vector3(...r.coordinates)), []);
  return (
    <Line
      points={points}
      color="#334155" // Slate 700
      lineWidth={1}
      dashed
      dashScale={5}
      opacity={0.3}
      transparent
    />
  );
}

// Camera Controller: Makes the camera look at the scene and follows active waypoint
function CameraController({ activeId }: { activeId: string | null }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(20, 20, 20));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  useEffect(() => {
    // Find the active waypoint
    const activeRole = impactRoles.find(r => r.id === activeId);
    
    if (activeRole) {
      // Calculate camera position to focus on the waypoint
      const waypointPos = new THREE.Vector3(...activeRole.coordinates);
      
      // Offset the camera to maintain isometric view but centered on waypoint
      targetPosition.current.set(
        waypointPos.x + 20,
        waypointPos.y + 20,
        waypointPos.z + 20
      );
      
      targetLookAt.current.copy(waypointPos);
    } else {
      // Default view showing all waypoints
      targetPosition.current.set(20, 20, 20);
      targetLookAt.current.set(0, 0, 0);
    }
  }, [activeId]);
  
  useFrame(() => {
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.05);
    
    // Smooth look-at transition
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    currentLookAt.lerp(targetLookAt.current, 0.05);
    
    camera.lookAt(currentLookAt);
    camera.updateProjectionMatrix();
  });
  
  return null;
}

function Scene({ activeId, setActiveId }: { 
  activeId: string | null, 
  setActiveId: (id: string | null) => void 
}) {
  return (
    <>
      {/* Isometric Camera: Zoom 40 is a good starting point for orthographic */}
      <OrthographicCamera makeDefault position={[20, 20, 20]} zoom={40} near={-50} far={200} />
      <CameraController activeId={activeId} />
      
      {/* OrbitControls for mouse drag */}
      <OrbitControls
        enabled={!activeId} // Disable when viewing a waypoint
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minZoom={20}
        maxZoom={80}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />
      
      {/* Atmospheric Elements */}
      <AchievementObjects />
      <AltitudeRings />
      <fog attach="fog" args={['#0B1120', 30, 100]} />

      <group position={[0, -2, 0]}>
        {/* Render Waypoints */}
        {impactRoles.map((role) => (
          <Waypoint 
            key={role.id} 
            role={role} 
            active={activeId === role.id} 
            onClick={setActiveId}
          />
        ))}

        {/* Flight Path Line */}
        <FlightPath />

        {/* Floor Grid for perspective */}
        <Grid 
          position={[0, -10, 0]} 
          args={[60, 60]} 
          cellSize={2} 
          cellThickness={1} 
          cellColor="#1e293b" 
          sectionSize={10} 
          sectionThickness={1.5} 
          sectionColor="#334155" 
          fadeDistance={50} 
          fadeStrength={1}
          infiniteGrid
        />
      </group>
    </>
  );
}

export default function ImpactCanvas({ activeId, setActiveId }: {
  activeId: string | null,
  setActiveId: (id: string | null) => void
}) {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <color attach="background" args={['#0B1120']} />
        <Suspense fallback={null}>
          <Scene activeId={activeId} setActiveId={setActiveId} />
        </Suspense>
      </Canvas>
    </div>
  );
}
