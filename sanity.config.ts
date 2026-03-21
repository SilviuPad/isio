import { defineConfig } from 'sanity';

export default defineConfig({
  name: 'isio',
  title: 'Isio Studio',
  projectId: process.env.SANITY_PROJECT_ID || 'placeholder',
  dataset: 'production',
  schema: {
    types: [],
  },
});
