import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { WebApp } from "@/lib/web-app";

const isUserPremium = WebApp.initDataUnsafe.user?.is_premium ?? false;

export const ShareToStory = () => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [storyText, setStoryText] = useState("");
  const [widgetName, setWidgetName] = useState("");
  const [widgetUrl, setWidgetUrl] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>shareToStory</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <Input
            id="query"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.currentTarget.value)}
            placeholder="Enter media URL"
          />
        </Field>
        <FieldSeparator />
        <Field>
          {isUserPremium ? (
            <InputGroup>
              <InputGroupTextarea
                id="text"
                placeholder="Enter story text"
                value={storyText}
                onChange={(e) => setStoryText(e.currentTarget.value)}
                rows={6}
                maxLength={2048}
                className="min-h-24 resize-none"
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">
                  {storyText.length}/2048 characters
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          ) : (
            <Input
              id="text"
              value={storyText}
              onChange={(e) => setStoryText(e.currentTarget.value)}
              placeholder="Enter story text"
              maxLength={200}
            />
          )}
        </Field>
        {isUserPremium && (
          <>
            <Field>
              <Input
                id="widget-name"
                value={widgetName}
                onChange={(e) => setWidgetName(e.currentTarget.value)}
                placeholder="Enter widget name"
                maxLength={48}
              />
            </Field>
            <Field>
              <Input
                id="widget-url"
                value={widgetUrl}
                onChange={(e) => setWidgetUrl(e.currentTarget.value)}
                placeholder="Enter widget url"
              />
            </Field>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() =>
            WebApp.shareToStory(mediaUrl, {
              text: storyText || undefined,
              widget_link:
                isUserPremium && widgetUrl
                  ? {
                      name: widgetName,
                      url: widgetUrl,
                    }
                  : undefined,
            })
          }
          disabled={!mediaUrl}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
