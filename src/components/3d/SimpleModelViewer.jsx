import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { modelsData } from '../../data/models';
import Model3D from './Model3D';

function SimpleModelViewer({ modelId, height = "300px" }) {
  const model = modelsData.find(m => m.id === modelId);
  const color = model?.color || "#ff6b35";
  
  return (
    <div style={{ height, borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 1]} intensity={1} />
        <pointLight position={[-2, -2, -1]} intensity={0.5} color="#ff6b35" />
        
        <Model3D position={[0, 0, 0]} color={color} scale={1.2} rotationSpeed={0.8} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
}

export default SimpleModelViewer;