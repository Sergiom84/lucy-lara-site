import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist", "public"),
    emptyOutDir: true,
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for large libraries
          vendor: ['react', 'react-dom'],
          // UI library chunk
          radix: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast',
            '@radix-ui/react-select',
            '@radix-ui/react-label',
            '@radix-ui/react-slot'
          ],
          // Animation libraries
          animation: ['framer-motion'],
          // Form utilities
          forms: ['react-hook-form', '@hookform/resolvers', 'zod']
        }
      }
    },
    // Compression and minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Asset optimization
    assetsInlineLimit: 4096, // 4KB - inline smaller assets
    chunkSizeWarningLimit: 1000, // Warn for chunks over 1MB
  },
  // Development optimizations
  server: {
    fs: {
      strict: false,
    },
  },
});
