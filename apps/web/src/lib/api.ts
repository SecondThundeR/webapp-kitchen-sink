import { treaty } from "@elysiajs/eden";
import type { App } from "@webapp-kitchen-sink/contracts";

export const api = treaty<App>(import.meta.env.VITE_API_URL, {
  fetch: {
    credentials: "include",
  },
});
