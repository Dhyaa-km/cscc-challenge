import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#0284c7"
          emissiveIntensity={0.5}
          wireframe
          distort={0.3}
          speed={2}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function InnerParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 60;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 8;
    positions[i + 1] = (Math.random() - 0.5) * 8;
    positions[i + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a855f7"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-48 sm:h-64 relative flex items-center justify-center pointer-events-none select-none my-2">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#38bdf8" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#a855f7" />
        <AnimatedCore />
        <InnerParticleField />
      </Canvas>

      {/* Decorative Glow Ring */}
      <div className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
    </div>
  );
};

