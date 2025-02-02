import Link from "next/link";

import { signOutAction } from "@/app/auth/_actions/signOut";
import { buttonVariants } from "@/components/ui/button-base";
import { navItems } from "@/config/site";
import { cn } from "@/lib/utils";

type Props = {
  open?: boolean;
  onOpen?: (open: boolean) => void;
};

const MobileNavMenu: React.FC<Props> = ({ open, onOpen }) => {
  return (
    <nav
      className={cn(
        "hidden py-2 text-lg ease-in-out will-change-transform",
        open && "flex",
      )}
    >
      <ul className="flex w-full flex-col gap-2 font-medium">
        {navItems.map((link, index) => {
          return (
            <li key={`${index}-${link.href}`} onClick={() => onOpen?.(false)}>
              <Link className="text-sm" href={link.href}>
                {link.title}
              </Link>
            </li>
          );
        })}
        <li
          onClick={() =>
            signOutAction().then(() => {
              onOpen?.(false);
            })
          }
        >
          <span
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Logout
          </span>
        </li>
      </ul>
    </nav>
  );
};

export { MobileNavMenu };
