import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";
import { useState } from "react";

export const ReadTextFromClipboard = () => {
  const [lastInvokeAt, setLastInvokeAt] = useState<Date | null>(null);
  const [clipboardText, setClipboardText] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>readTextFromClipboard</CardTitle>
        <CardDescription>
          <p className="italic">
            Note: this method can be called only for Mini Apps launched from the
            attachment menu and only in response to a user interaction with the
            Mini App interface (e.g. a click inside the Mini App or on the main
            button)
          </p>
          <br />
          {lastInvokeAt && (
            <p>Last invoked at: {lastInvokeAt.toLocaleString()}</p>
          )}
        </CardDescription>
      </CardHeader>
      {clipboardText && (
        <CardDescription>
          Clipboard text: {String(clipboardText)}
        </CardDescription>
      )}
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            WebApp.readTextFromClipboard((data) => {
              setClipboardText(data);
              setLastInvokeAt(new Date());
            });
          }}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
