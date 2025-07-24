 
import React from 'react';
import { motion } from 'framer-motion';

function About() {
  const skills = [
    'Blender 3D', 'AutoRig Pro', 'Texturing', 
    'Rigging', 'Unity', 'Character Design',
    'PBR Materials', 'Animation', 'Game Optimization'
  ];

  const details = [
    {
      icon: '🎯',
      title: 'Ma spécialité :',
      description: 'Personnages stylisés riggés avec AutoRig Pro'
    },
    {
      icon: '🛠️',
      title: 'Mes outils :',
      description: 'Blender, AutoRig Pro, Faceit, Substance Painter'
    },
    {
      icon: '🎮',
      title: 'Mes cibles :',
      description: 'Jeux vidéo, animations, VR/AR, applications interactives'
    },
    {
      icon: '🚀',
      title: 'Mon engagement :',
      description: 'Qualité professionnelle, délais respectés, support technique'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          {/* Section image/profil */}
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="profile-placeholder">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                style={{ width: '100%', height: '100%' }}
                className="logo-round"
              />
            </div>
            <div className="profile-info">
              <h3>Lynda imakhlaf</h3>
              <p>Artiste 3D Professionnel</p>
              <div className="profile-stats">
                <span>🎯 +5 ans d'expérience</span>
                <span>📦 +50 modèles créés</span>
              </div>
            </div>
          </motion.div>
          
          {/* Section texte */}
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Salut ! Je suis Lynda imakhlaf</h2>
            <p>
              Créateur passionné de modèles 3D stylisés riggés avec plusieurs années 
              d'expérience dans l'industrie du jeu vidéo et de l'animation. Je me spécialise 
              dans la création de personnages uniques et optimisés pour diverses plateformes.
            </p>
            
            {/* Détails */}
            <div className="about-details">
              {details.map((detail, index) => (
                <motion.div 
                  key={index}
                  className="detail-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="icon">{detail.icon}</span>
                  <div>
                    <strong>{detail.title}</strong><br />
                    {detail.description}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Compétences */}
            <div className="skills">
              <h3>💪 Compétences</h3>
              <div className="skills-grid">
                {skills.map((skill, i) => (
                  <motion.span 
                    key={i}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;