import { createMiddleware } from "hono/factory";
import type { HonoEnv, TelegramDeviceInfo } from "#root/types.ts";

const TG_UA_REGEX =
  /Telegram-Android\/([\d.]+)\s+\(([^;]+);\s+Android\s+([^;]+);\s+SDK\s+(\d+);\s+([A-Z]+)\)/;

export const telegramAndroidDevice = createMiddleware<HonoEnv>(
  async (c, next) => {
    const ua = c.req.header("user-agent") ?? "";
    const match = ua.match(TG_UA_REGEX);

    const deviceInfo: TelegramDeviceInfo = match
      ? {
          isTelegram: true,
          appVersion: match[1],
          deviceModel: match[2],
          androidVersion: match[3],
          sdkVersion: match[4] ? parseInt(match[4], 10) : undefined,
          performanceClass: match[5] as TelegramDeviceInfo["performanceClass"],
        }
      : { isTelegram: false };

    c.set("telegramAndroidDevice", deviceInfo);
    await next();
  },
);
