import { Elysia } from "elysia";
import { AppError } from "../errors/app-error";
import { ErrorCode } from "../errors/error-code";
import { telegramAuth } from "../middleware/telegram-auth";

export const messageRoutes = new Elysia({ prefix: "/message" })
  .use(telegramAuth)
  .post(
    "/savePreparedInlineMessage",
    async ({ user }) => {
      const userId = user?.id;
      if (!userId) {
        return { id: null };
      }

      const savePreparedInlineMessageResponse = await fetch(
        `https://api.telegram.org/bot${Bun.env.BOT_TOKEN}/savePreparedInlineMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
          }),
        },
      );

      if (!savePreparedInlineMessageResponse.ok) {
        const data = (await savePreparedInlineMessageResponse.json()) as {
          ok: false;
          error_code: number;
          description: string;
        };

        throw new AppError(
          ErrorCode.VALIDATION_ERROR,
          data.description,
          data.error_code,
        );
      }

      const data = (await savePreparedInlineMessageResponse.json()) as {
        ok: true;
        result: {
          id: string;
          expiration_date: number;
        };
      };

      return { id: data.result.id };
    },
    { telegramAuth: true },
  );
