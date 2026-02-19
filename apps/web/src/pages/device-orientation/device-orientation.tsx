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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { withWebAppVersion } from "@/hocs/web-app-version";
import { booleanToYesNoString } from "@/utils/format";
import { useDeviceOrientation } from "./hooks";

const DeviceOrientationComponent = () => {
  const {
    data: { isStarted, absolute, alpha, beta, gamma, error },
    needAbsolute,
    setNeedAbsolute,
    handleStart,
    handleStop,
  } = useDeviceOrientation();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight pb-2">
        Device Orientation Playground
      </h1>
      {error && (
        <Alert variant="destructive" className="max-w-md">
          <AlertCircleIcon />
          <AlertTitle>Device orientation failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>isStarted</CardTitle>
          </CardHeader>
          <CardContent>{booleanToYesNoString(isStarted)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>absolute</CardTitle>
          </CardHeader>
          <CardContent>{booleanToYesNoString(absolute)}</CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coordinates</CardTitle>
          <CardDescription>Refresh rate: 1000ms</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <p>alpha: {alpha}</p>
          <p>beta: {beta}</p>
          <p>gamma: {gamma}</p>
        </CardContent>
      </Card>
      <FieldGroup className="py-2">
        <Field orientation="horizontal">
          <Checkbox
            id="absolute-checkbox"
            name="absolute-checkbox"
            checked={needAbsolute}
            disabled={isStarted}
            onCheckedChange={(checked) => {
              if (checked === "indeterminate") return;
              setNeedAbsolute(checked);
            }}
          />
          <FieldContent>
            <FieldLabel htmlFor="absolute-checkbox">Need absolute</FieldLabel>
            <FieldDescription>
              Use this checkbox to receive absolute orientation data, allowing
              you to determine the device's attitude relative to magnetic north.
              This option is useful if you are implementing features like a
              compass in your app. If relative data is sufficient, keep
              unchecked false
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
      <Button onClick={isStarted ? handleStop : handleStart}>
        {isStarted
          ? "Stop"
          : `Start ${needAbsolute ? "with absolute" : "without absolute"}`}
      </Button>
    </div>
  );
};

export const DeviceOrientation = withWebAppVersion(DeviceOrientationComponent, {
  version: "8.0",
  enablePlaceholder: true,
});
