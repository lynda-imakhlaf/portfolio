import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, ExternalLink } from 'lucide-react';
import SimpleModelViewer from '../3d/SimpleModelViewer';

function ModelCard({ model, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="model-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="model-preview">
        <SimpleModelViewer modelId={model.id} />
        
        <div className={`model-overlay ${isHovered ? 'visible' : ''}`}>
          <div className="model-badges">
            {model.featured && <span className="badge featured">⭐ Featured</span>}
            <span className="badge type">{model.category}</span>
          </div>
          
          <div className="model-actions">
            <button className="action-btn" title="Vue rapide">
              <Eye size={16} />
            </button>
            <button className="action-btn" title="Favoris">
              <Heart size={16} />
            </button>
            <button 
              className="action-btn" 
              title="Lien externe"
              onClick={() => handleExternalLink(model.sketchfabUrl)}
            >
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="model-info">
        <h3 className="model-title">{model.title}</h3>
        <p className="model-description">
          {model.description.substring(0, 120)}...
        </p>

        <div className="model-specs">
          <span>🔺 {model.specs.polygons} polys</span>
          <span>🎨 {model.specs.textures}</span>
          <span>📁 {model.specs.fileSize}</span>
        </div>

        <div className="model-tags">
          {model.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="tag">#{tag}</span>
          ))}
        </div>

        <div className="model-footer">
          <div className="model-stats">
            <span title="Vues">👁️ {model.stats.views}</span>
            <span title="Téléchargements">📥 {model.stats.downloads}</span>
            <span title="Likes">❤️ {model.stats.likes}</span>
          </div>
          <div className="pricing">
            <span className="price">${model.pricing.basic}</span>
            {model.pricing.extended && (
              <span className="price-extended">${model.pricing.extended}</span>
            )}
          </div>
        </div>

        <div className="model-links">
          <button 
            onClick={() => handleExternalLink(model.sketchfabUrl)}
            className="store-link sketchfab"
          >
            🎨 Sketchfab
          </button>
          <button className="store-link details">
            👁️ Détails
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ModelCard;