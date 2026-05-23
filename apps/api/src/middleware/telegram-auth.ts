import { createMiddleware } from "hono/factory";
import { config } from "#root/config/index.ts";
import { AppError } from "#root/errors/app-error.ts";
import { ErrorCode } from "#root/errors/error-code.ts";
import type { HonoEnv } from "#root/types.ts";
import { validateInitData } from "#root/utils/validate-init-data.ts";

export const telegramAuth = createMiddleware<
  HonoEnv,
  string,
  { in: { json: { initData: string } } }
>(async (c, next) => {
  let body: { initData?: string } = {};
  try {
    body = await c.req.json<{ initData?: string }>();
  } catch {
    // non-JSON or empty body — will fail the initData check below
  }

  if (!body.initData) {
    throw new AppError(
      ErrorCode.MISSING_INIT_DATA_ERROR,
      "Missing initData",
      401,
    );
  }

  const result = validateInitData(body.initData, config.botToken);
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
