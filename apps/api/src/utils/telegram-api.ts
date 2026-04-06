import { env } from "../config/env";
import { AppError } from "../errors/app-error";
import { ErrorCode } from "../errors/error-code";

type TelegramSuccess<TResult> = {
  ok: true;
  result: TResult;
};

type TelegramFailure = {
  ok: false;
  error_code: number;
  description: string;
};

type TelegramResponse<TResult> = TelegramSuccess<TResult> | TelegramFailure;

function isTelegramFailure<TResult>(
  data: TelegramResponse<TResult>,
): data is TelegramFailure {
  return data.ok === false;
}

export async function callTelegramMethod<TResult>(
  method: string,
  body: Record<string, unknown>,
) {
  const response = await fetch(
    `https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new AppError(
      ErrorCode.UNKNOWN_ERROR,
      await response.text(),
      response.status,
    );
  }

  const data = (await response.json()) as TelegramResponse<TResult>;

  if (isTelegramFailure(data)) {
    throw new AppError(
      ErrorCode.VALIDATION_ERROR,
      data.description,
      data.error_code,
    );
  }

  return data.result;
}

export async function getTelegramFile(fileId: string) {
  const response = await fetch(
    `https://api.telegram.org/bot${env.BOT_TOKEN}/getFile?file_id=${fileId}`,
  );

  const data = (await response.json()) as TelegramResponse<{
    file_path: string;
  }>;

  if (!response.ok || isTelegramFailure(data)) {
    return null;
  }

  return data.result;
}
