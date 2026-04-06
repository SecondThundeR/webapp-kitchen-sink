import { Elysia } from "elysia";
import { telegramAuth } from "../middleware/telegram-auth";
import { callTelegramMethod } from "../utils/telegram-api";

export const messageRoutes = new Elysia({ prefix: "/message" })
  .use(telegramAuth)
  .post(
    "/savePreparedInlineMessage",
    async ({ user }) => {
      const userId = user?.id;
      if (!userId) {
        return { id: null };
      }

      const result = await callTelegramMethod<{
        id: string;
        expiration_date: number;
      }>("savePreparedInlineMessage", {
        user_id: userId,
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

      return { id: result.id };
    },
    { telegramAuth: true },
  );
