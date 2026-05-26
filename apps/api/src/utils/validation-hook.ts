import type { Context } from "hono";
import type { GenericSchema, SafeParseResult } from "valibot";
import { ErrorCode } from "#root/errors/error-code.js";
import { logger } from "./log.ts";

export function validationHook(
  result: SafeParseResult<GenericSchema>,
  c: Context,
) {
  if (!result.success) {
    logger.warn(
      {
        requestId: c.get("requestId"),
        path: c.req.path,
        method: c.req.method,
        issues: result.issues,
      },
      "Validation failed",
    );
    return c.json(
      {
        success: false,
        code: ErrorCode.VALIDATION_ERROR,
        message: "Validation failed",
        details: result.issues,
      },
      400 as const,
    );
  }
}
