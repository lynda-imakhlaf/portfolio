import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="nav container">
        <div className="logo">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="logo-round"
          /> 
          IMAKTECK 3D
          {/* Petit indicateur du thème actuel (optionnel) */}
          <span style={{ 
            fontSize: '0.7rem', 
            opacity: 0.6, 
            marginLeft: '8px' 
          }}>
            {isDark ? '🌙' : '☀️'}
          </span>
        </div>
        
        <ul className="nav-links">
          <li>
            <a 
              href="#home" 
              onClick={(e) => { 
                e.preventDefault(); 
                scrollToSection('home'); 
              }}
            >
              Accueil
            </a>
          </li>
          <li>
            <a 
              href="#models" 
              onClick={(e) => { 
                e.preventDefault(); 
                scrollToSection('models'); 
              }}
            >
              Modèles
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={(e) => { 
                e.preventDefault(); 
                scrollToSection('about'); 
              }}
            >
              À Propos
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={(e) => { 
                e.preventDefault(); 
                scrollToSection('contact'); 
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}

export default Header;