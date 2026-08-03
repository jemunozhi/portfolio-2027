import { defineConfig } from 'astro/config';

export default defineConfig(({ command }) => ({
  site: 'https://jemunozhi.github.io',
  base: command === 'build' ? '/portfolio-2027/' : '/',
}));
