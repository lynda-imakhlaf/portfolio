import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="logo">
                <img 
                  src="/images/logo.png" 
                  alt="Logo" 
                  className="logo-round"
                /> 
                IMAKTECK 3D
              </div>
              <p>Créateur de modèles 3D stylisés professionnels</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4>Plateformes</h4>
                <ul>
                  <li>
                    <a 
                      href="https://sketchfab.com/ayb3d" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Sketchfab
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      CGTrader
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      ArtStation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {currentYear} Imakteck 3D - Lynda imakhlaf. Tous droits réservés.</p>
            <div className="footer-social">
              <a 
                href="https://sketchfab.com/ayb3d" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="/images/logo.png" 
                  alt="Logo" 
                  className="logo-round"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">💼</a>
              <a href="#" target="_blank" rel="noopener noreferrer">📧</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;