import { Composer, InlineKeyboard } from "grammy";
import type { Context } from "../context";
import { logHandle } from "../helpers/logging";

const webAppKeyboard = new InlineKeyboard().webApp(
  "Open web app",
  Bun.env.WEB_APP_URL || "",
);

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), (ctx) => {
  return ctx.reply("Hello!", {
    reply_markup: webAppKeyboard,
  });
});

export { composer as startFeature };
