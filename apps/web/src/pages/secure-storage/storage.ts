import { createStorageApi, fromStorageCallback } from "@/lib/storage";
import { WebApp } from "@/lib/web-app";

export const secureStorage = {
  ...createStorageApi(WebApp.SecureStorage),
  // Recovers a key the device still holds but the app can no longer read
  restoreItem: (key: string) =>
    fromStorageCallback<string | null>(
      (callback) => WebApp.SecureStorage.restoreItem(key, callback),
      null,
    ),
  clear: () =>
    fromStorageCallback<boolean>(
      (callback) => WebApp.SecureStorage.clear(callback),
      false,
    ),
};
