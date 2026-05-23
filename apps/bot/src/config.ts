import { loadConfigFromEnv } from "@webapp-kitchen-sink/config";
import { API_CONSTANTS } from "grammy";
import * as v from "valibot";

const baseConfigSchema = v.object({
  debug: v.optional(
    v.pipe(v.string(), v.transform(JSON.parse), v.boolean()),
    "false",
  ),
  logLevel: v.optional(
    v.pipe(
      v.string(),
      v.picklist([
        "trace",
        "debug",
        "info",
        "warn",
        "error",
        "fatal",
        "silent",
      ]),
    ),
    "info",
  ),
  webAppUrl: v.pipe(v.string(), v.url("Web App URL is incorrect")),
  botToken: v.pipe(v.string(), v.regex(/^\d+:[\w-]+$/, "Invalid token")),
  botAllowedUpdates: v.optional(
    v.pipe(
      v.string(),
      v.transform(JSON.parse),
      v.array(v.picklist(API_CONSTANTS.ALL_UPDATE_TYPES)),
    ),
    "[]",
  ),
});

const configSchema = v.variant("botMode", [
  v.pipe(
    v.object({
      botMode: v.literal("polling"),
      ...baseConfigSchema.entries,
    }),
    v.transform((input) => ({
      ...input,
      isDebug: input.debug,
      isWebhookMode: false as const,
      isPollingMode: true as const,
    })),
  ),
  v.pipe(
    v.object({
      botMode: v.literal("webhook"),
      ...baseConfigSchema.entries,
      botWebhook: v.pipe(v.string(), v.url()),
      botWebhookSecret: v.pipe(v.string(), v.minLength(12)),
      serverHost: v.optional(v.string(), "0.0.0.0"),
      serverPort: v.optional(
        v.pipe(v.string(), v.transform(Number), v.number()),
        "80",
      ),
    }),
    v.transform((input) => ({
      ...input,
      isDebug: input.debug,
      isWebhookMode: true as const,
      isPollingMode: false as const,
    })),
  ),
]);

export type Config = v.InferOutput<typeof configSchema>;
export type PollingConfig = v.InferOutput<(typeof configSchema)["options"][0]>;
export type WebhookConfig = v.InferOutput<(typeof configSchema)["options"][1]>;

export const config = loadConfigFromEnv(configSchema);
