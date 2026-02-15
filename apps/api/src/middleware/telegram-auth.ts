import { Elysia } from "elysia";
import { env } from "../config/env";
import { AppError } from "../errors/app-error";
import { ErrorCode } from "../errors/error-code";
import { validateInitData } from "../utils/validate-init-data";

export const telegramAuth = new Elysia({ name: "telegramAuth" })
  .derive({ as: "global" }, () => ({
    botToken: env.BOT_TOKEN,
  }))
  .macro({
    telegramAuth: {
      resolve: ({ body, botToken }) => {
        const initData = (body as { initData?: string })?.initData;
        if (!initData) {
          throw new AppError(
            ErrorCode.MISSING_INIT_DATA_ERROR,
            "Missing initData",
            401,
          );
        }

        const result = validateInitData(initData, botToken);
        if (!result.valid) {
          throw new AppError(
            ErrorCode.INIT_DATA_ERROR,
            result.error || "Validation failed",
            401,
          );
        }

        return { user: result.user };
      },
    },
  });
