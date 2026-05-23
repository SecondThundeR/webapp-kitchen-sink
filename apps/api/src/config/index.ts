import { loadConfigFromEnv } from "@webapp-kitchen-sink/config";
import * as v from "valibot";

const configSchema = v.object({
  frontendUrl: v.pipe(v.string(), v.url("Frontend URL is incorrect")),
  paymentProviderToken: v.string(),
  botToken: v.pipe(v.string(), v.regex(/^\d+:[\w-]+$/, "Invalid token")),
  port: v.optional(v.pipe(v.string(), v.transform(Number), v.number()), "3000"),
});

export type Config = v.InferOutput<typeof configSchema>;

export const config = loadConfigFromEnv(configSchema);
