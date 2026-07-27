import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { FieldSeparator } from "@/components/ui/field";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const isUserPremium = WebApp.initDataUnsafe.user?.is_premium ?? false;

const MAX_TEXT_LENGTH = isUserPremium ? 2048 : 200;
const MAX_WIDGET_NAME_LENGTH = 48;

const schema = z.object({
  media_url: z.string().min(1, "Media URL is required"),
  text: z
    .string()
    .max(MAX_TEXT_LENGTH, `Text must be at most ${MAX_TEXT_LENGTH} characters`),
  widget_name: z
    .string()
    .max(
      MAX_WIDGET_NAME_LENGTH,
      `Widget name must be at most ${MAX_WIDGET_NAME_LENGTH} characters`,
    ),
  widget_url: z.string(),
});

export const ShareToStory = () => {
  const { form } = useExecuteMethod({
    methodName: "shareToStory",
    schema,
    defaultValues: {
      media_url: "",
      text: "",
      widget_name: "",
      widget_url: "",
    },
    onExecute: ({ media_url, text, widget_name, widget_url }) =>
      WebApp.shareToStory(media_url, {
        text: text || undefined,
        widget_link:
          isUserPremium && widget_url
            ? { name: widget_name, url: widget_url }
            : undefined,
      }),
  });

  return (
    <ExecuteMethodCard methodName="shareToStory" form={form}>
      <form.AppField name="media_url">
        {(field) => <field.TextField placeholder="Enter media URL" />}
      </form.AppField>
      <FieldSeparator />
      <form.AppField name="text">
        {(field) =>
          // Only premium accounts get enough characters for the box to be worth
          // a textarea
          isUserPremium ? (
            <field.TextareaField
              placeholder="Enter story text"
              maxLength={MAX_TEXT_LENGTH}
            />
          ) : (
            <field.TextField
              placeholder="Enter story text"
              maxLength={MAX_TEXT_LENGTH}
            />
          )
        }
      </form.AppField>
      {isUserPremium && (
        <>
          <form.AppField name="widget_name">
            {(field) => (
              <field.TextField
                placeholder="Enter widget name"
                maxLength={MAX_WIDGET_NAME_LENGTH}
              />
            )}
          </form.AppField>
          <form.AppField name="widget_url">
            {(field) => <field.TextField placeholder="Enter widget url" />}
          </form.AppField>
        </>
      )}
    </ExecuteMethodCard>
  );
};
