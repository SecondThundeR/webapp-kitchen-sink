import { Composer } from "grammy";
import type { BotContext } from "../types/bot";

export const contactQueryHandler = new Composer<BotContext>();

contactQueryHandler.on(":contact", async (ctx) => {
  const contact = ctx.message?.contact;
  if (!contact) return;

  return ctx.reply(`\`\`\`\n${JSON.stringify(contact, null, 2)}\`\`\`\n`, {
    parse_mode: "MarkdownV2",
  });
});
