import { useEffect, useEffectEvent, useState } from "react";
import type { GyroscopeFailedCallback } from "telegram-web-app";
import { WebApp } from "@/lib/web-app";

export const useGyroscope = () => {
  const [isStarted, setIsStarted] = useState(() => WebApp.Gyroscope.isStarted);
  const [error, setError] = useState("");
  const [x, setX] = useState(() => WebApp.Gyroscope.x);
  const [y, setY] = useState(() => WebApp.Gyroscope.y);
  const [z, setZ] = useState(() => WebApp.Gyroscope.z);

  const handleStart = () => {
    setError("");
    WebApp.Gyroscope.start({ refresh_rate: 1000 });
  };

  const handleStop = () => {
    setError("");
    WebApp.Gyroscope.stop();
  };

  const onGyroscopeStarted = useEffectEvent(() => {
    setIsStarted(true);
  });

  const onGyroscopeStopped = useEffectEvent(() => {
    setIsStarted(false);
  });

  const onGyroscopeChanged = useEffectEvent(() => {
    setX(WebApp.Gyroscope.x);
    setY(WebApp.Gyroscope.y);
    setZ(WebApp.Gyroscope.z);
  });

  const onGyroscopeFailed: GyroscopeFailedCallback = useEffectEvent(
    ({ error }) => {
      if (error === "UNSUPPORTED") {
        setError(
          "Gyroscope tracking is not supported on this device or platform",
        );
        return;
      }

      setError(`Failed to start gyroscope tracking. Error: ${error}`);
    },
  );

  useEffect(() => {
    WebApp.onEvent("gyroscopeStarted", onGyroscopeStarted);
    WebApp.onEvent("gyroscopeStopped", onGyroscopeStopped);
    WebApp.onEvent("gyroscopeChanged", onGyroscopeChanged);
    WebApp.onEvent("gyroscopeFailed", onGyroscopeFailed);

    return () => {
      WebApp.offEvent("gyroscopeStarted", onGyroscopeStarted);
      WebApp.offEvent("gyroscopeStopped", onGyroscopeStopped);
      WebApp.offEvent("gyroscopeChanged", onGyroscopeChanged);
      WebApp.offEvent("gyroscopeFailed", onGyroscopeFailed);
    };
  }, []);

  return {
    data: {
      isStarted,
      x,
      y,
      z,
      error,
    },
    handleStart,
    handleStop,
  };
};
