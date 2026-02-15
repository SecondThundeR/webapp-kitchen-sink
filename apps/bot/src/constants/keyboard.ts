import { InlineKeyboard } from "grammy";

const WEB_APP_URL = Bun.env.WEB_APP_URL || "";

export const webAppKeyboard = new InlineKeyboard().webApp(
  "Open web app",
  WEB_APP_URL,
);
