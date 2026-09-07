import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Smoothie Cup Component built with Three.js primitives
function SmoothieCup({ scrollProgress, activeColor = '#FF9900' }) {
  const groupRef = useRef();
  const liquidRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate cup based on scroll progress + subtle float oscillation
      groupRef.current.rotation.y = scrollProgress * Math.PI * 4 + state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.2}>
      {/* Outer Clear Glass Cup Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 0.8, 2.6, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.85}
          opacity={1}
          transparent
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
        />
      </mesh>

      {/* Glass Bottom Base */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.8, 0.85, 0.15, 32]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} transparent roughness={0.1} />
      </mesh>

      {/* Colorful Juice Liquid inside */}
      <mesh ref={liquidRef} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.15, 0.78, 2.2, 32]} />
        <MeshWobbleMaterial
          color={activeColor}
          factor={0.15}
          speed={1.5}
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>

      {/* Cup Domed Lid */}
      <mesh position={[0, 1.35, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[1.22, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} transparent roughness={0.05} />
      </mesh>

      {/* Vibrant Straw */}
      <mesh position={[0.2, 1.8, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.07, 0.07, 2.2, 16]} />
        <meshStandardMaterial color="#00E676" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Ice Cubes inside the cup */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[-0.3, 0.5, 0.3]} rotation={[0.4, 0.2, 0.5]}>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshPhysicalMaterial color="#E0F7FA" transmission={0.9} transparent roughness={0.1} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={0.6}>
        <mesh position={[0.4, 0.2, -0.2]} rotation={[0.2, 0.8, 0.1]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshPhysicalMaterial color="#E0F7FA" transmission={0.9} transparent roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

// Floating 3D Ice Cube in 3D Space
function FloatingIceCube({ position, rotationSpeed }) {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * (rotationSpeed * 0.8);
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshPhysicalMaterial
          color="#B2EBF2"
          transmission={0.88}
          opacity={0.9}
          transparent
          roughness={0.1}
          ior={1.45}
        />
      </mesh>
    </Float>
  );
}

// Floating Lemon Slice
function FloatingLemon({ position }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <group ref={ref} position={position} scale={0.7}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
          <meshStandardMaterial color="#FFD700" roughness={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.06]}>
          <cylinderGeometry args={[0.75, 0.75, 0.02, 32]} />
          <meshStandardMaterial color="#FFF9C4" roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeCanvas({ scrollProgress = 0, activeColor = '#FF9900' }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#FFF8E7" castShadow />
        <directionalLight position={[-5, -4, -3]} intensity={0.8} color="#00E5FF" />
        <pointLight position={[0, 2, 3]} intensity={1.2} color="#FF7E00" />

        {/* Central Rotatable Smoothie Cup */}
        <SmoothieCup scrollProgress={scrollProgress} activeColor={activeColor} />

        {/* Ambient Floating 3D Elements */}
        <FloatingIceCube position={[-3.2, 2.2, -1]} rotationSpeed={0.8} />
        <FloatingIceCube position={[3.5, -1.8, -1.5]} rotationSpeed={0.6} />
        <FloatingIceCube position={[-2.8, -2.5, -0.5]} rotationSpeed={1.1} />

        <FloatingLemon position={[3.2, 2.5, -1]} />
        <FloatingLemon position={[-3.6, -0.5, -2]} />

        {/* Optional Gentle User Camera Control */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
      </Canvas>
    </div>
  );
}
