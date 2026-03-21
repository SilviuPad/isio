export type Locale = 'ro' | 'en';

export const defaultLocale: Locale = 'ro';
export const locales: Locale[] = ['ro', 'en'];

/**
 * Slug mapping for translated URLs (per D-05).
 * Each entry maps a route key to its locale-specific slug.
 * RO slugs have no prefix. EN slugs are used under /en/.
 */
export const slugMap: Record<string, Record<Locale, string>> = {
  home:           { ro: '/',                              en: '/en/' },
  services:       { ro: '/servicii/',                     en: '/en/services/' },
  website:        { ro: '/servicii/website/',             en: '/en/services/website/' },
  webApps:        { ro: '/servicii/aplicatii-web/',       en: '/en/services/web-apps/' },
  seo:            { ro: '/servicii/seo/',                 en: '/en/services/seo/' },
  accessibility:  { ro: '/servicii/accesibilitate/',      en: '/en/services/accessibility/' },
  aiAgents:       { ro: '/servicii/implementare-agenti/', en: '/en/services/ai-agents/' },
  portfolio:      { ro: '/portofoliu/',                   en: '/en/portfolio/' },
  pricing:        { ro: '/pret/',                         en: '/en/pricing/' },
  about:          { ro: '/despre/',                       en: '/en/about/' },
  contact:        { ro: '/contact/',                      en: '/en/contact/' },
};

/**
 * Extract locale from a URL pathname.
 * URLs starting with /en/ are English; everything else is Romanian (default).
 */
export function getLocaleFromUrl(url: URL): Locale {
  const pathname = url.pathname;
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  return 'ro';
}

/**
 * Get the path for a given route key in the specified locale.
 * Usage: localePath('seo', 'en') => '/en/services/seo/'
 */
export function localePath(routeKey: string, locale: Locale): string {
  const entry = slugMap[routeKey];
  if (!entry) {
    console.warn(`No slug mapping found for route key: ${routeKey}`);
    return locale === 'ro' ? '/' : '/en/';
  }
  return entry[locale];
}

/**
 * Given the current URL, find the route key and return the slug for the alternate locale.
 * Used by LanguageSwitcher to link to the equivalent page in the other language.
 */
export function getAlternateLocaleSlug(url: URL): { roSlug: string; enSlug: string; routeKey: string } {
  const pathname = url.pathname;

  for (const [key, slugs] of Object.entries(slugMap)) {
    if (pathname === slugs.ro || pathname === slugs.ro.slice(0, -1)) {
      return { roSlug: slugs.ro, enSlug: slugs.en, routeKey: key };
    }
    if (pathname === slugs.en || pathname === slugs.en.slice(0, -1)) {
      return { roSlug: slugs.ro, enSlug: slugs.en, routeKey: key };
    }
  }

  // Fallback: return home slugs if no match found
  return { roSlug: '/', enSlug: '/en/', routeKey: 'home' };
}
