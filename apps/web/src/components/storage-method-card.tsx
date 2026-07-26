import { type ReactNode, useState } from "react";
import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExecuteMethod } from "@/hooks/use-execute-method";

type StorageMethodCardProps<TResult> = {
  methodName: string;
  // Renders whatever the method resolved with, above the fields
  renderResult?: (result: TResult) => ReactNode;
} & (
  | { variant?: "none"; methodHandler: () => Promise<TResult> }
  | { variant: "key"; methodHandler: (key: string) => Promise<TResult> }
  | {
      variant: "key-value";
      methodHandler: (key: string, value: string) => Promise<TResult>;
    }
);

const requiredKey = z.string().min(1, "Key is required");

// All three share a shape so the form type does not depend on the variant
const SCHEMAS = {
  none: z.object({ key: z.string(), value: z.string() }),
  key: z.object({ key: requiredKey, value: z.string() }),
  "key-value": z.object({
    key: requiredKey,
    value: z.string().min(1, "Value is required"),
  }),
};

/**
 * Shared card for the Cloud/Device/Secure storage methods, which only differ in
 * whether they take a key, a key and a value, or nothing at all.
 */
export const StorageMethodCard = <TResult,>(
  props: StorageMethodCardProps<TResult>,
) => {
  const { methodName, renderResult, variant = "none" } = props;
  const [result, setResult] = useState<TResult | null>(null);

  const execute = (key: string, value: string) => {
    if (props.variant === "key-value") return props.methodHandler(key, value);
    if (props.variant === "key") return props.methodHandler(key);
    return props.methodHandler();
  };

  const { form, lastInvokedAt } = useExecuteMethod({
    methodName,
    schema: SCHEMAS[variant],
    defaultValues: { key: "", value: "" },
    onExecute: async ({ key, value }) => setResult(await execute(key, value)),
    resetOnSuccess: true,
  });

  return (
    <ExecuteMethodCard
      methodName={methodName}
      form={form}
      lastInvokedAt={lastInvokedAt}
      result={result !== null && renderResult?.(result)}
    >
      {variant !== "none" && (
        <form.Field name="key">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter key"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      )}
      {variant === "key-value" && (
        <form.Field name="value">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter value"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      )}
    </ExecuteMethodCard>
  );
};
