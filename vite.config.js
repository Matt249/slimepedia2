import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_PUBLIC_URL || '/',
  build: {
    outDir: process.env.VITE_BUILD_PATH || 'dist',
  },
  server: {
    host: process.env.DEV_SERVER_HOST || 'localhost',
    port: process.env.VITE_DEV_SERVER_PORT || 3000
  },
});
