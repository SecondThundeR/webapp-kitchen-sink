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

      if (payment.is_recurring) {
        try {
          await ctx.api.editUserStarSubscription(userId, chargeId, false);
          await ctx.reply("Subscription was cancelled!");
        } catch (error) {
          await ctx.reply(
            `Failed to cancel subscription. Error: ${String(error)}`,
          );
        }
      }

      try {
        await ctx.api.refundStarPayment(userId, chargeId);
        await ctx.reply(`Stars were successfully refunded!`);
      } catch (error) {
        await ctx.reply(`Failed to refund stars. Error: ${String(error)}`);
      }
    }
  },
);

export { composer as paymentFeature };
