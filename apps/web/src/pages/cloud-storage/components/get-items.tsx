import { useState } from "react";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { useCloudStorage } from "../hooks";
import { keysSchema } from "../schemas";

export const GetItems = () => {
  const { handleGetItems } = useCloudStorage();
  const [values, setValues] = useState<Record<string, string> | null>(null);

  const { form, lastInvokedAt } = useExecuteMethod({
    methodName: "getItems",
    schema: keysSchema,
    defaultValues: { keys: "" },
    onExecute: async ({ keys }) => setValues(await handleGetItems(keys)),
    resetOnSuccess: true,
  });

  return (
    <ExecuteMethodCard
      methodName="getItems"
      form={form}
      lastInvokedAt={lastInvokedAt}
      result={
        values && (
          <p>
            Keys/Values:{" "}
            {Object.entries(values)
              .map(([key, value]) => `${key}/${value}`)
              .join(", ")}
          </p>
        )
      }
    >
      <form.Field name="keys">
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
                placeholder="Enter keys separated by comma"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
    </ExecuteMethodCard>
  );
};
