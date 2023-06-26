import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { chromeExtension } from "vite-plugin-chrome-extension";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    chromeExtension(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: 'src/manifest.json',
    },
  },
});
