import { config } from "#root/config/index.js";
import type {
  RegularInvoice,
  StarsInvoice,
} from "#root/schemas/invoice.schemas.js";
import { callTelegramMethod } from "#root/utils/telegram-api.js";

export async function createRegularInvoiceLink(body: RegularInvoice) {
  return callTelegramMethod<string>("createInvoiceLink", {
    ...body,
    payload: `regular-order-${Date.now()}`,
    provider_token: config.paymentProviderToken,
  });
}

export async function createStarsInvoiceLink(body: StarsInvoice) {
  return callTelegramMethod<string>("createInvoiceLink", {
    ...body,
    payload: `stars-order-${Date.now()}`,
    currency: "XTR",
  });
}
