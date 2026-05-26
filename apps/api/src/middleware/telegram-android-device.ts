import { createMiddleware } from "hono/factory";
import type { PerformanceClass } from "#root/schemas/device.schemas.js";
import type { HonoEnv, TelegramDeviceInfo } from "#root/types.js";

const TG_UA_REGEX =
  /Telegram-Android\/([\d.]+)\s+\(([^;]+);\s+Android\s+([^;]+);\s+SDK\s+(\d+);\s+([A-Z]+)\)/;

function toPerformanceClass(raw: string | undefined): PerformanceClass | undefined {
  return raw === "LOW" || raw === "AVERAGE" || raw === "HIGH" ? raw : undefined;
}

export const telegramAndroidDevice = createMiddleware<HonoEnv>(
  async (c, next) => {
    const ua = c.req.header("user-agent") ?? "";
    const match = ua.match(TG_UA_REGEX);

    if (!match) {
      c.set("telegramAndroidDevice", { isTelegram: false });
      await next();
      return;
    }

    const deviceInfo: TelegramDeviceInfo = {
      isTelegram: true,
      appVersion: match[1],
      deviceModel: match[2],
      androidVersion: match[3],
      sdkVersion: match[4] ? parseInt(match[4], 10) : undefined,
      performanceClass: toPerformanceClass(match[5]),
    };

    c.set("telegramAndroidDevice", deviceInfo);
    await next();
  },
);
