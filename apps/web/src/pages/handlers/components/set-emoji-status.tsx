import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { WebApp } from "@/lib/web-app";

const COPILOT_EMOJI_ID = "5372937764411031477";
const isUserPremium = WebApp.initDataUnsafe.user?.is_premium ?? false;

export const SetEmojiStatus = () => {
  const [isTemp, setIsTemp] = useState(false);
  const [duration, setDuration] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>setEmojiStatus</CardTitle>
      </CardHeader>
      <CardContent>
        {isUserPremium ? (
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox
                id="is-temporary-status"
                name="is-temporary-status"
                checked={isTemp}
                onCheckedChange={(checked) => {
                  if (checked === "indeterminate") return;
                  setIsTemp(checked);
                }}
              />
              <FieldContent>
                <FieldLabel htmlFor="is-temporary-status">
                  Set temporary emoji status
                </FieldLabel>
                <FieldDescription>
                  By clicking this checkbox, emoji status will expire after
                  specified amount of seconds
                </FieldDescription>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="duration">Emoji status duration</FieldLabel>
              <FieldDescription>
                Provide number of seconds after which new emoji status will
                expire
              </FieldDescription>
              <Input
                id="duration"
                placeholder="Enter duration"
                type="number"
                value={duration}
                onChange={(e) => {
                  Number.isNaN(e.currentTarget.valueAsNumber)
                    ? setDuration(0)
                    : setDuration(e.currentTarget.valueAsNumber);
                }}
                disabled={!isTemp}
              />
            </Field>
          </FieldGroup>
        ) : (
          <p>Telegram Premium required to use this method</p>
        )}
      </CardContent>
      {isUserPremium ? (
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() =>
              WebApp.setEmojiStatus(
                COPILOT_EMOJI_ID,
                isTemp
                  ? {
                      duration,
                    }
                  : undefined,
                (success) => {
                  if (success) {
                    toast.success("Successfully set new emoji status");
                  } else {
                    toast.error("Failed to set new emoji status");
                  }
                },
              )
            }
          >
            Set Emoji Status
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              WebApp.requestEmojiStatusAccess((success) => {
                if (success) {
                  toast.success("Successfully granted emoji status access");
                } else {
                  toast.error("Failed to grant emoji status access");
                }
              });
            }}
          >
            Request Emoji Status Access
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
};
