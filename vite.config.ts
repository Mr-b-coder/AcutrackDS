import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // This part tells Vite to build a library
    lib: {
      // This is the main entry file for your components
      entry: resolve(__dirname, 'src/index.js'), // Make sure this file exists!
      name: 'AcutrackDesignSystem',
      fileName: 'index',
    },
    // This part tells Vite NOT to include React in your final package
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});