import { DynamicThemeCard } from "./components/dynamic-theme-card";
import { ThemeCard } from "./components/theme-card";
import {
  CUSTOMIZABLE_THEME_FIELDS,
  NON_CUSTOMIZABLE_THEME_FIELDS,
} from "./constants";
import { changeColorsTheme, resetColorsTheme } from "./helpers";
import {
  useBackgroundClassOnBody,
  useBottomButtons,
  useThemeParams,
} from "./hooks";

export const ThemeParamsPage = () => {
  const themeParams = useThemeParams();

  useBottomButtons();
  useBackgroundClassOnBody();

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
          <DynamicThemeCard
            key={theme}
            title={theme}
            color={themeParams[theme]}
            onChange={(color) => changeColorsTheme(theme, color)}
            onReset={() => resetColorsTheme(theme)}
          />
        ))}
      </div>
      <h2 className="text-xl">Non customizable colors</h2>
      <div className="flex flex-col gap-2">
        {NON_CUSTOMIZABLE_THEME_FIELDS.map((theme) => (
          <ThemeCard key={theme} title={theme} color={themeParams[theme]} />
        ))}
      </div>
    </div>
  );
};
