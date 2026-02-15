import { Elysia } from "elysia";
import { AppError } from "../errors/app-error";
import { ErrorCode } from "../errors/error-code";
import { telegramAuth } from "../middleware/telegram-auth";
import { invoiceRequestBodySchema } from "../schemas/invoice.schemas";

export const invoiceRoutes = new Elysia({ prefix: "/invoice" })
  .use(telegramAuth)
  .post(
    "/create",
    async ({ user, body }) => {
      const { title, description, currency, prices } = body;
      const userId = user?.id;
      if (!userId) {
        return { url: "" };
      }

      const createInvoiceLinkResponse = await fetch(
        `https://api.telegram.org/bot${Bun.env.BOT_TOKEN}/createInvoiceLink`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            payload: `test-order-${Date.now()}`,
            provider_token:
              currency === "XTR" ? undefined : Bun.env.PAYMENT_PROVIDER_TOKEN,
            currency,
            prices,
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
  );
