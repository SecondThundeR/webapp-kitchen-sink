import type { ErrorCode } from "./error-code.ts";

export interface AppErrorOptions {
  details?: unknown;
  cause?: unknown;
}

export class AppError extends Error {
  public code: ErrorCode;
  public status: number;
  public details?: unknown;

  constructor(
    code: ErrorCode,
    message: string,
    status = 400,
    options: AppErrorOptions = {},
  ) {
    super(message, { cause: options.cause });
    this.code = code;
    this.status = status;
    this.details = options.details;
  }
}
