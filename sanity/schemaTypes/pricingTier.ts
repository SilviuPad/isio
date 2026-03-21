import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'document',
  fields: [
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      options: {
        list: [
          { title: 'Website Builds', value: 'website' },
          { title: 'Web Apps', value: 'webapp' },
          { title: 'SEO Packages', value: 'seo' },
          { title: 'Accessibility Audits', value: 'accessibility' },
          { title: 'AI Agent Implementation', value: 'ai-agents' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Tier Order',
      type: 'number',
      description: '1 = Basic, 2 = Standard, 3 = Premium',
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: 'name',
      title: 'Tier Name',
      type: 'object',
      fields: [
        defineField({ name: 'ro', title: 'Română', type: 'string' }),
        defineField({ name: 'en', title: 'English', type: 'string' }),
      ],
    }),
    defineField({
      name: 'priceEur',
      title: 'Price (EUR)',
      type: 'number',
      description: 'Price in EUR (D-09: EUR only across both locales)',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'pricePrefix',
      title: 'Price Prefix',
      type: 'object',
      description: 'Optional text before price, e.g., "Starting from"',
      fields: [
        defineField({ name: 'ro', title: 'Română', type: 'string' }),
        defineField({ name: 'en', title: 'English', type: 'string' }),
      ],
    }),
    defineField({
      name: 'deliveryDays',
      title: 'Delivery Days',
      type: 'number',
      description: 'Estimated delivery time in business days',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'revisions',
      title: 'Number of Revisions',
      type: 'number',
      description: '-1 = unlimited revisions',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isRecommended',
      title: 'Recommended Tier',
      type: 'boolean',
      description: 'Highlight this tier as the recommended option',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({ name: 'ro', title: 'Română', type: 'text' }),
        defineField({ name: 'en', title: 'English', type: 'text' }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'ro', title: 'Română', type: 'string' }),
          defineField({ name: 'en', title: 'English', type: 'string' }),
          defineField({
            name: 'included',
            title: 'Included',
            type: 'boolean',
            initialValue: true,
          }),
        ],
        preview: {
          select: { title: 'en', included: 'included' },
          prepare({ title, included }: { title: string; included: boolean }) {
            return { title: `${included ? '✓' : '✗'} ${title || ''}` };
          },
        },
      }],
    }),
  ],
  orderings: [
    {
      title: 'Service, then Tier',
      name: 'serviceTier',
      by: [
        { field: 'service', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name.en', subtitle: 'service', order: 'order' },
    prepare({ title, subtitle, order }: { title: string; subtitle: string; order: number }) {
      const tierLabel = order === 1 ? 'Basic' : order === 2 ? 'Standard' : 'Premium';
      return { title: `${title || tierLabel}`, subtitle: `${subtitle} — Tier ${order}` };
    },
  },
});
