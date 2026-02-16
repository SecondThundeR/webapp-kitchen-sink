import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { withWebAppVersion } from "@/hocs/web-app-version";
import { booleanToYesNoString } from "@/utils/format";
import { useAccelerometer } from "./hooks";

const AccelerometerComponent = () => {
  const {
    data: { isStarted, x, y, z, error },
    handleStart,
    handleStop,
  } = useAccelerometer();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight pb-2">
        Accelerometer Playground
      </h1>
      {error && (
        <Alert variant="destructive" className="max-w-md">
          <AlertCircleIcon />
          <AlertTitle>Accelerometer failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>isStarted</CardTitle>
        </CardHeader>
        <CardContent>{booleanToYesNoString(isStarted)}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Coordinates</CardTitle>
          <CardDescription>Refresh rate: 1000ms</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <p>x: {x}</p>
          <p>y: {y}</p>
          <p>z: {z}</p>
        </CardContent>
      </Card>
      <Button onClick={isStarted ? handleStop : handleStart}>
        {isStarted ? "Stop" : "Start"}
      </Button>
    </div>
  );
};

export const Accelerometer = withWebAppVersion(AccelerometerComponent, {
  version: "8.0",
  enablePlaceholder: true,
});
