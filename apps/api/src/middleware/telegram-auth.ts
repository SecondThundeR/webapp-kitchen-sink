import { createMiddleware } from "hono/factory";
import { config } from "#root/config/index.js";
import { AppError } from "#root/errors/app-error.js";
import { ErrorCode } from "#root/errors/error-code.js";
import type { HonoEnv } from "#root/types.js";
import { validateInitData } from "#root/utils/validate-init-data.js";

const AUTH_SCHEME = /^tma\s+(.+)$/i;

export const telegramAuth = createMiddleware<HonoEnv>(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  const match = authHeader?.match(AUTH_SCHEME);
  const initData = match?.[1];

  if (!initData) {
    throw new AppError(
      ErrorCode.MISSING_INIT_DATA_ERROR,
      "Missing initData",
      401,
    );
  }

  const result = validateInitData(initData, config.botToken);
  if (!result.valid) {
    throw new AppError(
      ErrorCode.INIT_DATA_ERROR,
      result.error ?? "Validation failed",
      401,
    );
  }

  c.set("user", result.user);
  await next();
});
