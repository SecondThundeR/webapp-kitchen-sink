import { WebApp } from "@/lib/web-app";

export const useDeviceStorage = () => {
  const handleSetItem = (key: string, value: string) => {
    return new Promise<true | null>((resolve, reject) => {
      WebApp.DeviceStorage.setItem(key, value, (error, success) => {
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
      WebApp.DeviceStorage.getItem(key, (error, value) => {
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

  const handleRemoveItem = (key: string) => {
    return new Promise<true | null>((resolve, reject) => {
      WebApp.DeviceStorage.removeItem(key, (error, success) => {
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

  const handleClear = () => {
    return new Promise<true | null>((resolve, reject) => {
      WebApp.DeviceStorage.clear((error, success) => {
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

  return {
    handleSetItem,
    handleGetItem,
    handleRemoveItem,
    handleClear,
  };
};
