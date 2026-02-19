import { useEffect, useEffectEvent, useState } from "react";
import { WebApp } from "@/lib/web-app";
import { Toaster } from "@/components/ui/sonner";

const ADDITIONAL_OFFSET = 8;

export const SonnerProvider = () => {
  const [safeAreaTop, setSafeAreaTop] = useState(0);

  const onSafeAreaChange = useEffectEvent(() => {
    setSafeAreaTop(WebApp.safeAreaInset.top + WebApp.contentSafeAreaInset.top + ADDITIONAL_OFFSET);
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
