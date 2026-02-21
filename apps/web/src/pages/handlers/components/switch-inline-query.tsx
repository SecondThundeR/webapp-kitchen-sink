import { useState } from "react";
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
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { WebApp } from "@/lib/web-app";

export const SwitchInlineQuery = () => {
  const [queryData, setQueryData] = useState("");
  const [chooseChatTypes, setChooseChatTypes] = useState<
    Record<string, boolean>
  >({
    users: false,
    bots: false,
    groups: false,
    channels: false,
  });

  const onChooseChatTypeChange = (name: string) => (checked: boolean) => {
    setChooseChatTypes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const onExecute = () => {
    if (!queryData) return;

    const chooseChatTypesEnabledKeys = Object.entries(chooseChatTypes)
      .filter(([_, value]) => value)
      .map(([key]) => key) as ("users" | "bots" | "groups" | "channels")[];
    if (chooseChatTypesEnabledKeys.length === 0) {
      WebApp.switchInlineQuery(queryData);
    } else {
      WebApp.switchInlineQuery(queryData, chooseChatTypesEnabledKeys);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>switchInlineQuery</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="query">Query</FieldLabel>
          <Input
            id="query"
            value={queryData}
            onChange={(e) => setQueryData(e.currentTarget.value)}
            placeholder="Enter query text"
          />
        </Field>
        <FieldSet>
          <FieldLegend variant="label">choose_chat_types</FieldLegend>
          <FieldGroup className="gap-2">
            <Field orientation="horizontal">
              <Checkbox
                id="choose-chat-types-users-checkbox"
                name="choose-chat-types-users-checkbox"
                checked={chooseChatTypes.users}
                onCheckedChange={onChooseChatTypeChange("users")}
              />
              <FieldLabel
                htmlFor="choose-chat-types-users-checkbox"
                className="font-normal"
              >
                users
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="choose-chat-types-bots-checkbox"
                name="choose-chat-types-bots-checkbox"
                checked={chooseChatTypes.bots}
                onCheckedChange={onChooseChatTypeChange("bots")}
              />
              <FieldLabel
                htmlFor="choose-chat-types-bots-checkbox"
                className="font-normal"
              >
                bots
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="choose-chat-types-groups-checkbox"
                name="choose-chat-types-groups-checkbox"
                checked={chooseChatTypes.groups}
                onCheckedChange={onChooseChatTypeChange("groups")}
              />
              <FieldLabel
                htmlFor="choose-chat-types-groups-checkbox"
                className="font-normal"
              >
                groups
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="choose-chat-types-channels-checkbox"
                name="choose-chat-types-channels-checkbox"
                checked={chooseChatTypes.channels}
                onCheckedChange={onChooseChatTypeChange("channels")}
              />
              <FieldLabel
                htmlFor="choose-chat-types-channels-checkbox"
                className="font-normal"
              >
                channels
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onExecute} disabled={!queryData}>
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
