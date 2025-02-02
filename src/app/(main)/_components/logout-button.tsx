"use client";

import { useState } from "react";

import { signOutAction } from "@/app/auth/_actions/signOut";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

const LogoutButton: React.FC = () => {
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      isLoading={isLoading}
      className="hidden h-10 font-semibold md:flex"
      onClick={async () => {
        setIsLoading(true);
        await signOutAction();
        await utils.auth.invalidate();
        setIsLoading(false);
      }}
    >
      Sign Out
    </Button>
  );
};

export { LogoutButton };
