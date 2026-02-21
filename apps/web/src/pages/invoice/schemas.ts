import { z } from "zod";
import { CURRENCY_CODES } from "./constants";

const baseInvoiceSchema = z.object({
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
      label: z.string().min(1, "Label is required"),
      amount: z.number().positive("Amount must be positive"),
    }),
  ),
  photo_url: z.string().optional(),
  photo_size: z.number().optional(),
  photo_width: z.number().optional(),
  photo_height: z.number().optional(),
});

export type BaseInvoiceSchema = z.infer<typeof baseInvoiceSchema>;

const currencySchema = z.enum(CURRENCY_CODES as string[], {
  error: "Please select a valid currency",
});

export const invoiceSchema = z
  .object({
    ...baseInvoiceSchema.shape,
    currency: currencySchema,
    max_tip_amount: z
      .number()
      .positive("Max tip amount must be positive")
      .optional(),
    suggested_tip_amounts: z
      .array(
        z.object({
          tip: z.number().positive("Tip must be positive"),
        }),
      )
      .max(4, "Maximum 4 suggested tips allowed")
      .optional(),
    need_name: z.boolean().optional(),
    need_phone_number: z.boolean().optional(),
    need_email: z.boolean().optional(),
    need_shipping_address: z.boolean().optional(),
    is_flexible: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    const { max_tip_amount, suggested_tip_amounts } = data;

    if (!max_tip_amount && suggested_tip_amounts?.length) {
      ctx.addIssue({
        code: "custom",
        message: "Max tip amount is required when suggesting tips",
        path: ["max_tip_amount"],
      });
      return;
    }

    if (max_tip_amount && suggested_tip_amounts?.length) {
      suggested_tip_amounts.forEach((item, index) => {
        if (item.tip > max_tip_amount) {
          ctx.addIssue({
            code: "too_big",
            type: "number",
            maximum: max_tip_amount,
            inclusive: true,
            message: `Must be ≤ ${max_tip_amount}`,
            origin: "array",
            path: ["suggested_tip_amounts", index, "tip"],
          });
        }
      });
    }
  });

export type InvoiceSchema = z.infer<typeof invoiceSchema>;

export const starsInvoiceSchema = z
  .object({
    ...baseInvoiceSchema.shape,
    is_subscription_enabled: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.is_subscription_enabled && data.prices.length > 0) {
        return data.prices[0].amount <= 10000;
      }
      return true;
    },
    {
      message: "Subscription price cannot exceed 10000",
      path: ["prices", 0, "amount"],
    },
  );

export type StarsInvoiceSchema = z.infer<typeof starsInvoiceSchema>;
