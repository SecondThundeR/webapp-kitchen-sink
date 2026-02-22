import { Elysia } from "elysia";
import { env } from "../config/env";
import { AppError } from "../errors/app-error";
import { ErrorCode } from "../errors/error-code";
import { telegramAuth } from "../middleware/telegram-auth";
import {
  invoiceRequestBodySchema,
  starsInvoiceRequestBodySchema,
} from "../schemas/invoice.schemas";

export const invoiceRoutes = new Elysia({ prefix: "/invoice" })
  .use(telegramAuth)
  .post(
    "/create",
    async ({ user, body }) => {
      const { initData, ...requestBody } = body;
      const userId = user?.id;
      if (!userId) {
        return { url: "" };
      }

      const createInvoiceLinkResponse = await fetch(
        `https://api.telegram.org/bot${env.BOT_TOKEN}/createInvoiceLink`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...requestBody,
            payload: `regular-order-${Date.now()}`,
            provider_token: env.PAYMENT_PROVIDER_TOKEN,
          }),
        },
      );

      if (!createInvoiceLinkResponse.ok) {
        const data = (await createInvoiceLinkResponse.json()) as {
          ok: false;
          error_code: number;
          description: string;
        };

        throw new AppError(
          ErrorCode.VALIDATION_ERROR,
          data.description,
          data.error_code,
        );
      }

      const data = (await createInvoiceLinkResponse.json()) as {
        ok: true;
        result: string;
      };

      return { url: data.result };
    },
    { body: invoiceRequestBodySchema, telegramAuth: true },
  )
  .post(
    "/createWithStars",
    async ({ user, body }) => {
      const { initData, ...requestBody } = body;
      const userId = user?.id;
      if (!userId) {
        return { url: "" };
      }

      const createInvoiceLinkResponse = await fetch(
        `https://api.telegram.org/bot${env.BOT_TOKEN}/createInvoiceLink`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...requestBody,
            payload: `stars-order-${Date.now()}`,
            currency: "XTR",
          }),
        },
      );

      if (!createInvoiceLinkResponse.ok) {
        const data = (await createInvoiceLinkResponse.json()) as {
          ok: false;
          error_code: number;
          description: string;
        };

        throw new AppError(
          ErrorCode.VALIDATION_ERROR,
          data.description,
          data.error_code,
        );
      }

      const data = (await createInvoiceLinkResponse.json()) as {
        ok: true;
        result: string;
      };

      return { url: data.result };
    },
    { body: starsInvoiceRequestBodySchema, telegramAuth: true },
  );
