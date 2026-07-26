import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
