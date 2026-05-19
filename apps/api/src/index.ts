import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./config/env.ts";
import { AppError } from "./errors/app-error.ts";
import { ErrorCode } from "./errors/error-code.ts";
import { healthRoutes, routes } from "./routes/index.ts";
import type { HonoEnv } from "./types.ts";

const app = new Hono<HonoEnv>()
  .use(
    cors({
      origin: [env.FRONTEND_URL],
      allowHeaders: [
        "Content-Type",
        "Authorization",
        "Referrer-Policy",
        "user-agent",
      ],
      allowMethods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    }),
  )
  .route("/", healthRoutes)
  .route("/api", routes);

app.onError((err, c) => {
  if (err instanceof AppError) {
    return c.json(
      {
        success: false,
        code: err.code,
        message: err.message,
        details: err.details ?? null,
      },
      err.status as 400,
    );
  }

  console.error(err);
  return c.json(
    {
      success: false,
      code: ErrorCode.UNKNOWN_ERROR,
      message: "Internal Server Error",
    },
    500,
  );
});

serve(
  { fetch: app.fetch, port: env.PORT, hostname: "0.0.0.0" },
  ({ address, port }) => {
    console.log(`@webapp-kitchen-sink/api is running at ${address}:${port}`);
  },
);

export type App = typeof app;
