import { gunzipSync } from "node:zlib";
import { Hono } from "hono";
import { config } from "#root/config/index.ts";
import { telegramAndroidDevice } from "#root/middleware/telegram-android-device.ts";
import type { HonoEnv } from "#root/types.ts";
import {
  callTelegramMethod,
  getTelegramFile,
} from "#root/utils/telegram-api.ts";

type FormattedSticker = {
  id: string;
  file_path: string;
  is_animated: boolean;
  is_video: boolean;
};

const LOTTIE_EMOJI_PACK = "ApplicationEmoji";
const NON_LOTTIE_EMOJI_PACK = "NecoMoji";

const emojiCache = new Map<
  string,
  { data: FormattedSticker[]; expiresAt: number }
>();

const CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const ALLOWED_FILE_EXTENSIONS = [".tgs", ".webp", ".webm"] as const;
const TELEGRAM_FILE_PATH_PATTERN = /^[A-Za-z0-9_./-]+$/;

export const emojisRoutes = new Hono<HonoEnv>()
  .use(telegramAndroidDevice)
  .get("/getTestEmojiSet", async (c) => {
    const device = c.get("telegramAndroidDevice");
    const emojiPack = ["LOW", "AVERAGE"].includes(device.performanceClass ?? "")
      ? NON_LOTTIE_EMOJI_PACK
      : LOTTIE_EMOJI_PACK;

    const cached = emojiCache.get(emojiPack);
    if (cached && cached.expiresAt > Date.now()) {
      return c.json({ emojis: cached.data });
    }

    const data = await callTelegramMethod<{
      stickers: {
        file_id: string;
        custom_emoji_id: string;
        is_animated: boolean;
        is_video: boolean;
      }[];
    }>("getStickerSet", { name: emojiPack });

    const formattedEmojis = (
      await Promise.all(
        data.stickers.map(async (sticker) => {
          const file = await getTelegramFile(sticker.file_id);
          if (!file) return null;
          return {
            id: sticker.custom_emoji_id,
            file_path: file.file_path,
            is_animated: sticker.is_animated,
            is_video: sticker.is_video,
          };
        }),
      )
    ).filter((item): item is NonNullable<typeof item> => item !== null);

    emojiCache.set(emojiPack, {
      data: formattedEmojis,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return c.json({ emojis: formattedEmojis });
  })
  .get("/file", async (c) => {
    const path = c.req.query("path");
    if (!path) {
      return c.json({ error: "Missing file path" }, 400);
    }

    if (
      !TELEGRAM_FILE_PATH_PATTERN.test(path) ||
      !ALLOWED_FILE_EXTENSIONS.some((ext) => path.endsWith(ext))
    ) {
      return c.json({ error: "Invalid file path" }, 400);
    }

    try {
      const tgUrl = `https://api.telegram.org/file/bot${config.botToken}/${path}`;
      const response = await fetch(tgUrl);

      if (!response.ok) {
        return c.json(
          { error: "Failed to fetch from Telegram" },
          response.status as 400,
        );
      }

      if (path.endsWith(".tgs")) {
        const arrayBuffer = await response.arrayBuffer();
        const decompressed = gunzipSync(Buffer.from(arrayBuffer));
        return new Response(decompressed.toString("utf-8"), {
          headers: { "Content-Type": "application/json" },
        });
      }

      if (path.endsWith(".webp")) {
        return new Response(response.body, {
          status: response.status,
          headers: { "Content-Type": "image/webp" },
        });
      }

      if (path.endsWith(".webm")) {
        return new Response(response.body, {
          status: response.status,
          headers: { "Content-Type": "video/webm" },
        });
      }

      return response;
    } catch (error) {
      console.error("Proxy Error:", error);
      return c.json({ error: "Failed to process file" }, 500);
    }
  });
