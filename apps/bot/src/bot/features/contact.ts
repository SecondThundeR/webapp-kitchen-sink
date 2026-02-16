import { Composer } from "grammy";
import type { Context } from "../context";
import { logHandle } from "../helpers/logging";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.on(":contact", logHandle("unhandled-callback-query"), (ctx) => {
  const contact = ctx.message?.contact;
  if (!contact) return;

  return ctx.reply(`\`\`\`\n${JSON.stringify(contact, null, 2)}\`\`\`\n`, {
    parse_mode: "MarkdownV2",
  });
});

export { composer as contactFeature };
