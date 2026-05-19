import { Composer, InlineKeyboard } from "grammy";
import type { Context } from "#root/bot/context.ts";
import { logHandle } from "#root/bot/helpers/logging.ts";
import { config } from "#root/config.ts";

const webAppKeyboard = new InlineKeyboard().webApp(
  "Open web app",
  config.webAppUrl,
);

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), (ctx) => {
  return ctx.reply("Open mini-app with WebApp.expand() call on launch", {
    reply_markup: webAppKeyboard,
  });
});

export { composer as startFeature };
