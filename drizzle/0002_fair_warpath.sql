ALTER TABLE "nextjs-trpc-boilerplate_post" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nextjs-trpc-boilerplate_user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nextjs-trpc-boilerplate_post" ADD COLUMN "content" text NOT NULL;