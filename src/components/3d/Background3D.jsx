import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';
import FloatingStars from './FloatingStars';

function Background3D() {
  const { isDark } = useTheme();
  
  // Backgrounds élégants et doux (tes couleurs originales)
  const backgroundStyle = isDark 
    ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)'  // Mode sombre original
    : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 25%, #edf2f7 50%, #e2e8f0 75%, #f0f4f8 100%)';  // Mode clair doux

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: backgroundStyle
      }}
    >
      {/* Éclairage doux et naturel */}
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      
      {/* Lumières principales qui éclairent les étoiles */}
      <pointLight 
        position={[10, 10, 10]} 
        intensity={0.7} 
        color="#ff6b35" 
        distance={20}
        decay={2}
      />
      <pointLight 
        position={[-10, -10, 5]} 
        intensity={0.5} 
        color="#ffa726" 
        distance={15}
        decay={2}
      />
      <pointLight 
        position={[0, 12, -8]} 
        intensity={0.4} 
        color="#fff3e0" 
        distance={18}
        decay={2}
      />
      
      {/* Environnement subtil */}
      <Environment preset={isDark ? "night" : "dawn"} />
      
      {/* Étoiles de fond pour la profondeur (modéré) */}
      <Stars 
        radius={50} 
        depth={50} 
        count={isDark ? 1000 : 600} 
        factor={isDark ? 4 : 2.5} 
        saturation={0.6} 
        fade={true}
        speed={0.4}
      />
      
      {/* Nos belles étoiles principales */}
      <FloatingStars count={18} bounds={{ x: 12, y: 10, z: 10 }} />
      
      {/* Contrôles fluides et élégants */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.25} // Plus lent et zen
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

export default Background3D;