import "server-only";

import Discord from "next-auth/providers/discord";

import { env } from "@/env";

export const DiscordProvider = Discord({
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
});
