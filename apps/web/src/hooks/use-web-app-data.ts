import { useSyncExternalStore } from "react";
import { WebApp } from "@/lib/web-app";

const WebAppEvents = [
  "accelerometerChanged",
  "accelerometerFailed",
  "accelerometerStarted",
  "accelerometerStopped",
  "activated",
  "backButtonClicked",
  "clipboardTextReceived",
  "contactRequested",
  "contentSafeAreaChanged",
  "deactivated",
  "deviceOrientationChanged",
  "deviceOrientationFailed",
  "deviceOrientationStarted",
  "deviceOrientationStopped",
  "emojiStatusAccessRequested",
  "emojiStatusFailed",
  "emojiStatusSet",
  "fileDownloadRequested",
  "fullscreenChanged",
  "fullscreenFailed",
  "gyroscopeChanged",
  "gyroscopeFailed",
  "gyroscopeStarted",
  "gyroscopeStopped",
  "homeScreenAdded",
  "homeScreenChecked",
  "invoiceClosed",
  "locationManagerUpdated",
  "locationRequested",
  "mainButtonClicked",
  "popupClosed",
  "qrTextReceived",
  "safeAreaChanged",
  "scanQrPopupClosed",
  "secondaryButtonClicked",
  "settingsButtonClicked",
  "shareMessageFailed",
  "shareMessageSent",
  "themeChanged",
  "viewportChanged",
  "writeAccessRequested",
] as const;

const getSnapshot = () => JSON.stringify(WebApp);

const subscribe = (callback: Parameters<(typeof WebApp)["onEvent"]>[1]) => {
  WebAppEvents.forEach((event) => {
    WebApp.onEvent(event, callback);
  });

  return () => {
    WebAppEvents.forEach((event) => {
      WebApp.offEvent(event, callback);
    });
  };
};

export const useWebAppData = () => useSyncExternalStore(subscribe, getSnapshot);
