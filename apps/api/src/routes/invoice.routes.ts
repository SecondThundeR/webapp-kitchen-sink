import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { config } from "#root/config/index.js";
import { telegramAuth } from "#root/middleware/telegram-auth.js";
import {
  regularInvoiceSchema,
  starsInvoiceSchema,
} from "#root/schemas/invoice.schemas.js";
import type { HonoEnv } from "#root/types.js";
import { callTelegramMethod } from "#root/utils/telegram-api.js";
import { validationHook } from "#root/utils/validation-hook.js";

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
        provider_token: config.paymentProviderToken,
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
