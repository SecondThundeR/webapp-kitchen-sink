import { Hono } from "hono";
import { telegramAuth } from "#root/middleware/telegram-auth.js";
import type { HonoEnv } from "#root/types.js";

export const authRoutes = new Hono<HonoEnv>().post(
  "/init",
  telegramAuth,
  async (c) => {
    const user = c.get("user");
    return c.json({ success: Boolean(user?.id) });
  },
);
