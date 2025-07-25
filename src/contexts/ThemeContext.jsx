// src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Contexte simple pour les thèmes
const ThemeContext = createContext();

// Hook pour utiliser le thème partout
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé à l\'intérieur de ThemeProvider');
  }
  return context;
};

// Provider simple
export const ThemeProvider = ({ children }) => {
  // Commence en mode sombre (comme ton site actuel)
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Fonction simple pour changer de thème
  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
  };

  // Applique la classe au body automatiquement
  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  // Ce qu'on partage avec les composants
  const value = {
    currentTheme,
    toggleTheme,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};