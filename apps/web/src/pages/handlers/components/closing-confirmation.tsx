import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { withWebAppVersion } from "@/hocs/web-app-version";
import { WebApp } from "@/lib/web-app";
import { booleanToYesNoString } from "@/utils/format";

const ClosingConfirmationComponent = () => {
  const [isClosingConfirmationEnabled, setIsClosingConfirmationEnabled] =
    useState(() => WebApp.isClosingConfirmationEnabled);

  const syncState = () => {
    setIsClosingConfirmationEnabled(WebApp.isClosingConfirmationEnabled);
  };

  const handleConfirmationChange = (value: boolean) => () => {
    if (value) {
      WebApp.enableClosingConfirmation();
    } else {
      WebApp.disableClosingConfirmation();
    }
    syncState();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>isClosingConfirmationEnabled</CardTitle>
        <CardDescription>
          {booleanToYesNoString(isClosingConfirmationEnabled)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        <Button className="w-full" onClick={handleConfirmationChange(true)}>
          Enable
        </Button>
        <Button className="w-full" onClick={handleConfirmationChange(false)}>
          Disable
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ClosingConfirmation = withWebAppVersion(
  ClosingConfirmationComponent,
  { version: "6.1" },
);
