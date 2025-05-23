import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true, // Enable source maps for debugging
    emptyOutDir: true, // Clear dist folder before build
    rollupOptions: {
      output: {
        manualChunks: {
          // Strategic code splitting
          vendor: [
            'react', 
            'react-dom',
            'react-router-dom'
          ],
          state: [
            '@tanstack/react-query',
            'zustand'
          ],
          ui: [
            '@radix-ui/react-dropdown-menu',
            'react-icons'
          ],
          data: [
            '@supabase/supabase-js',
            'zod'
          ]
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      },
      plugins: [
        // Netlify redirects for SPA routing
        {
          name: 'netlify-redirects',
          generateBundle() {
            this.emitFile({
              type: 'asset',
              fileName: '_redirects',
              source: '/* /index.html 200'
            });
          }
        }
      ]
    },
    chunkSizeWarningLimit: 1000, // Adjust based on your needs
    minify: 'terser', // Advanced minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000, // Default dev server port
    open: true // Auto-open browser
  },
  preview: {
    port: 4173 // Preview server port
  }
});
