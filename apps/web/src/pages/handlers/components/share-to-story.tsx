import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Field, FieldError, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
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
      <form.Field name="media_url">
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
                placeholder="Enter media URL"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      <FieldSeparator />
      <form.Field name="text">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              {isUserPremium ? (
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Enter story text"
                    rows={6}
                    maxLength={MAX_TEXT_LENGTH}
                    className="min-h-24 resize-none"
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value.length}/{MAX_TEXT_LENGTH} characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter story text"
                  maxLength={MAX_TEXT_LENGTH}
                />
              )}
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      {isUserPremium && (
        <>
          <form.Field name="widget_name">
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
                    placeholder="Enter widget name"
                    maxLength={MAX_WIDGET_NAME_LENGTH}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="widget_url">
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
                    placeholder="Enter widget url"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </>
      )}
    </ExecuteMethodCard>
  );
};
