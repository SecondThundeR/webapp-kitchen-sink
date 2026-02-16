import { useEffect, useEffectEvent, useState } from "react";
import type { DeviceOrientationFailedCallback } from "telegram-web-app";
import { WebApp } from "@/lib/web-app";

export const useDeviceOrientation = () => {
  const [needAbsolute, setNeedAbsolute] = useState(false);
  const [isStarted, setIsStarted] = useState(
    () => WebApp.DeviceOrientation.isStarted,
  );
  const [error, setError] = useState("");
  const [absolute, setAbsolute] = useState(
    () => WebApp.DeviceOrientation.absolute,
  );
  const [alpha, setAlpha] = useState(() => WebApp.DeviceOrientation.alpha);
  const [beta, setBeta] = useState(() => WebApp.DeviceOrientation.beta);
  const [gamma, setGamma] = useState(() => WebApp.DeviceOrientation.gamma);

  const syncState = useEffectEvent(() => {
    setAbsolute(WebApp.DeviceOrientation.absolute);
    setAlpha(WebApp.DeviceOrientation.alpha);
    setBeta(WebApp.DeviceOrientation.beta);
    setGamma(WebApp.DeviceOrientation.gamma);
  });

  const handleStart = () => {
    setError("");
    WebApp.DeviceOrientation.start({
      refresh_rate: 1000,
      need_absolute: needAbsolute,
    });
  };

  const handleStop = () => {
    setError("");
    WebApp.DeviceOrientation.stop();
  };

  const onDeviceOrientationStarted = useEffectEvent(() => {
    setIsStarted(true);
  });

  const onDeviceOrientationStopped = useEffectEvent(() => {
    setIsStarted(false);
    syncState();
  });

  const onDeviceOrientationFailed: DeviceOrientationFailedCallback =
    useEffectEvent(({ error }) => {
      if (error === "UNSUPPORTED") {
        setError(
          "Device orientation tracking is not supported on this device or platform",
        );
        return;
      }

      setError(`Failed to start device orientation tracking. Error: ${error}`);
    });

  useEffect(() => {
    WebApp.onEvent("deviceOrientationStarted", onDeviceOrientationStarted);
    WebApp.onEvent("deviceOrientationStopped", onDeviceOrientationStopped);
    WebApp.onEvent("deviceOrientationChanged", syncState);
    WebApp.onEvent("deviceOrientationFailed", onDeviceOrientationFailed);

    return () => {
      WebApp.offEvent("deviceOrientationStarted", onDeviceOrientationStarted);
      WebApp.offEvent("deviceOrientationStopped", onDeviceOrientationStopped);
      WebApp.offEvent("deviceOrientationChanged", syncState);
      WebApp.offEvent("deviceOrientationFailed", onDeviceOrientationFailed);
    };
  }, []);

  return {
    data: {
      isStarted,
      absolute,
      alpha,
      beta,
      gamma,
      error,
    },
    needAbsolute,
    setNeedAbsolute,
    handleStart,
    handleStop,
  };
};
