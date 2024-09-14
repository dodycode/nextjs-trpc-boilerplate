"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { RiCloseLine, RiDonutChartFill, RiMenuLine } from "@remixicon/react";
import useScroll from "@/hooks/use-scroll";
import { signOut } from "next-auth/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

function AuthButton({ session }: { session: any }) {
  const router = useRouter();
  return (
    <>
      {session ? (
        <Button
          className="hidden h-10 font-semibold md:flex"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          className="hidden h-10 font-semibold md:flex"
          onClick={() => router.push("/signin")}
        >
          Sign In
        </Button>
      )}
    </>
  );
}

function MobileNavToggler({
  open,
  setOpen,
  session,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  session: any;
}) {
  return (
    <div className="flex gap-x-2 md:hidden">
      <AuthButton session={session} />
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="aspect-square p-2"
      >
        {open ? (
          <RiCloseLine aria-hidden="true" className="size-5" />
        ) : (
          <RiMenuLine aria-hidden="true" className="size-5" />
        )}
      </Button>
    </div>
  );
}

function NavbarClientComponent({ session }: { session: any }) {
  const scrolled = useScroll(15);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(min-width: 768px)");
    const handleMediaQueryChange = () => {
      setOpen(false);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange();

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <header
      className={cn(
        "animate-slide-down-fade ease-[cubic-bezier(0.16,1,0.3,1.03)] fixed inset-x-3 top-4 z-50 mx-auto flex max-w-6xl transform-gpu justify-center overflow-hidden rounded-xl border border-transparent px-0 py-3 transition-all duration-300 will-change-transform",
        open === true ? "h-52" : "h-16",
        scrolled || open === true
          ? "backdrop-blur-nav max-w-3xl border-gray-100 bg-white/80 px-4 shadow-xl shadow-black/5 dark:border-white/15 dark:bg-black/70"
          : "bg-white/0 dark:bg-gray-950/0",
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          <Link href="/" aria-label="Home">
            <span className="sr-only">Company logo</span>
            <div className="flex items-center space-x-2.5">
              <RiDonutChartFill
                className="size-7 text-gray-900 dark:text-gray-50"
                aria-hidden={true}
              />
              {!scrolled && (
                <p className="font-normal text-gray-900 dark:text-gray-50">
                  NextAuth.js Starter
                </p>
              )}
            </div>
          </Link>
          <nav className="hidden md:absolute md:left-1/2 md:top-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
            <div className="flex items-center gap-10">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/posts" legacyBehavior={true} passHref={true}>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), "text-md")}
                      >
                        Posts
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="#" legacyBehavior={true} passHref={true}>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), "text-md")}
                      >
                        Second Link
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="#" legacyBehavior={true} passHref={true}>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), "text-md")}
                      >
                        Third Link
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </nav>
          <AuthButton session={session} />
          <MobileNavToggler
            open={open}
            setOpen={(isOpen) => setOpen(isOpen)}
            session={session}
          />
        </div>
        <nav
          className={cn(
            "my-6 flex text-lg ease-in-out will-change-transform md:hidden",
            open ? "" : "hidden",
          )}
        >
          <ul className="space-y-4 font-medium">
            <li onClick={() => setOpen(false)}>
              <Link href="/posts">Posts</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavbarClientComponent;
