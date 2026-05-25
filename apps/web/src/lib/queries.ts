import type { InferRequestType } from "hono/client";
import { api } from "./api";

export async function initSession() {
  const res = await api.api.auth.init.$post();

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

export async function savePreparedInlineMessage() {
  const res = await api.api.message.savePreparedInlineMessage.$post();

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

export async function savePreparedKeyboardButton() {
  const res = await api.api.button.savePreparedKeyboardButton.$post();

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}
