import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/config/site";
import { cn } from "@/lib/utils";

const NavbarMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:absolute md:top-1/2 md:left-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
      <div className="flex items-center gap-10">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <NavigationMenuItem key={`${index}-${link.href}}`}>
                  <Link href="/posts" legacyBehavior={true} passHref={true}>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "text-md")}
                      active={isActive}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export { NavbarMenu };
