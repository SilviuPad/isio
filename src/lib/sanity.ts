import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2025-02-19',  // Defaults perspective to 'published' — drafts filtered automatically
  useCdn: false,              // MUST be false for build-time SSG fetching
  token: import.meta.env.SANITY_API_READ_TOKEN,
});

// ---- Type definitions matching Sanity schemas ----

export type Locale = 'ro' | 'en';

export interface LocaleString {
  ro: string;
  en: string;
}

export interface LocaleText {
  ro: string;
  en: string;
}

export interface SanityService {
  _id: string;
  serviceKey: string;
  slug: LocaleString;
  title: LocaleString;
  description: LocaleText;
  metaTitle: LocaleString;
  metaDescription: LocaleString;
  order: number;
}

export interface SanityPortfolioItem {
  _id: string;
  title: LocaleString;
  description: LocaleText;
  screenshot: {
    asset: { _ref: string; url?: string };
    hotspot?: { x: number; y: number; width: number; height: number };
  };
  techStack: string[];
  liveUrl: string;
  order: number;
}

export interface SanityPricingTier {
  _id: string;
  service: string;
  order: number;
  name: LocaleString;
  priceEur: number;
  pricePrefix: LocaleString | null;
  deliveryDays: number;
  revisions: number;
  isRecommended: boolean;
  description: LocaleText;
  features: Array<{
    ro: string;
    en: string;
    included: boolean;
  }>;
}

export interface SanitySiteSettings {
  _id: string;
  siteTitle: LocaleString;
  siteDescription: LocaleText;
  contactEmail: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

// ---- GROQ Query Helpers ----

/**
 * Fetch all services ordered by display order.
 */
export async function getServices(): Promise<SanityService[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc)`
  );
}

/**
 * Fetch a single service by its serviceKey.
 */
export async function getServiceByKey(serviceKey: string): Promise<SanityService | null> {
  return sanityClient.fetch(
    `*[_type == "service" && serviceKey == $serviceKey][0]`,
    { serviceKey }
  );
}

/**
 * Fetch all portfolio items ordered by display order.
 */
export async function getPortfolioItems(): Promise<SanityPortfolioItem[]> {
  return sanityClient.fetch(
    `*[_type == "portfolioItem"] | order(order asc) {
      _id, title, description, techStack, liveUrl, order,
      "screenshot": screenshot { asset-> { _ref, url } }
    }`
  );
}

/**
 * Fetch pricing tiers for a specific service, ordered by tier (Basic, Standard, Premium).
 */
export async function getPricingTiers(service: string): Promise<SanityPricingTier[]> {
  return sanityClient.fetch(
    `*[_type == "pricingTier" && service == $service] | order(order asc)`,
    { service }
  );
}

/**
 * Fetch all pricing tiers across all services, grouped by service.
 */
export async function getAllPricingTiers(): Promise<SanityPricingTier[]> {
  return sanityClient.fetch(
    `*[_type == "pricingTier"] | order(service asc, order asc)`
  );
}

/**
 * Fetch site settings singleton.
 */
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]`
  );
}

/**
 * Helper: extract the localized value from a bilingual field.
 * Usage: localize(service.title, 'en') => "Website Development"
 */
export function localize<T extends LocaleString | LocaleText>(
  field: T | null | undefined,
  locale: Locale,
  fallbackLocale: Locale = 'ro'
): string {
  if (!field) return '';
  return field[locale] || field[fallbackLocale] || '';
}
