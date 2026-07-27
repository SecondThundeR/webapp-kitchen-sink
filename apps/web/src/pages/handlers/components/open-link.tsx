import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
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
      <form.AppField name="link">
        {(field) => (
          <field.TextField
            placeholder="Enter link"
            maxLength={MAX_LINK_LENGTH}
          />
        )}
      </form.AppField>
      {canSupportTryInstantView && (
        <form.AppField name="try_instant_view">
          {(field) => <field.CheckboxField label="Try instant view" />}
        </form.AppField>
      )}
    </ExecuteMethodCard>
  );
};
