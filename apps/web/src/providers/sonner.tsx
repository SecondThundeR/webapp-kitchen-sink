import { useEffect, useEffectEvent, useState } from "react";
import { Toaster } from "sonner";
import { WebApp } from "@/lib/web-app";

export const SonnerProvider = () => {
  const [safeAreaTop, setSafeAreaTop] = useState(0);

  const onSafeAreaChange = useEffectEvent(() => {
    setSafeAreaTop(WebApp.safeAreaInset.top + WebApp.contentSafeAreaInset.top);
  });

  useEffect(() => {
    onSafeAreaChange();

    WebApp.onEvent("safeAreaChanged", onSafeAreaChange);
    WebApp.onEvent("contentSafeAreaChanged", onSafeAreaChange);

    return () => {
      WebApp.offEvent("safeAreaChanged", onSafeAreaChange);
      WebApp.offEvent("contentSafeAreaChanged", onSafeAreaChange);
    };
  }, []);

  return (
    <Toaster
      richColors
      position="top-center"
      mobileOffset={{
        top: safeAreaTop,
      }}
    />
  );
};
