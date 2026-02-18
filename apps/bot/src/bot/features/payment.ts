import { Composer } from "grammy";
import type { Context } from "../context";
import { logHandle } from "../helpers/logging";

const composer = new Composer<Context>();

composer.on(
  "pre_checkout_query",
  logHandle("payment-pre-checkout-query"),
  (ctx) => ctx.answerPreCheckoutQuery(true),
);

composer.on(
  "message:successful_payment",
  logHandle("payment-successful-payment"),
  async (ctx) => {
    const payment = ctx.message.successful_payment;

    await ctx.reply(`\`\`\`\n${JSON.stringify(payment, null, 2)}\`\`\`\n`, {
      parse_mode: "MarkdownV2",
    });

    if (payment.currency === "XTR") {
      const userId = ctx.from.id;
      const chargeId = payment.telegram_payment_charge_id;
      const isRecurring = payment.is_recurring;

      setTimeout(() => {
        ctx.api
          .refundStarPayment(userId, chargeId)
          .then(() => {
            ctx.reply(
              `Stars was successfully refunded${isRecurring && " and subscription was cancelled"}!`,
            );
          })
          .catch((error) => {
            ctx.reply(`Failed to refund stars. Error: ${String(error)}`);
          });
      }, 1000);
    }
  },
);

export { composer as paymentFeature };
