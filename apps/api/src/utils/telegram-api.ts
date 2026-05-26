import { config } from "#root/config/index.js";
import { TELEGRAM_TIMEOUT_MS } from "#root/constants.js";
import { AppError } from "#root/errors/app-error.js";
import { ErrorCode } from "#root/errors/error-code.js";
import { logger, truncate } from "./log.ts";

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

function isAbortError(err: unknown): boolean {
  return err instanceof Error && err.name === "AbortError";
}

export async function callTelegramMethod<TResult>(
  method: string,
  body: Record<string, unknown>,
) {
  let response: Response;
  try {
    response = await fetch(
      `https://api.telegram.org/bot${config.botToken}/${method}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
      },
    );
  } catch (err) {
    if (isAbortError(err)) {
      logger.error({ method }, "Telegram request timed out");
      throw new AppError(
        ErrorCode.UPSTREAM_TIMEOUT_ERROR,
        "Upstream request timed out",
        504,
        { cause: err },
      );
    }
    logger.error(
      { method, reason: (err as Error).message },
      "Telegram request failed",
    );
    throw new AppError(
      ErrorCode.UPSTREAM_HTTP_ERROR,
      "Upstream request failed",
      502,
      { cause: err },
    );
  }

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "<no body>");
    logger.error(
      { method, status: response.status, body: truncate(bodyText) },
      "Telegram HTTP error",
    );
    throw new AppError(
      ErrorCode.UPSTREAM_HTTP_ERROR,
      "Upstream request failed",
      toHttpStatus(response.status),
    );
  }

  const data = (await response.json()) as TelegramResponse<TResult>;

  if (isTelegramFailure(data)) {
    logger.error(
      {
        method,
        errorCode: data.error_code,
        description: truncate(data.description),
      },
      "Telegram API error",
    );
    throw new AppError(
      ErrorCode.TELEGRAM_UPSTREAM_ERROR,
      "Telegram API error",
      toHttpStatus(data.error_code),
    );
  }

  return data.result;
}

export async function getTelegramFile(fileId: string) {
  let response: Response;
  try {
    response = await fetch(
      `https://api.telegram.org/bot${config.botToken}/getFile?file_id=${fileId}`,
      { signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS) },
    );
  } catch (err) {
    logger.warn(
      { fileId, reason: (err as Error).message },
      "Telegram getFile fetch failed",
    );
    return null;
  }

  const data = (await response.json().catch(() => null)) as TelegramResponse<{
    file_path: string;
  }> | null;

  if (!response.ok || !data || isTelegramFailure(data)) {
    logger.warn({ fileId, status: response.status }, "Telegram getFile non-ok");
    return null;
  }

  return data.result;
}
