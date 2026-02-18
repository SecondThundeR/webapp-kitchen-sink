import { WebApp } from "@/lib/web-app";

export const useCloudStorage = () => {
  const handleSetItem = (key: string, value: string) => {
    return new Promise<true | null>((resolve, reject) => {
      WebApp.CloudStorage.setItem(key, value, (error, success) => {
        if (error) {
          reject(error);
        }

        if (success) {
          resolve(success);
        }

        resolve(null);
      });
    });
  };

  const handleGetItem = (key: string) => {
    return new Promise<string | null>((resolve, reject) => {
      WebApp.CloudStorage.getItem(key, (error, value) => {
        if (error) {
          reject(error);
        }

        if (value) {
          resolve(value);
        }

        resolve(null);
      });
    });
  };

  const handleGetItems = (keys: string[]) => {
    return new Promise<Record<string, string> | null>((resolve, reject) => {
      WebApp.CloudStorage.getItems(keys, (error, values) => {
        if (error) {
          reject(error);
        }

        if (values) {
          resolve(values);
        }

        resolve(null);
      });
    });
  };

  const handleRemoveItem = (key: string) => {
    return new Promise<true | null>((resolve, reject) => {
      WebApp.CloudStorage.removeItem(key, (error, success) => {
        if (error) {
          reject(error);
        }

        if (success) {
          resolve(success);
        }

        resolve(null);
      });
    });
  };

  const handleRemoveItems = (keys: string[]) => {
    return new Promise<true | null>((resolve, reject) => {
      WebApp.CloudStorage.removeItems(keys, (error, success) => {
        if (error) {
          reject(error);
        }

        if (success) {
          resolve(success);
        }

        resolve(null);
      });
    });
  };

  const handleGetKeys = () => {
    return new Promise<string[] | null>((resolve, reject) => {
      WebApp.CloudStorage.getKeys((error, keys) => {
        if (error) {
          reject(error);
        }

        if (keys) {
          resolve(keys);
        }

        resolve(null);
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
