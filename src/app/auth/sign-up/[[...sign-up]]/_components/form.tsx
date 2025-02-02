"use client";

import { useRouter } from "nextjs-toploader/app";

import type { SignUpValues } from "@/validators/auth";
import { signUpAction } from "@/app/auth/_actions/signUp";
import { Form, useForm } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/validators/auth";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const SignUpForm: React.FC<Props> = ({ children, className }) => {
  const router = useRouter();

  const form = useForm({
    schema: signUpSchema,
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: SignUpValues) => {
    await signUpAction(data.name, data.email, data.password);
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

export { SignUpForm };
