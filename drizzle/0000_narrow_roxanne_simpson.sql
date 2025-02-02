CREATE TABLE "dodycode-nextjs-boilerplate_account" (
	"user_id" uuid NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" varchar(255),
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "dodycode-nextjs-boilerplate_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "dodycode-nextjs-boilerplate_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "dodycode-nextjs-boilerplate_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone,
	"image" varchar(255),
	"password" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "dodycode-nextjs-boilerplate_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "dodycode-nextjs-boilerplate_account" ADD CONSTRAINT "dodycode-nextjs-boilerplate_account_user_id_dodycode-nextjs-boilerplate_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dodycode-nextjs-boilerplate_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dodycode-nextjs-boilerplate_session" ADD CONSTRAINT "dodycode-nextjs-boilerplate_session_user_id_dodycode-nextjs-boilerplate_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dodycode-nextjs-boilerplate_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dodycode-nextjs-boilerplate_post" ADD CONSTRAINT "dodycode-nextjs-boilerplate_post_created_by_dodycode-nextjs-boilerplate_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."dodycode-nextjs-boilerplate_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "created_by_idx" ON "dodycode-nextjs-boilerplate_post" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "name_idx" ON "dodycode-nextjs-boilerplate_post" USING btree ("name");