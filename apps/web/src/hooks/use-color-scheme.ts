import { useEffect, useEffectEvent, useState } from "react";
import { WebApp } from "@/lib/web-app";

/**
 * Telegram carries its own light/dark setting, independent of the OS one, so
 * anything that needs to match the app has to follow this rather than a media
 * query. See useThemeSync, which applies the same signal to the document.
 */
export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState(() => WebApp.colorScheme);

  const syncColorScheme = useEffectEvent(() => {
    setColorScheme(WebApp.colorScheme);
  });

  useEffect(() => {
    syncColorScheme();

    WebApp.onEvent("themeChanged", syncColorScheme);

    return () => {
      WebApp.offEvent("themeChanged", syncColorScheme);
    };
  }, []);

  return colorScheme;
};
