import { Composer } from "grammy";
import type { Context } from "../context";
import { logHandle } from "../helpers/logging";

const handleStarRefund = async (
  ctx: Context,
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

const composer = new Composer<Context>();

composer.on(
  "pre_checkout_query",
  logHandle("payment-pre-checkout-query"),
  (ctx) => ctx.answerPreCheckoutQuery(true),
);

composer.on(
  "message:successful_payment",
  logHandle("payment-successful-payment"),
  (ctx) => {
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
  },
);

export { composer as paymentFeature };
