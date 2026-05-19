import type { Context } from "hono";
import type * as v from "valibot";
import { ErrorCode } from "#root/errors/error-code.ts";

export function validationHook(
  result: v.SafeParseResult<v.GenericSchema>,
  c: Context,
) {
  if (!result.success) {
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
