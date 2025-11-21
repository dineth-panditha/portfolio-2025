"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
        // Auto rotation logic
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh 
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={hovered ? 1.1 : 1}
        >
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            {/* The "Material" defines the look - we use a cyber-wireframe look */}
            <meshStandardMaterial 
                color={hovered ? "#2DD4BF" : "#18181B"} // Teal on hover, Dark normally
                wireframe={true}
                emissive={hovered ? "#2DD4BF" : "#000000"}
            />
        </mesh>
        {/* Inner Core for depth */}
        <mesh scale={0.9}>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshStandardMaterial color="#A855F7" transparent opacity={0.1} />
        </mesh>
    </Float>
  );
}

export default function TechCube() {
  return (
    <div className="w-full h-full min-h-[200px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#2DD4BF" />
        <Cube />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}