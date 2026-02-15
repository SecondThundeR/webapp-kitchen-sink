import { t } from "elysia";
import { initDataSchema } from "./base.schemas";

export const invoiceRequestBodySchema = t.Composite([
  initDataSchema,
  t.Object({
    title: t.String(),
    description: t.String(),
    currency: t.String(),
    prices: t.Array(
      t.Object({
        label: t.String(),
        amount: t.Number(),
      }),
    ),
  }),
]);
