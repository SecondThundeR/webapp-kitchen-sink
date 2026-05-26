import { createMiddleware } from "hono/factory";
import { AppError } from "#root/errors/app-error.js";
import { ErrorCode } from "#root/errors/error-code.js";
import type { AuthedEnv } from "#root/types.js";

export const requireUser = createMiddleware<AuthedEnv>(async (c, next) => {
  if (!c.var.user) {
    throw new AppError(ErrorCode.INIT_DATA_ERROR, "User payload missing", 401);
  }
  await next();
});
