import type { App } from "@webapp-kitchen-sink/contracts";
import { hc } from "hono/client";

export const api = hc<App>(import.meta.env.VITE_API_URL, {
  init: {
    credentials: "include",
  },
});
