import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api-file': {
        target: 'http://file-hosting.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-file/, ''),
      },
    },
  },
});