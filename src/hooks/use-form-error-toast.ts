// hooks/useFormErrorToast.ts

import { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function useFormErrorToast<T extends FieldValues>(
  form: UseFormReturn<T>,
) {
  useEffect(() => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors)
        .map((error) => error?.message || "")
        .filter((message): message is string => message !== undefined);

      if (errorMessages.length > 0) {
        toast.error(errorMessages.join(". "));
      }
    }
  }, [form.formState.errors]);
}
