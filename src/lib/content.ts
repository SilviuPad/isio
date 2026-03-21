import { getCollection, getEntry } from 'astro:content';

export type Locale = 'ro' | 'en';

export interface LocaleString {
  ro: string;
  en: string;
}

export async function getServices() {
  const entries = await getCollection('services');
  return entries
    .map((e) => ({ id: e.id, ...e.data }))
    .sort((a, b) => a.order - b.order);
}

export async function getServiceByKey(serviceKey: string) {
  const services = await getServices();
  return services.find((s) => s.serviceKey === serviceKey) ?? null;
}

export async function getPortfolioItems() {
  const entries = await getCollection('portfolio');
  return entries
    .map((e) => ({ id: e.id, ...e.data }))
    .sort((a, b) => a.order - b.order);
}

export async function getPricingTiers(service: string) {
  const entries = await getCollection('pricing');
  return entries
    .filter((e) => e.data.service === service)
    .map((e) => ({ id: e.id, ...e.data }))
    .sort((a, b) => a.order - b.order);
}

export async function getAllPricingTiers() {
  const entries = await getCollection('pricing');
  return entries
    .map((e) => ({ id: e.id, ...e.data }))
    .sort((a, b) => a.service.localeCompare(b.service) || a.order - b.order);
}

export async function getSiteSettings() {
  const entry = await getEntry('settings', 'site');
  return entry ? { id: entry.id, ...entry.data } : null;
}

export function localize(
  field: LocaleString | null | undefined,
  locale: Locale,
  fallbackLocale: Locale = 'ro',
): string {
  if (!field) return '';
  return field[locale] || field[fallbackLocale] || '';
}
