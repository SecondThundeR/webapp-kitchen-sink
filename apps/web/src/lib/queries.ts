import type { InferRequestType } from "hono/client";
import { api } from "./api";

export async function validateSession() {
  const res = await api.api.v1.auth.validate.$get();

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

export type CreateInvoiceLinkData = InferRequestType<
  typeof api.api.v1.invoices.regular.$post
>["json"];

export async function createInvoiceLink(body: CreateInvoiceLinkData) {
  const res = await api.api.v1.invoices.regular.$post({ json: body });

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

export type CreateStarsInvoiceLinkData = InferRequestType<
  typeof api.api.v1.invoices.stars.$post
>["json"];

export async function createStarsInvoiceLink(body: CreateStarsInvoiceLinkData) {
  const res = await api.api.v1.invoices.stars.$post({ json: body });

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

export async function savePreparedInlineMessage() {
  const res = await api.api.v1.messages.prepared.$post();

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

export async function getTestEmojiSet() {
  const res = await api.api.v1.emojis.$get();

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}

export async function savePreparedKeyboardButton() {
  const res = await api.api.v1.buttons.prepared.$post();

  if (!res.ok) {
    return Promise.reject(await res.json());
  }

  return res.json();
}
