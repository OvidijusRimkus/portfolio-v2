// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Vite configuration.
 *
 * Tailwind v4 jungiamas per @tailwindcss/vite pluginą.
 * Tai naujesnis ir paprastesnis būdas negu senas tailwind.config.js setupas.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});