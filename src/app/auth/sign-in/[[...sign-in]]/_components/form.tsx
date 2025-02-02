"use client";

import { useRouter } from "nextjs-toploader/app";

import type { SignInValues } from "@/validators/auth";
import { signInAction } from "@/app/auth/_actions/signIn";
import { Form, useForm } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/validators/auth";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const SignInForm: React.FC<Props> = ({ children, className }) => {
  const router = useRouter();

  const form = useForm({
    schema: signInSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValues) => {
    await signInAction(data.email, data.password);
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
      >
        {children}
      </form>
    </Form>
  );
};

export { SignInForm };
