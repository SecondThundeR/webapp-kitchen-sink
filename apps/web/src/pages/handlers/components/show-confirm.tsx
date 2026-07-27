import { toast } from "sonner";
import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const schema = z.object({
  message: z.string().min(1, "Message is required"),
});

export const ShowConfirm = () => {
  const { form } = useExecuteMethod({
    methodName: "showConfirm",
    schema,
    defaultValues: { message: "" },
    onExecute: ({ message }) =>
      WebApp.showConfirm(message, (success) => {
        if (success) {
          toast.success('Confirm modal was clicked "OK"');
        } else {
          toast.error('Confirm modal was clicked "Cancel"');
        }
      }),
  });

  return (
    <ExecuteMethodCard methodName="showConfirm" form={form}>
      <form.AppField name="message">
        {(field) => <field.TextField placeholder="Enter message" />}
      </form.AppField>
    </ExecuteMethodCard>
  );
};
