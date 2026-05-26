import { callTelegramMethod } from "#root/utils/telegram-api.js";

type PreparedKeyboardButton = { id: string };

export async function savePreparedKeyboardButton(userId: number) {
  return callTelegramMethod<PreparedKeyboardButton>(
    "savePreparedKeyboardButton",
    {
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
    },
  );
}
