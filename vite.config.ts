import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  // logLevel: 'warn', // "info" | "warn" | "error" | "silent"
  plugins: [react(), tailwindcss(), svgr(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // You can add more aliases for specific directories, e.g.:
      // "@components": resolve(__dirname, "src/components"),
      // "@utils": resolve(__dirname, "src/utils"),
      // '@': path.resolve(process.cwd(), 'src'),
      // '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/v1/auth': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false,
        ws: true,
        // rewrite: (path) => path.replace(/^\/api\/v1\/auth/, '/api/v1'),
      },
      '/api/v1/profile': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false,
        ws: true,
        // rewrite: (path) => path.replace(/^\/api\/v1\/profile/, '/api/v1'),
      },
      '/api/v1/projects': {
        target: 'http://localhost:8002',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api\/v1\/projects/, '/api/v1'),
      },
      '/api/v1/balance': {
        target: 'http://localhost:8003',
        changeOrigin: true,
        ws: true,
        // rewrite: (path) => path.replace(/^\/api\/v1\/balance/, '/api/v1'),
      },
      '/api/v1/transactions': {
        target: 'http://localhost:8003',
        changeOrigin: true,
        ws: true,
        // rewrite: (path) => path.replace(/^\/api\/v1\/transactions/, '/api/v1'),
      },
    },
  },
});
