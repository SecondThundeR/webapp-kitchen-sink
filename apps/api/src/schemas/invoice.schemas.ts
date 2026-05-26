import * as v from "valibot";

const baseInvoiceSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1), v.maxLength(32)),
  description: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
  prices: v.array(
    v.object({
      label: v.pipe(v.string(), v.minLength(1)),
      amount: v.pipe(v.number(), v.integer(), v.minValue(1)),
    }),
  ),
  photo_url: v.optional(v.pipe(v.string(), v.url())),
  photo_size: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
  photo_width: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
  photo_height: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
});

export const regularInvoiceSchema = v.intersect([
  baseInvoiceSchema,
  v.object({
    currency: v.pipe(v.string(), v.length(3)),
    max_tip_amount: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
    suggested_tip_amounts: v.optional(
      v.array(v.pipe(v.number(), v.integer(), v.minValue(1))),
    ),
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
    subscription_period: v.optional(
      v.pipe(v.number(), v.integer(), v.literal(2592000)),
    ),
  }),
]);

export type RegularInvoice = v.InferOutput<typeof regularInvoiceSchema>;
export type StarsInvoice = v.InferOutput<typeof starsInvoiceSchema>;
