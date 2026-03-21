import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localeString = z.object({ ro: z.string(), en: z.string() });

function jsonId({ entry }: { entry: string }) {
  return entry.replace(/\.json$/, '');
}

const services = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/services', generateId: jsonId }),
  schema: z.object({
    serviceKey: z.string(),
    slug: localeString,
    title: localeString,
    description: localeString,
    metaTitle: localeString,
    metaDescription: localeString,
    order: z.number(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/portfolio', generateId: jsonId }),
  schema: z.object({
    title: localeString,
    description: localeString,
    screenshot: z.string(),
    techStack: z.array(z.string()),
    liveUrl: z.string(),
    order: z.number(),
  }),
});

const pricing = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/pricing', generateId: jsonId }),
  schema: z.object({
    service: z.string(),
    order: z.number(),
    name: localeString,
    priceEur: z.number(),
    pricePrefix: localeString.nullable().optional(),
    deliveryDays: z.number(),
    revisions: z.number(),
    isRecommended: z.boolean().default(false),
    description: localeString,
    features: z.array(z.object({
      ro: z.string(),
      en: z.string(),
      included: z.boolean(),
    })),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/settings', generateId: jsonId }),
  schema: z.object({
    siteTitle: localeString,
    siteDescription: localeString,
    contactEmail: z.string().email(),
    socialLinks: z.object({
      linkedin: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
    }).default({}),
  }),
});

export const collections = { services, portfolio, pricing, settings };
