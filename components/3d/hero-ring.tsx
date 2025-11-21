"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
import * as THREE from "three";

function RotatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Torus ref={meshRef} args={[2.2, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshBasicMaterial 
        color="#2DD4BF" 
        wireframe 
        transparent 
        opacity={0.3} 
      />
    </Torus>
  );
}

function SecondRing() {
    const meshRef = useRef<THREE.Mesh>(null);
  
    useFrame((state, delta) => {
      if (meshRef.current) {
        meshRef.current.rotation.x -= delta * 0.1;
        meshRef.current.rotation.y -= delta * 0.2;
      }
    });
  
    return (
      <Torus ref={meshRef} args={[2.8, 0.05, 16, 100]}>
        <meshBasicMaterial 
          color="#A855F7" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Torus>
    );
  }

export default function HeroRing() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <RotatingTorus />
        <SecondRing />
      </Canvas>
    </div>
  );
}