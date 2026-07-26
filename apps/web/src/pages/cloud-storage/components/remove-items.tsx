import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { useCloudStorage } from "../hooks";
import { keysSchema } from "../schemas";

export const RemoveItems = () => {
  const { handleRemoveItems } = useCloudStorage();

  const { form, lastInvokedAt } = useExecuteMethod({
    methodName: "removeItems",
    schema: keysSchema,
    defaultValues: { keys: "" },
    onExecute: ({ keys }) => handleRemoveItems(keys),
    resetOnSuccess: true,
  });

  return (
    <ExecuteMethodCard
      methodName="removeItems"
      form={form}
      lastInvokedAt={lastInvokedAt}
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
