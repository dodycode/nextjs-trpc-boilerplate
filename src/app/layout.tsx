import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.NODE_ENV === "production"
      ? "https://your-website.vercel.app"
      : "http://localhost:3000",
  ),
  title: "Dodycode NextJS Boilerplate",
  description:
    "Production ready NextJS Boilerplate with tRPC and Repository Pattern",
  openGraph: {
    title: "Dodycode NextJS Boilerplate",
    description:
      "Production ready NextJS Boilerplate with tRPC and Repository Pattern",
    url: new URL(
      env.NODE_ENV === "production"
        ? "https://your-website.vercel.app"
        : "http://localhost:3000",
    ),
    siteName: "Dodycode NextJS Boilerplate",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dodypras__",
    creator: "@dodypras__",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      // To fix next-theme hydration error in next 15
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <NextTopLoader />
            {children}
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
