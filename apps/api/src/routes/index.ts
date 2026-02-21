import Elysia from "elysia";
import { authRoutes } from "./auth.routes";
import { healthRoutes } from "./health.routes";
import { invoiceRoutes } from "./invoice.routes";
import { messageRoutes } from "./message.routes";

export const routes = new Elysia({ prefix: "/api" })
  .use(authRoutes)
  .use(invoiceRoutes)
  .use(messageRoutes);

export { healthRoutes };
