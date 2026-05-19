import * as v from "valibot";

const baseInvoiceSchema = v.object({
  title: v.string(),
  description: v.string(),
  prices: v.array(
    v.object({
      label: v.string(),
      amount: v.number(),
    }),
  ),
  photo_url: v.optional(v.string()),
  photo_size: v.optional(v.number()),
  photo_width: v.optional(v.number()),
  photo_height: v.optional(v.number()),
});

export const regularInvoiceSchema = v.intersect([
  baseInvoiceSchema,
  v.object({
    currency: v.string(),
    max_tip_amount: v.optional(v.number()),
    suggested_tip_amounts: v.optional(v.array(v.number())),
    need_name: v.optional(v.boolean()),
    need_phone_number: v.optional(v.boolean()),
    need_email: v.optional(v.boolean()),
    need_shipping_address: v.optional(v.boolean()),
    is_flexible: v.optional(v.boolean()),
  }),
]);

export const starsInvoiceSchema = v.intersect([
  baseInvoiceSchema,
  v.object({
    subscription_period: v.optional(v.number()),
  }),
]);
