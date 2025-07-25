import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import CosmicParticle from './CosmicParticle';

function GalacticSystem({ particleCount = 25, nebulaeCount = 8 }) {
  const galaxyRef = useRef();
  const dustCloudRef = useRef();
  const energyWavesRef = useRef();
  
  // Génération des particules de poussière cosmique
  const dustParticles = useMemo(() => {
    const positions = new Float32Array(particleCount * 100 * 3);
    const colors = new Float32Array(particleCount * 100 * 3);
    const sizes = new Float32Array(particleCount * 100);
    
    const colorPalette = [
      new THREE.Color('#ff6b35'),
      new THREE.Color('#ffa726'),
      new THREE.Color('#ffcc80'),
      new THREE.Color('#fff3e0'),
      new THREE.Color('#e1f5fe'),
      new THREE.Color('#f3e5f5'),
      new THREE.Color('#e8f5e8'),
      new THREE.Color('#fff9c4'),
    ];
    
    for (let i = 0; i < particleCount * 100; i++) {
      // Position spirale galactique
      const angle = (i / (particleCount * 10)) * Math.PI * 4;
      const radius = 2 + (i / (particleCount * 20)) * 8;
      const spiral = angle * 0.3;
      
      positions[i * 3] = Math.cos(angle + spiral) * radius + (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 2] = Math.sin(angle + spiral) * radius + (Math.random() - 0.5) * 2;
      
      // Couleurs aléatoires
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Tailles variables
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    return { positions, colors, sizes };
  }, [particleCount]);
  
  // Particules principales (étoiles et nébuleuses)
  const mainParticles = useMemo(() => {
    const particles = [];
    
    // Couleurs cosmiques
    const stellarColors = [
      '#ff6b35', '#ffa726', '#ffeb3b', '#fff3e0',
      '#e1f5fe', '#f3e5f5', '#e8f5e8', '#ffcdd2'
    ];
    
    const nebulaeColors = [
      '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
      '#00bcd4', '#009688', '#4caf50', '#8bc34a'
    ];
    
    // Génération des étoiles
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 6;
      const radius = 3 + Math.random() * 6;
      const spiralOffset = angle * 0.4;
      
      particles.push({
        id: `star-${i}`,
        type: 'star',
        position: [
          Math.cos(angle + spiralOffset) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle + spiralOffset) * radius
        ],
        color: stellarColors[Math.floor(Math.random() * stellarColors.length)],
        scale: 0.4 + Math.random() * 0.8,
        orbitCenter: [0, 0, 0],
        orbitRadius: radius * 0.3,
        orbitSpeed: 0.2 + Math.random() * 0.6
      });
    }
    
    // Génération des nébuleuses
    for (let i = 0; i < nebulaeCount; i++) {
      const angle = (i / nebulaeCount) * Math.PI * 2;
      const radius = 8 + Math.random() * 4;
      
      particles.push({
        id: `nebula-${i}`,
        type: 'nebula',
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2,
          Math.sin(angle) * radius
        ],
        color: nebulaeColors[Math.floor(Math.random() * nebulaeColors.length)],
        scale: 1.2 + Math.random() * 1.5,
        orbitCenter: [0, 0, 0],
        orbitRadius: 1,
        orbitSpeed: 0.1 + Math.random() * 0.2
      });
    }
    
    return particles;
  }, [particleCount, nebulaeCount]);
  
  // Vagues d'énergie
  const energyWaves = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      radius: 2 + i * 3,
      speed: 0.5 + i * 0.2,
      opacity: 0.3 - i * 0.05
    }));
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    // Rotation de la galaxie
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * 0.1;
      galaxyRef.current.rotation.z += delta * 0.02;
    }
    
    // Animation des nuages de poussière
    if (dustCloudRef.current) {
      dustCloudRef.current.rotation.y += delta * 0.05;
      
      // Animation des particules de poussière
      const positions = dustCloudRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i) * 0.001;
      }
      dustCloudRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Animation des vagues d'énergie
    if (energyWavesRef.current) {
      energyWavesRef.current.children.forEach((wave, i) => {
        const waveData = energyWaves[i];
        wave.rotation.z += delta * waveData.speed;
        
        // Effet de pulsation
        const pulse = Math.sin(time * 2 + i * Math.PI / 2) * 0.2 + 1;
        wave.scale.setScalar(pulse);
        
        // Opacité variable
        wave.material.opacity = waveData.opacity * (Math.sin(time + i) * 0.3 + 0.7);
      });
    }
  });

  return (
    <group ref={galaxyRef}>
      {/* Nuage de poussière cosmique */}
      <Points ref={dustCloudRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustParticles.positions.length / 3}
            array={dustParticles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={dustParticles.colors.length / 3}
            array={dustParticles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={dustParticles.sizes.length}
            array={dustParticles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <PointMaterial 
          size={0.1}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.6}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Vagues d'énergie galactique */}
      <group ref={energyWavesRef}>
        {energyWaves.map((wave) => (
          <mesh key={wave.id} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[wave.radius, 0.05, 8, 64]} />
            <meshBasicMaterial 
              color="#ff6b35"
              transparent
              opacity={wave.opacity}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
      
      {/* Particules principales cosmiques */}
      {mainParticles.map((particle) => (
        <CosmicParticle
          key={particle.id}
          position={particle.position}
          color={particle.color}
          scale={particle.scale}
          type={particle.type}
          orbitCenter={particle.orbitCenter}
          orbitRadius={particle.orbitRadius}
          orbitSpeed={particle.orbitSpeed}
        />
      ))}
      
      {/* Étoile centrale massive */}
      <CosmicParticle
        position={[0, 0, 0]}
        color="#ffeb3b"
        scale={2.5}
        type="star"
        orbitCenter={[0, 0, 0]}
        orbitRadius={0.5}
        orbitSpeed={0.3}
      />
      
      {/* Trou noir au centre (effet visuel) */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 24]} />
        <meshBasicMaterial 
          color="#000000"
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Disque d'accrétion */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.3, 8, 64]} />
        <meshBasicMaterial 
          color="#ff6b35"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default GalacticSystem;