import z from "zod";
import { TEXT_REQUIRED_TYPES } from "./constants";

export const showPopupSchema = z.object({
  title: z.string().max(64, "Title must be at most 256 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(256, "Message must be at most 256 characters"),
  buttons: z
    .array(
      z
        .object({
          type: z.enum(["default", "ok", "close", "cancel", "destructive"]),
          id: z.string().max(64, "ID must be at most 256 characters"),
          text: z.string().max(64, "Text must be at most 256 characters"),
        })
        .superRefine((data, ctx) => {
          if (TEXT_REQUIRED_TYPES.includes(data.id) && !data.text) {
            ctx.addIssue({
              code: "custom",
              message: "Text is required for selected button type",
              path: ["text"],
            });
          }
        }),
    )
    .max(3, "Popup can have at most 3 buttons")
    .optional(),
});

export type ShowPopupSchema = z.infer<typeof showPopupSchema>;
