import { useCallback, useEffect, useState } from "react";
import { WebApp } from "@/lib/web-app";

export const useBiometricManager = () => {
  const [isInited, setIsInited] = useState(WebApp.BiometricManager.isInited);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(
    WebApp.BiometricManager.isBiometricAvailable,
  );
  const [isAccessGranted, setIsAccessGranted] = useState(
    WebApp.BiometricManager.isAccessGranted,
  );
  const [isAccessRequested, setIsAccessRequested] = useState(
    WebApp.BiometricManager.isAccessRequested,
  );
  const [biometricType, setBiometricType] = useState(
    WebApp.BiometricManager.biometricType,
  );
  const [isBiometricTokenSaved, setIsBiometricTokenSaved] = useState(
    WebApp.BiometricManager.isBiometricTokenSaved,
  );
  const [deviceId, setDeviceId] = useState(WebApp.BiometricManager.deviceId);

  const syncState = useCallback(() => {
    setIsInited(WebApp.BiometricManager.isInited);
    setIsBiometricAvailable(WebApp.BiometricManager.isBiometricAvailable);
    setIsAccessGranted(WebApp.BiometricManager.isAccessGranted);
    setIsAccessRequested(WebApp.BiometricManager.isAccessRequested);
    setDeviceId(WebApp.BiometricManager.deviceId);
    setBiometricType(WebApp.BiometricManager.biometricType);
    setIsBiometricTokenSaved(WebApp.BiometricManager.isBiometricTokenSaved);
  }, []);

  useEffect(() => {
    if (!WebApp.BiometricManager.isInited) {
      WebApp.BiometricManager.init(() => syncState());
    } else {
      syncState();
    }

    WebApp.onEvent("biometricManagerUpdated", syncState);
    return () => WebApp.offEvent("biometricManagerUpdated", syncState);
  }, [syncState]);

  const requestAccess = useCallback(async () => {
    return new Promise<boolean>((resolve) => {
      WebApp.BiometricManager.requestAccess(
        { reason: "Enable secure features" },
        (granted) => {
          resolve(granted);
        },
      );
    });
  }, []);

  const authenticate = useCallback(async (reason: string) => {
    return new Promise<string | null>((resolve, reject) => {
      WebApp.BiometricManager.authenticate({ reason }, (isValid, token) => {
        if (isValid) {
          resolve(token || null);
        } else {
          reject(new Error("Biometric Auth Failed"));
        }
      });
    });
  }, []);

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

  const updateToken = useCallback((token: string) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.BiometricManager.updateBiometricToken(token, (success) => {
        if (success) {
          resolve(true);
        } else {
          reject("Failed to save token");
        }
      });
    });
  }, []);

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
