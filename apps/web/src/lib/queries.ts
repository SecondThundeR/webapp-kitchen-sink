import type { InferRequestType } from "hono/client";
import { api } from "./api";

type InitSessionData = InferRequestType<typeof api.api.auth.init.$post>["json"];

export async function initSession(body: InitSessionData) {
  const res = await api.api.auth.init.$post({ json: body });

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

export type CreateInvoiceLinkData = InferRequestType<
  typeof api.api.invoice.create.$post
>["json"];

export async function createInvoiceLink(body: CreateInvoiceLinkData) {
  const res = await api.api.invoice.create.$post({ json: body });

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

export type CreateStarsInvoiceLinkData = InferRequestType<
  typeof api.api.invoice.createWithStars.$post
>["json"];

export async function createStarsInvoiceLink(body: CreateStarsInvoiceLinkData) {
  const res = await api.api.invoice.createWithStars.$post({ json: body });

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

type SavePreparedInlineMessageData = InferRequestType<
  typeof api.api.message.savePreparedInlineMessage.$post
>["json"];

export async function savePreparedInlineMessage(
  body: SavePreparedInlineMessageData,
) {
  const res = await api.api.message.savePreparedInlineMessage.$post({
    json: body,
  });

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

export async function getTestEmojiSet() {
  const res = await api.api.emojis.getTestEmojiSet.$get();

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

type SavePreparedKeyboardButtonData = InferRequestType<
  typeof api.api.button.savePreparedKeyboardButton.$post
>["json"];

export async function savePreparedKeyboardButton(
  body: SavePreparedKeyboardButtonData,
) {
  const res = await api.api.button.savePreparedKeyboardButton.$post({
    json: body,
  });

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}
