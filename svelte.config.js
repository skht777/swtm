import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const isDev = process.env.isDev === 'true';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
      scss: {
        prependData: '@use "src/variables.scss" as *;'
      }
    })
  ],
  compilerOptions: {
    dev: isDev,
    enableSourcemap: isDev
  },
  kit: {
    adapter: adapter(),
    paths: {
      base: isDev ? '' : '/swtm'
    },
    prerender: {
      default: true
    },
    trailingSlash: 'always',
    appDir: 'internal'
  }
};

export default config;
