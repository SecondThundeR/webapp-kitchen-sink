import { useEffect } from "react";
import { WebApp } from "@/lib/web-app";

type TelegramManagerEvent =
  | "biometricManagerUpdated"
  | "locationManagerUpdated";

type UseTelegramManagerLifecycleOptions = {
  initialize: () => void;
  updateEvent: TelegramManagerEvent;
};

export function useTelegramManagerLifecycle({
  initialize,
  updateEvent,
}: UseTelegramManagerLifecycleOptions) {
  useEffect(() => {
    WebApp.onEvent("activated", initialize);
    WebApp.onEvent("deactivated", initialize);
    if (updateEvent === "biometricManagerUpdated") {
      WebApp.onEvent("biometricManagerUpdated", initialize);
    } else {
      WebApp.onEvent("locationManagerUpdated", initialize);
    }

    window.addEventListener("focus", initialize);
    document.addEventListener("visibilitychange", initialize);

    initialize();

    return () => {
      if (updateEvent === "biometricManagerUpdated") {
        WebApp.offEvent("biometricManagerUpdated", initialize);
      } else {
        WebApp.offEvent("locationManagerUpdated", initialize);
      }
      WebApp.offEvent("activated", initialize);
      WebApp.offEvent("deactivated", initialize);

      window.removeEventListener("focus", initialize);
      document.removeEventListener("visibilitychange", initialize);
    };
  }, [initialize, updateEvent]);
}
