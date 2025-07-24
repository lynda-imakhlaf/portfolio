import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function Model3D({ position, color, scale = 1, rotationSpeed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.2;
      meshRef.current.rotation.y += 0.01 * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.1}
        />
        <mesh position={[0, 0, 0.51]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial color="#1a1a2e" opacity={0.8} transparent />
        </mesh>
      </mesh>
    </Float>
  );
}

export default Model3D;