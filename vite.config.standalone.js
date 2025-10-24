import { defineConfig } from 'vite';
import { resolve } from 'path';

// Build STANDALONE - Inclui SweetAlert2 no bundle
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'SweetAlertWrapper',
      fileName: (format) => `sweetalert-wrapper.standalone.${format}.js`,
      formats: ['umd', 'iife']
    },
    rollupOptions: {
      output: {
        assetFileNames: 'sweetalert-wrapper.standalone.css',
        inlineDynamicImports: true
      }
    },
    outDir: 'dist',
    emptyOutDir: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    sourcemap: true
  }
});
