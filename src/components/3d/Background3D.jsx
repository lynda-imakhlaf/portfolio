 
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model3D from './Model3D';

function Background3D() {
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
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)'
      }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff6b35" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#2196f3" />
      
      <Environment preset="night" />
      
      <Model3D position={[-3, 2, -2]} color="#ff6b35" scale={0.5} rotationSpeed={0.5} />
      <Model3D position={[3, -1, -3]} color="#e91e63" scale={0.7} rotationSpeed={0.8} />
      <Model3D position={[-2, -2, -4]} color="#9c27b0" scale={0.4} rotationSpeed={1.2} />
      <Model3D position={[2, 2, -5]} color="#4caf50" scale={0.6} rotationSpeed={0.7} />
      <Model3D position={[0, -3, -2]} color="#ff9800" scale={0.5} rotationSpeed={1.0} />
      <Model3D position={[-4, 0, -3]} color="#2196f3" scale={0.6} rotationSpeed={0.9} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

export default Background3D;