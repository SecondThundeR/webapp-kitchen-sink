import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { rateLimiter } from "hono-rate-limiter";
import { config } from "./config/index.ts";
import { AppError } from "./errors/app-error.ts";
import { ErrorCode } from "./errors/error-code.ts";
import { healthRoutes, routes } from "./routes/index.ts";
import type { HonoEnv } from "./types.ts";

const clientKey = (c: {
  req: { header: (name: string) => string | undefined };
}) =>
  c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
  c.req.header("x-real-ip") ??
  "unknown";

const globalLimiter = rateLimiter<HonoEnv>({
  windowMs: 60_000,
  limit: 120,
  standardHeaders: "draft-7",
  keyGenerator: clientKey,
});

const app = new Hono<HonoEnv>()
  .use(
    cors({
      origin: [config.frontendUrl],
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
  .use(globalLimiter)
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
  { fetch: app.fetch, port: config.port, hostname: "0.0.0.0" },
  ({ address, port }) => {
    console.log(`@webapp-kitchen-sink/api is running at ${address}:${port}`);
  },
);

export type App = typeof app;
