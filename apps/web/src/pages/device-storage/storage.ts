import { createStorageApi, fromStorageCallback } from "@/lib/storage";
import { WebApp } from "@/lib/web-app";

export const deviceStorage = {
  ...createStorageApi(WebApp.DeviceStorage),
  clear: () =>
    fromStorageCallback<boolean>(
      (callback) => WebApp.DeviceStorage.clear(callback),
      false,
    ),
};
