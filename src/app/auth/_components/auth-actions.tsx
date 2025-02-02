"use client";

import { useFormContext } from "react-hook-form";

import type { SignInValues, SignUpValues } from "@/validators/auth";
import { Button } from "@/components/ui/button";

import { SignInWithDiscordButton } from "./sign-in-with-discord-btn";

interface Props {
  actionText?: string;
}

const AuthActions: React.FC<Props> = ({ actionText = "Login" }) => {
  const { formState } = useFormContext<SignInValues | SignUpValues>();

  return (
    <>
      <Button
        type="submit"
        isLoading={formState.isSubmitting}
        className="w-full"
      >
        {actionText}
      </Button>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <SignInWithDiscordButton />
    </>
  );
};

export { AuthActions };
