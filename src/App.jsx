import React, { Suspense } from 'react';
import './styles/globals.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Section Components
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import ModelsSection from './components/sections/ModelsSection';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

// 3D Components
import Background3D from './components/3d/Background3D';

/**
 * Composant de chargement pour les composants 3D
 */
function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ff6b35',
      fontSize: '1.2rem',
      zIndex: 9999,
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <img 
        src="/images/logo.png" 
        alt="Logo" 
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid #ff6b35',
          animation: 'spin 2s linear infinite'
        }}
      />
      <span>Chargement de votre portfolio...</span>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/**
 * Composant principal de l'application
 * Architecture propre avec composants séparés
 */
function App() {
  return (
    <div className="app">
      {/* Arrière-plan 3D avec gestion des erreurs */}
      <Suspense fallback={<LoadingScreen />}>
        <Background3D />
      </Suspense>
      
      {/* Navigation */}
      <Header />
      
      {/* Contenu principal */}
      <main>
        <Hero />
        <Stats />
        <ModelsSection />
        <About />
        <Contact />
      </main>
      
      {/* Pied de page */}
      <Footer />
    </div>
  );
}

export default App;