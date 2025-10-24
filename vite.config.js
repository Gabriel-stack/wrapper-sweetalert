import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'SweetAlertWrapper',
      fileName: (format) => `sweetalert-wrapper.${format}.js`,
      formats: ['es', 'umd', 'iife']
    },
    rollupOptions: {
      external: ['sweetalert2'],
      output: {
        globals: {
          sweetalert2: 'Swal'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'sweetalert-wrapper.css';
          }
          return assetInfo.name;
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    sourcemap: true
  },
  server: {
    open: '/examples/index.html'
  }
});
