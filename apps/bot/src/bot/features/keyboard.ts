import { Composer, Keyboard } from "grammy";
import type { Context } from "../context";
import { logHandle } from "../helpers/logging";

const url = new URL(Bun.env.WEB_APP_URL || "");

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
