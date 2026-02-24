import { Elysia } from "elysia";

export interface TelegramDeviceInfo {
  isTelegram: boolean;
  appVersion?: string;
  deviceModel?: string;
  androidVersion?: string;
  sdkVersion?: number;
  performanceClass?: "LOW" | "AVERAGE" | "HIGH";
}

const TG_UA_REGEX =
  /Telegram-Android\/([\d.]+)\s+\(([^;]+);\s+Android\s+([^;]+);\s+SDK\s+(\d+);\s+([A-Z]+)\)/;

export const telegramAndroidDevice = new Elysia({
  name: "telegram-android-ua",
}).derive(
  { as: "global" },
  ({ request }): { telegramAndroidDevice: TelegramDeviceInfo } => {
    const ua = request.headers.get("user-agent") || "";
    const match = ua.match(TG_UA_REGEX);

    if (!match) {
      return { telegramAndroidDevice: { isTelegram: false } };
    }

    return {
      telegramAndroidDevice: {
        isTelegram: true,
        appVersion: match[1],
        deviceModel: match[2],
        androidVersion: match[3],
        sdkVersion: match[4] ? parseInt(match[4], 10) : undefined,
        performanceClass: match[5] as TelegramDeviceInfo["performanceClass"],
      },
    };
  },
);
