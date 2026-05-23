import { Composer, Keyboard } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { config } from "#root/config.js";

const url = new URL(config.webAppUrl);

url.searchParams.set("mode", "keyboard");

const webAppKeyboard = new Keyboard().webApp("Open web app", String(url));

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("keyboard", logHandle("command-keyboard"), (ctx) => {
  return ctx.reply("Open mini-app with KeyboardButton", {
    reply_markup: webAppKeyboard,
  });
});

feature.on("message:web_app_data", async (ctx) => {
  const data = ctx.message.web_app_data.data;

  await ctx.reply(`Received: ${data}`, {
    reply_markup: { remove_keyboard: true },
  });
});

export { composer as keyboardFeature };
