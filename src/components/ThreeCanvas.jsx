import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Soda Glass Cup Component
function SodaCup({ scrollProgress, activeColor = '#E11D48' }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 3 + state.clock.elapsedTime * 0.25;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.2}>
      {/* Glass Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 0.8, 2.6, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.88}
          opacity={1}
          transparent
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>

      {/* Glass Base */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.8, 0.85, 0.15, 32]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} transparent roughness={0.1} />
      </mesh>

      {/* Carbonated Soda Liquid */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.15, 0.78, 2.2, 32]} />
        <MeshWobbleMaterial
          color={activeColor}
          factor={0.14}
          speed={1.5}
          roughness={0.2}
        />
      </mesh>

      {/* Domed Lid */}
      <mesh position={[0, 1.35, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[1.22, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} transparent roughness={0.08} />
      </mesh>

      {/* Straw */}
      <mesh position={[0.2, 1.8, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.07, 0.07, 2.2, 16]} />
        <meshStandardMaterial color="#E11D48" roughness={0.3} />
      </mesh>

      {/* Ice Cubes inside */}
      <Float speed={1.8} rotationIntensity={1} floatIntensity={0.4}>
        <mesh position={[-0.3, 0.5, 0.3]} rotation={[0.4, 0.2, 0.5]}>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshPhysicalMaterial color="#F8FAFC" transmission={0.9} transparent roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

// Floating Soda Bubbles
function FloatingBubble({ position, speed }) {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y += delta * speed;
      if (meshRef.current.position.y > 3) {
        meshRef.current.position.y = -3;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshPhysicalMaterial color="#FFFFFF" transmission={0.95} transparent opacity={0.7} roughness={0.05} />
    </mesh>
  );
}

export default function ThreeCanvas({ scrollProgress = 0, activeColor = '#E11D48' }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 8, 5]} intensity={1.6} color="#FFE4E6" />
        <directionalLight position={[-5, -4, -3]} intensity={0.6} color="#FEF3C7" />
        <pointLight position={[0, 2, 3]} intensity={0.9} color="#E11D48" />

        <SodaCup scrollProgress={scrollProgress} activeColor={activeColor} />

        <FloatingBubble position={[-2.5, -2, -1]} speed={0.8} />
        <FloatingBubble position={[2.8, -1, -1.2]} speed={0.9} />
        <FloatingBubble position={[-1.8, 1, -0.8]} speed={0.7} />
        <FloatingBubble position={[2.2, 0.5, -1.5]} speed={1.1} />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
      </Canvas>
    </div>
  );
}
