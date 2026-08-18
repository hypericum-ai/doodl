import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: resolve(projectRoot, '../../dist/doodl-ai-react'),
    lib: {
      entry: resolve(projectRoot, 'src/index.ts'),
      name: 'DoodlAiReact',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'doodl-ai-react.js' : 'doodl-ai-react.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
