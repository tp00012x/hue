ALTER TABLE "reviews" ADD COLUMN "shade_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_shade_id_shades_id_fk" FOREIGN KEY ("shade_id") REFERENCES "public"."shades"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN IF EXISTS "shade_name";