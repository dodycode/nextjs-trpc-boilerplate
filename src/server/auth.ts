import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import { encode as defaultEncode } from "next-auth/jwt";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";

import { v4 as uuid } from "uuid";
import { env } from "@/env";
import { db } from "@/server/db";

import { verificationTokens } from "./db/schema/verification-tokens";
import { users } from "./db/schema/users";
import { accounts } from "./db/schema/accounts";
import { sessions } from "./db/schema/sessions";
import { authService } from "./api/routers/auth/auth.service";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

const adapter = DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  sessionsTable: sessions,
  verificationTokensTable: verificationTokens,
}) as Adapter;

export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          let user;
          if (credentials.action === "signup") {
            user = await authService.getSignUpUser(credentials);
          } else if (credentials.action === "signin") {
            user = await authService.getSignInUser(credentials);
          } else {
            throw new Error("Invalid action");
          }

          if (user) {
            // Return user object that will be saved in the JWT
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              // Add any other fields you want to include in the session
            };
          } else {
            // If you return null or false then the credentials will be rejected
            return null;
          }
        } catch (error) {
          console.error(error);
          // Instead of returning an error object, we throw an error
          // NextAuth will handle this and pass it to the client
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed",
          );
        }
      },
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,

      //Remove this if you do not want users to have multiple accounts registered with the same email
      //but from different providers
      allowDangerousEmailAccountLinking: true,
    }),

    //you can add more nextauth provider here
  ],
  pages: {
    signIn: "/signin",
  },

  // fix credentials provider not using database strategy start from here.
  // details: https://youtu.be/rZ-WNsxu17s?si=IHLTbyDS9p_-UWtF
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
