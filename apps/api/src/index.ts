import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { requestId } from "hono/request-id";
import { config } from "./config/index.ts";
import { MAX_BODY_BYTES } from "./constants.ts";
import { errorHandler, notFoundHandler } from "./errors/handlers.ts";
import { globalRateLimit } from "./middleware/rate-limit.ts";
import { structuredLogger } from "./middleware/structured-logger.ts";
import { healthRoutes, routes } from "./routes/index.ts";
import type { HonoEnv } from "./types.ts";
import { logger } from "./utils/log.ts";

const app = new Hono<HonoEnv>()
  .use(requestId())
  .use(structuredLogger)
  .use(
    cors({
      origin: [config.frontendUrl],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "DELETE", "PUT"],
    }),
  )
  .use(csrf({ origin: [config.frontendUrl] }))
  .route("/", healthRoutes)
  .use("/api/v1/*", bodyLimit({ maxSize: MAX_BODY_BYTES }))
  .use("/api/v1/*", globalRateLimit)
  .route("/api/v1", routes);

app.notFound(notFoundHandler);
app.onError(errorHandler);

serve(
  { fetch: app.fetch, port: config.port, hostname: "0.0.0.0" },
  ({ address, port }) => {
    logger.info({ address, port }, "API listening");
  },
);

export type App = typeof app;
