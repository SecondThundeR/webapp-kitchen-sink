import { useEffect, useEffectEvent, useState } from "react";
import { WebApp } from "@/lib/web-app";
import { CUSTOMIZABLE_THEME_FIELDS } from "./constants";
import { resetColorsTheme } from "./helpers";

export const useThemeParams = () => {
  const [themeParams, setThemeParams] = useState(() => WebApp.themeParams);

  const updateThemeParams = useEffectEvent(() => {
    setThemeParams(WebApp.themeParams);
  });

  useEffect(() => {
    updateThemeParams();

    WebApp.onEvent("themeChanged", updateThemeParams);

    return () => {
      WebApp.offEvent("themeChanged", updateThemeParams);
      CUSTOMIZABLE_THEME_FIELDS.forEach(({ theme }) => {
        resetColorsTheme(theme);
      });
    };
  }, []);

  return themeParams;
};

export const useBottomButton = () => {
  useEffect(() => {
    WebApp.MainButton.setParams({
      text: "Main Button",
      is_active: true,
      is_visible: true,
    });

    return () => {
      WebApp.MainButton.hide();
    };
  }, []);
};
