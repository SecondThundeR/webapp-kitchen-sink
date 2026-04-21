import Elysia from "elysia";
import { authRoutes } from "./auth.routes";
import { buttonRoutes } from "./button.routes";
import { emojisRoutes } from "./emojis.routes";
import { healthRoutes } from "./health.routes";
import { invoiceRoutes } from "./invoice.routes";
import { messageRoutes } from "./message.routes";

export const routes = new Elysia({ prefix: "/api" })
  .use(authRoutes)
  .use(invoiceRoutes)
  .use(messageRoutes)
  .use(emojisRoutes)
  .use(buttonRoutes);

export { healthRoutes };
