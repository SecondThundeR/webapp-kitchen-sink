type StorageCallback<T> = (error: string | null, value?: T | null) => void;

export const fromStorageCallback = <T>(
  invoke: (callback: StorageCallback<T>) => unknown,
  fallback: T,
): Promise<T> =>
  new Promise((resolve, reject) => {
    invoke((error, value) => {
      if (error) return reject(new Error(error));

      resolve(value ?? fallback);
    });
  });

type SuccessCallback = (error: string | null, success?: boolean | null) => void;
type ItemCallback = (error: string | null, item?: string | null) => void;

export interface BaseStorage {
  setItem: (key: string, value: string, callback?: SuccessCallback) => unknown;
  getItem: (key: string, callback?: ItemCallback) => unknown;
  removeItem: (key: string, callback?: SuccessCallback) => unknown;
}

export const createStorageApi = (storage: BaseStorage) => ({
  setItem: (key: string, value: string) =>
    fromStorageCallback<boolean>(
      (callback) => storage.setItem(key, value, callback),
      false,
    ),
  getItem: (key: string) =>
    fromStorageCallback<string | null>(
      (callback) => storage.getItem(key, callback),
      null,
    ),
  removeItem: (key: string) =>
    fromStorageCallback<boolean>(
      (callback) => storage.removeItem(key, callback),
      false,
    ),
});
