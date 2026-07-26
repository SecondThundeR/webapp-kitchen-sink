import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const MAX_LINK_LENGTH = 4096;

const canSupportTryInstantView = WebApp.isVersionAtLeast("6.4");

const schema = z.object({
  link: z
    .string()
    .min(1, "Link is required")
    .max(MAX_LINK_LENGTH, `Link must be at most ${MAX_LINK_LENGTH} characters`),
  try_instant_view: z.boolean(),
});

export const OpenLink = () => {
  const { form } = useExecuteMethod({
    methodName: "openLink",
    schema,
    defaultValues: { link: "", try_instant_view: false },
    onExecute: ({ link, try_instant_view }) =>
      WebApp.openLink(
        link,
        canSupportTryInstantView ? { try_instant_view } : undefined,
      ),
  });

  return (
    <ExecuteMethodCard methodName="openLink" form={form}>
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
      {canSupportTryInstantView && (
        <form.Field name="try_instant_view">
          {(field) => (
            <Field orientation="horizontal">
              <Checkbox
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(checked)}
              />
              <FieldLabel htmlFor={field.name} className="font-normal">
                Try instant view
              </FieldLabel>
            </Field>
          )}
        </form.Field>
      )}
    </ExecuteMethodCard>
  );
};
