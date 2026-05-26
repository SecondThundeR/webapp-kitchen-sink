import type { ErrorHandler, NotFoundHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { HonoEnv } from "#root/types.js";
import { logger, serializeCauseChain } from "#root/utils/log.js";
import { AppError } from "./app-error.ts";
import { ErrorCode } from "./error-code.ts";

export const notFoundHandler: NotFoundHandler<HonoEnv> = (c) =>
  c.json(
    {
      success: false,
      code: ErrorCode.NOT_FOUND,
      message: "Route not found",
    },
    404,
  );

export const errorHandler: ErrorHandler<HonoEnv> = (err, c) => {
  const base = {
    requestId: c.get("requestId"),
    method: c.req.method,
    path: c.req.path,
  };

  if (err instanceof AppError) {
    logger.warn(
      {
        ...base,
        code: err.code,
        status: err.status,
        cause: serializeCauseChain(err.cause),
      },
      err.message,
    );
    return c.json(
      {
        success: false,
        code: err.code,
        message: err.message,
        details: err.details ?? null,
      },
      err.status as ContentfulStatusCode,
    );
  }

  logger.error(
    {
      ...base,
      stack: err.stack,
      cause: serializeCauseChain((err as { cause?: unknown }).cause),
    },
    err.message || "Unhandled error",
  );

  return c.json(
    {
      success: false,
      code: ErrorCode.UNKNOWN_ERROR,
      message: "Internal Server Error",
    },
    500,
  );
};
