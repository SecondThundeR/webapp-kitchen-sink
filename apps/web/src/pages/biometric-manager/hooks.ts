import { useCallback, useEffect, useState } from "react";
import { WebApp } from "@/lib/web-app";

export const useBiometricManager = () => {
  const [isInited, setIsInited] = useState(
    () => WebApp.BiometricManager.isInited,
  );
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(
    () => WebApp.BiometricManager.isBiometricAvailable,
  );
  const [isAccessGranted, setIsAccessGranted] = useState(
    () => WebApp.BiometricManager.isAccessGranted,
  );
  const [isAccessRequested, setIsAccessRequested] = useState(
    () => WebApp.BiometricManager.isAccessRequested,
  );
  const [biometricType, setBiometricType] = useState(
    () => WebApp.BiometricManager.biometricType,
  );
  const [isBiometricTokenSaved, setIsBiometricTokenSaved] = useState(
    () => WebApp.BiometricManager.isBiometricTokenSaved,
  );
  const [deviceId, setDeviceId] = useState(
    () => WebApp.BiometricManager.deviceId,
  );

  const syncState = useCallback(() => {
    setIsInited(WebApp.BiometricManager.isInited);
    setIsBiometricAvailable(WebApp.BiometricManager.isBiometricAvailable);
    setIsAccessGranted(WebApp.BiometricManager.isAccessGranted);
    setIsAccessRequested(WebApp.BiometricManager.isAccessRequested);
    setDeviceId(WebApp.BiometricManager.deviceId);
    setBiometricType(WebApp.BiometricManager.biometricType);
    setIsBiometricTokenSaved(WebApp.BiometricManager.isBiometricTokenSaved);
  }, []);

  const initializeBiometricManager = useCallback(() => {
    if (!WebApp.BiometricManager.isInited) {
      WebApp.BiometricManager.init(() => syncState());
    } else {
      syncState();
    }
  }, [syncState]);

  useEffect(() => {
    WebApp.onEvent("activated", initializeBiometricManager);
    WebApp.onEvent("deactivated", initializeBiometricManager);
    WebApp.onEvent("biometricManagerUpdated", initializeBiometricManager);

    window.addEventListener("focus", initializeBiometricManager);
    document.addEventListener("visibilitychange", initializeBiometricManager);

    initializeBiometricManager();

    return () => {
      WebApp.offEvent("biometricManagerUpdated", initializeBiometricManager);
      WebApp.offEvent("activated", initializeBiometricManager);
      WebApp.offEvent("deactivated", initializeBiometricManager);
      window.removeEventListener("focus", initializeBiometricManager);
      document.removeEventListener(
        "visibilitychange",
        initializeBiometricManager,
      );
    };
  }, [initializeBiometricManager]);

  const requestAccess = useCallback(async () => {
    return new Promise<boolean>((resolve) => {
      WebApp.BiometricManager.requestAccess(
        { reason: "Enable secure features" },
        (granted) => {
          syncState();
          resolve(granted);
        },
      );
    });
  }, [syncState]);

  const authenticate = useCallback(
    async (reason: string) => {
      return new Promise<string | null>((resolve, reject) => {
        WebApp.BiometricManager.authenticate({ reason }, (isValid, token) => {
          if (isValid) {
            syncState();
            resolve(token || null);
          } else {
            reject(new Error("Biometric Auth Failed"));
          }
        });
      });
    },
    [syncState],
  );

  const openSettings = useCallback(() => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        WebApp.BiometricManager.openSettings();
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  const updateToken = useCallback(
    (token: string) => {
      return new Promise<boolean>((resolve, reject) => {
        WebApp.BiometricManager.updateBiometricToken(token, (success) => {
          if (success) {
            syncState();
            resolve(true);
          } else {
            reject("Failed to save token");
          }
        });
      });
    },
    [syncState],
  );

  return {
    isInited,
    isBiometricAvailable,
    isAccessGranted,
    isAccessRequested,
    deviceId,
    isBiometricTokenSaved,
    biometricType,
    requestAccess,
    authenticate,
    openSettings,
    updateToken,
  };
};
