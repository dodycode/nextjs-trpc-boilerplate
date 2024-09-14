"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { insertSchema } from "@/server/db/schema/users";
import { z } from "zod";
import { useFormErrorToast } from "@/hooks/use-form-error-toast";
import { toast } from "sonner";
import { DiscordLoginButton } from "./discord-login-button";

const signInSchema = insertSchema
  .omit({
    name: true,
  })
  .extend({
    action: z.string(),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      action: "signin",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: true,
        redirectTo: "/",
      });

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.ok) {
        toast.success("Signed in successfully!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const isSubmitting = form.formState.isSubmitting || form.formState.isLoading;

  useFormErrorToast(form);

  return (
    <div className="grid gap-2">
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="dody@dodycode.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            isLoading={isSubmitting}
            loadingText="Signing in..."
            type="submit"
            className="w-full"
          >
            Sign In
          </Button>
        </form>
      </Form>
      <DiscordLoginButton />
    </div>
  );
}
