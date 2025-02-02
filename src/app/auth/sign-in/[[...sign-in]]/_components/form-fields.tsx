"use client";

import { useFormContext } from "react-hook-form";

import type { SignInValues } from "@/validators/auth";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginFormFields: React.FC = () => {
  const { control } = useFormContext<SignInValues>();

  return (
    <div className="grid gap-6">
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="grid gap-2 space-y-0">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              {...field}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem className="grid gap-2 space-y-0">
            <Label htmlFor={field.name}>Password</Label>
            <Input
              {...field}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full"
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export { LoginFormFields };
