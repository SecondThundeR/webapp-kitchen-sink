import { Composer } from "grammy";
import type { BotContext } from "../types/bot";

export const paymentQueryHandler = new Composer<BotContext>();

paymentQueryHandler.on("pre_checkout_query", (ctx) =>
  ctx.answerPreCheckoutQuery(true),
);

const handleStarRefund = async (
  ctx: BotContext,
  userId: number,
  chargeId: string,
  refundData: string,
) => {
  try {
    await ctx.api.refundStarPayment(userId, chargeId);
    await ctx.reply(`${refundData} was successfully refunded!`);
  } catch (error) {
    console.error("Refund error:", error);
    await ctx.reply(`Failed to refund ${refundData}`);
  }
};

paymentQueryHandler.on("message:successful_payment", async (ctx) => {
  const payment = ctx.message.successful_payment;

  if (payment.currency !== "XTR") {
    const refundData = `${payment.total_amount / 100} ${payment.currency}`;
    return ctx.reply(
      `Thank you for your 'payment' (${refundData})! Don't worry, your imaginary credit card was not charged. Your order is not on the way.`,
    );
  }

  const userId = ctx.from.id;
  const chargeId = payment.telegram_payment_charge_id;
  const refundData = `${payment.total_amount}⭐`;

  setTimeout(() => {
    handleStarRefund(ctx, userId, chargeId, refundData);
  }, 1000);
});
