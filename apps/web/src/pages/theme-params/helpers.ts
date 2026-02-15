import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from "@/constants/colors";
import { WebApp } from "@/lib/web-app";
import {
  COLOR_TO_METHOD_MAPPING,
  type CUSTOMIZABLE_THEME_FIELDS,
} from "./constants";

export const changeColorsTheme = (
  key: (typeof CUSTOMIZABLE_THEME_FIELDS)[number],
  color: `#${string}`,
) => {
  const method = COLOR_TO_METHOD_MAPPING[key];
  WebApp[method](color);
};

const getCurrentThemeColor = () => {
  const isDark = WebApp.colorScheme === "dark";
  return isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
};

export const resetColorsTheme = (
  key: (typeof CUSTOMIZABLE_THEME_FIELDS)[number],
) => {
  const method = COLOR_TO_METHOD_MAPPING[key];
  const resetColor = getCurrentThemeColor();
  WebApp[method](resetColor);
};
