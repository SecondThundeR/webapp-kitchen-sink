import type { RequestIdVariables } from "hono/request-id";
import type { TelegramDeviceInfo } from "./schemas/device.schemas.ts";
import type { User } from "./schemas/user.schemas.ts";

export type { TelegramDeviceInfo, User };

export type Variables = RequestIdVariables & {
  user: User | undefined;
  telegramAndroidDevice: TelegramDeviceInfo;
};

export type HonoEnv = {
  Variables: Variables;
};

export type AuthedEnv = {
  Variables: Omit<Variables, "user"> & { user: User };
};
