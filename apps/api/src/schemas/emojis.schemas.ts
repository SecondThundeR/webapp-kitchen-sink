import * as v from "valibot";

export const fileQuery = v.object({
  path: v.pipe(
    v.string(),
    v.regex(
      /^[A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)*\.(tgs|webp|webm)$/,
      "Invalid path",
    ),
    v.check((p) => !p.includes(".."), "Invalid path"),
  ),
});

export const formattedStickerSchema = v.object({
  id: v.string(),
  file_path: v.string(),
  is_animated: v.boolean(),
  is_video: v.boolean(),
});

export type FormattedSticker = v.InferOutput<typeof formattedStickerSchema>;
