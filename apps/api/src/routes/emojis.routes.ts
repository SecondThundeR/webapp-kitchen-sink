import { Readable } from "node:stream";
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import { createGunzip } from "node:zlib";
import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { config } from "#root/config/index.js";
import {
  EMOJI_CLIENT_CACHE_SECONDS,
  FILE_CACHE_CONTROL,
  TELEGRAM_FILE_TIMEOUT_MS,
} from "#root/constants.js";
import { AppError } from "#root/errors/app-error.js";
import { ErrorCode } from "#root/errors/error-code.js";
import { fileRateLimit } from "#root/middleware/rate-limit.js";
import { telegramAndroidDevice } from "#root/middleware/telegram-android-device.js";
import { telegramAuth } from "#root/middleware/telegram-auth.js";
import { fileQuery } from "#root/schemas/emojis.schemas.js";
import { getEmojiPack } from "#root/services/emoji.service.js";
import type { HonoEnv } from "#root/types.js";
import { logger } from "#root/utils/log.js";
import { validationHook } from "#root/utils/validation-hook.js";

const LOTTIE_EMOJI_PACK = "ApplicationEmoji";
const NON_LOTTIE_EMOJI_PACK = "NecoMoji";

export const emojisRoutes = new Hono<HonoEnv>()
  .get("/", telegramAndroidDevice, async (c) => {
    const device = c.var.telegramAndroidDevice;
    const isLowEnd =
      device.isTelegram &&
      (device.performanceClass === "LOW" ||
        device.performanceClass === "AVERAGE");
    const pack = isLowEnd ? NON_LOTTIE_EMOJI_PACK : LOTTIE_EMOJI_PACK;

    const emojis = await getEmojiPack(pack);

    c.header("Vary", "User-Agent");
    c.header("Cache-Control", `public, max-age=${EMOJI_CLIENT_CACHE_SECONDS}`);
    return c.json({ emojis });
  })
  .get(
    "/file",
    telegramAuth,
    fileRateLimit,
    vValidator("query", fileQuery, validationHook),
    async (c) => {
      const { path } = c.req.valid("query");
      const tgUrl = `https://api.telegram.org/file/bot${config.botToken}/${path}`;

      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(),
        TELEGRAM_FILE_TIMEOUT_MS,
      );
      const onClientAbort = () => controller.abort();
      c.req.raw.signal.addEventListener("abort", onClientAbort, { once: true });

      let response: Response;
      try {
        response = await fetch(tgUrl, { signal: controller.signal });
      } catch (err) {
        const aborted = err instanceof Error && err.name === "AbortError";
        logger.error(
          { path, aborted, reason: (err as Error).message },
          "Telegram file fetch failed",
        );
        throw new AppError(
          aborted
            ? ErrorCode.UPSTREAM_TIMEOUT_ERROR
            : ErrorCode.UPSTREAM_HTTP_ERROR,
          aborted ? "Upstream timed out" : "Failed to fetch from Telegram",
          aborted ? 504 : 502,
          { cause: err },
        );
      } finally {
        clearTimeout(timeout);
        c.req.raw.signal.removeEventListener("abort", onClientAbort);
      }

      if (!response.ok) {
        logger.error(
          { status: response.status, path },
          "Telegram file fetch non-ok",
        );
        throw new AppError(
          ErrorCode.UPSTREAM_HTTP_ERROR,
          "Failed to fetch from Telegram",
          response.status >= 400 && response.status < 600
            ? response.status
            : 502,
        );
      }

      if (path.endsWith(".tgs")) {
        if (!response.body) {
          throw new AppError(
            ErrorCode.UPSTREAM_HTTP_ERROR,
            "Empty upstream body",
            502,
          );
        }
        const gunzipStream = createGunzip();
        Readable.fromWeb(
          response.body as unknown as NodeReadableStream<Uint8Array>,
        ).pipe(gunzipStream);
        return new Response(
          Readable.toWeb(
            gunzipStream,
          ) as unknown as ReadableStream<Uint8Array>,
          {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": FILE_CACHE_CONTROL,
            },
          },
        );
      }

      if (path.endsWith(".webp")) {
        return new Response(response.body, {
          status: response.status,
          headers: {
            "Content-Type": "image/webp",
            "Cache-Control": FILE_CACHE_CONTROL,
          },
        });
      }

      if (path.endsWith(".webm")) {
        return new Response(response.body, {
          status: response.status,
          headers: {
            "Content-Type": "video/webm",
            "Cache-Control": FILE_CACHE_CONTROL,
          },
        });
      }

      return response;
    },
  );
