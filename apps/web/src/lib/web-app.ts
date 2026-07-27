/// <reference types="@types/telegram-web-app" />

const TELEGRAM_SCRIPT_URL = "https://telegram.org/js/telegram-web-app.js";
const TELEGRAM_DOCS_URL =
  "https://core.telegram.org/bots/webapps#initializing-web-apps";

// Every module below reaches straight into this export, so a missing SDK is
// fatal either way. Throwing something descriptive beats the raw TypeError that
// window.Telegram.WebApp would otherwise produce. index.html carries static
// fallback markup for the user-facing half, since a module-level throw leaves
// React unmounted.
if (typeof window !== "object" || window === null) {
  throw new Error(
    "Telegram Web App is not running in a browser environment, window is not accessible",
  );
}

if (!window.Telegram?.WebApp) {
  throw new Error(
    `Telegram Web App script (${TELEGRAM_SCRIPT_URL}) has not run, see ${TELEGRAM_DOCS_URL}`,
  );
}

export const WebApp = window.Telegram.WebApp;
