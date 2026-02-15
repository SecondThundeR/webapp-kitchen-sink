import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { env } from "./config/env";
import { AppError } from "./errors/app-error";
import { ErrorCode } from "./errors/error-code";
import { healthRoutes, routes } from "./routes";

const app = new Elysia()
  .use(
    cors({
      origin: [env.FRONTEND_URL],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Referrer-Policy",
        "user-agent",
      ],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    }),
  )
  .error({
    AppError,
  })
  .onError(async (context) => {
    const { code, error, set } = context;
    if (error instanceof AppError) {
      set.status = error.status;
      return {
        success: false,
        code: error.code,
        message: error.message,
        details: error.details,
      };
    }

    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        code: ErrorCode.VALIDATION_ERROR,
        message: "Validation failed",
        details: error.all,
      };
    }

    set.status = 500;
    return {
      success: false,
      code: ErrorCode.UNKNOWN_ERROR,
      message: "Internal Server Error",
    };
  })
  .use(healthRoutes)
  .use(routes)
  .listen({ port: env.PORT, hostname: "0.0.0.0" });

console.log(
  `🦊 @webapp-kitchen-sink/api is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
