"use client";

import * as React from "react";
import Link from "next/link";

import { Icon } from "@/components/ui/icons";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

import { LogoutButton } from "./logout-button";
import { MobileNavMenu } from "./mobile-nav-menu";
import { MobileNavToggler } from "./mobile-nav-toggler";
import { NavbarMenu } from "./navbar-menu";

const Navbar: React.FC = () => {
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
        "animate-slide-down-fade fixed inset-x-3 top-4 z-50 mx-auto flex max-w-6xl transform-gpu justify-center overflow-hidden rounded-xl border border-transparent px-0 py-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1.03)] will-change-transform",
        open === true ? "h-52" : "h-16",
        scrolled || open === true
          ? "backdrop-blur-nav max-w-3xl border-gray-100 bg-white/80 px-4 shadow-xl shadow-black/5 dark:border-white/15 dark:bg-black"
          : "bg-white/0 dark:bg-gray-950/0",
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          <Link href="/" aria-label="Home">
            <span className="sr-only">Company logo</span>
            <div className="flex items-center space-x-2.5">
              <Icon
                type="galleryVerticalEnd"
                className="size-7 text-gray-900 dark:text-gray-50"
              />
              {!scrolled && (
                <p className="font-normal text-gray-900 dark:text-gray-50">
                  NextAuth.js Starter
                </p>
              )}
            </div>
          </Link>
          <NavbarMenu />
          <LogoutButton />
          <MobileNavToggler open={open} setOpen={(isOpen) => setOpen(isOpen)} />
        </div>
        <MobileNavMenu open={open} onOpen={(open) => setOpen(open)} />
      </div>
    </header>
  );
};

export { Navbar };
