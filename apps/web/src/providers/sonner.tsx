import { useEffect, useEffectEvent, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { WebApp } from "@/lib/web-app";

const ADDITIONAL_OFFSET = 8;

export const SonnerProvider = () => {
  const [safeAreaTop, setSafeAreaTop] = useState(0);
  // Telegram's theme is independent of the OS one, so leaving Sonner on its
  // "system" default would light-mode the toasts inside a dark mini app
  const colorScheme = useColorScheme();

  const onSafeAreaChange = useEffectEvent(() => {
    setSafeAreaTop(
      WebApp.safeAreaInset.top +
        WebApp.contentSafeAreaInset.top +
        ADDITIONAL_OFFSET,
    );
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
      theme={colorScheme}
      position="top-center"
      mobileOffset={{
        top: safeAreaTop,
      }}
    />
  );
};
