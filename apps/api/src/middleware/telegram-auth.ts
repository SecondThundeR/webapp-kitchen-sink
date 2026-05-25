import { createMiddleware } from "hono/factory";
import { config } from "#root/config/index.js";
import { AppError } from "#root/errors/app-error.js";
import { ErrorCode } from "#root/errors/error-code.js";
import type { HonoEnv } from "#root/types.js";
import { validateInitData } from "#root/utils/validate-init-data.js";

export const telegramAuth = createMiddleware<HonoEnv>(async (c, next) => {
  let initData: string | undefined;

  const authHeader = c.req.header("Authorization");
  if (authHeader) {
    const match = authHeader.match(/^tma\s+(.+)$/i);
    if (match) initData = match[1];
  }

  if (!initData && c.req.method !== "GET" && c.req.method !== "HEAD") {
    try {
      const body = await c.req.json<{ initData?: string }>();
      initData = body.initData;
    } catch {
      // non-JSON or empty body will fail the initData check below
    }
  }

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
