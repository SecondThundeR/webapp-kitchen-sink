import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const MAX_DATA_LENGTH = 4096;

const schema = z.object({
  data: z
    .string()
    .min(1, "Data is required")
    .max(MAX_DATA_LENGTH, `Data must be at most ${MAX_DATA_LENGTH} characters`),
});

export const SendData = () => {
  const { form } = useExecuteMethod({
    methodName: "sendData",
    schema,
    defaultValues: { data: "" },
    onExecute: ({ data }) => WebApp.sendData(data),
  });

  return (
    <ExecuteMethodCard methodName="sendData" form={form}>
      <form.Field name="data">
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
                placeholder="Enter data"
                maxLength={MAX_DATA_LENGTH}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
    </ExecuteMethodCard>
  );
};
