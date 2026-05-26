import { Hono } from "hono";
import { requireUser } from "#root/middleware/require-user.js";
import { telegramAuth } from "#root/middleware/telegram-auth.js";
import { savePreparedKeyboardButton } from "#root/services/button.service.js";
import type { HonoEnv } from "#root/types.js";

export const buttonRoutes = new Hono<HonoEnv>().post(
  "/prepared",
  telegramAuth,
  requireUser,
  async (c) => {
    const result = await savePreparedKeyboardButton(c.var.user.id);
    return c.json({ id: result.id });
  },
);
