import { toast } from "sonner";
import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
      <form.Field name="message">
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
                placeholder="Enter message"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
    </ExecuteMethodCard>
  );
};
