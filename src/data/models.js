// 📦 DONNÉES DE VOS MODÈLES 3D

export const modelsData = [
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

export const MODEL_TYPES = {
  all: 'Tous',
  character: 'Personnages',
  building: 'Bâtiments',
  object: 'Objets'
};