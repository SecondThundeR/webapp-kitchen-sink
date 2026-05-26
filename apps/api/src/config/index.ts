import { loadConfigFromEnv } from "@webapp-kitchen-sink/config";
import * as v from "valibot";

const configSchema = v.pipe(
  v.object({
    frontendUrl: v.pipe(v.string(), v.url("Frontend URL is incorrect")),
    paymentProviderToken: v.string(),
    botToken: v.pipe(v.string(), v.regex(/^\d+:[\w-]+$/, "Invalid token")),
    port: v.optional(
      v.pipe(v.string(), v.transform(Number), v.number()),
      "3000",
    ),
    debug: v.optional(
      v.pipe(v.string(), v.transform(JSON.parse), v.boolean()),
      "false",
    ),
    logLevel: v.optional(
      v.picklist([
        "trace",
        "debug",
        "info",
        "warn",
        "error",
        "fatal",
        "silent",
      ]),
      "info",
    ),
  }),
  v.transform((input) => ({
    ...input,
    isDebug: input.debug,
  })),
);

export type Config = v.InferOutput<typeof configSchema>;

export const config = loadConfigFromEnv(configSchema);
