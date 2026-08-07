import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Box, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface KairoModelProps {
  isSpeaking: boolean;
}

function KairoModel({ isSpeaking }: KairoModelProps) {
  const headRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (headRef.current) {
      headRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1.2;
      if (isSpeaking) {
        headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 8) * 0.15;
      } else {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, 0.1);
      }
    }
    
    if (auraRef.current) {
      const material = auraRef.current.material as THREE.MeshStandardMaterial;
      if (isSpeaking) {
        material.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.5;
        material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
      } else {
        material.emissiveIntensity = 0;
        material.opacity = 0;
      }
    }
  });

  return (
    <group position={[0, -1, 0]}>
      <Sparkles count={80} scale={4} size={3} speed={0.4} color={isSpeaking ? "#60a5fa" : "#1e3a8a"} />

      <Box args={[1, 1.2, 0.8]} position={[0, 0.4, 0]} radius={0.1}>
        <meshStandardMaterial color="#2563eb" metalness={0.5} roughness={0.2} />
      </Box>

      <group ref={headRef}>
        <Box args={[1.2, 1, 1]} radius={0.1}>
          <meshStandardMaterial color="#3b82f6" metalness={0.4} roughness={0.3} />
        </Box>
        
        <Sphere args={[0.12, 16, 16]} position={[-0.3, 0.1, 0.51]}>
          <meshStandardMaterial color="#bae6fd" emissive="#bae6fd" emissiveIntensity={isSpeaking ? 2 : 0.5} />
        </Sphere>
        <Sphere args={[0.12, 16, 16]} position={[0.3, 0.1, 0.51]}>
          <meshStandardMaterial color="#bae6fd" emissive="#bae6fd" emissiveIntensity={isSpeaking ? 2 : 0.5} />
        </Sphere>

        <Sphere ref={auraRef} args={[0.9, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" transparent opacity={0} depthWrite={false} />
        </Sphere>
      </group>
    </group>
  );
}

export default function KairoAvatar3D({ isSpeaking }: KairoModelProps) {
  return (
    <div className="w-56 h-56 sm:w-72 sm:h-72 relative rounded-full bg-slate-900 overflow-hidden shadow-2xl border-4 border-blue-500">
      <Canvas camera={{ position: [0, 1.5, 4.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#e0f2fe" />
        <pointLight position={[-5, -5, -5]} color="#2563eb" intensity={3} />
        <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1.2}>
          <KairoModel isSpeaking={isSpeaking} />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
      }
