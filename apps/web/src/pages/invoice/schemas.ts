import { z } from "zod";
import { CURRENCY_CODES } from "./constants";

// Number inputs report an empty value as undefined, so the input side has to
// admit it while the parsed output stays a plain number
const requiredNumber = (requiredMessage: string, positiveMessage: string) =>
  z
    .union([z.number(), z.undefined()])
    .pipe(z.number(requiredMessage).positive(positiveMessage));

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
      amount: requiredNumber("Amount is required", "Amount must be positive"),
    }),
  ),
  photo_url: z.string().optional(),
  photo_size: z.number().optional(),
  photo_width: z.number().optional(),
  photo_height: z.number().optional(),
});

export type BaseInvoiceSchema = z.infer<typeof baseInvoiceSchema>;

export type BaseInvoiceSchemaInput = z.input<typeof baseInvoiceSchema>;

const currencySchema = z.enum(CURRENCY_CODES as string[], {
  error: "Please select a valid currency",
});

// Rules that span two fields (max tip amount vs. suggested tips) live on the
// fields themselves as linked validators, so that once the form has been
// submitted, editing either side re-checks the other
export const invoiceSchema = z.object({
  ...baseInvoiceSchema.shape,
  currency: currencySchema,
  max_tip_amount: z
    .number()
    .positive("Max tip amount must be positive")
    .optional(),
  suggested_tip_amounts: z
    .array(
      z.object({
        tip: requiredNumber("Tip is required", "Tip must be positive"),
      }),
    )
    .max(4, "Maximum 4 suggested tips allowed")
    .optional(),
  need_name: z.boolean().optional(),
  need_phone_number: z.boolean().optional(),
  need_email: z.boolean().optional(),
  need_shipping_address: z.boolean().optional(),
  is_flexible: z.boolean().optional(),
});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;

// TanStack Form works with the input side of a Standard Schema, so form values
// are typed from it and parsed into InvoiceSchema on submit
export type InvoiceSchemaInput = z.input<typeof invoiceSchema>;

// The subscription price cap is a linked validator on the price field itself,
// see SUBSCRIPTION_AMOUNT_LIMIT in components/stars-invoice.tsx
export const starsInvoiceSchema = z.object({
  ...baseInvoiceSchema.shape,
  is_subscription_enabled: z.boolean().optional(),
});

export type StarsInvoiceSchema = z.infer<typeof starsInvoiceSchema>;

export type StarsInvoiceSchemaInput = z.input<typeof starsInvoiceSchema>;
