import { ExecuteMethodCard } from "@/components/execute-method-card";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { keysSchema } from "../schemas";
import { cloudStorage } from "../storage";

export const RemoveItems = () => {
  const { form, lastInvokedAt } = useExecuteMethod({
    methodName: "removeItems",
    schema: keysSchema,
    defaultValues: { keys: "" },
    onExecute: ({ keys }) => cloudStorage.removeItems(keys),
    resetOnSuccess: true,
  });

  return (
    <ExecuteMethodCard
      methodName="removeItems"
      form={form}
      lastInvokedAt={lastInvokedAt}
    >
      <form.AppField name="keys">
        {(field) => (
          <field.TextField placeholder="Enter keys separated by comma" />
        )}
      </form.AppField>
    </ExecuteMethodCard>
  );
};
