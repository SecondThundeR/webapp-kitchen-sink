import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const MAX_LINK_LENGTH = 4096;

const SUPPORTED_PROTOCOLS = ["http:", "https:"];
const TME_HOSTNAMES = ["t.me", "telegram.me"];

const parseUrl = (link: string) => {
  try {
    return new URL(link);
  } catch {
    return null;
  }
};

const schema = z.object({
  link: z
    .string()
    .min(1, "Link is required")
    .max(MAX_LINK_LENGTH, `Link must be at most ${MAX_LINK_LENGTH} characters`)
    .superRefine((link, ctx) => {
      if (!link) return;

      const url = parseUrl(link);

      if (!url) {
        ctx.addIssue({ code: "custom", message: "Link must be a valid URL" });
        return;
      }

      if (!SUPPORTED_PROTOCOLS.includes(url.protocol)) {
        ctx.addIssue({
          code: "custom",
          message: "Link protocol must be http or https",
        });
      }

      if (!TME_HOSTNAMES.includes(url.hostname.toLowerCase())) {
        ctx.addIssue({
          code: "custom",
          message: "Link host must be t.me or telegram.me",
        });
      }
    }),
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
      <form.AppField name="link">
        {(field) => (
          <field.TextField
            placeholder="Enter link"
            maxLength={MAX_LINK_LENGTH}
          />
        )}
      </form.AppField>
    </ExecuteMethodCard>
  );
};
