import { gunzipSync } from "node:zlib";
import { Elysia } from "elysia";
import { env } from "../config/env";
import { AppError } from "../errors/app-error";
import { ErrorCode } from "../errors/error-code";
import { telegramAndroidDevice } from "../middleware/telegram-android-device";
import { telegramAuth } from "../middleware/telegram-auth";

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

    const getStickerSetResponse = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/getStickerSet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: emojiPack,
        }),
      },
    );
    if (!getStickerSetResponse.ok) {
      const data = (await getStickerSetResponse.json()) as {
        ok: false;
        error_code: number;
        description: string;
      };
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        data.description,
        data.error_code,
      );
    }
    const data = (await getStickerSetResponse.json()) as {
      ok: true;
      result: {
        stickers: {
          file_id: string;
          custom_emoji_id: string;
          is_animated: boolean;
          is_video: boolean;
        }[];
      };
    };

    const formattedEmojis = (
      await Promise.all(
        data.result.stickers.map(async (sticker) => {
          const getFileResponse = await fetch(
            `https://api.telegram.org/bot${env.BOT_TOKEN}/getFile?file_id=${sticker.file_id}`,
          );

          if (!getStickerSetResponse.ok) {
            return null;
          }

          const file = (await getFileResponse.json()) as
            | {
                ok: true;
                result: {
                  file_path: string;
                };
              }
            | {
                ok: false;
                error_code: number;
                description: string;
              };

          if ("ok" in file && !file.ok) {
            return null;
          }

          return {
            id: sticker.custom_emoji_id,
            file_path: file.result.file_path,
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
