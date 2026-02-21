import { api } from "./api";

type InitSessionData = NonNullable<
  Parameters<typeof api.api.auth.init.post>[0]
>;

export async function initSession(body: InitSessionData) {
  const { data, error } = await api.api.auth.init.post(body);

  if (error) {
    return Promise.reject(error.value);
  }

  return data;
}

export type CreateInvoiceLinkData = NonNullable<
  Parameters<typeof api.api.invoice.create.post>[0]
>;

export async function createInvoiceLink(body: CreateInvoiceLinkData) {
  const { data, error } = await api.api.invoice.create.post(body);

  if (error) {
    return Promise.reject(error.value);
  }

  return data;
}

export type CreateStarsInvoiceLinkData = NonNullable<
  Parameters<typeof api.api.invoice.createWithStars.post>[0]
>;

export async function createStarsInvoiceLink(body: CreateStarsInvoiceLinkData) {
  const { data, error } = await api.api.invoice.createWithStars.post(body);

  if (error) {
    return Promise.reject(error.value);
  }

  return data;
}

type SavePreparedInlineMessageData = NonNullable<
  Parameters<typeof api.api.message.savePreparedInlineMessage.post>[0]
>;

export async function savePreparedInlineMessage(
  body: SavePreparedInlineMessageData,
) {
  const { data, error } =
    await api.api.message.savePreparedInlineMessage.post(body);

  if (error) {
    return Promise.reject(error.value);
  }

  return data;
}
