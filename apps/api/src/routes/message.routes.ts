import { Hono } from "hono";
import { requireUser } from "#root/middleware/require-user.js";
import { telegramAuth } from "#root/middleware/telegram-auth.js";
import { savePreparedInlineMessage } from "#root/services/message.service.js";
import type { HonoEnv } from "#root/types.js";

export const messageRoutes = new Hono<HonoEnv>().post(
  "/prepared",
  telegramAuth,
  requireUser,
  async (c) => {
    const result = await savePreparedInlineMessage(c.var.user.id);
    return c.json({ id: result.id });
  },
);
