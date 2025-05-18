import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingBooks = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <torusKnotGeometry args={[9, 3, 128, 16]} />
      <meshPhongMaterial 
        color={new THREE.Color("#4338ca")}
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  );
};

export const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-50">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingBooks />
      </Canvas>
    </div>
  );
};