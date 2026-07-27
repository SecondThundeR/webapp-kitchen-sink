import { WebApp } from "@/lib/web-app";

export const useCloudStorage = () => {
  const handleSetItem = (key: string, value: string) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.CloudStorage.setItem(key, value, (error, success) => {
        if (error) return reject(new Error(error));

        resolve(success ?? false);
      });
    });
  };

  const handleGetItem = (key: string) => {
    return new Promise<string | null>((resolve, reject) => {
      WebApp.CloudStorage.getItem(key, (error, value) => {
        if (error) return reject(new Error(error));

        resolve(value ?? null);
      });
    });
  };

  const handleGetItems = (keys: string[]) => {
    return new Promise<Record<string, string> | null>((resolve, reject) => {
      WebApp.CloudStorage.getItems(keys, (error, values) => {
        if (error) return reject(new Error(error));

        resolve(values ?? null);
      });
    });
  };

  const handleRemoveItem = (key: string) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.CloudStorage.removeItem(key, (error, success) => {
        if (error) return reject(new Error(error));

        resolve(success ?? false);
      });
    });
  };

  const handleRemoveItems = (keys: string[]) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.CloudStorage.removeItems(keys, (error, success) => {
        if (error) return reject(new Error(error));

        resolve(success ?? false);
      });
    });
  };

  const handleGetKeys = () => {
    return new Promise<string[] | null>((resolve, reject) => {
      WebApp.CloudStorage.getKeys((error, keys) => {
        if (error) return reject(new Error(error));

        resolve(keys ?? null);
      });
    });
  };

  return {
    handleSetItem,
    handleGetItem,
    handleGetItems,
    handleRemoveItem,
    handleRemoveItems,
    handleGetKeys,
  };
};
