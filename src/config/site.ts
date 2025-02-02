export interface NavItem {
  href: string;
  title: string;
}

export const navItems = [
  {
    href: "/posts",
    title: "Posts",
  },
  {
    href: "#",
    title: "Second Link",
  },
  {
    href: "#",
    title: "Third Link",
  },
] as const satisfies NavItem[];
