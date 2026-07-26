import { toast } from "sonner";
import { z } from "zod";
import { CustomEmojiPicker } from "@/components/custom-emoji-picker/custom-emoji-picker";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const isUserPremium = WebApp.initDataUnsafe.user?.is_premium ?? false;

const schema = z.object({
  emoji_id: z.string().min(1, "Select a custom emoji"),
  is_temp: z.boolean(),
  duration: z.number(),
});

const requestEmojiStatusAccess = () => {
  WebApp.requestEmojiStatusAccess((success) => {
    if (success) {
      toast.success("Successfully granted emoji status access");
    } else {
      toast.error("Failed to grant emoji status access");
    }
  });
};

export const SetEmojiStatus = () => {
  const { form } = useExecuteMethod({
    methodName: "setEmojiStatus",
    schema,
    defaultValues: { emoji_id: "", is_temp: false, duration: 0 },
    onExecute: ({ emoji_id, is_temp, duration }) =>
      WebApp.setEmojiStatus(
        emoji_id,
        is_temp ? { duration } : undefined,
        (success) => {
          if (success) {
            toast.success("Successfully set new emoji status");
          } else {
            toast.error("Failed to set new emoji status");
          }
        },
      ),
  });

  if (!isUserPremium) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>setEmojiStatus</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Telegram Premium is required for this method</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ExecuteMethodCard
      methodName="setEmojiStatus"
      form={form}
      submitLabel={{ idle: "Set Emoji Status", pending: "Setting" }}
      footer={
        <Button
          type="button"
          className="w-full"
          onClick={requestEmojiStatusAccess}
        >
          Request Emoji Status Access
        </Button>
      }
    >
      <form.Field name="emoji_id">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <CustomEmojiPicker
                value={field.state.value}
                onChange={field.handleChange}
                paginationConfig={{ itemsPerPage: 30 }}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      <form.Field
        name="is_temp"
        listeners={{
          // A permanent status has no duration to speak of
          onChange: ({ value }) => {
            if (!value) form.setFieldValue("duration", 0);
          },
        }}
      >
        {(field) => (
          <Field orientation="horizontal">
            <Checkbox
              id={field.name}
              name={field.name}
              checked={field.state.value}
              onCheckedChange={(checked) => field.handleChange(checked)}
            />
            <FieldContent>
              <FieldLabel htmlFor={field.name}>
                Set temporary emoji status
              </FieldLabel>
              <FieldDescription>
                By clicking this checkbox, emoji status will expire after
                specified amount of seconds
              </FieldDescription>
            </FieldContent>
          </Field>
        )}
      </form.Field>
      <form.Field
        name="duration"
        validators={{
          onChangeListenTo: ["is_temp"],
          onChange: ({ value, fieldApi }) =>
            fieldApi.form.getFieldValue("is_temp") && value <= 0
              ? { message: "Duration is required for a temporary status" }
              : undefined,
        }}
      >
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <form.Subscribe selector={(state) => state.values.is_temp}>
              {(isTemp) => (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Emoji status duration
                  </FieldLabel>
                  <FieldDescription>
                    Provide number of seconds after which new emoji status will
                    expire
                  </FieldDescription>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const value = e.target.valueAsNumber;
                      field.handleChange(Number.isNaN(value) ? 0 : value);
                    }}
                    aria-invalid={isInvalid}
                    placeholder="Enter duration"
                    disabled={!isTemp}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )}
            </form.Subscribe>
          );
        }}
      </form.Field>
    </ExecuteMethodCard>
  );
};
