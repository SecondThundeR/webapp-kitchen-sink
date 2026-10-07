import type { Context, TypedResponse } from "hono";
import type { JSONParsed } from "hono/utils/types";
import type { GenericSchema, SafeParseResult } from "valibot";
import { ErrorCode } from "#root/errors/error-code.js";
import { logger } from "./log.ts";

type ValidationErrorResponse = Response &
  TypedResponse<
    {
      success: false;
      code: typeof ErrorCode.VALIDATION_ERROR;
      message: string;
      details: JSONParsed<
        NonNullable<SafeParseResult<GenericSchema>["issues"]>
      >;
    },
    400,
    "json"
  >;

export function validationHook(
  result: SafeParseResult<GenericSchema>,
  c: Context,
): ValidationErrorResponse | undefined {
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
