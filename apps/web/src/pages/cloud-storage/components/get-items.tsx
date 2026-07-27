import { useState } from "react";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { keysSchema } from "../schemas";
import { cloudStorage } from "../storage";

export const GetItems = () => {
  const [values, setValues] = useState<Record<string, string> | null>(null);

  const { form, lastInvokedAt } = useExecuteMethod({
    methodName: "getItems",
    schema: keysSchema,
    defaultValues: { keys: "" },
    onExecute: async ({ keys }) => setValues(await cloudStorage.getItems(keys)),
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
      <form.AppField name="keys">
        {(field) => (
          <field.TextField placeholder="Enter keys separated by comma" />
        )}
      </form.AppField>
    </ExecuteMethodCard>
  );
};
