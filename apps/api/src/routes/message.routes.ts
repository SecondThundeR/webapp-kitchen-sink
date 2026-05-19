import { Hono } from "hono";
import { telegramAuth } from "#root/middleware/telegram-auth.ts";
import type { HonoEnv } from "#root/types.ts";
import { callTelegramMethod } from "#root/utils/telegram-api.ts";

export const messageRoutes = new Hono<HonoEnv>().post(
  "/savePreparedInlineMessage",
  telegramAuth,
  async (c) => {
    const user = c.get("user");
    if (!user?.id) {
      return c.json({ id: null });
    }

    const result = await callTelegramMethod<{
      id: string;
      expiration_date: number;
    }>("savePreparedInlineMessage", {
      user_id: user.id,
      result: {
        type: "article",
        id: "test_123",
        title: "Check out my Web App!",
        input_message_content: {
          message_text: "This is a shared message from my Mini App!",
        },
      },
      allow_user_chats: true,
      allow_bot_chats: true,
      allow_group_chats: true,
      allow_channel_chats: true,
    });

    return c.json({ id: result.id });
  },
);
