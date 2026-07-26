import { z } from "zod";

// getItems/removeItems take a list, which the card collects as one
// comma-separated input
export const keysSchema = z.object({
  keys: z
    .string()
    .transform((value) =>
      value
        .split(",")
        .map((key) => key.trim())
        .filter(Boolean),
    )
    .refine((keys) => keys.length > 0, "At least one key is required"),
});
