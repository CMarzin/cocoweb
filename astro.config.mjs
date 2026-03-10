import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://cocoweb.fr',
  output: 'static',

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },

  integrations: [mdx()],
});