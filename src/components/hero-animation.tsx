'use client';

import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Icosahedron, Environment } from '@react-three/drei';

function AnimatedShapes() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1.5, 0.2, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="hsl(var(--primary))"
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1}
        />
      </Torus>
      <Torus args={[1.5, 0.2, 16, 100]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <meshStandardMaterial
          color="hsl(var(--accent))"
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1}
        />
      </Torus>
      <Icosahedron args={[0.5, 0]} position={[0, 0, 0]}>
         <meshStandardMaterial
          color="hsl(var(--foreground))"
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={0.5}
        />
      </Icosahedron>
    </group>
  );
}

export function HeroAnimation() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 blur-sm">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="hsl(var(--primary))" />
        <Suspense fallback={null}>
          <AnimatedShapes />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
