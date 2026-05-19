import { Hono } from "hono";
import { telegramAuth } from "#root/middleware/telegram-auth.ts";
import type { HonoEnv } from "#root/types.ts";
import { callTelegramMethod } from "#root/utils/telegram-api.ts";

export const buttonRoutes = new Hono<HonoEnv>().post(
  "/savePreparedKeyboardButton",
  telegramAuth,
  async (c) => {
    const user = c.get("user");
    if (!user?.id) {
      return c.json({ id: null });
    }

    const result = await callTelegramMethod<{ id: string }>(
      "savePreparedKeyboardButton",
      {
        user_id: user.id,
        button: {
          text: "Button",
          request_chat: {
            request_id: Math.floor(Date.now() / 1000),
            chat_is_channel: false,
            request_title: true,
            request_username: true,
            request_photo: true,
          },
        },
      },
    );

    return c.json({ id: result.id });
  },
);
