"use client";

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

const signUpSchema = insertSchema
  //we will set the name value when submit
  .omit({
    name: true,
  })
  .extend({
    action: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      action: "signup",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const result = await signIn("credentials", {
        ...values,
        name: `${values.firstName} ${values.lastName}`,
        redirect: true,
        redirectTo: "/",
      });

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.ok) {
        toast.success("Signed up successfully!");
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="first-name">First name</FormLabel>
                  <FormControl>
                    <Input id="first-name" placeholder="Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="last-name">Last name</FormLabel>
                  <FormControl>
                    <Input id="last-name" placeholder="Robinson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
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
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create an account"}
          </Button>
        </form>
      </Form>
      <DiscordLoginButton buttonText="Sign Up with Discord" />
    </div>
  );
}
