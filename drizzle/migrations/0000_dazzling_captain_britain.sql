CREATE TABLE IF NOT EXISTS "haikus" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first" text NOT NULL,
	"mid" text NOT NULL,
	"last" text NOT NULL,
	"source" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
