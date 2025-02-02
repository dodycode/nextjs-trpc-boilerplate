"use server";

import { signIn } from "@/server/auth";

export const signInWithDiscordAction = async () => {
  await signIn("discord", {
    redirect: true,
    redirectTo: "/",
  });
};
