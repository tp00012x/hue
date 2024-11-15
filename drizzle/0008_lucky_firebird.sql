CREATE TYPE "public"."event_type" AS ENUM('card_click', 'video_play');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"review_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"event_type" "event_type" NOT NULL,
	"metadata" jsonb,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
