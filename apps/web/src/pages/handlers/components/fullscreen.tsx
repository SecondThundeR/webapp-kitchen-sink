import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { FullscreenFailedCallback } from "telegram-web-app";
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

export const Fullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(() => WebApp.isFullscreen);

  useEffect(() => {
    const syncState = () => {
      setIsFullscreen(WebApp.isFullscreen);
    };

    const fullscreenFailedToast: FullscreenFailedCallback = ({ error }) => {
      toast.error(error);
    };

    syncState();

    WebApp.onEvent("fullscreenChanged", syncState);
    WebApp.onEvent("fullscreenFailed", fullscreenFailedToast);

    return () => {
      WebApp.offEvent("fullscreenChanged", syncState);
      WebApp.offEvent("fullscreenFailed", fullscreenFailedToast);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>isFullscreen</CardTitle>
        <CardDescription>{booleanToYesNoString(isFullscreen)}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        {isFullscreen ? (
          <Button className="w-full" onClick={() => WebApp.exitFullscreen()}>
            Exit fullscreen
          </Button>
        ) : (
          <Button className="w-full" onClick={() => WebApp.requestFullscreen()}>
            Request fullscreen
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
