 
import { useCallback } from 'react';

/**
 * Hook personnalisé pour gérer le scroll vers une section
 * @returns {Function} Fonction pour scroller vers une section par ID
 */
function useScrollToSection() {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return scrollToSection;
}

export default useScrollToSection;