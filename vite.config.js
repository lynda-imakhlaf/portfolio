import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // CRUCIAL pour Netlify
  base: './',
  
  server: {
    port: 3000,
    open: true
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    
    // Configuration spécifique pour Netlify
    rollupOptions: {
      output: {
        // Force les bonnes extensions
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    },
    
    // Optimisation pour modules ES6
    target: ['es2020'],
    minify: 'esbuild'
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', 'framer-motion']
  },
  
  // Gestion des assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg']
})