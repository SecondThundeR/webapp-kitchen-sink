import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const MAX_LINK_LENGTH = 4096;

const schema = z.object({
  link: z
    .string()
    .min(1, "Link is required")
    .max(MAX_LINK_LENGTH, `Link must be at most ${MAX_LINK_LENGTH} characters`),
});

export const OpenTelegramLink = () => {
  const { form } = useExecuteMethod({
    methodName: "openTelegramLink",
    schema,
    defaultValues: { link: "" },
    onExecute: ({ link }) => WebApp.openTelegramLink(link),
  });

  return (
    <ExecuteMethodCard methodName="openTelegramLink" form={form}>
      <form.Field name="link">
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
                placeholder="Enter link"
                maxLength={MAX_LINK_LENGTH}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
    </ExecuteMethodCard>
  );
};
