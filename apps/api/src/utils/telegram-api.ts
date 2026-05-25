import { config } from "#root/config/index.js";
import { AppError } from "#root/errors/app-error.js";
import { ErrorCode } from "#root/errors/error-code.js";

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

function toHttpStatus(code: number): number {
  return code >= 400 && code < 600 ? code : 502;
}

export async function callTelegramMethod<TResult>(
  method: string,
  body: Record<string, unknown>,
) {
  const response = await fetch(
    `https://api.telegram.org/bot${config.botToken}/${method}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    console.error(
      `Telegram ${method} HTTP ${response.status}:`,
      await response.text().catch(() => "<no body>"),
    );
    throw new AppError(
      ErrorCode.UNKNOWN_ERROR,
      "Upstream request failed",
      toHttpStatus(response.status),
    );
  }

  const data = (await response.json()) as TelegramResponse<TResult>;

  if (isTelegramFailure(data)) {
    console.error(
      `Telegram ${method} error ${data.error_code}: ${data.description}`,
    );
    throw new AppError(
      ErrorCode.UNKNOWN_ERROR,
      "Telegram API error",
      toHttpStatus(data.error_code),
    );
  }

  return data.result;
}

export async function getTelegramFile(fileId: string) {
  const response = await fetch(
    `https://api.telegram.org/bot${config.botToken}/getFile?file_id=${fileId}`,
  );

  const data = (await response.json()) as TelegramResponse<{
    file_path: string;
  }>;

  if (!response.ok || isTelegramFailure(data)) {
    return null;
  }

  return data.result;
}
