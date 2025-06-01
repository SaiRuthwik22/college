import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser', // Uses terser for better minification
    terserOptions: {
      compress: {
        // Enhanced compression options
        drop_console: true,  // Remove console statements
        drop_debugger: true, // Remove debugger statements
      }
    },
    rollupOptions: {
      output: {
        // Chunk the output to improve caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'tanstack-query': ['@tanstack/react-query']
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit for chunk size
  },
}));
