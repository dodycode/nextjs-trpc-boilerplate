import Link from "next/link";

import { Icon } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme";

interface Props {
  children: React.ReactNode;
}

const AuthSider: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <Icon type="galleryVerticalEnd" className="size-4" />
          </div>
          Bellic Inc.
        </Link>
        <ThemeToggle />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </div>
  );
};

export { AuthSider };
