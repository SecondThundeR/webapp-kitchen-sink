export const CUSTOMIZABLE_THEME_FIELDS = [
  "bg_color",
  "header_bg_color",
  "bottom_bar_bg_color",
] as const;

export const COLOR_TO_METHOD_MAPPING = {
  bg_color: "setBackgroundColor",
  header_bg_color: "setHeaderColor",
  bottom_bar_bg_color: "setBottomBarColor",
} as const;

export const NON_CUSTOMIZABLE_THEME_FIELDS = [
  "text_color",
  "hint_color",
  "link_color",
  "button_color",
  "button_text_color",
  "secondary_bg_color",
  "accent_text_color",
  "section_bg_color",
  "section_header_text_color",
  "section_separator_color",
  "subtitle_text_color",
  "destructive_text_color",
] as const;
