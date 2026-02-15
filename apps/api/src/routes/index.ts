import Elysia from "elysia";
import { authRoutes } from "./auth.routes";
import { healthRoutes } from "./health.routes";

export const routes = new Elysia({ prefix: "/api" }).use(authRoutes);

export { healthRoutes };
