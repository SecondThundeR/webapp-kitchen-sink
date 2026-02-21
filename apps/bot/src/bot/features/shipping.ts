import { Composer } from "grammy";
import type { Context } from "../context";
import { logHandle } from "../helpers/logging";

const composer = new Composer<Context>();

composer.on("shipping_query", logHandle("shipping-query"), (ctx) => {
  return ctx.answerShippingQuery(true, {
    shipping_options: [
      {
        id: "today",
        title: "Deliver today",
        prices: [{ label: "today", amount: 10000 }],
      },
      {
        id: "yesterday",
        title: "Deliver yesterday",
        prices: [{ label: "yesterday", amount: 1000000 }],
      },
      {
        id: "instant",
        title: "Deliver right after pay",
        prices: [{ label: "instant", amount: 100000000 }],
      },
      {
        id: "pochta",
        title: "Почта России",
        prices: [{ label: "pochta", amount: 0 }],
      },
    ],
  });
});

export { composer as shippingFeature };
