import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

export default defineConfig({
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