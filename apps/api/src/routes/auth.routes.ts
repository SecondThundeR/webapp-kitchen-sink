import { Hono } from "hono";
import { telegramAuth } from "#root/middleware/telegram-auth.ts";
import type { HonoEnv } from "#root/types.ts";

export const authRoutes = new Hono<HonoEnv>().post(
  "/init",
  telegramAuth,
  async (c) => {
    const user = c.get("user");
    return c.json({ success: Boolean(user?.id) });
  },
);
