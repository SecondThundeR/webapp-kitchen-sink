import { promisify } from "node:util";
import { gunzip } from "node:zlib";
import { Hono } from "hono";
import { config } from "#root/config/index.js";
import { AppError } from "#root/errors/app-error.js";
import { ErrorCode } from "#root/errors/error-code.js";
import { telegramAndroidDevice } from "#root/middleware/telegram-android-device.js";
import { telegramAuth } from "#root/middleware/telegram-auth.js";
import type { HonoEnv } from "#root/types.js";
import {
  callTelegramMethod,
  getTelegramFile,
} from "#root/utils/telegram-api.js";

const gunzipAsync = promisify(gunzip);

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
  .get("/file", telegramAuth, async (c) => {
    const path = c.req.query("path");
    if (!path) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, "Missing file path", 400);
    }

    if (
      !TELEGRAM_FILE_PATH_PATTERN.test(path) ||
      !ALLOWED_FILE_EXTENSIONS.some((ext) => path.endsWith(ext))
    ) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, "Invalid file path", 400);
    }

    const tgUrl = `https://api.telegram.org/file/bot${config.botToken}/${path}`;
    const response = await fetch(tgUrl);

    if (!response.ok) {
      console.error(
        `Telegram file fetch HTTP ${response.status} for path=${path}`,
      );
      throw new AppError(
        ErrorCode.UNKNOWN_ERROR,
        "Failed to fetch from Telegram",
        response.status >= 400 && response.status < 600 ? response.status : 502,
      );
    }

    const cacheControl = "public, max-age=86400, immutable";

    if (path.endsWith(".tgs")) {
      const arrayBuffer = await response.arrayBuffer();
      const decompressed = await gunzipAsync(Buffer.from(arrayBuffer));
      return new Response(decompressed.toString("utf-8"), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": cacheControl,
        },
      });
    }

    if (path.endsWith(".webp")) {
      return new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": "image/webp",
          "Cache-Control": cacheControl,
        },
      });
    }

    if (path.endsWith(".webm")) {
      return new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": "video/webm",
          "Cache-Control": cacheControl,
        },
      });
    }

    return response;
  });
