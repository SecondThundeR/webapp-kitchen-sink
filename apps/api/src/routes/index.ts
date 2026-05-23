import { Hono } from "hono";
import type { HonoEnv } from "#root/types.js";
import { authRoutes } from "./auth.routes.ts";
import { buttonRoutes } from "./button.routes.ts";
import { emojisRoutes } from "./emojis.routes.ts";
import { healthRoutes } from "./health.routes.ts";
import { invoiceRoutes } from "./invoice.routes.ts";
import { messageRoutes } from "./message.routes.ts";

export const routes = new Hono<HonoEnv>()
  .route("/auth", authRoutes)
  .route("/invoice", invoiceRoutes)
  .route("/message", messageRoutes)
  .route("/emojis", emojisRoutes)
  .route("/button", buttonRoutes);

export { healthRoutes };
