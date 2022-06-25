import { defineConfig } from 'vite';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
    }
  };
});
