import { useEffect, useEffectEvent, useState } from "react";
import type { AccelerometerFailedCallback } from "telegram-web-app";
import { WebApp } from "@/lib/web-app";

export const useAccelerometer = () => {
  const [isStarted, setIsStarted] = useState(
    () => WebApp.Accelerometer.isStarted,
  );
  const [error, setError] = useState("");
  const [x, setX] = useState(() => WebApp.Accelerometer.x);
  const [y, setY] = useState(() => WebApp.Accelerometer.y);
  const [z, setZ] = useState(() => WebApp.Accelerometer.z);

  const handleStart = () => {
    setError("");
    WebApp.Accelerometer.start({ refresh_rate: 1000 });
  };

  const handleStop = () => {
    setError("");
    WebApp.Accelerometer.stop();
  };

  const onAccelerometerStarted = useEffectEvent(() => {
    setIsStarted(true);
  });

  const onAccelerometerStopped = useEffectEvent(() => {
    setIsStarted(false);
  });

  const onAccelerometerChanged = useEffectEvent(() => {
    setX(WebApp.Accelerometer.x);
    setY(WebApp.Accelerometer.y);
    setZ(WebApp.Accelerometer.z);
  });

  const onAccelerometerFailed: AccelerometerFailedCallback = useEffectEvent(
    ({ error }) => {
      if (error === "UNSUPPORTED") {
        setError(
          "Accelerometer tracking is not supported on this device or platform",
        );
        return;
      }

      setError(`Failed to start accelerometer tracking. Error: ${error}`);
    },
  );

  useEffect(() => {
    WebApp.onEvent("accelerometerStarted", onAccelerometerStarted);
    WebApp.onEvent("accelerometerStopped", onAccelerometerStopped);
    WebApp.onEvent("accelerometerChanged", onAccelerometerChanged);
    WebApp.onEvent("accelerometerFailed", onAccelerometerFailed);

    return () => {
      WebApp.offEvent("accelerometerStarted", onAccelerometerStarted);
      WebApp.offEvent("accelerometerStopped", onAccelerometerStopped);
      WebApp.offEvent("accelerometerChanged", onAccelerometerChanged);
      WebApp.offEvent("accelerometerFailed", onAccelerometerFailed);
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
