import { useEffect, useState } from "react";
import { CustomizableColorCard } from "@/components/customizable-color-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WebApp } from "@/lib/web-app";

const CUSTOMIZABLE_THEME_FIELDS = [
  "bg_color",
  "header_bg_color",
  "bottom_bar_bg_color",
] as const;

const COLOR_TO_METHOD_MAPPING = {
  bg_color: "setBackgroundColor",
  header_bg_color: "setHeaderColor",
  bottom_bar_bg_color: "setBottomBarColor",
} as const;

const NON_CUSTOMIZABLE_THEME_FIELDS = [
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

const changeColorsTheme = (
  key: (typeof CUSTOMIZABLE_THEME_FIELDS)[number],
  color: `#${string}`,
) => {
  const method = COLOR_TO_METHOD_MAPPING[key];
  WebApp[method](color);
};

const resetColorsTheme = (key: (typeof CUSTOMIZABLE_THEME_FIELDS)[number]) => {
  const isDark = WebApp.colorScheme === "dark";
  const method = COLOR_TO_METHOD_MAPPING[key];
  const resetColor = isDark ? "#0a0a0a" : "#ffffff";
  WebApp[method](resetColor);
  return resetColor;
};

export const ThemeParamsPage = () => {
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

  useEffect(() => {
    WebApp.MainButton.setText("Some random button, xd");
    WebApp.MainButton.show();

    return () => {
      WebApp.MainButton.hide();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight pb-2">
        Theme Params Playground
      </h1>
      <h2 className="text-xl">Customizable colors</h2>
      <p>
        Due to limitations of Telegram Mini Apps API, custom colors aren't
        present in themeParams or in CSS vars, so there is no live preview of
        color
      </p>
      <div className="flex flex-col gap-2">
        {CUSTOMIZABLE_THEME_FIELDS.map((theme) => (
          <CustomizableColorCard
            key={theme}
            title={theme}
            // biome-ignore lint/style/noNonNullAssertion: It will be always defined here
            itemColor={themeParams[theme]!}
            onChange={(color) => changeColorsTheme(theme, color)}
            onReset={() => resetColorsTheme(theme)}
          />
        ))}
      </div>
      <h2 className="text-xl">Non customizable colors</h2>
      <div className="flex flex-col gap-2">
        {NON_CUSTOMIZABLE_THEME_FIELDS.map((theme) => (
          <Card key={theme}>
            <CardHeader>
              <CardTitle>{theme}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="w-full h-16 rounded-md border border-black dark:border-white"
                style={{
                  backgroundColor: themeParams[theme],
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
