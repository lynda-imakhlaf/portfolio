// src/components/ui/ThemeToggle.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

function ThemeToggle() {
  const { currentTheme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Basculer vers le mode ${isDark ? 'clair' : 'sombre'}`}
    >
      <div className="theme-toggle-icon">
        {isDark ? (
          <Sun size={20} className="sun-icon" />
        ) : (
          <Moon size={20} className="moon-icon" />
        )}
      </div>
      
      <span className="theme-toggle-text">
        {isDark ? 'Mode clair' : 'Mode sombre'}
      </span>
    </motion.button>
  );
}

export default ThemeToggle;