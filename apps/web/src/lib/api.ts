import type { App } from "@webapp-kitchen-sink/contracts";
import { hc } from "hono/client";
import { WebApp } from "./web-app";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const authedFetch: typeof fetch = (input, init) => {
  const headers = new Headers(init?.headers);
  const initData = WebApp.initData;
  if (initData && !headers.has("Authorization")) {
    headers.set("Authorization", `tma ${initData}`);
  }
  return fetch(input, { ...init, headers });
};

export const api = hc<App>(API_BASE_URL, {
  init: { credentials: "include" },
  fetch: authedFetch,
});

export { API_BASE_URL, authedFetch };
