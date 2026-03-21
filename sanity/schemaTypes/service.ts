import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'serviceKey',
      title: 'Service Key',
      type: 'string',
      description: 'Internal key matching slugMap in i18n/utils.ts (e.g., "website", "webApps", "seo")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slugs',
      type: 'object',
      fields: [
        defineField({ name: 'ro', title: 'RO Slug', type: 'string', description: 'e.g., servicii/website' }),
        defineField({ name: 'en', title: 'EN Slug', type: 'string', description: 'e.g., services/website' }),
      ],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        defineField({ name: 'ro', title: 'Română', type: 'string' }),
        defineField({ name: 'en', title: 'English', type: 'string' }),
      ],
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
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'object',
      fields: [
        defineField({ name: 'ro', title: 'Română', type: 'string' }),
        defineField({ name: 'en', title: 'English', type: 'string' }),
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'object',
      fields: [
        defineField({ name: 'ro', title: 'Română', type: 'string' }),
        defineField({ name: 'en', title: 'English', type: 'string' }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the display order in navigation and service listings',
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'serviceKey' },
  },
});
