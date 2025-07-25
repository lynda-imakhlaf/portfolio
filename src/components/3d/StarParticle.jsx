import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function StarParticle({ position, color, scale = 1, rotationSpeed = 1, glowIntensity = 0.3 }) {
  const meshRef = useRef();
  const glowRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation très douce
      meshRef.current.rotation.z += 0.005 * rotationSpeed;
      
      // Scintillement subtil et naturel
      const time = state.clock.elapsedTime;
      const twinkle = Math.sin(time * 1.5 * rotationSpeed + position[0]) * 0.2 + 0.8;
      meshRef.current.scale.setScalar(scale * twinkle);
      
      // Animation de la lueur
      if (glowRef.current) {
        glowRef.current.material.opacity = twinkle * glowIntensity;
        glowRef.current.scale.setScalar(1 + twinkle * 0.2);
      }
    }
  });

  return (
    <Float 
      speed={1.0} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
      position={position}
    >
      <group ref={meshRef}>
        {/* Corps central brillant */}
        <mesh>
          <sphereGeometry args={[0.06 * scale, 12, 8]} />
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            roughness={0.0}
            metalness={1.0}
          />
        </mesh>
        
        {/* Rayons de l'étoile - forme parfaite */}
        {[0, 72, 144, 216, 288].map((angle, index) => (
          <mesh key={index} rotation={[0, 0, (angle * Math.PI) / 180]}>
            <boxGeometry args={[0.35 * scale, 0.018 * scale, 0.008 * scale]} />
            <meshStandardMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={1.0}
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
        
        {/* Lueur douce autour de l'étoile */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.3 * scale, 20, 15]} />
          <meshBasicMaterial 
            color={color}
            transparent
            opacity={glowIntensity}
            side={2} // DoubleSide
          />
        </mesh>
      </group>
    </Float>
  );
}

export default StarParticle;