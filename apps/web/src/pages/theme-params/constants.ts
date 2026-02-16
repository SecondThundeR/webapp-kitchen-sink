import type { ThemeParams } from "telegram-web-app";
import type { Prettify } from "@/types/general";

type ThemeKeys = Prettify<keyof ThemeParams>;

type CustomizableThemeKeys = Extract<
  ThemeKeys,
  "bg_color" | "header_bg_color" | "bottom_bar_bg_color"
>;

type ThemeField<T = string> = {
  theme: T;
  version?: string;
};

export const CUSTOMIZABLE_THEME_FIELDS: ThemeField<CustomizableThemeKeys>[] = [
  { theme: "bg_color" },
  { theme: "header_bg_color", version: "7.0" },
  { theme: "bottom_bar_bg_color", version: "7.10" },
];

export const COLOR_TO_METHOD_MAPPING: Record<
  CustomizableThemeKeys,
  {
    method: "setBackgroundColor" | "setHeaderColor" | "setBottomBarColor";
    version: string;
  }
> = {
  bg_color: {
    method: "setBackgroundColor",
    version: "6.1",
  },
  header_bg_color: {
    method: "setHeaderColor",
    version: "6.1",
  },
  bottom_bar_bg_color: {
    method: "setBottomBarColor",
    version: "7.10",
  },
} as const;

type NonCustomizableThemeKeys = Exclude<
  ThemeKeys,
  "bg_color" | "header_bg_color" | "bottom_bar_bg_color"
>;

export const NON_CUSTOMIZABLE_THEME_FIELDS: ThemeField<NonCustomizableThemeKeys>[] =
  [
    { theme: "text_color" },
    { theme: "hint_color" },
    { theme: "link_color" },
    { theme: "button_color" },
    { theme: "button_text_color" },
    { theme: "secondary_bg_color", version: "6.1" },
    { theme: "accent_text_color", version: "7.0" },
    { theme: "section_bg_color", version: "7.0" },
    { theme: "section_header_text_color", version: "7.0" },
    { theme: "section_separator_color", version: "7.6" },
    { theme: "subtitle_text_color", version: "7.0" },
    { theme: "destructive_text_color", version: "7.0" },
  ];
