"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DiscordLoginButtonProps {
  callbackUrl?: string;
  className?: string;
  buttonText?: string;
}

export function DiscordLoginButton({
  callbackUrl = "/",
  className = "",
  buttonText = "Sign In with Discord",
}: DiscordLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDiscordLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("discord", { callbackUrl });
    } catch (error) {
      toast.error("Failed to initiate Discord login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDiscordLogin}
      variant="outline"
      className={className}
      isLoading={isLoading}
      loadingText="Connecting to Discord..."
    >
      {buttonText}
    </Button>
  );
}
