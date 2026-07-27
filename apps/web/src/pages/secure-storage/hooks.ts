import { WebApp } from "@/lib/web-app";

export const useSecureStorage = () => {
  const handleSetItem = (key: string, value: string) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.SecureStorage.setItem(key, value, (error, success) => {
        if (error) return reject(new Error(error));

        resolve(success ?? false);
      });
    });
  };

  const handleGetItem = (key: string) => {
    return new Promise<string | null>((resolve, reject) => {
      WebApp.SecureStorage.getItem(key, (error, value) => {
        if (error) return reject(new Error(error));

        resolve(value ?? null);
      });
    });
  };

  const handleRestoreItem = (key: string) => {
    return new Promise<string | null>((resolve, reject) => {
      WebApp.SecureStorage.restoreItem(key, (error, item) => {
        if (error) return reject(new Error(error));

        resolve(item ?? null);
      });
    });
  };

  const handleRemoveItem = (key: string) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.SecureStorage.removeItem(key, (error, success) => {
        if (error) return reject(new Error(error));

        resolve(success ?? false);
      });
    });
  };

  const handleClear = () => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.SecureStorage.clear((error, success) => {
        if (error) return reject(new Error(error));

        resolve(success ?? false);
      });
    });
  };

  return {
    handleSetItem,
    handleGetItem,
    handleRestoreItem,
    handleRemoveItem,
    handleClear,
  };
};
