import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

export default defineConfig({
  site: 'https://isio.ro',
  output: 'server',
  adapter: cloudflare({ prerenderEnvironment: 'node' }),
  i18n: {
    locales: ['ro', 'en'],
    defaultLocale: 'ro',
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: { en: 'ro' },
  },
  integrations: [
    sanity({
      projectId: import.meta.env.SANITY_PROJECT_ID || 'placeholder',
      dataset: 'production',
      apiVersion: '2025-02-19',
      useCdn: false,
      studioBasePath: '/studio',
    }),
    sitemap({
      i18n: {
        defaultLocale: 'ro',
        locales: { ro: 'ro-RO', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
      }),
    ],
  },
});
