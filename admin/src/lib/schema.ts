import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const clients = sqliteTable('clients', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyName: text('company_name').notNull(),
  contactPerson: text('contact_person'),
  email: text('email').notNull(),
  phone: text('phone'),
  cui: text('cui'),
  address: text('address'),
  iban: text('iban'),
  notes: text('notes'),
  // Project fields (1:1 per D-15)
  projectName: text('project_name'),
  projectDueDate: text('project_due_date'),
  projectStatus: text('project_status', {
    enum: ['not_started', 'in_progress', 'review', 'blocked', 'done']
  }).default('not_started'),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString()),
});

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
