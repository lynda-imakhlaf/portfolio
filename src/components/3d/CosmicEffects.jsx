import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Composant pour les effets de lentille
function LensFlare({ position = [0, 0, 0], color = '#ff6b35', intensity = 1 }) {
  const flareRef = useRef();
  
  useFrame((state) => {
    if (flareRef.current) {
      const time = state.clock.elapsedTime;
      flareRef.current.material.opacity = Math.sin(time * 2) * 0.3 + 0.5;
      flareRef.current.lookAt(state.camera.position);
    }
  });
  
  return (
    <group position={position}>
      {/* Flare principal */}
      <mesh ref={flareRef}>
        <planeGeometry args={[2 * intensity, 2 * intensity]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Anneaux de diffraction */}
      {Array.from({ length: 3 }, (_, i) => {
        const scale = 0.5 + i * 0.3;
        return (
          <mesh key={i}>
            <torusGeometry args={[scale * intensity, 0.02, 8, 32]} />
            <meshBasicMaterial 
              color={color}
              transparent
              opacity={0.3 - i * 0.1}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Composant pour les ondulations d'énergie
function EnergyRipples() {
  const ripplesRef = useRef();
  
  useFrame((state, delta) => {
    if (ripplesRef.current) {
      ripplesRef.current.children.forEach((ripple, i) => {
        ripple.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + i * Math.PI / 2) * 0.3);
        ripple.rotation.z += delta * (0.5 + i * 0.2);
        ripple.material.opacity = Math.sin(state.clock.elapsedTime + i * Math.PI / 3) * 0.2 + 0.3;
      });
    }
  });
  
  return (
    <group ref={ripplesRef}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[0, 0, -5 - i * 2]}>
          <torusGeometry args={[8 + i * 2, 0.1, 8, 64]} />
          <meshBasicMaterial 
            color="#ff6b35"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Composant pour les portails dimensionnels
function DimensionalPortal({ position = [0, 0, -20], scale = 1 }) {
  const portalRef = useRef();
  const innerRef = useRef();
  
  useFrame((state, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * 0.5;
    }
    
    if (innerRef.current) {
      innerRef.current.rotation.z -= delta * 0.8;
      innerRef.current.scale.setScalar(scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.2));
    }
  });
  
  return (
    <group position={position}>
      {/* Anneau externe */}
      <mesh ref={portalRef}>
        <torusGeometry args={[3 * scale, 0.2 * scale, 8, 32]} />
        <meshStandardMaterial 
          color="#9c27b0"
          emissive="#9c27b0"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Centre du portail */}
      <mesh ref={innerRef}>
        <circleGeometry args={[2.5 * scale, 32]} />
        <meshBasicMaterial 
          color="#2196f3"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Particules dans le portail */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 0.5 + Math.random() * 1.5;
        return (
          <mesh 
            key={i}
            position={[
              Math.cos(angle) * radius * scale,
              Math.sin(angle) * radius * scale,
              (Math.random() - 0.5) * 0.5 * scale
            ]}
          >
            <sphereGeometry args={[0.05 * scale, 8, 6]} />
            <meshBasicMaterial 
              color="#fff3e0"
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Composant pour les comètes
function CosmicComet({ path, speed = 1, color = '#ffa726' }) {
  const cometRef = useRef();
  const tailRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime * speed;
    const t = (time % (Math.PI * 2)) / (Math.PI * 2);
    
    if (cometRef.current && path) {
      // Position sur le chemin
      const x = Math.cos(time) * path.radius;
      const y = Math.sin(time * path.yFreq) * path.amplitude;
      const z = Math.sin(time) * path.radius;
      
      cometRef.current.position.set(x, y, z);
      
      // Rotation pour faire face au mouvement
      cometRef.current.lookAt(
        x + Math.cos(time + 0.1) * path.radius,
        y + Math.sin((time + 0.1) * path.yFreq) * path.amplitude,
        z + Math.sin(time + 0.1) * path.radius
      );
    }
    
    if (tailRef.current) {
      tailRef.current.material.opacity = Math.sin(time * 2) * 0.3 + 0.5;
    }
  });
  
  return (
    <group ref={cometRef}>
      {/* Tête de la comète */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 12]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={1.0}
        />
      </mesh>
      
      {/* Queue de la comète */}
      <mesh ref={tailRef} position={[-1, 0, 0]}>
        <coneGeometry args={[0.05, 2, 8]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Particules de la queue */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[-0.2 - i * 0.1, 0, 0]}>
          <sphereGeometry args={[0.02, 6, 4]} />
          <meshBasicMaterial 
            color={color}
            transparent
            opacity={0.8 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

// Composant principal qui combine tous les effets
function CosmicEffects() {
  return (
    <group>
      {/* Effets de lentille sur les sources lumineuses */}
      <LensFlare position={[0, 0, 0]} color="#ffeb3b" intensity={1.5} />
      <LensFlare position={[8, 3, -5]} color="#ff6b35" intensity={1.0} />
      <LensFlare position={[-6, -2, -8]} color="#9c27b0" intensity={0.8} />
      
      {/* Ondulations d'énergie */}
      <EnergyRipples />
      
      {/* Portails dimensionnels */}
      <DimensionalPortal position={[15, -5, -25]} scale={0.8} />
      <DimensionalPortal position={[-12, 8, -30]} scale={1.2} />
      
      {/* Comètes */}
      <CosmicComet 
        path={{ radius: 12, amplitude: 3, yFreq: 0.7 }}
        speed={0.3}
        color="#ffa726"
      />
      <CosmicComet 
        path={{ radius: 8, amplitude: 2, yFreq: 1.2 }}
        speed={0.5}
        color="#e91e63"
      />
      <CosmicComet 
        path={{ radius: 15, amplitude: 4, yFreq: 0.5 }}
        speed={0.2}
        color="#4caf50"
      />
    </group>
  );
}

export default CosmicEffects;