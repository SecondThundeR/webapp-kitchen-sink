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

export const OrientationLocked = () => {
  const [isOrientationLocked, setIsOrientationLocked] = useState(
    () => WebApp.isOrientationLocked,
  );

  const syncState = () => {
    setIsOrientationLocked(WebApp.isOrientationLocked);
  };

  const handleOrientationLockChange = (value: boolean) => () => {
    if (value) {
      WebApp.lockOrientation();
    } else {
      WebApp.unlockOrientation();
    }
    syncState();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>isOrientationLocked</CardTitle>
        <CardDescription>
          {booleanToYesNoString(isOrientationLocked)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        <Button className="w-full" onClick={handleOrientationLockChange(true)}>
          Lock
        </Button>
        <Button className="w-full" onClick={handleOrientationLockChange(false)}>
          Unlock
        </Button>
      </CardFooter>
    </Card>
  );
};
