CREATE TABLE "inquiries" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"message" text NOT NULL,
	"interest" text DEFAULT 'General Inquiry',
	"created_at" timestamp DEFAULT now()
);
