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
      CUSTOMIZABLE_THEME_FIELDS.forEach(resetColorsTheme);
    };
  }, []);

  return themeParams;
};

export const useBottomButtons = () => {
  useEffect(() => {
    WebApp.MainButton.setParams({
      text: "Main Button",
      has_shine_effect: true,
      is_active: true,
      is_visible: true,
      position: "top",
    });
    WebApp.SecondaryButton.setParams({
      text: "Secondary Button",
      has_shine_effect: false,
      is_active: false,
      is_visible: true,
      position: "bottom",
    });

    return () => {
      WebApp.MainButton.hide();
      WebApp.SecondaryButton.hide();
    };
  }, []);
};
