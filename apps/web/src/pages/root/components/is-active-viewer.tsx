import { useEffect, useEffectEvent, useState } from "react";
import { LogsViewer } from "@/components/logs-viewer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { withWebAppVersion } from "@/hocs/web-app-version";
import { useLogs } from "@/hooks/use-logs";
import { WebApp } from "@/lib/web-app";
import { booleanToYesNoString } from "@/utils/format";

const IsActiveViewerComponent = () => {
  const [isActive, setIsActive] = useState(() => WebApp.isActive);
  const [logs, addLog] = useLogs();

  const onActivated = useEffectEvent(() => {
    setIsActive(true);
    addLog("Handled activated event");
  });

  const onDeactivated = useEffectEvent(() => {
    setIsActive(false);
    addLog("Handled deactivated event");
  });

  useEffect(() => {
    WebApp.onEvent("activated", onActivated);
    WebApp.onEvent("deactivated", onDeactivated);

    return () => {
      WebApp.offEvent("activated", onActivated);
      WebApp.offEvent("deactivated", onDeactivated);
    };
  }, []);

  return (
    <Card className="grid-cols-2">
      <CardHeader>
        <CardTitle>isActive</CardTitle>
        <CardDescription>{booleanToYesNoString(isActive)}</CardDescription>
      </CardHeader>
      <CardContent>
        <LogsViewer logs={logs} compact />
      </CardContent>
    </Card>
  );
};
export const IsActiveViewer = withWebAppVersion(IsActiveViewerComponent, {
  version: "8.0",
});
