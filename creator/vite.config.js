import { resolve } from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { chromeExtension } from 'vite-plugin-chrome-extension';

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;

export default defineConfig({
  plugins: [
    vue(),
    chromeExtension(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: [
        'manifest.json',
        'src/assets/cesium-grey-48.png',
      ],
      output: {
        // _ invalid in chrome extension file names.
        // https://github.com/vitejs/vite/issues/9119
        sanitizeFileName(name) {
          return name.replace(INVALID_CHAR_REGEX, '0');
        },
      },
    },
  },
});
