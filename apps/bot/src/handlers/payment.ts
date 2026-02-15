import { Composer } from "grammy";
import type { BotContext } from "../types/bot";

export const paymentQueryHandler = new Composer<BotContext>();

paymentQueryHandler.on("pre_checkout_query", (ctx) =>
  ctx.answerPreCheckoutQuery(true),
);

paymentQueryHandler.on("message:successful_payment", async (ctx) => {
  const payment = ctx.message.successful_payment;
  const userId = ctx.from.id;
  const chargeId = payment.telegram_payment_charge_id;
  const refundData = `${payment.total_amount}${payment.currency === "XTR" ? "⭐" : ` ${payment.currency}`}`;

  try {
    await ctx.api.refundStarPayment(userId, chargeId);
    await ctx.reply(`${refundData} was successfully refunded!`);
  } catch (error) {
    console.error("Refund error:", error);
    await ctx.reply(`Failed to refund ${refundData}`);
  }
});
