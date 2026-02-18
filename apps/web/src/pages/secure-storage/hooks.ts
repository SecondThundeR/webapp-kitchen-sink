import { WebApp } from "@/lib/web-app";

export const useSecureStorage = () => {
  const handleSetItem = (key: string, value: string) => {
    return new Promise<true | null>((resolve, reject) => {
      WebApp.SecureStorage.setItem(key, value, (error, success) => {
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
      WebApp.SecureStorage.getItem(key, (error, value) => {
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

  const handleRestoreItem = (key: string) => {
    return new Promise<string | null>((resolve, reject) => {
      WebApp.SecureStorage.restoreItem(key, (error, item) => {
        if (error) {
          reject(error);
        }

        if (item) {
          resolve(item);
        }

        resolve(null);
      });
    });
  };

  const handleRemoveItem = (key: string) => {
    return new Promise<true | null>((resolve, reject) => {
      WebApp.SecureStorage.removeItem(key, (error, success) => {
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
      WebApp.SecureStorage.clear((error, success) => {
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
    handleRestoreItem,
    handleRemoveItem,
    handleClear,
  };
};
