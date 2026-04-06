import { useCallback, useState } from "react";
import type { LocationData } from "telegram-web-app";
import { useTelegramManagerLifecycle } from "@/hooks/use-telegram-manager-lifecycle";
import { WebApp } from "@/lib/web-app";

export const useLocation = () => {
  const [isInited, setIsInited] = useState(
    () => WebApp.LocationManager.isInited,
  );
  const [isLocationAvailable, setIsLocationAvailable] = useState(
    () => WebApp.LocationManager.isLocationAvailable,
  );
  const [isAccessRequested, setIsAccessRequested] = useState(
    () => WebApp.LocationManager.isAccessRequested,
  );
  const [isAccessGranted, setIsAccessGranted] = useState(
    () => WebApp.LocationManager.isAccessGranted,
  );

  const syncState = useCallback(() => {
    setIsInited(WebApp.LocationManager.isInited);
    setIsLocationAvailable(WebApp.LocationManager.isLocationAvailable);
    setIsAccessGranted(WebApp.LocationManager.isAccessGranted);
    setIsAccessRequested(WebApp.LocationManager.isAccessRequested);
  }, []);

  const initializeLocationManager = useCallback(() => {
    if (!WebApp.LocationManager.isInited) {
      WebApp.LocationManager.init(() => syncState());
    } else {
      syncState();
    }
  }, [syncState]);

  useTelegramManagerLifecycle({
    initialize: initializeLocationManager,
    updateEvent: "locationManagerUpdated",
  });

  const getLocation = useCallback(async () => {
    return new Promise<LocationData | null>((resolve) => {
      WebApp.LocationManager.getLocation((data) => {
        syncState();
        resolve(data);
      });
    });
  }, [syncState]);

  const openSettings = useCallback(() => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        WebApp.LocationManager.openSettings();
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  return {
    isInited,
    isLocationAvailable,
    isAccessGranted,
    isAccessRequested,
    getLocation,
    openSettings,
  };
};
