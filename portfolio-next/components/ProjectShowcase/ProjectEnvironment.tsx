'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html, PerspectiveCamera } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { projects } from '../../content/projects';
import * as THREE from 'three';

// Office furniture components
function Desk({ position, rotation }: any) {
  return (
    <group position={position} rotation={rotation}>
      {/* Desk top */}
      <mesh position={[0, 0.75, 0]} receiveShadow castShadow>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#8b4513" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Desk legs */}
      {[[-1.8, 0, -0.8], [1.8, 0, -0.8], [-1.8, 0, 0.8], [1.8, 0, 0.8]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}
    </group>
  );
}

function Chair({ position, rotation }: any) {
  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.9, -0.25]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      {/* Legs */}
      {[[-0.2, 0, -0.2], [0.2, 0, -0.2], [-0.2, 0, 0.2], [0.2, 0, 0.2]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.03, 0.03, 1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
      ))}
    </group>
  );
}

function Bookshelf({ position, rotation }: any) {
  return (
    <group position={position} rotation={rotation}>
      {/* Shelves */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, i * 0.8, 0]} castShadow>
          <boxGeometry args={[3, 0.05, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}
      {/* Back panel */}
      <mesh position={[0, 1.2, -0.375]} castShadow>
        <boxGeometry args={[3, 2.4, 0.05]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Books */}
      {[0, 1, 2].map((shelf) =>
        [0, 1, 2, 3, 4].map((book) => {
          const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
          return (
            <mesh 
              key={`${shelf}-${book}`} 
              position={[-1.2 + book * 0.55, shelf * 0.8 + 0.3, 0.1]}
              castShadow
            >
              <boxGeometry args={[0.15, 0.5, 0.6]} />
              <meshStandardMaterial color={colors[book]} />
            </mesh>
          );
        })
      )}
    </group>
  );
}

function Monitor({ position, rotation }: any) {
  return (
    <group position={position} rotation={rotation}>
      {/* Screen */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial color="#1f2937" metalness={0.3} />
      </mesh>
      {/* Display */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshStandardMaterial color="#0f172a" emissive="#3b82f6" emissiveIntensity={0.2} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.5, -0.1]}>
        <cylinderGeometry args={[0.05, 0.15, 0.4]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  );
}

function Plant({ position }: any) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.3, 8]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      {/* Leaves */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <mesh 
            key={i} 
            position={[Math.cos(angle) * 0.15, 0.35 + i * 0.05, Math.sin(angle) * 0.15]}
            rotation={[0, angle, Math.PI / 4]}
            castShadow
          >
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
        );
      })}
    </group>
  );
}

function CoffeeMug({ position }: any) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.12, 16]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>
      {/* Handle */}
      <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.05, 0.01, 8, 16]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>
    </group>
  );
}

// Interactive project object components with cel-shaded outlines
function TokenBoard({ position, project, onClick, isSelected, isHovered, onPointerOver, onPointerOut }: any) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group 
        position={position} 
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {/* Cel-shaded outline */}
        <mesh scale={1.08}>
          <boxGeometry args={[2.5, 3, 0.2]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        
        {/* Color palette board */}
        <mesh castShadow>
          <boxGeometry args={[2.5, 3, 0.2]} />
          <meshToonMaterial 
            color={isSelected ? '#60a5fa' : '#3b82f6'}
            emissive={isHovered ? '#3b82f6' : '#1e40af'}
            emissiveIntensity={isHovered ? 0.6 : 0.2}
          />
        </mesh>
        
        {/* Color swatches */}
        {[0, 1, 2].map((row) => 
          [0, 1, 2, 3].map((col) => {
            const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
            return (
              <mesh 
                key={`${row}-${col}`} 
                position={[-0.75 + col * 0.5, 1 - row * 0.8, 0.15]}
                castShadow
              >
                <boxGeometry args={[0.4, 0.4, 0.05]} />
                <meshToonMaterial color={colors[(row * 4 + col) % colors.length]} />
              </mesh>
            );
          })
        )}
        
        {/* Hover tooltip */}
        {isHovered && (
          <Html position={[0, 2, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="bg-slate-900/95 px-4 py-2 rounded-lg border border-blue-400 shadow-xl">
              <p className="text-white font-bold text-sm whitespace-nowrap">{project.title}</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function PerformanceGauge({ position, project, onClick, isSelected, isHovered, onPointerOver, onPointerOut }: any) {
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
      <group 
        position={position} 
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {/* Cel-shaded outline */}
        <mesh rotation={[0, 0, 0]} scale={1.08}>
          <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        
        {/* Gauge base */}
        <mesh castShadow rotation={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
          <meshToonMaterial 
            color={isSelected ? '#10b981' : '#059669'}
            emissive={isHovered ? '#059669' : '#047857'}
            emissiveIntensity={isHovered ? 0.6 : 0.2}
          />
        </mesh>
        
        {/* Gauge needle */}
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, -0.5]} castShadow>
          <boxGeometry args={[0.1, 1.2, 0.05]} />
          <meshToonMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.4} />
        </mesh>
        
        {/* Center pivot */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshToonMaterial color="#1f2937" />
        </mesh>
        
        {isHovered && (
          <Html position={[0, 2, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="bg-slate-900/95 px-4 py-2 rounded-lg border border-green-400 shadow-xl">
              <p className="text-white font-bold text-sm whitespace-nowrap">{project.title}</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function AnalysisTerminal({ position, project, onClick, isSelected, isHovered, onPointerOver, onPointerOut }: any) {
  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
      <group 
        position={position} 
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {/* Cel-shaded outline */}
        <mesh scale={1.08}>
          <boxGeometry args={[3, 2, 0.2]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        
        {/* Terminal screen */}
        <mesh castShadow>
          <boxGeometry args={[3, 2, 0.2]} />
          <meshToonMaterial 
            color={isSelected ? '#7c3aed' : '#6366f1'}
            emissive={isHovered ? '#6366f1' : '#4f46e5'}
            emissiveIntensity={isHovered ? 0.6 : 0.2}
          />
        </mesh>
        
        {/* Screen display */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[2.6, 1.6]} />
          <meshToonMaterial color="#0f172a" emissive="#22c55e" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Code lines */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-1, 0.6 - i * 0.35, 0.12]} castShadow>
            <boxGeometry args={[2 - i * 0.3, 0.08, 0.01]} />
            <meshToonMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
          </mesh>
        ))}
        
        {isHovered && (
          <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="bg-slate-900/95 px-4 py-2 rounded-lg border border-purple-400 shadow-xl">
              <p className="text-white font-bold text-sm whitespace-nowrap">{project.title}</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function DataCube({ position, project, onClick, isSelected, isHovered, onPointerOver, onPointerOut }: any) {
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.5}>
      <group 
        position={position} 
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {/* Cel-shaded outline */}
        <mesh scale={1.08}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        
        <mesh castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshToonMaterial 
            color={isSelected ? '#f59e0b' : '#d97706'}
            emissive={isHovered ? '#d97706' : '#b45309'}
            emissiveIntensity={isHovered ? 0.6 : 0.2}
          />
        </mesh>
        
        {/* Inner glowing core */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshToonMaterial 
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {isHovered && (
          <Html position={[0, 1.8, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="bg-slate-900/95 px-4 py-2 rounded-lg border border-yellow-400 shadow-xl">
              <p className="text-white font-bold text-sm whitespace-nowrap">{project.title}</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function ServerRack({ position, project, onClick, isSelected, isHovered, onPointerOver, onPointerOut }: any) {
  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group 
        position={position} 
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {/* Server units with outline */}
        {[0, 1, 2].map((i) => (
          <group key={i} position={[0, 1 - i * 0.8, 0]}>
            {/* Cel-shaded outline */}
            <mesh scale={[1.08, 1.2, 1.08]}>
              <boxGeometry args={[2.5, 0.6, 1]} />
              <meshBasicMaterial color="#000000" side={THREE.BackSide} />
            </mesh>
            
            <mesh castShadow>
              <boxGeometry args={[2.5, 0.6, 1]} />
              <meshToonMaterial 
                color={isSelected ? '#64748b' : '#475569'}
                emissive={isHovered ? '#475569' : '#334155'}
                emissiveIntensity={isHovered ? 0.5 : 0.2}
              />
            </mesh>
            
            {/* Status lights */}
            {[0, 1, 2].map((j) => (
              <mesh key={j} position={[-0.8 + j * 0.3, 0, 0.51]} castShadow>
                <circleGeometry args={[0.05, 16]} />
                <meshToonMaterial 
                  color={j === 0 ? '#22c55e' : j === 1 ? '#3b82f6' : '#f59e0b'}
                  emissive={j === 0 ? '#22c55e' : j === 1 ? '#3b82f6' : '#f59e0b'}
                  emissiveIntensity={0.8}
                />
              </mesh>
            ))}
          </group>
        ))}
        
        {isHovered && (
          <Html position={[0, 2, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="bg-slate-900/95 px-4 py-2 rounded-lg border border-slate-400 shadow-xl">
              <p className="text-white font-bold text-sm whitespace-nowrap">{project.title}</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function NetworkNode({ position, project, onClick, isSelected, isHovered, onPointerOver, onPointerOut }: any) {
  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
      <group 
        position={position} 
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {/* Cel-shaded outline */}
        <mesh scale={1.08}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial color="#000000" side={THREE.BackSide} />
        </mesh>
        
        {/* Central node */}
        <mesh castShadow>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshToonMaterial 
            color={isSelected ? '#ec4899' : '#db2777'}
            emissive={isHovered ? '#db2777' : '#be185d'}
            emissiveIntensity={isHovered ? 0.7 : 0.3}
          />
        </mesh>
        
        {/* Orbiting satellites */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2;
          const radius = 1.5;
          return (
            <mesh 
              key={i} 
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.5,
                Math.sin(angle) * radius
              ]}
              castShadow
            >
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshToonMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
            </mesh>
          );
        })}
        
        {isHovered && (
          <Html position={[0, 1.8, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="bg-slate-900/95 px-4 py-2 rounded-lg border border-pink-400 shadow-xl">
              <p className="text-white font-bold text-sm whitespace-nowrap">{project.title}</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

// Map project slugs to themed 3D objects
const projectComponents: Record<string, any> = {
  alpha: TokenBoard,      // Design Tokens Pipeline
  beta: PerformanceGauge, // Performance Budget CI
  gamma: AnalysisTerminal, // Design System Audit
  delta: DataCube,
  epsilon: ServerRack,
  zeta: NetworkNode,
  eta: DataCube,
  theta: AnalysisTerminal,
};

function EnvironmentScene({ onProjectClick, isMobile }: { onProjectClick: (project: any) => void; isMobile: boolean }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const handleClick = (project: any) => {
    setSelectedSlug(project.slug);
    onProjectClick(project);
  };

  // Simplified positions for mobile - fewer objects, closer together
  const projectPositions: Record<number, [number, number, number]> = isMobile ? {
    0: [-3, 2, -4],    // Closer desk 1
    1: [3, 2, -4],     // Closer desk 2
    2: [0, 2, -6],     // Center desk
    3: [-3, 2, 4],     // Back desk left
    4: [3, 2, 4],      // Back desk right
  } : {
    0: [-4, 2, -6],    // On desk 1
    1: [4, 2, -6],     // On desk 2
    2: [-8, 1.5, 0],   // On bookshelf
    3: [0, 2, -8],     // Center desk
    4: [8, 1.5, 0],    // On bookshelf right
    5: [-4, 2, 6],     // Back desk left
    6: [4, 2, 6],      // Back desk right
    7: [0, 1.5, -10],  // Far wall
  };

  // Limit projects on mobile
  const displayedProjects = isMobile ? projects.slice(0, 5) : projects;

  return (
    <>
      <PerspectiveCamera makeDefault position={isMobile ? [0, 4, 8] : [0, 5, 12]} fov={isMobile ? 70 : 60} />
      <OrbitControls
        enablePan={true}
        minDistance={isMobile ? 3 : 5}
        maxDistance={isMobile ? 12 : 20}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 2, 0]}
        enableDamping={true}
        dampingFactor={isMobile ? 0.1 : 0.05}
        rotateSpeed={isMobile ? 0.8 : 1}
        panSpeed={isMobile ? 0.8 : 1}
      />

      {/* Lighting - simplified for mobile */}
      <ambientLight intensity={isMobile ? 0.8 : 0.6} />
      <pointLight position={[0, 8, 0]} intensity={isMobile ? 1 : 1.5} castShadow={!isMobile} color="#ffffff" />
      {!isMobile && (
        <>
          <pointLight position={[-8, 6, -8]} intensity={0.8} color="#fbbf24" />
          <pointLight position={[8, 6, -8]} intensity={0.8} color="#3b82f6" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.8}
            penumbra={1}
            intensity={1}
            castShadow
          />
        </>
      )}

      {/* Environment */}
      <Environment preset="apartment" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[isMobile ? 30 : 40, isMobile ? 30 : 40]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>

      {/* Walls - simplified for mobile */}
      {!isMobile && (
        <>
          {/* Back wall */}
          <mesh position={[0, 5, -12]} receiveShadow>
            <boxGeometry args={[40, 10, 0.2]} />
            <meshStandardMaterial color="#374151" />
          </mesh>

          {/* Left wall */}
          <mesh position={[-12, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
            <boxGeometry args={[40, 10, 0.2]} />
            <meshStandardMaterial color="#374151" />
          </mesh>

          {/* Right wall */}
          <mesh position={[12, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
            <boxGeometry args={[40, 10, 0.2]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        </>
      )}

      {/* Office Furniture - simplified for mobile */}
      {/* Front desks */}
      <Desk position={[-4, 0, -6]} rotation={[0, 0, 0]} />
      <Chair position={[-4, 0, -4.5]} rotation={[0, Math.PI, 0]} />
      <Monitor position={[-4, 0.8, -6.5]} rotation={[0, 0, 0]} />
      {!isMobile && <CoffeeMug position={[-3, 0.8, -5.5]} />}

      <Desk position={[4, 0, -6]} rotation={[0, 0, 0]} />
      <Chair position={[4, 0, -4.5]} rotation={[0, Math.PI, 0]} />
      <Monitor position={[4, 0.8, -6.5]} rotation={[0, 0, 0]} />

      {/* Center desk */}
      <Desk position={[0, 0, -8]} rotation={[0, 0, 0]} />
      <Chair position={[0, 0, -6.5]} rotation={[0, Math.PI, 0]} />

      {/* Back desks - only on desktop */}
      {!isMobile && (
        <>
          <Desk position={[-4, 0, 6]} rotation={[0, Math.PI, 0]} />
          <Chair position={[-4, 0, 4.5]} rotation={[0, 0, 0]} />

          <Desk position={[4, 0, 6]} rotation={[0, Math.PI, 0]} />
          <Chair position={[4, 0, 4.5]} rotation={[0, 0, 0]} />

          {/* Bookshelves */}
          <Bookshelf position={[-8, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
          <Bookshelf position={[8, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

          {/* Plants for decoration */}
          <Plant position={[-10, 0, -10]} />
          <Plant position={[10, 0, -10]} />
          <Plant position={[0, 0, 10]} />
        </>
      )}

      {/* Render interactive project objects */}
      {displayedProjects.map((project, index) => {
        const Component = projectComponents[project.slug] || DataCube;
        const position = projectPositions[index] || [0, 2, 0];

        return (
          <Component
            key={project.slug}
            position={position}
            project={project}
            onClick={() => handleClick(project)}
            isSelected={selectedSlug === project.slug}
            isHovered={hoveredSlug === project.slug}
            onPointerOver={() => {
              setHoveredSlug(project.slug);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredSlug(null);
              document.body.style.cursor = 'default';
            }}
          />
        );
      })}
    </>
  );
}

export default function ProjectEnvironment() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setShowDetails(true);
  };

  return (
    <div className="relative w-full h-screen bg-slate-950">
      <Canvas
        shadows={!isMobile}
        gl={{
          antialias: !isMobile,
          powerPreference: isMobile ? "low-power" : "high-performance",
          alpha: true
        }}
        dpr={isMobile ? 1 : [1, 2]}
        style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
      >
        <EnvironmentScene onProjectClick={handleProjectClick} isMobile={isMobile} />
      </Canvas>

      {/* Instructions overlay - mobile optimized */}
      <div className={`absolute top-8 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-slate-700 text-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
        <p className="text-white font-medium">
          {isMobile ? '� Tap objects • Drag to look' : '�🖱️ Hover over glowing objects • Click to view details • Drag to look around'}
        </p>
      </div>

      {/* Project details panel - mobile optimized */}
      {showDetails && selectedProject && (
        <div className={`absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-11/12 max-w-2xl bg-slate-900/95 backdrop-blur-md p-4 md:p-8 rounded-2xl border border-slate-700 shadow-2xl animate-in slide-in-from-bottom duration-500 ${isMobile ? 'max-h-[70vh] overflow-y-auto' : ''}`}>
          <button
            onClick={() => setShowDetails(false)}
            className="absolute top-2 right-2 md:top-4 md:right-4 text-slate-400 hover:text-white transition-colors"
            aria-label="Close details"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className={`font-bold text-white mb-2 ${isMobile ? 'text-xl' : 'text-3xl'}`}>{selectedProject.title}</h2>
          <p className={`text-blue-400 mb-4 ${isMobile ? 'text-sm' : 'text-lg'}`}>{selectedProject.role} • {selectedProject.timeframe}</p>

          <div className="space-y-3 md:space-y-4 text-slate-300">
            <div>
              <h3 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Problem</h3>
              <p className={`text-sm md:text-base ${isMobile ? 'leading-relaxed' : ''}`}>{selectedProject.problem}</p>
            </div>

            <div>
              <h3 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Approach</h3>
              <p className={`text-sm md:text-base ${isMobile ? 'leading-relaxed' : ''}`}>{selectedProject.approach}</p>
            </div>

            <div>
              <h3 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Impact</h3>
              <p className={`text-sm md:text-base ${isMobile ? 'leading-relaxed' : ''}`}>{selectedProject.impact}</p>
            </div>

            <div>
              <h3 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {selectedProject.stack.map((tech: string) => (
                  <span
                    key={tech}
                    className={`px-2 md:px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 ${isMobile ? 'text-xs' : 'text-sm'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {selectedProject.links && selectedProject.links.length > 0 && (
              <div className="pt-2 md:pt-4 flex gap-2 md:gap-4">
                {selectedProject.links.map((link: any) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 md:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors ${isMobile ? 'text-sm' : ''}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
