import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

const routePairs = [
  ['/', '/en/'],
  ['/contact/', '/en/contact/'],
  ['/despre/', '/en/about/'],
  ['/portofoliu/', '/en/portfolio/'],
  ['/pret/', '/en/pricing/'],
  ['/servicii/', '/en/services/'],
  ['/servicii/website/', '/en/services/website/'],
  ['/servicii/aplicatii-web/', '/en/services/web-apps/'],
  ['/servicii/seo/', '/en/services/seo/'],
  ['/servicii/accesibilitate/', '/en/services/accessibility/'],
  ['/servicii/implementare-agenti/', '/en/services/ai-agents/'],
];

const baseUrl = 'https://isio.ro';
const hreflangMap = new Map();
for (const [ro, en] of routePairs) {
  const links = [
    { lang: 'ro', url: `${baseUrl}${ro}` },
    { lang: 'en', url: `${baseUrl}${en}` },
    { lang: 'x-default', url: `${baseUrl}${ro}` },
  ];
  hreflangMap.set(`${baseUrl}${ro}`, links);
  hreflangMap.set(`${baseUrl}${en}`, links);
}

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
    sitemap({
      lastmod: new Date(),
      serialize(item) {
        const links = hreflangMap.get(item.url);
        if (links) {
          item.links = links;
        }
        return item;
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
