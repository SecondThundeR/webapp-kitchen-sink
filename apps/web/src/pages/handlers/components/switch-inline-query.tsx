import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const CHAT_TYPES = ["users", "bots", "groups", "channels"] as const;

const schema = z.object({
  query: z.string().min(1, "Query is required"),
  chat_types: z.array(z.enum(CHAT_TYPES)),
});

export const SwitchInlineQuery = () => {
  const { form } = useExecuteMethod({
    methodName: "switchInlineQuery",
    schema,
    defaultValues: { query: "", chat_types: [] },
    onExecute: ({ query, chat_types }) =>
      chat_types.length === 0
        ? WebApp.switchInlineQuery(query)
        : WebApp.switchInlineQuery(query, chat_types),
  });

  return (
    <ExecuteMethodCard methodName="switchInlineQuery" form={form}>
      <form.Field name="query">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Query</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="Enter query text"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      <form.Field name="chat_types" mode="array">
        {(field) => (
          <FieldSet>
            <FieldLegend variant="label">choose_chat_types</FieldLegend>
            <FieldGroup className="gap-2" data-slot="checkbox-group">
              {CHAT_TYPES.map((chatType) => (
                <Field key={chatType} orientation="horizontal">
                  <Checkbox
                    id={`${field.name}-${chatType}`}
                    name={`${field.name}-${chatType}`}
                    checked={field.state.value.includes(chatType)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.pushValue(chatType);
                        return;
                      }

                      field.removeValue(field.state.value.indexOf(chatType));
                    }}
                  />
                  <FieldLabel
                    htmlFor={`${field.name}-${chatType}`}
                    className="font-normal"
                  >
                    {chatType}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        )}
      </form.Field>
    </ExecuteMethodCard>
  );
};
