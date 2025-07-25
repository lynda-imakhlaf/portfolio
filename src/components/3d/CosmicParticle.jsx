import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

function CosmicParticle({ 
  position, 
  color, 
  scale = 1, 
  type = 'star',
  orbitCenter = [0, 0, 0],
  orbitRadius = 3,
  orbitSpeed = 1
}) {
  const meshRef = useRef();
  const trailRef = useRef();
  const glowRef = useRef();
  const ringsRef = useRef();
  const particlesRef = useRef();
  
  // Générer des couleurs dynamiques basées sur la couleur principale
  const colorPalette = useMemo(() => {
    const baseColor = new THREE.Color(color);
    return {
      primary: color,
      secondary: `hsl(${(baseColor.getHSL({}). h * 360 + 60) % 360}, 80%, 70%)`,
      tertiary: `hsl(${(baseColor.getHSL({}).h * 360 + 120) % 360}, 60%, 80%)`,
      glow: `hsl(${baseColor.getHSL({}).h * 360}, 100%, 85%)`
    };
  }, [color]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      // Orbite complexe autour du centre
      const orbitX = orbitCenter[0] + Math.cos(time * orbitSpeed + position[0]) * orbitRadius;
      const orbitY = orbitCenter[1] + Math.sin(time * orbitSpeed * 0.7 + position[1]) * (orbitRadius * 0.5);
      const orbitZ = orbitCenter[2] + Math.sin(time * orbitSpeed * 0.3 + position[2]) * (orbitRadius * 0.8);
      
      meshRef.current.position.set(orbitX, orbitY, orbitZ);
      
      // Rotation sur elle-même
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.7;
      
      // Pulsation dynamique
      const pulse = Math.sin(time * 2 + position[0] * 10) * 0.3 + 0.7;
      const breathe = Math.sin(time * 0.5 + position[1] * 5) * 0.2 + 0.8;
      meshRef.current.scale.setScalar(scale * pulse * breathe);
    }
    
    // Animation des anneaux
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.x += delta * (0.5 + i * 0.2);
        ring.rotation.y += delta * (0.3 + i * 0.15);
        ring.rotation.z += delta * (0.1 + i * 0.1);
      });
    }
    
    // Animation des particules autour
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.5;
      particlesRef.current.rotation.z += delta * 0.2;
    }
    
    // Animation de la lueur
    if (glowRef.current) {
      const glowPulse = Math.sin(time * 3 + position[0] * 15) * 0.4 + 0.6;
      glowRef.current.scale.setScalar(1 + glowPulse * 0.5);
      glowRef.current.material.opacity = glowPulse * 0.4;
    }
  });

  // Composant étoile cosmique
  const CosmicStar = () => (
    <group ref={meshRef} position={position}>
      {/* Corps central lumineux */}
      <mesh>
        <icosahedronGeometry args={[0.1 * scale, 2]} />
        <meshStandardMaterial 
          color={colorPalette.primary}
          emissive={colorPalette.primary}
          emissiveIntensity={1.2}
          roughness={0.0}
          metalness={1.0}
        />
      </mesh>
      
      {/* Rayons d'énergie */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh position={[0.2 * scale, 0, 0]}>
              <boxGeometry args={[0.4 * scale, 0.015 * scale, 0.008 * scale]} />
              <meshStandardMaterial 
                color={colorPalette.secondary}
                emissive={colorPalette.secondary}
                emissiveIntensity={1.5}
                transparent
                opacity={0.9}
              />
            </mesh>
            
            {/* Cristaux aux extrémités */}
            <mesh position={[0.35 * scale, 0, 0]}>
              <octahedronGeometry args={[0.025 * scale]} />
              <meshStandardMaterial 
                color={colorPalette.tertiary}
                emissive={colorPalette.tertiary}
                emissiveIntensity={2.0}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Anneaux énergétiques */}
      <group ref={ringsRef}>
        {[0.3, 0.5, 0.7].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, i * Math.PI / 3]}>
            <torusGeometry args={[radius * scale, 0.008 * scale, 8, 32]} />
            <meshBasicMaterial 
              color={colorPalette.glow}
              transparent
              opacity={0.6 - i * 0.15}
            />
          </mesh>
        ))}
      </group>
      
      {/* Particules orbitales */}
      <group ref={particlesRef}>
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 0.4 + (i % 3) * 0.1;
          return (
            <mesh 
              key={i}
              position={[
                Math.cos(angle) * radius * scale,
                Math.sin(angle) * radius * scale * 0.3,
                Math.sin(angle * 2) * 0.1 * scale
              ]}
            >
              <sphereGeometry args={[0.01 * scale, 6, 4]} />
              <meshBasicMaterial 
                color={colorPalette.tertiary}
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Lueur externe massive */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8 * scale, 32, 24]} />
        <meshBasicMaterial 
          color={colorPalette.glow}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Aura énergétique */}
      <mesh>
        <sphereGeometry args={[1.2 * scale, 32, 24]} />
        <meshBasicMaterial 
          color={colorPalette.primary}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );

  // Composant nébuleuse
  const CosmicNebula = () => (
    <group ref={meshRef} position={position}>
      {/* Nuage de particules */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 0.3 + Math.random() * 0.5;
        const height = (Math.random() - 0.5) * 0.4;
        return (
          <mesh 
            key={i}
            position={[
              Math.cos(angle) * radius * scale,
              height * scale,
              Math.sin(angle) * radius * scale
            ]}
          >
            <sphereGeometry args={[0.03 + Math.random() * 0.02, 8, 6]} />
            <meshBasicMaterial 
              color={colorPalette.secondary}
              transparent
              opacity={0.6 + Math.random() * 0.4}
            />
          </mesh>
        );
      })}
      
      {/* Centre lumineux */}
      <mesh>
        <sphereGeometry args={[0.05 * scale, 16, 12]} />
        <meshStandardMaterial 
          color={colorPalette.primary}
          emissive={colorPalette.primary}
          emissiveIntensity={2.0}
        />
      </mesh>
    </group>
  );

  return (
    <Float 
      speed={0.8} 
      rotationIntensity={0.1} 
      floatIntensity={0.3}
    >
      <Trail
        width={2}
        length={6}
        color={colorPalette.glow}
        attenuation={(t) => t * t}
      >
        {type === 'star' ? <CosmicStar /> : <CosmicNebula />}
      </Trail>
    </Float>
  );
}

export default CosmicParticle;