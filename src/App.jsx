import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, ExternalLink, Mail, MapPin, Clock } from 'lucide-react';

// ============================================================================
// 📦 DONNÉES DES MODÈLES (tout intégré dans ce fichier)
// ============================================================================

const modelsData = [
  {
    id: 1,
    title: "Stylized Character Warrior 01",
    type: "character",
    category: "Personnage",
    description: "Guerrier stylisé avec armure détaillée, riggé et prêt pour l'animation. Textures PBR haute qualité parfaites pour jeux vidéo et animations.",
    specs: {
      polygons: "8,542",
      vertices: "4,271",
      textures: "2K PBR",
      formats: [".fbx", ".blend", ".glb"],
      fileSize: "25 MB"
    },
    sketchfabUrl: "https://sketchfab.com/3d-models/stylized-character-warrior-01-1a2a24e661914b46906ad8aa28a079ed",
    pricing: { basic: 25, extended: 50, commercial: 100 },
    tags: ["warrior", "medieval", "fantasy", "rigged", "game-ready"],
    featured: true,
    stats: { views: 1250, downloads: 45, likes: 89 },
    color: "#ff6b35",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Lady Bloodrose - Female Pirate",
    type: "character",
    category: "Personnage", 
    description: "Personnage féminin pirate stylisé avec détails authentiques. Riggé avec AutoRig Pro et optimisé pour Unity/Unreal Engine.",
    specs: {
      polygons: "7,234",
      vertices: "3,617",
      textures: "2K PBR",
      formats: [".fbx", ".blend", ".glb"],
      fileSize: "22 MB"
    },
    sketchfabUrl: "https://sketchfab.com/3d-models/lady-bloodrose-female-pirate-character-for-games-89044eac064f4f05a90f4313343c3b8a",
    pricing: { basic: 30, extended: 60 },
    tags: ["pirate", "female", "stylized", "game-ready"],
    featured: true,
    stats: { views: 890, downloads: 32, likes: 67 },
    color: "#e91e63",
    createdAt: "2024-02-10"
  },
  {
    id: 3,
    title: "Lysandra Bloom",
    type: "character",
    category: "Personnage",
    description: "Personnage féminin élégant avec style fantasy moderne. Design soigné et textures détaillées optimisées pour les jeux vidéo.",
    specs: {
      polygons: "9,156",
      vertices: "4,578",
      textures: "2K PBR",
      formats: [".fbx", ".blend", ".glb"],
      fileSize: "28 MB"
    },
    sketchfabUrl: "https://sketchfab.com/3d-models/lysandra-bloom-7d7b64002af24995ad1a48c4dfbe9e87",
    pricing: { basic: 35, extended: 70 },
    tags: ["fantasy", "female", "elegant", "stylized"],
    featured: false,
    stats: { views: 654, downloads: 21, likes: 45 },
    color: "#9c27b0",
    createdAt: "2024-01-25"
  },
  {
    id: 4,
    title: "Deer Guardian of Dream Forest",
    type: "character",
    category: "Créature",
    description: "Créature mystique avec éléments naturels. Design unique pour environnements fantastiques avec rigging complet et animations.",
    specs: {
      polygons: "12,890",
      vertices: "6,445",
      textures: "4K PBR",
      formats: [".fbx", ".blend", ".glb"],
      fileSize: "35 MB"
    },
    sketchfabUrl: "https://sketchfab.com/3d-models/deer-guardian-of-the-dream-forest-dfc3d8aa1a3c4641b1273d7e36f64f43",
    pricing: { basic: 40, extended: 80, commercial: 150 },
    tags: ["creature", "nature", "mystical", "forest", "guardian"],
    featured: true,
    stats: { views: 1567, downloads: 67, likes: 123 },
    color: "#4caf50",
    createdAt: "2024-03-05"
  },
  {
    id: 5,
    title: "Foxy Catgirl - Sweet & Strong",
    type: "character",
    category: "Personnage",
    description: "Personnage catgirl stylisé avec expressions faciales riggées. Design kawaii et professionnel parfait pour projets anime/manga.",
    specs: {
      polygons: "6,734",
      vertices: "3,367",
      textures: "2K PBR",
      formats: [".fbx", ".blend", ".glb"],
      fileSize: "20 MB"
    },
    sketchfabUrl: "https://sketchfab.com/3d-models/foxy-catgirl-sweet-cute-and-strong-character-f1f2878901d6436d924b1339ffc6e6b5",
    pricing: { basic: 28, extended: 55 },
    tags: ["catgirl", "kawaii", "anime", "cute", "rigged"],
    featured: false,
    stats: { views: 2103, downloads: 89, likes: 167 },
    color: "#ff9800",
    createdAt: "2024-02-20"
  },
  {
    id: 6,
    title: "Cute Scholarly Cat - Rigged PBR",
    type: "character",
    category: "Personnage",
    description: "Chat anthropomorphe érudit avec accessoires détaillés. Parfait pour projets éducatifs et applications interactives.",
    specs: {
      polygons: "5,423",
      vertices: "2,712",
      textures: "2K PBR",
      formats: [".fbx", ".blend", ".glb"],
      fileSize: "18 MB"
    },
    sketchfabUrl: "https://sketchfab.com/3d-models/cute-and-strong-scholarly-cat-rigged-pbr-b42ae1b88b034f0480086e3952e40482",
    pricing: { basic: 25, extended: 50 },
    tags: ["cat", "scholarly", "cute", "educational", "anthropomorphic"],
    featured: false,
    stats: { views: 743, downloads: 34, likes: 56 },
    color: "#2196f3",
    createdAt: "2024-01-30"
  }
];

const MODEL_TYPES = {
  all: 'Tous',
  character: 'Personnages',
  building: 'Bâtiments',
  object: 'Objets'
};

// ============================================================================
// 🎮 COMPOSANTS 3D
// ============================================================================

function Model3D({ position, color, scale = 1, rotationSpeed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.2;
      meshRef.current.rotation.y += 0.01 * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.1}
        />
        <mesh position={[0, 0, 0.51]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial color="#1a1a2e" opacity={0.8} transparent />
        </mesh>
      </mesh>
    </Float>
  );
}

function Background3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)'
      }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff6b35" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#2196f3" />
      
      <Environment preset="night" />
      
      <Model3D position={[-3, 2, -2]} color="#ff6b35" scale={0.5} rotationSpeed={0.5} />
      <Model3D position={[3, -1, -3]} color="#e91e63" scale={0.7} rotationSpeed={0.8} />
      <Model3D position={[-2, -2, -4]} color="#9c27b0" scale={0.4} rotationSpeed={1.2} />
      <Model3D position={[2, 2, -5]} color="#4caf50" scale={0.6} rotationSpeed={0.7} />
      <Model3D position={[0, -3, -2]} color="#ff9800" scale={0.5} rotationSpeed={1.0} />
      <Model3D position={[-4, 0, -3]} color="#2196f3" scale={0.6} rotationSpeed={0.9} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

function SimpleModelViewer({ modelId, height = "300px" }) {
  const model = modelsData.find(m => m.id === modelId);
  const color = model?.color || "#ff6b35";
  
  return (
    <div style={{ height, borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 1]} intensity={1} />
        <pointLight position={[-2, -2, -1]} intensity={0.5} color="#ff6b35" />
        
        <Model3D position={[0, 0, 0]} color={color} scale={1.2} rotationSpeed={0.8} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
}

// ============================================================================
// 🎯 COMPOSANTS UI
// ============================================================================

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="logo"><img 
    src="/images/logo.png" 
    alt="Logo" 
    className="logo-round"
  /> IMAKTECK 3D</div>
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Accueil</a></li>
          <li><a href="#models" onClick={(e) => { e.preventDefault(); scrollToSection('models'); }}>Modèles</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>À Propos</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
        </ul>
      </nav>
    </motion.header>
  );
}

function Hero() {
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
  /> Voir mes modèles
          </button>
          <button onClick={scrollToContact} className="btn btn-secondary">
            📧 Me contacter
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({ models: 0, clients: 0, projects: 0 });
  const statsRef = useRef();

  const targetStats = [
    { key: 'models', number: 50, label: "Modèles Créés", icon: "📦" },
    { key: 'clients', number: 300, label: "Clients Satisfaits", icon: "👥" },
    { key: 'projects', number: 15, label: "Projets Terminés", icon: "✅" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          targetStats.forEach(stat => {
            let current = 0;
            const increment = stat.number / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.number) {
                current = stat.number;
                clearInterval(timer);
              }
              setCounts(prev => ({
                ...prev,
                [stat.key]: Math.floor(current)
              }));
            }, 40);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="stats" ref={statsRef}>
      <div className="container">
        <div className="stats-grid">
          {targetStats.map((stat, index) => (
            <motion.div 
              key={stat.key}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <span className="stat-number">
                {counts[stat.key]}+
              </span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    
    if (filter !== 'all') {
      filtered = filtered.filter(model => model.type === filter);
    }
    
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

        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Rechercher un modèle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

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

        <div className="results-info">
          <p>{filteredModels.length} modèle{filteredModels.length > 1 ? 's' : ''} trouvé{filteredModels.length > 1 ? 's' : ''}</p>
        </div>

        <div className="models-grid">
          <AnimatePresence mode="wait">
            {filteredModels.length > 0 ? (
              filteredModels.map((model, index) => (
                <ModelCard key={`${filter}-${model.id}`} model={model} index={index} />
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
                    onClick={() => { setFilter('all'); setSearchQuery(''); }}
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

function About() {
  const skills = [
    'Blender 3D', 'AutoRig Pro', 'Texturing', 
    'Rigging', 'Unity', 'Character Design',
    'PBR Materials', 'Animation', 'Game Optimization'
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="profile-placeholder"><img 
    src="/images/logo.png" 
    alt="Logo" 
    style={{ width: '100%', height: '100%' }}
    className="logo-round"
  /></div>
            <div className="profile-info">
              <h3>Lynda imakhlaf</h3>
              <p>Artiste 3D Professionnel</p>
              <div className="profile-stats">
                <span>🎯 +5 ans d'expérience</span>
                <span>📦 +50 modèles créés</span>
              </div>
            </div>
          </motion.div>
          
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
            
            <div className="about-details">
              <div className="detail-item">
                <span className="icon">🎯</span>
                <div>
                  <strong>Ma spécialité :</strong><br />
                  Personnages stylisés riggés avec AutoRig Pro
                </div>
              </div>
              <div className="detail-item">
                <span className="icon">🛠️</span>
                <div>
                  <strong>Mes outils :</strong><br />
                  Blender, AutoRig Pro, Faceit, Substance Painter
                </div>
              </div>
              <div className="detail-item">
                <span className="icon">🎮</span>
                <div>
                  <strong>Mes cibles :</strong><br />
                  Jeux vidéo, animations, VR/AR, applications interactives
                </div>
              </div>
              <div className="detail-item">
                <span className="icon">🚀</span>
                <div>
                  <strong>Mon engagement :</strong><br />
                  Qualité professionnelle, délais respectés, support technique
                </div>
              </div>
            </div>
            
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

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contactez-moi
        </motion.h2>
        
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>📧 Informations de Contact</h3>
            <div className="contact-details">
              <div className="contact-item">
                <MapPin className="icon" size={20} />
                <div>
                  <strong>Localisation</strong><br />
                  Disponible internationalement<br />
                  <span className="text-muted">Travail à distance</span>
                </div>
              </div>
              <div className="contact-item">
                <Mail className="icon" size={20} />
                <div>
                  <strong>Email</strong><br />
                  contact@imakteck3d.com<br />
                  <span className="text-muted">Professionnel uniquement</span>
                </div>
              </div>
              <div className="contact-item">
                <Clock className="icon" size={20} />
                <div>
                  <strong>Délai de réponse</strong><br />
                  Sous 24h en moyenne<br />
                  <span className="text-muted">Lun-Ven: 9h-18h</span>
                </div>
              </div>
            </div>
            
            <h3>🌐 Mes Plateformes</h3>
            <div className="social-links">
              <a 
                href="https://sketchfab.com/ayb3d" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                🎨 Sketchfab
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                💼 CGTrader
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                🎨 ArtStation
              </a>
            </div>

            <div className="contact-cta">
              <h4>💡 Besoin d'un modèle personnalisé ?</h4>
              <p>Je crée des modèles 3D sur mesure selon vos spécifications exactes.</p>
              <ul>
                <li>✅ Délais respectés</li>
                <li>✅ Révisions incluses</li>
                <li>✅ Formats multiples</li>
                <li>✅ Support technique</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="form-header">
              <h3>📝 Envoyez-moi un message</h3>
              <p>Décrivez votre projet et je vous répondrai rapidement</p>
            </div>

            {submitStatus === 'success' && (
              <div className="alert alert-success">
                ✅ Message envoyé avec succès ! Je vous répondrai bientôt.
              </div>
            )}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Sélectionnez un sujet</option>
                <option value="commission">Commande personnalisée</option>
                <option value="licensing">Licence d'utilisation</option>
                <option value="support">Support technique</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Autre</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Décrivez votre projet en détail..."
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>🔄 Envoi en cours...</>
              ) : (
                <>📨 Envoyer le message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="logo"><img 
    src="/images/logo.png" 
    alt="Logo" 
    className="logo-round"
  /> IMAKTECK 3D</div>
              <p>Créateur de modèles 3D stylisés professionnels</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4>Plateformes</h4>
                <ul>
                  <li><a href="https://sketchfab.com/ayb3d" target="_blank" rel="noopener noreferrer">Sketchfab</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">CGTrader</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">ArtStation</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {currentYear} Imakteck 3D - Lynda imakhlaf. Tous droits réservés.</p>
            <div className="footer-social">
              <a href="https://sketchfab.com/ayb3d" target="_blank" rel="noopener noreferrer"><img 
    src="/images/logo.png" 
    alt="Logo" 
    className="logo-round"
  /></a>
              <a href="#" target="_blank" rel="noopener noreferrer">💼</a>
              <a href="#" target="_blank" rel="noopener noreferrer">📧</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// 🎯 COMPOSANT PRINCIPAL AVEC STYLES INTÉGRÉS
// ============================================================================

export default function App() {
  return (
    <>
      <style jsx>{`
        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%);
          color: #f0f0f0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .header {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(15, 15, 15, 0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 107, 53, 0.2);
          transition: all 0.3s ease;
        }

        .header.scrolled {
          background: rgba(15, 15, 15, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ff6b35;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-round {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ff6b35;
          transition: transform 0.3s ease;
        }

        .logo-round:hover {
          transform: rotate(360deg);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          color: #f0f0f0;
          text-decoration: none;
          transition: color 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .nav-links a:hover {
          color: #ff6b35;
        }

        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          padding-top: 80px;
        }

        .hero-content {
          z-index: 1;
          position: relative;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ff6b35, #ffa726);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero .subtitle {
          font-size: 1.3rem;
          color: #b0b0b0;
          margin-bottom: 0.5rem;
        }

        .hero .name {
          font-size: 1.1rem;
          color: #ff6b35;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: inherit;
          font-size: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #ff6b35, #ff8a65);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: #f0f0f0;
          border: 2px solid #ff6b35;
        }

        .btn-secondary:hover {
          background: #ff6b35;
          color: white;
        }

        .stats {
          padding: 4rem 0;
          background: rgba(26, 26, 46, 0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          padding: 2rem;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(26, 26, 46, 0.3));
          border: 1px solid rgba(255, 107, 53, 0.2);
          transition: transform 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ff6b35;
          display: block;
        }

        .stat-label {
          color: #b0b0b0;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .models-section {
          padding: 6rem 0;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #f0f0f0;
        }

        .section-subtitle {
          text-align: center;
          color: #b0b0b0;
          margin-bottom: 3rem;
          font-size: 1.1rem;
        }

        .search-bar {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .search-input {
          width: 100%;
          max-width: 400px;
          padding: 12px 16px;
          border: 1px solid rgba(255, 107, 53, 0.3);
          background: rgba(26, 26, 46, 0.3);
          color: #f0f0f0;
          border-radius: 25px;
          font-family: inherit;
        }

        .search-input:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
        }

        .filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1px solid rgba(255, 107, 53, 0.3);
          color: #b0b0b0;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .filter-btn.active,
        .filter-btn:hover {
          background: #ff6b35;
          color: white;
          border-color: #ff6b35;
        }

        .results-info {
          text-align: center;
          margin-bottom: 2rem;
          color: #b0b0b0;
        }

        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2rem;
        }

        .model-card {
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.6), rgba(15, 15, 15, 0.8));
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 107, 53, 0.2);
          transition: all 0.3s ease;
        }

        .model-preview {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .model-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8) 100%);
          opacity: 0;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1rem;
        }

        .model-overlay.visible {
          opacity: 1;
        }

        .model-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .badge.featured {
          background: linear-gradient(135deg, #ff6b35, #ff8a65);
          color: white;
        }

        .badge.type {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .model-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 107, 53, 0.5);
          color: #ff6b35;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          background: #ff6b35;
          color: white;
          transform: scale(1.1);
        }

        .model-info {
          padding: 1.5rem;
        }

        .model-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #f0f0f0;
        }

        .model-description {
          color: #b0b0b0;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .model-specs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.8rem;
          color: #b0b0b0;
          flex-wrap: wrap;
        }

        .model-tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .tag {
          padding: 2px 6px;
          background: rgba(255, 107, 53, 0.2);
          color: #ff6b35;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .model-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .model-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #b0b0b0;
        }

        .pricing {
          text-align: right;
        }

        .price {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ff6b35;
        }

        .price-extended {
          font-size: 0.9rem;
          color: #b0b0b0;
          margin-left: 0.5rem;
          text-decoration: line-through;
        }

        .model-links {
          display: flex;
          gap: 0.5rem;
        }

        .store-link {
          flex: 1;
          padding: 8px 12px;
          background: linear-gradient(135deg, #ff6b35, #ff8a65);
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .store-link:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        }

        .store-link.details {
          background: transparent;
          border: 1px solid #ff6b35;
          color: #ff6b35;
        }

        .store-link.details:hover {
          background: #ff6b35;
          color: white;
        }

        .about-section {
          padding: 6rem 0;
          background: rgba(26, 26, 46, 0.3);
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: flex-start;
        }

        .about-image {
          text-align: center;
        }

        .profile-placeholder {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b35, #ff8a65);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          margin: 0 auto 1rem;
          border: 4px solid rgba(255, 107, 53, 0.3);
        }

        .profile-info h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #f0f0f0;
        }

        .profile-info p {
          color: #ff6b35;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .profile-stats {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #b0b0b0;
        }

        .about-text h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #f0f0f0;
        }

        .about-text > p {
          color: #b0b0b0;
          margin-bottom: 2rem;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .about-details {
          margin: 2rem 0;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
          color: #b0b0b0;
        }

        .detail-item .icon {
          font-size: 1.2rem;
          width: 30px;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .detail-item strong {
          color: #f0f0f0;
        }

        .skills h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #ff6b35;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          padding: 6px 12px;
          background: rgba(255, 107, 53, 0.2);
          color: #ff6b35;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .contact-section {
          padding: 6rem 0;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .contact-info h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #ff6b35;
        }

        .contact-details {
          margin-bottom: 3rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 2rem;
          color: #b0b0b0;
        }

        .contact-item .icon {
          color: #ff6b35;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        .contact-item strong {
          color: #f0f0f0;
          display: block;
          margin-bottom: 0.25rem;
        }

        .text-muted {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .social-link {
          color: #b0b0b0;
          text-decoration: none;
          transition: color 0.3s ease;
          padding: 0.5rem 1rem;
          border: 1px solid rgba(255, 107, 53, 0.3);
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .social-link:hover {
          color: #ff6b35;
          border-color: #ff6b35;
        }

        .contact-cta {
          background: rgba(255, 107, 53, 0.1);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 107, 53, 0.2);
        }

        .contact-cta h4 {
          color: #ff6b35;
          margin-bottom: 1rem;
        }

        .contact-cta p {
          color: #b0b0b0;
          margin-bottom: 1rem;
        }

        .contact-cta ul {
          list-style: none;
          padding: 0;
        }

        .contact-cta li {
          color: #b0b0b0;
          margin-bottom: 0.5rem;
        }

        .contact-form {
          background: rgba(26, 26, 46, 0.3);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 107, 53, 0.2);
        }

        .form-header {
          margin-bottom: 2rem;
        }

        .form-header h3 {
          color: #f0f0f0;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .alert-success {
          background: rgba(76, 175, 80, 0.2);
          color: #4caf50;
          border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #f0f0f0;
          font-weight: 600;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(255, 107, 53, 0.3);
          background: rgba(15, 15, 15, 0.5);
          color: #f0f0f0;
          border-radius: 8px;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
        }

        .footer {
          background: #0f0f0f;
          padding: 3rem 0 1rem;
          border-top: 1px solid rgba(255, 107, 53, 0.2);
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .footer-brand .logo {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .footer-brand p {
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .footer-links {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .footer-section h4 {
          color: #f0f0f0;
          margin-bottom: 1rem;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section li {
          margin-bottom: 0.5rem;
        }

        .footer-section a {
          color: #b0b0b0;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: #ff6b35;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 107, 53, 0.1);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-bottom p {
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .footer-social {
          display: flex;
          gap: 1rem;
        }

        .footer-social a {
          color: #b0b0b0;
          font-size: 1.2rem;
          transition: color 0.3s ease;
          text-decoration: none;
        }

        .footer-social a:hover {
          color: #ff6b35;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          .nav-links {
            display: none;
          }
          .models-grid {
            grid-template-columns: 1fr;
          }
          .about-content,
          .contact-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .footer-main {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="app">
        <Suspense fallback={
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
            zIndex: 9999
          }}>
            <img 
    src="/images/logo.png" 
    alt="Logo" 
    className="logo-round"
  /> Chargement de votre portfolio...
          </div>
        }>
          <Background3D />
        </Suspense>
        
        <Header />
        
        <main>
          <Hero />
          <Stats />
          <ModelsSection />
          <About />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
}