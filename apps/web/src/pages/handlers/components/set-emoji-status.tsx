import { useQuery } from "@tanstack/react-query";
import { BugIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CustomEmojiGrid } from "@/components/custom-emoji-grid";
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
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { getTestEmojiSet } from "@/lib/queries";
import { WebApp } from "@/lib/web-app";

const isUserPremium = WebApp.initDataUnsafe.user?.is_premium ?? false;

export const SetEmojiStatus = () => {
  const [isTemp, setIsTemp] = useState(false);
  const [duration, setDuration] = useState(0);
  const [selectedEmojiId, setSelectedEmojiId] = useState("");

  const { data, isPending, error } = useQuery({
    queryKey: ["getTestEmojiSet"],
    queryFn: () => getTestEmojiSet(),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: isUserPremium,
  });

  const getEmojiContent = () => {
    if (isPending)
      return (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Spinner className="size-8" />
          <p className="leading-7 mt-3">Loading custom emojis</p>
        </div>
      );

    if (error) {
      return (
        <Empty className="flex-1">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BugIcon />
            </EmptyMedia>
            <EmptyTitle>Failed to load custom emojis</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    return (
      <CustomEmojiGrid
        emojis={data.emojis}
        currentEmojiId={selectedEmojiId}
        onClick={(id) => setSelectedEmojiId(id)}
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>setEmojiStatus</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {isUserPremium ? (
          <>
            {getEmojiContent()}
            <FieldGroup className="gap-6">
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
                <FieldLabel htmlFor="duration">
                  Emoji status duration
                </FieldLabel>
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
          </>
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
                selectedEmojiId,
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
            disabled={!selectedEmojiId}
          >
            {selectedEmojiId ? "Set Emoji Status" : "Select custom emoji"}
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
