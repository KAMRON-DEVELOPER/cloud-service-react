import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  // logLevel: 'warn', // "info" | "warn" | "error" | "silent"
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // You can add more aliases for specific directories, e.g.:
      // "@components": resolve(__dirname, "src/components"),
      // "@utils": resolve(__dirname, "src/utils"),
      // '@': path.resolve(process.cwd(), 'src'),
      // '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/v1/users': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/users/, '/api/v1'),
      },
      '/api/v1/compute': {
        target: 'http://localhost:8002',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1\/compute/, '/api/v1'),
      },
      '/api/v1/billing': {
        target: 'http://localhost:8003',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/billing/, '/api/v1'),
      },
    },
  },
});
