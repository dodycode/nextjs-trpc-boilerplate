import Link from "next/link";

import { AuthActions } from "@/app/auth/_components/auth-actions";
import { AuthErrorAlert } from "@/app/auth/_components/auth-error-alert";
import { AuthSiderHeader } from "@/app/auth/_components/auth-sider-header";

import { SignInForm } from "./_components/form";
import { LoginFormFields } from "./_components/form-fields";

export default function SignInPage() {
  return (
    <SignInForm>
      <AuthErrorAlert />
      <AuthSiderHeader />
      <LoginFormFields />
      <AuthActions />
      <div className="text-center text-sm">
        Don't have an account?
        <Link
          href="/auth/sign-up"
          className="ml-1 underline underline-offset-4"
        >
          Sign up
        </Link>
      </div>
    </SignInForm>
  );
}
