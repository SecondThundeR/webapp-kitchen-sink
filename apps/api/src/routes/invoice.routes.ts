import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { env } from "#root/config/env.ts";
import { telegramAuth } from "#root/middleware/telegram-auth.ts";
import {
  regularInvoiceSchema,
  starsInvoiceSchema,
} from "#root/schemas/invoice.schemas.ts";
import type { HonoEnv } from "#root/types.ts";
import { callTelegramMethod } from "#root/utils/telegram-api.ts";
import { validationHook } from "#root/utils/validation-hook.ts";

export const invoiceRoutes = new Hono<HonoEnv>()
  .post(
    "/create",
    telegramAuth,
    vValidator("json", regularInvoiceSchema, validationHook),
    async (c) => {
      const requestBody = c.req.valid("json");
      const user = c.get("user");
      if (!user?.id) {
        return c.json({ url: "" });
      }

      const url = await callTelegramMethod<string>("createInvoiceLink", {
        ...requestBody,
        payload: `regular-order-${Date.now()}`,
        provider_token: env.PAYMENT_PROVIDER_TOKEN,
      });

      return c.json({ url });
    },
  )
  .post(
    "/createWithStars",
    telegramAuth,
    vValidator("json", starsInvoiceSchema, validationHook),
    async (c) => {
      const requestBody = c.req.valid("json");
      const user = c.get("user");
      if (!user?.id) {
        return c.json({ url: "" });
      }

      const url = await callTelegramMethod<string>("createInvoiceLink", {
        ...requestBody,
        payload: `stars-order-${Date.now()}`,
        currency: "XTR",
      });

      return c.json({ url });
    },
  );
