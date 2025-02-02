"use client";

import { useSearchParams } from "next/navigation";

import { Alert, AlertDescription } from "@/components/ui/alert";

const AuthErrorAlert: React.FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  if (!error) return null;

  return (
    <Alert variant="destructive" className="max-w-sm">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export { AuthErrorAlert };
