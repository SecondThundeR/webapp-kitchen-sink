import { useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { useAppForm } from "@/lib/form";

interface UseExecuteMethodOptions<TSchema extends z.ZodType> {
  // Name of the Telegram Web App method, used to label errors
  methodName: string;
  schema: TSchema;
  defaultValues: z.input<TSchema>;
  onExecute: (values: z.output<TSchema>) => unknown | Promise<unknown>;
  resetOnSuccess?: boolean;
}

/**
 * Backs the "fill in a few fields, call a Telegram Web App method" cards: the
 * form itself, when it was last invoked and what to do when the method throws.
 */
export const useExecuteMethod = <TSchema extends z.ZodType>({
  methodName,
  schema,
  defaultValues,
  onExecute,
  resetOnSuccess = false,
}: UseExecuteMethodOptions<TSchema>) => {
  const [lastInvokedAt, setLastInvokedAt] = useState<Date | null>(null);

  const form = useAppForm({
    defaultValues,
    validators: {
      // TanStack cannot tell an unresolved generic apart from an async
      // validator, which it rejects at the type level
      onBlur: schema as z.ZodType<unknown, z.input<TSchema>>,
      onSubmit: schema as z.ZodType<unknown, z.input<TSchema>>,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        // Standard Schema validation leaves the values untouched, so parsing
        // here is what applies the schema's transforms
        await onExecute(schema.parse(value));
        setLastInvokedAt(new Date());

        if (resetOnSuccess) formApi.reset();
      } catch (e) {
        toast.error(`[${methodName}]: ${e}`);
      }
    },
  });

  return { form, lastInvokedAt };
};
