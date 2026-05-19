import type { User } from "./utils/validate-init-data.ts";

export type { User };

export interface TelegramDeviceInfo {
  isTelegram: boolean;
  appVersion?: string;
  deviceModel?: string;
  androidVersion?: string;
  sdkVersion?: number;
  performanceClass?: "LOW" | "AVERAGE" | "HIGH";
}

export type Variables = {
  user: User | undefined;
  telegramAndroidDevice: TelegramDeviceInfo;
};

export type HonoEnv = {
  Variables: Variables;
};
