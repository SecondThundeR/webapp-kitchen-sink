import { Hono } from "hono";
import { requireUser } from "#root/middleware/require-user.js";
import { telegramAuth } from "#root/middleware/telegram-auth.js";
import type { HonoEnv } from "#root/types.js";

export const authRoutes = new Hono<HonoEnv>().get(
  "/validate",
  telegramAuth,
  requireUser,
  async (c) => {
    const user = c.var.user;
    return c.json({ user });
  },
);
