import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";
import { booleanToYesNoString } from "@/utils/format";

export const ClosingConfirmation = () => {
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
