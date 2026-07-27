import { WebApp } from "@/lib/web-app";

export const useDeviceStorage = () => {
  const handleSetItem = (key: string, value: string) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.DeviceStorage.setItem(key, value, (error, success) => {
        if (error) return reject(new Error(error));

        resolve(success ?? false);
      });
    });
  };

  const handleGetItem = (key: string) => {
    return new Promise<string | null>((resolve, reject) => {
      WebApp.DeviceStorage.getItem(key, (error, value) => {
        if (error) return reject(new Error(error));

        resolve(value ?? null);
      });
    });
  };

  const handleRemoveItem = (key: string) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.DeviceStorage.removeItem(key, (error, success) => {
        if (error) return reject(new Error(error));

        resolve(success ?? false);
      });
    });
  };

  const handleClear = () => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.DeviceStorage.clear((error, success) => {
        if (error) return reject(new Error(error));

        resolve(success ?? false);
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
