import React, { useMemo } from 'react';
import StarParticle from './StarParticle';

function FloatingStars({ count = 18, bounds = { x: 10, y: 8, z: 8 } }) {
  // Génération élégante des étoiles
  const stars = useMemo(() => {
    const starArray = [];
    
    // Palette de couleurs harmonieuse et douce
    const colors = [
      '#ff6b35', // Orange principal (ta couleur)
      '#ffa726', // Orange doré doux
      '#ffcc80', // Orange pâle et chaud
      '#fff3e0', // Blanc crème élégant
      '#e8f5e8', // Vert très pâle
      '#fff9c4', // Jaune doux et chaud
    ];
    
    for (let i = 0; i < count; i++) {
      starArray.push({
        id: i,
        position: [
          (Math.random() - 0.5) * bounds.x * 2,
          (Math.random() - 0.5) * bounds.y * 2,
          (Math.random() - 0.5) * bounds.z * 2
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.4 + Math.random() * 0.6, // Tailles plus homogènes
        rotationSpeed: 0.6 + Math.random() * 0.8, // Vitesses douces
        glowIntensity: 0.3 + Math.random() * 0.3 // Lueur subtile
      });
    }
    
    return starArray;
  }, [count, bounds]);

  return (
    <group>
      {stars.map((star) => (
        <StarParticle
          key={star.id}
          position={star.position}
          color={star.color}
          scale={star.scale}
          rotationSpeed={star.rotationSpeed}
          glowIntensity={star.glowIntensity}
        />
      ))}
      
      {/* Quelques étoiles un peu plus grandes pour la profondeur */}
      <StarParticle
        position={[-4, 3, -3]}
        color="#ff6b35"
        scale={0.8}
        rotationSpeed={0.7}
        glowIntensity={0.4}
      />
      
      <StarParticle
        position={[4, -2, -4]}
        color="#ffa726"
        scale={0.7}
        rotationSpeed={0.9}
        glowIntensity={0.35}
      />
      
      <StarParticle
        position={[0, 4, -5]}
        color="#fff3e0"
        scale={0.6}
        rotationSpeed={0.8}
        glowIntensity={0.5}
      />
    </group>
  );
}

export default FloatingStars;