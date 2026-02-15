import { useEffect } from "react";
import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from "@/constants/colors";
import { WebApp } from "@/lib/web-app";

export function useThemeSync() {
  useEffect(() => {
    const applyTheme = () => {
      const isDark = WebApp.colorScheme === "dark";

      if (isDark) {
        document.documentElement.classList.add("dark");
        WebApp.setHeaderColor(DARK_THEME_COLOR);
        WebApp.setBackgroundColor(DARK_THEME_COLOR);
        WebApp.setBottomBarColor(DARK_THEME_COLOR);
      } else {
        document.documentElement.classList.remove("dark");
        WebApp.setHeaderColor(LIGHT_THEME_COLOR);
        WebApp.setBackgroundColor(LIGHT_THEME_COLOR);
        WebApp.setBottomBarColor(LIGHT_THEME_COLOR);
      }
    };

    applyTheme();

    WebApp.onEvent("themeChanged", applyTheme);

    return () => {
      WebApp.offEvent("themeChanged", applyTheme);
    };
  }, []);
}
