import { toast } from "sonner";
import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const schema = z.object({
  message: z.string().min(1, "Message is required"),
});

export const ShowAlert = () => {
  const { form } = useExecuteMethod({
    methodName: "showAlert",
    schema,
    defaultValues: { message: "" },
    onExecute: ({ message }) =>
      WebApp.showAlert(message, () => {
        toast.info("Alert modal was closed");
      }),
  });

  return (
    <ExecuteMethodCard methodName="showAlert" form={form}>
      <form.AppField name="message">
        {(field) => <field.TextField placeholder="Enter message" />}
      </form.AppField>
    </ExecuteMethodCard>
  );
};
