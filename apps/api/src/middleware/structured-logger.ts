import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "#root/types.js";
import { logger } from "#root/utils/log.js";

export const structuredLogger = createMiddleware<HonoEnv>(async (c, next) => {
  const start = Date.now();
  await next();
  logger.info(
    {
      requestId: c.get("requestId"),
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      durationMs: Date.now() - start,
    },
    "request",
  );
});
