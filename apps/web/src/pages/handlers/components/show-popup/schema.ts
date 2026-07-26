import z from "zod";

// "Text is required for the selected button type" is a linked validator on the
// text field itself, see components/button-item.tsx
export const showPopupSchema = z.object({
  title: z.string().max(64, "Title must be at most 64 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(256, "Message must be at most 256 characters"),
  buttons: z
    .array(
      z.object({
        type: z.enum(["default", "ok", "close", "cancel", "destructive"]),
        id: z.string().max(64, "ID must be at most 64 characters"),
        text: z.string().max(64, "Text must be at most 64 characters"),
      }),
    )
    .max(3, "Popup can have at most 3 buttons")
    .optional(),
});

export type ShowPopupSchema = z.infer<typeof showPopupSchema>;

// TanStack Form works with the input side of a Standard Schema, so form values
// are typed from it and parsed into ShowPopupSchema on submit
export type ShowPopupSchemaInput = z.input<typeof showPopupSchema>;
