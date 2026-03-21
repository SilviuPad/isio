import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'isio',
  title: 'Isio Studio',
  projectId: import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
