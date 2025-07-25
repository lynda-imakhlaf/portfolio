import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

function Hero() {
  const { isDark, isLight } = useTheme();

  const scrollToModels = () => {
    const element = document.getElementById('models');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          💫 IMAKTECK 3D 💫
        </motion.h1>
        
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Créateur de Modèles 3D Stylisés Riggés
        </motion.p>
        
        <motion.p 
          className="name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Lynda imakhlaf - Artiste 3D Professionnel
        </motion.p>

        {/* Message adaptatif selon le thème */}
        <motion.p 
          className="theme-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem'
          }}
        >
          {isDark ? '🌙 Mode sombre activé' : '☀️ Mode clair activé'} - 
          Changez le thème avec le bouton à droite
        </motion.p>
        
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button onClick={scrollToModels} className="btn btn-primary">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="logo-round"
            /> 
            Voir mes modèles
          </button>
          <button onClick={scrollToContact} className="btn btn-secondary">
            📧 Me contacter
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;