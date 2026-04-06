import { gunzipSync } from "node:zlib";
import { Elysia } from "elysia";
import { env } from "../config/env";
import { telegramAndroidDevice } from "../middleware/telegram-android-device";
import { telegramAuth } from "../middleware/telegram-auth";
import { callTelegramMethod, getTelegramFile } from "../utils/telegram-api";

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

export const emojisRoutes = new Elysia({ prefix: "/emojis" })
  .use(telegramAuth)
  .use(telegramAndroidDevice)
  .get("/getTestEmojiSet", async ({ telegramAndroidDevice }) => {
    const emojiPack = ["LOW", "AVERAGE"].includes(
      telegramAndroidDevice.performanceClass ?? "",
    )
      ? NON_LOTTIE_EMOJI_PACK
      : LOTTIE_EMOJI_PACK;

    const cached = emojiCache.get(emojiPack);
    if (cached && cached.expiresAt > Date.now()) {
      return { emojis: cached.data };
    }

    const data = await callTelegramMethod<{
      stickers: {
        file_id: string;
        custom_emoji_id: string;
        is_animated: boolean;
        is_video: boolean;
      }[];
    }>("getStickerSet", {
      name: emojiPack,
    });

    const formattedEmojis = (
      await Promise.all(
        data.stickers.map(async (sticker) => {
          const file = await getTelegramFile(sticker.file_id);
          if (!file) {
            return null;
          }

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

    return { emojis: formattedEmojis };
  })
  .get("/file", async ({ query, set }) => {
    const { path } = query;
    if (!path) {
      set.status = 400;
      return { error: "Missing file path" };
    }

    if (
      !TELEGRAM_FILE_PATH_PATTERN.test(path) ||
      !ALLOWED_FILE_EXTENSIONS.some((extension) => path.endsWith(extension))
    ) {
      set.status = 400;
      return { error: "Invalid file path" };
    }

    try {
      const tgUrl = `https://api.telegram.org/file/bot${env.BOT_TOKEN}/${path}`;
      const response = await fetch(tgUrl);

      if (!response.ok) {
        set.status = response.status;
        return { error: "Failed to fetch from Telegram" };
      }

      if (path.endsWith(".tgs")) {
        const arrayBuffer = await response.arrayBuffer();
        const decompressed = gunzipSync(Buffer.from(arrayBuffer));

        set.headers["Content-Type"] = "application/json";
        return decompressed.toString("utf-8");
      }

      if (path.endsWith(".webp")) {
        set.headers["Content-Type"] = "image/webp";
        return response;
      }

      if (path.endsWith(".webm")) {
        set.headers["Content-Type"] = "video/webm";
        return response;
      }

      return response;
    } catch (error) {
      console.error("Proxy Error:", error);
      set.status = 500;
      return { error: "Failed to process file" };
    }
  });
