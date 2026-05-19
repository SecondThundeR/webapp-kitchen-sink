export const ErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  MISSING_INIT_DATA_ERROR: "MISSING_INIT_DATA_ERROR",
  INIT_DATA_ERROR: "INIT_DATA_ERROR",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
