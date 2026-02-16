import type { ThemeParams } from "telegram-web-app";
import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from "@/constants/colors";
import { WebApp } from "@/lib/web-app";
import { requiresVersion } from "@/utils/web-app";
import { COLOR_TO_METHOD_MAPPING } from "./constants";

type ColorsThemeKeys = Extract<
  keyof ThemeParams,
  "bg_color" | "header_bg_color" | "bottom_bar_bg_color"
>;

export const changeColorsTheme = (
  key: ColorsThemeKeys,
  color: `#${string}`,
) => {
  const { method, version } = COLOR_TO_METHOD_MAPPING[key];
  requiresVersion(version, () => WebApp[method](color));
};

const getCurrentThemeColor = () => {
  const isDark = WebApp.colorScheme === "dark";
  return isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
};

export const resetColorsTheme = (key: ColorsThemeKeys) => {
  const { method, version } = COLOR_TO_METHOD_MAPPING[key];
  const resetColor = getCurrentThemeColor();
  requiresVersion(version, () => WebApp[method](resetColor));
};
