import { randomUUID } from "node:crypto";
import { callTelegramMethod } from "#root/utils/telegram-api.js";

type PreparedInlineMessage = {
  id: string;
  expiration_date: number;
};

export async function savePreparedInlineMessage(userId: number) {
  return callTelegramMethod<PreparedInlineMessage>(
    "savePreparedInlineMessage",
    {
      user_id: userId,
      result: {
        type: "article",
        id: randomUUID(),
        title: "Check out my Web App!",
        input_message_content: {
          message_text: "This is a shared message from my Mini App!",
        },
      },
      allow_user_chats: true,
      allow_bot_chats: true,
      allow_group_chats: true,
      allow_channel_chats: true,
    },
  );
}
