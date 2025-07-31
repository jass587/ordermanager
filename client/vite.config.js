import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import purgeCss from 'vite-plugin-purgecss';

export default defineConfig(({ mode }) => ({
  base: '/', // Ensures correct paths for production build
  plugins: [
    react(),
    visualizer({
      open: mode === 'development', // Only auto-open in dev
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
    purgeCss({
      content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@data': path.resolve(__dirname, './src/data'),
      '@redux': path.resolve(__dirname, './src/redux'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-toastify',
    ],
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['react-router-dom', 'react-toastify', 'redux', 'react-redux'],
          ui: ['bootstrap'],
        },
      },
    },
  },
  server: {
    port: 5173,
    watch: {
      usePolling: false,
    },
  },
}));
