import { Elysia } from "elysia";
import { telegramAuth } from "../middleware/telegram-auth";
import { initDataSchema } from "../schemas/base.schemas";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(telegramAuth)
  .post(
    "/init",
    async ({ user }) => {
      const userId = user?.id;
      if (!userId) {
        return { success: false };
      }

      return { success: true };
    },
    { body: initDataSchema, telegramAuth: true },
  );
