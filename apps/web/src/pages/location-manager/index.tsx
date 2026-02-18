import { BanIcon, LocateOffIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { LocationData } from "telegram-web-app";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { withWebAppVersion } from "@/hocs/web-app-version";
import { booleanToYesNoString } from "@/utils/format";
import { useLocation } from "./hooks";

const LocationManagerComponent = () => {
  const {
    isInited,
    isLocationAvailable,
    isAccessGranted,
    isAccessRequested,
    getLocation,
    openSettings,
  } = useLocation();

  const [latestLocationData, setLatestLocationData] =
    useState<LocationData | null>(null);

  if (!isInited) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Spinner className="size-8" />
        <p className="leading-7 mt-3">Initializing LocationManager...</p>
        <p className="text-sm text-muted-foreground mt-1  text-center">
          If initialization not finishing, it can indicate that your client
          doesn't answer on init event
        </p>
      </div>
    );
  }

  if (!isLocationAvailable) {
    return (
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BanIcon />
          </EmptyMedia>
          <EmptyTitle>Location Not Available</EmptyTitle>
          <EmptyDescription>
            This device does not have hardware to get location, or you are
            running on Desktop
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const handleGetLocation = async () => {
    const location = await getLocation();
    setLatestLocationData(location);
  };

  const handleOpenSettings = async () => {
    try {
      await openSettings();
    } catch (e) {
      toast.error(`Failed to open location settings. Error: ${e}`);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Location Manager Playground
      </h1>
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>isInited</CardTitle>
          </CardHeader>
          <CardContent>{booleanToYesNoString(isInited)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>isLocationAvailable</CardTitle>
          </CardHeader>
          <CardContent>
            {String(booleanToYesNoString(isLocationAvailable))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>isAccessGranted</CardTitle>
          </CardHeader>
          <CardContent>{booleanToYesNoString(isAccessGranted)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>isAccessRequested</CardTitle>
          </CardHeader>
          <CardContent>{booleanToYesNoString(isAccessRequested)}</CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Latest location data</CardTitle>
          </CardHeader>
          <CardContent>
            {latestLocationData ? (
              <>
                <p>latitude: {String(latestLocationData.latitude)}</p>
                <p>longitude: {String(latestLocationData.longitude)}</p>
                <p>altitude: {String(latestLocationData.altitude)}</p>
                <p>course: {String(latestLocationData.course)}</p>
                <p>speed: {String(latestLocationData.speed)}</p>
                <p>
                  horizontal_accuracy:{" "}
                  {String(latestLocationData.horizontal_accuracy)}
                </p>
                <p>
                  vertical_accuracy:{" "}
                  {String(latestLocationData.vertical_accuracy)}
                </p>
                <p>
                  course_accuracy: {String(latestLocationData.course_accuracy)}
                </p>
                <p>
                  speed_accuracy: {String(latestLocationData.speed_accuracy)}
                </p>
              </>
            ) : (
              "—"
            )}
          </CardContent>
        </Card>
      </div>
      {isAccessGranted && (
        <Button className="w-full" onClick={handleGetLocation}>
          Get location
        </Button>
      )}
      {!isAccessGranted && isAccessRequested && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BanIcon />
            </EmptyMedia>
            <EmptyTitle>Access was denied</EmptyTitle>
            <EmptyDescription>
              Please open settings to enable location for this bot
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row flex-wrap justify-center gap-2">
            <Button onClick={handleOpenSettings}>Open Settings</Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </EmptyContent>
          <p className="text-sm text-muted-foreground">
            After enabling location via opened settings, refresh this page to
            re-init LocationManager
          </p>
        </Empty>
      )}
      {!isAccessRequested && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <LocateOffIcon />
            </EmptyMedia>
            <EmptyTitle>No access for location usage</EmptyTitle>
            <EmptyDescription>
              Use button below to enable location in this mini app
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={handleGetLocation}>Enable Location</Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};

export const LocationManager = withWebAppVersion(LocationManagerComponent, {
  version: "8.0",
  enablePlaceholder: true,
});
