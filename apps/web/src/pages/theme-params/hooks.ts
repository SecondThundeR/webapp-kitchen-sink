import { useEffect, useState } from "react";
import { WebApp } from "@/lib/web-app";
import { CUSTOMIZABLE_THEME_FIELDS } from "./constants";
import { resetColorsTheme } from "./helpers";

export const useThemeParams = () => {
  const [themeParams, setThemeParams] = useState(() => WebApp.themeParams);

  useEffect(() => {
    const updateThemeParams = () => {
      setThemeParams(WebApp.themeParams);
    };

    updateThemeParams();

    WebApp.onEvent("themeChanged", updateThemeParams);

    return () => {
      WebApp.offEvent("themeChanged", updateThemeParams);
      CUSTOMIZABLE_THEME_FIELDS.forEach(resetColorsTheme);
    };
  }, []);

  return themeParams;
};

export const useTestBottomButtons = () => {
  useEffect(() => {
    WebApp.MainButton.setText("Main button");
    WebApp.SecondaryButton.setText("Secondary button");
    WebApp.MainButton.show();
    WebApp.SecondaryButton.show();

    return () => {
      WebApp.MainButton.hide();
      WebApp.SecondaryButton.hide();
    };
  }, []);
};

export const useBackgroundClassOnBody = () => {
  useEffect(() => {
    document.body.classList.add("bg-transparent");

    return () => {
      document.body.classList.remove("bg-transparent");
    };
  }, []);

  return null;
};
