import { Elysia } from "elysia";
import { env } from "../config/env";
import { telegramAuth } from "../middleware/telegram-auth";
import {
  invoiceRequestBodySchema,
  starsInvoiceRequestBodySchema,
} from "../schemas/invoice.schemas";
import { callTelegramMethod } from "../utils/telegram-api";

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

      const url = await callTelegramMethod<string>("createInvoiceLink", {
        ...requestBody,
        payload: `regular-order-${Date.now()}`,
        provider_token: env.PAYMENT_PROVIDER_TOKEN,
      });

      return { url };
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

      const url = await callTelegramMethod<string>("createInvoiceLink", {
        ...requestBody,
        payload: `stars-order-${Date.now()}`,
        currency: "XTR",
      });

      return { url };
    },
    { body: starsInvoiceRequestBodySchema, telegramAuth: true },
  );
