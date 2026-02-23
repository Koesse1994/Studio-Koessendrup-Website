
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dieser Pfad muss EXAKT dem Namen deines GitHub-Repositories entsprechen.
export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
