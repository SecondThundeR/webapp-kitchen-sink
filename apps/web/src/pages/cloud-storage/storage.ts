import { createStorageApi, fromStorageCallback } from "@/lib/storage";
import { WebApp } from "@/lib/web-app";

export const cloudStorage = {
  ...createStorageApi(WebApp.CloudStorage),
  getItems: (keys: string[]) =>
    fromStorageCallback<Record<string, string> | null>(
      (callback) => WebApp.CloudStorage.getItems(keys, callback),
      null,
    ),
  removeItems: (keys: string[]) =>
    fromStorageCallback<boolean>(
      (callback) => WebApp.CloudStorage.removeItems(keys, callback),
      false,
    ),
  getKeys: () =>
    fromStorageCallback<string[] | null>(
      (callback) => WebApp.CloudStorage.getKeys(callback),
      null,
    ),
};
