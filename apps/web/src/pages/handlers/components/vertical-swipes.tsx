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

export const VerticalSwipes = () => {
  const [isVerticalSwipesEnabled, setIsVerticalSwipesEnabled] = useState(
    () => WebApp.isVerticalSwipesEnabled,
  );

  const syncState = () => {
    setIsVerticalSwipesEnabled(WebApp.isVerticalSwipesEnabled);
  };

  const handleVerticalSwipesChange = (value: boolean) => () => {
    if (value) {
      WebApp.enableVerticalSwipes();
    } else {
      WebApp.disableVerticalSwipes();
    }
    syncState();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>isVerticalSwipesEnabled</CardTitle>
        <CardDescription>
          {booleanToYesNoString(isVerticalSwipesEnabled)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        <Button className="w-full" onClick={handleVerticalSwipesChange(true)}>
          Enable
        </Button>
        <Button className="w-full" onClick={handleVerticalSwipesChange(false)}>
          Disable
        </Button>
      </CardFooter>
    </Card>
  );
};
