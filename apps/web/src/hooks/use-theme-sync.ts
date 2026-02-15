import { useEffect } from "react";
import { WebApp } from "@/lib/web-app";

export function useThemeSync() {
  useEffect(() => {
    const applyTheme = () => {
      const isDark = WebApp.colorScheme === "dark";

      if (isDark) {
        document.documentElement.classList.add("dark");
        WebApp.setHeaderColor("#0a0a0a");
        WebApp.setBackgroundColor("#0a0a0a");
        WebApp.setBottomBarColor("#0a0a0a");
      } else {
        document.documentElement.classList.remove("dark");
        WebApp.setHeaderColor("#ffffff");
        WebApp.setBackgroundColor("#ffffff");
        WebApp.setBottomBarColor("#ffffff");
      }
    };

    applyTheme();

    WebApp.onEvent("themeChanged", applyTheme);

    return () => {
      WebApp.offEvent("themeChanged", applyTheme);
    };
  }, []);
}
