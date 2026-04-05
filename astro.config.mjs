import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/jetbrains-mono-v24-latin-regular.woff2'],
            display: 'swap',
            weight: 400,
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-cormorant',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/cormorant-garamond-v21-latin-regular.woff2'],
            display: 'swap',
            weight: 400,
            style: 'normal',
          },
        ],
      },
    },
  ],
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

  markdown: {
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      defaultColor: 'light-dark()'
    }
  },

  integrations: [mdx()],
});