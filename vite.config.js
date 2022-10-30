/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => {
  const isDev = mode !== 'production';
  Object.assign(process.env, { isDev });

  return {
    plugins: [sveltekit()],
    build: {
      sourcemap: !!isDev,
      minify: !isDev
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "src/variables.scss" as *;'
        }
      }
    },
    test: {
      environment: 'jsdom',
      deps: {
        inline: ['date-fns']
      },
      include: ['**/src/**/*.spec.ts'],
      setupFiles: 'vitest.setup.ts',
      globals: true
    }
  };
});
