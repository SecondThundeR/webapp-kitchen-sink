import { Composer } from "grammy";
import { delay } from "../../utils/general";
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

      // Adding artificial delay, as if bot tries to refund right away, it can fail
      await delay(1000);

      try {
        await ctx.api.refundStarPayment(userId, chargeId);

        let replyText = "Stars were refunded";

        if (payment.is_recurring || payment.subscription_expiration_date) {
            await ctx.api.editUserStarSubscription(userId, chargeId, true);
            replyText += " and subscription was explicitly cancelled";
        }

        await ctx.reply(`${replyText}!`);
      } catch (error) {
        await ctx.reply(`Failed to refund stars/cancellation. Error: ${String(error)}`);
      }
    }
  },
);

export { composer as paymentFeature };
