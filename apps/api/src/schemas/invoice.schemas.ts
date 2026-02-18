import { t } from "elysia";
import { initDataSchema } from "./base.schemas";

const baseInvoiceSchema = t.Object({
  title: t.String(),
  description: t.String(),
  prices: t.Array(
    t.Object({
      label: t.String(),
      amount: t.Number(),
    }),
  ),
  photo_url: t.Optional(t.String()),
  photo_size: t.Optional(t.Number()),
  photo_width: t.Optional(t.Number()),
  photo_height: t.Optional(t.Number()),
});

const regularInvoiceSchema = t.Intersect([
  baseInvoiceSchema,
  t.Object({
    currency: t.String(),
    max_tip_amount: t.Optional(t.Number()),
    suggested_tip_amounts: t.Optional(t.Array(t.Number())),
    need_name: t.Optional(t.Boolean()),
    need_phone_number: t.Optional(t.Boolean()),
    need_email: t.Optional(t.Boolean()),
    need_shipping_address: t.Optional(t.Boolean()),
    is_flexible: t.Optional(t.Boolean()),
  }),
]);

const starsInvoiceSchema = t.Intersect([
  baseInvoiceSchema,
  t.Object({
    subscription_period: t.Optional(t.Number()),
  }),
]);

export const invoiceRequestBodySchema = t.Composite([
  initDataSchema,
  regularInvoiceSchema,
]);

export const starsInvoiceRequestBodySchema = t.Composite([
  initDataSchema,
  starsInvoiceSchema,
]);
