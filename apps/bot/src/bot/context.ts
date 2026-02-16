import type { AutoChatActionFlavor } from "@grammyjs/auto-chat-action";
import type { HydrateFlavor } from "@grammyjs/hydrate";
import type { ParseModeFlavor } from "@grammyjs/parse-mode";
import type { Context as DefaultContext, SessionFlavor } from "grammy";
import type { Config } from "../config";
import type { Logger } from "../logger";

// biome-ignore lint/complexity/noBannedTypes: Currently session data is empty
export type SessionData = {};

interface ExtendedContextFlavor {
  logger: Logger;
  config: Config;
}

export type Context = ParseModeFlavor<
  HydrateFlavor<
    DefaultContext &
      ExtendedContextFlavor &
      SessionFlavor<SessionData> &
      AutoChatActionFlavor
  >
>;
