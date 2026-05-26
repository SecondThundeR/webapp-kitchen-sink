import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { telegramAuth } from "#root/middleware/telegram-auth.js";
import {
  regularInvoiceSchema,
  starsInvoiceSchema,
} from "#root/schemas/invoice.schemas.js";
import {
  createRegularInvoiceLink,
  createStarsInvoiceLink,
} from "#root/services/invoice.service.js";
import type { HonoEnv } from "#root/types.js";
import { validationHook } from "#root/utils/validation-hook.js";

export const invoiceRoutes = new Hono<HonoEnv>()
  .post(
    "/regular",
    telegramAuth,
    vValidator("json", regularInvoiceSchema, validationHook),
    async (c) => {
      const url = await createRegularInvoiceLink(c.req.valid("json"));
      return c.json({ url });
    },
  )
  .post(
    "/stars",
    telegramAuth,
    vValidator("json", starsInvoiceSchema, validationHook),
    async (c) => {
      const url = await createStarsInvoiceLink(c.req.valid("json"));
      return c.json({ url });
    },
  );
