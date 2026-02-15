import { Composer } from "grammy";
import { webAppKeyboard } from "../../constants/keyboard";
import type { BotContext } from "../../types/bot.ts";

export const startCommand = new Composer<BotContext>();

startCommand.command("start", (ctx) =>
  ctx.reply("Hello!", {
    reply_markup: webAppKeyboard,
  }),
);
