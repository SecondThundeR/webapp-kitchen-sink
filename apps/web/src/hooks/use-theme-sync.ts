import { useEffect } from "react";
import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from "@/constants/colors";
import { WebApp } from "@/lib/web-app";
import { requiresVersion } from "@/utils/web-app";

const applyTheme = () => {
  const isDark = WebApp.colorScheme === "dark";

  if (isDark) {
    document.documentElement.classList.add("dark");
    requiresVersion("6.1", () => WebApp.setHeaderColor(DARK_THEME_COLOR));
    requiresVersion("6.1", () => WebApp.setBackgroundColor(DARK_THEME_COLOR));
    requiresVersion("7.10", () => WebApp.setBottomBarColor(DARK_THEME_COLOR));
  } else {
    document.documentElement.classList.remove("dark");
    requiresVersion("6.1", () => WebApp.setHeaderColor(LIGHT_THEME_COLOR));
    requiresVersion("6.1", () => WebApp.setBackgroundColor(LIGHT_THEME_COLOR));
    requiresVersion("7.10", () => WebApp.setBottomBarColor(LIGHT_THEME_COLOR));
  }
};

export function useThemeSync() {
  useEffect(() => {
    applyTheme();

    WebApp.onEvent("themeChanged", applyTheme);

    return () => {
      WebApp.offEvent("themeChanged", applyTheme);
    };
  }, []);
}
