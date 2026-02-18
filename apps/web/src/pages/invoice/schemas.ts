import { z } from "zod";

export const baseInvoiceSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(32, "Title must be at most 32 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(255, "Description must be at most 255 characters"),
  prices: z.array(
    z.object({
      label: z.string(),
      amount: z.number(),
    }),
  ),
  photo_url: z.string().optional(),
  photo_size: z.number().optional(),
  photo_width: z.number().optional(),
  photo_height: z.number().optional(),
});

export const invoiceSchema = z.object({
  ...baseInvoiceSchema.shape,
  suggested_tip_amounts: z.array(z.number()).optional(),
  need_name: z.boolean().optional(),
  need_phone_number: z.boolean().optional(),
  need_email: z.boolean().optional(),
  need_shipping_address: z.boolean().optional(),
  is_flexible: z.boolean().optional(),
  currency: z.string(),
});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;

export const starsInvoiceSchema = z.object({
  ...baseInvoiceSchema.shape,
  is_subscription_enabled: z.boolean().optional(),
});

export type StarsInvoiceSchema = z.infer<typeof starsInvoiceSchema>;
