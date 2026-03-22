CREATE TABLE `clients` (
	`id` text PRIMARY KEY NOT NULL,
	`company_name` text NOT NULL,
	`contact_person` text,
	`email` text NOT NULL,
	`phone` text,
	`cui` text,
	`address` text,
	`iban` text,
	`notes` text,
	`project_name` text,
	`project_due_date` text,
	`project_status` text DEFAULT 'not_started',
	`created_at` text,
	`updated_at` text
);
