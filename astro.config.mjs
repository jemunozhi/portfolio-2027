import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jemunozhi.github.io',
  base: process.env.ASTRO_BASE ?? '/',
  devToolbar: {
    enabled: false,
  },
});
