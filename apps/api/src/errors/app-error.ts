import type { ErrorCode } from "./error-code";

export class AppError extends Error {
  public code: ErrorCode;
  public status: number;
  public details?: unknown;

  constructor(
    code: ErrorCode,
    message: string,
    status = 400,
    details?: unknown,
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}
