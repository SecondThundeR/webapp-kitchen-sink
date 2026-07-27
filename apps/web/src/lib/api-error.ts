interface ApiErrorBody {
  success: false;
  code: string;
  message: string;
  details?: unknown;
}

const UNKNOWN_ERROR_CODE = "UNKNOWN_ERROR";

const isApiErrorBody = (body: unknown): body is ApiErrorBody =>
  typeof body === "object" &&
  body !== null &&
  "code" in body &&
  typeof body.code === "string" &&
  "message" in body &&
  typeof body.message === "string";

interface JsonResponse {
  readonly status: number;
  json(): Promise<unknown>;
}

interface ApiErrorOptions {
  status: number;
  code: string;
  details?: unknown;
  cause?: unknown;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: unknown;

  constructor(message: string, options: ApiErrorOptions) {
    super(message, { cause: options.cause });
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }

  static async fromResponse(res: JsonResponse): Promise<ApiError> {
    const fallbackMessage = `Request failed with status ${res.status}`;

    let body: unknown;
    try {
      body = await res.json();
    } catch (cause) {
      return new ApiError(fallbackMessage, {
        status: res.status,
        code: UNKNOWN_ERROR_CODE,
        cause,
      });
    }

    if (isApiErrorBody(body)) {
      return new ApiError(body.message, {
        status: res.status,
        code: body.code,
        details: body.details,
      });
    }

    return new ApiError(fallbackMessage, {
      status: res.status,
      code: UNKNOWN_ERROR_CODE,
      details: body,
    });
  }
}
