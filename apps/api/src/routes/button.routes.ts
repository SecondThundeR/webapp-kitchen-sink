import { Elysia } from "elysia";
import { telegramAuth } from "../middleware/telegram-auth";
import { callTelegramMethod } from "../utils/telegram-api";

export const buttonRoutes = new Elysia({ prefix: "/button" })
  .use(telegramAuth)
  .post(
    "/savePreparedKeyboardButton",
    async ({ user }) => {
      const userId = user?.id;
      if (!userId) {
        return { id: null };
      }

      const result = await callTelegramMethod<{
        id: string;
      }>("savePreparedKeyboardButton", {
        user_id: userId,
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
      });

      return { id: result.id };
    },
    { telegramAuth: true },
  );
