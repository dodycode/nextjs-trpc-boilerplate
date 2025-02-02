import Link from "next/link";

import { AuthActions } from "@/app/auth/_components/auth-actions";
import { AuthErrorAlert } from "@/app/auth/_components/auth-error-alert";
import { AuthSiderHeader } from "@/app/auth/_components/auth-sider-header";

import { SignUpForm } from "./_components/form";
import { SignUpFormFields } from "./_components/form-fields";

export default function SignUpPage() {
  return (
    <SignUpForm>
      <AuthErrorAlert />
      <AuthSiderHeader
        headingText="Sign Up"
        subHeadingText="Create your account"
      />
      <SignUpFormFields />
      <AuthActions actionText="Sign Up" />
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="ml-1 underline underline-offset-4"
        >
          Sign in
        </Link>
      </div>
    </SignUpForm>
  );
}
