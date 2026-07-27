import { toast } from "sonner";
import { z } from "zod";
import { CustomEmojiPicker } from "@/components/custom-emoji-picker/custom-emoji-picker";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <form.AppField name="emoji_id">
        {(field) => (
          <field.FieldShell>
            <CustomEmojiPicker
              value={field.state.value}
              onChange={field.handleChange}
              paginationConfig={{ itemsPerPage: 30 }}
            />
          </field.FieldShell>
        )}
      </form.AppField>
      <form.AppField
        name="is_temp"
        listeners={{
          // A permanent status has no duration to speak of
          onChange: ({ value }) => {
            if (!value) form.setFieldValue("duration", 0);
          },
        }}
      >
        {(field) => (
          <field.CheckboxField
            label="Set temporary emoji status"
            description="By clicking this checkbox, emoji status will expire after specified amount of seconds"
          />
        )}
      </form.AppField>
      <form.AppField
        name="duration"
        validators={{
          onChangeListenTo: ["is_temp"],
          onDynamic: ({ value, fieldApi }) =>
            fieldApi.form.getFieldValue("is_temp") && value <= 0
              ? { message: "Duration is required for a temporary status" }
              : undefined,
        }}
      >
        {(field) => (
          <form.Subscribe selector={(state) => state.values.is_temp}>
            {(isTemp) => (
              <field.NumberField
                label="Emoji status duration"
                description="Provide number of seconds after which new emoji status will expire"
                placeholder="Enter duration"
                emptyValue={0}
                disabled={!isTemp}
              />
            )}
          </form.Subscribe>
        )}
      </form.AppField>
    </ExecuteMethodCard>
  );
};
