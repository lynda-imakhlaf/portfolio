import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modelsData, MODEL_TYPES } from '../../data/models';
import ModelCard from '../models/ModelCard';

function ModelsSection() {
  const [filter, setFilter] = useState('all');
  const [filteredModels, setFilteredModels] = useState(modelsData);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { key: 'all', label: MODEL_TYPES.all, icon: '🎯' },
    { key: 'character', label: MODEL_TYPES.character, icon: '🎭' },
    { key: 'building', label: MODEL_TYPES.building, icon: '🏠' },
    { key: 'object', label: MODEL_TYPES.object, icon: '📦' }
  ];

  useEffect(() => {
    let filtered = modelsData;
    
    // Filtrer par type
    if (filter !== 'all') {
      filtered = filtered.filter(model => model.type === filter);
    }
    
    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(model => 
        model.title.toLowerCase().includes(query) ||
        model.tags.some(tag => tag.toLowerCase().includes(query)) ||
        model.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredModels(filtered);
  }, [filter, searchQuery]);

  const handleResetFilters = () => {
    setFilter('all');
    setSearchQuery('');
  };

  return (
    <section id="models" className="models-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Mes Créations 3D</h2>
          <p className="section-subtitle">
            Découvrez mes modèles stylisés riggés, prêts pour vos projets
          </p>
        </motion.div>

        {/* Barre de recherche */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Rechercher un modèle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filtres */}
        <div className="filters">
          {filters.map((filterItem) => (
            <button
              key={filterItem.key}
              className={`filter-btn ${filter === filterItem.key ? 'active' : ''}`}
              onClick={() => setFilter(filterItem.key)}
            >
              {filterItem.icon} {filterItem.label}
            </button>
          ))}
        </div>

        {/* Résultats */}
        <div className="results-info">
          <p>
            {filteredModels.length} modèle{filteredModels.length > 1 ? 's' : ''} trouvé{filteredModels.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille des modèles */}
        <div className="models-grid">
          <AnimatePresence mode="wait">
            {filteredModels.length > 0 ? (
              filteredModels.map((model, index) => (
                <ModelCard 
                  key={`${filter}-${model.id}`} 
                  model={model} 
                  index={index} 
                />
              ))
            ) : (
              <motion.div
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="no-results-content">
                  <h3>🔍 Aucun modèle trouvé</h3>
                  <p>Essayez de modifier vos filtres ou votre recherche</p>
                  <button 
                    onClick={handleResetFilters}
                    className="btn btn-primary"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ModelsSection;