import { Composer } from "grammy";
import type { BotContext } from "../types/bot";

export const starsQueryHandler = new Composer<BotContext>();

starsQueryHandler.on("pre_checkout_query", (ctx) =>
  ctx.answerPreCheckoutQuery(true),
);

starsQueryHandler.on("message:successful_payment", async (ctx) => {
  await ctx.refundStarPayment();
});
