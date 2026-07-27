import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
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
      <form.AppField name="data">
        {(field) => (
          <field.TextField
            placeholder="Enter data"
            maxLength={MAX_DATA_LENGTH}
          />
        )}
      </form.AppField>
    </ExecuteMethodCard>
  );
};
