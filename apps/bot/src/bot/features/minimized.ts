import { Composer, InlineKeyboard } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { config } from "#root/config.js";

const url = new URL(config.webAppUrl);

url.searchParams.set("mode", "minimized");

const webAppKeyboard = new InlineKeyboard().webApp("Open web app", String(url));

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("minimized", logHandle("command-minimized"), (ctx) => {
  return ctx.reply("Open mini-app without calling WebApp.expand() on launch", {
    reply_markup: webAppKeyboard,
  });
});

export { composer as minimizedFeature };
