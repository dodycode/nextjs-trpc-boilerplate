import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
} from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { encode as defaultEncode } from "next-auth/jwt";
import { v4 as uuid } from "uuid";

import { env } from "@/env";
import { schema } from "@/server/db";
import { db } from "@/server/db/client";

import { CredentialsProvider } from "./providers/credentials";
import { DiscordProvider } from "./providers/discord";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const adapter = DrizzleAdapter(db, {
  usersTable: schema.User,
  accountsTable: schema.Account,
  sessionsTable: schema.Session,
});

export const isSecureContext = env.NODE_ENV !== "development";

export const authConfig = {
  adapter,
  secret: env.NEXTAUTH_SECRET,
  providers: [DiscordProvider, CredentialsProvider],
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/",
    error: "/auth/sign-in",
  },
  callbacks: {
    session: (opts) => {
      if (!("user" in opts))
        throw new Error("unreachable with session strategy");

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
    jwt({ token, account }) {
      // Initiate new custom property on the token to be used later
      token.credentials = false;
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    // Auth custom middleware
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  // Next Auth credentials provider with database strategy
  // https://youtu.be/rZ-WNsxu17s?si=x92I8z-QGqgh2kEt
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        if (!params.token.sub) {
          throw new Error("No user id found in token");
        }

        const sessionToken = await createSessionToken({
          userId: params.token.sub,
        });

        if (!sessionToken) return defaultEncode(params);

        return sessionToken;
      }

      return defaultEncode(params);
    },
  },
} satisfies NextAuthConfig;

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice("Bearer ".length);
  const session = await adapter.getSessionAndUser?.(sessionToken);
  return session
    ? {
        user: {
          ...session.user,
        },
        expires: session.session.expires.toISOString(),
      }
    : null;
};

export const invalidateSessionToken = async (token: string) => {
  const sessionToken = token.slice("Bearer ".length);
  await adapter.deleteSession?.(sessionToken);
};

export const createSessionToken = async ({ userId }: { userId?: string }) => {
  if (!userId) return;

  const sessionToken = uuid();
  const session = await adapter.createSession?.({
    sessionToken,
    userId,

    // expires in 1 hour
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });

  if (!session) throw new Error("Failed to create session");

  return sessionToken;
};
