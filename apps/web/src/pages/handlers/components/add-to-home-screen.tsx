import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";

export const AddToHomeScreen = () => {
  const [homeScreenStatus, setHomeScreenStatus] = useState("unknown");
  const [lastStatusCheckTimestamp, setLastStatusCheckTimestamp] = useState(
    Date.now(),
  );

  const syncState = useCallback(() => {
    WebApp.checkHomeScreenStatus((status) => {
      setHomeScreenStatus(status);
      setLastStatusCheckTimestamp(Date.now());
    });
  }, []);

  useEffect(() => {
    const homeScreenAddedCallback = () => {
      toast.success("App has been added to homescreen");
      syncState();
    };

    syncState();

    WebApp.onEvent("homeScreenAdded", homeScreenAddedCallback);

    return () => {
      WebApp.offEvent("homeScreenAdded", homeScreenAddedCallback);
    };
  }, [syncState]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>addToHomeScreen</CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <p>Status: {homeScreenStatus}</p>
          <p>
            Last status check:{" "}
            {new Date(lastStatusCheckTimestamp).toLocaleString()}
          </p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        <Button
          className="w-full"
          onClick={() => WebApp.addToHomeScreen()}
          disabled={homeScreenStatus === "unsupported"}
        >
          Add to home screen
        </Button>
        <Button className="w-full" onClick={syncState}>
          Force status check
        </Button>
      </CardFooter>
    </Card>
  );
};
