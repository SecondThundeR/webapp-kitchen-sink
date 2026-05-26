import { getConnInfo } from "@hono/node-server/conninfo";
import type { Context } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import {
  RATE_LIMIT_FILES_MAX,
  RATE_LIMIT_GLOBAL_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "#root/constants.js";
import type { HonoEnv } from "#root/types.js";

function clientKey(c: Context<HonoEnv>): string {
  const userId = c.var.user?.id;
  if (userId) return `u:${userId}`;
  return `ip:${getConnInfo(c).remote.address ?? "unknown"}`;
}

export const globalRateLimit = rateLimiter<HonoEnv>({
  windowMs: RATE_LIMIT_WINDOW_MS,
  limit: RATE_LIMIT_GLOBAL_MAX,
  standardHeaders: "draft-7",
  keyGenerator: clientKey,
});

export const fileRateLimit = rateLimiter<HonoEnv>({
  windowMs: RATE_LIMIT_WINDOW_MS,
  limit: RATE_LIMIT_FILES_MAX,
  standardHeaders: "draft-7",
  keyGenerator: clientKey,
});
