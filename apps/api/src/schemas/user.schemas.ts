import * as v from "valibot";

export const userSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  first_name: v.string(),
  last_name: v.optional(v.string()),
  username: v.optional(v.string()),
  language_code: v.optional(v.string()),
  is_premium: v.optional(v.boolean()),
  allows_write_to_pm: v.optional(v.boolean()),
});

export type User = v.InferOutput<typeof userSchema>;
