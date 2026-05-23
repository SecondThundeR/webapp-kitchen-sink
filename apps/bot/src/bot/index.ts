import { autoChatAction } from "@grammyjs/auto-chat-action";
import { hydrate } from "@grammyjs/hydrate";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { sequentialize } from "@grammyjs/runner";
import type { BotConfig } from "grammy";
import { MemorySessionStorage, Bot as TelegramBot } from "grammy";
import type { Config } from "#root/config.js";
import type { Logger } from "#root/logger.js";
import type { Context } from "./context.ts";
import { contactFeature } from "./features/contact.ts";
import { keyboardFeature } from "./features/keyboard.ts";
import { minimizedFeature } from "./features/minimized.ts";
import { paymentFeature } from "./features/payment.ts";
import { shippingFeature } from "./features/shipping.ts";
import { startFeature } from "./features/start.ts";
import { unhandledFeature } from "./features/unhandled.ts";
import { errorHandler } from "./handlers/error.ts";
import { session } from "./middlewares/session.ts";
import { updateLogger } from "./middlewares/update-logger.ts";

interface Dependencies {
  config: Config;
  logger: Logger;
}

function getSessionKey(ctx: Omit<Context, "session">) {
  return ctx.chat?.id.toString();
}

export function createBot(
  token: string,
  dependencies: Dependencies,
  botConfig?: BotConfig<Context>,
) {
  const { config, logger } = dependencies;

  const bot = new TelegramBot<Context>(token, botConfig);

  bot.use(async (ctx, next) => {
    ctx.config = config;
    ctx.logger = logger.child({
      update_id: ctx.update.update_id,
    });

    await next();
  });

  const protectedBot = bot.errorBoundary(errorHandler);

  // Middlewares
  bot.api.config.use(parseMode("HTML"));

  if (config.isPollingMode) protectedBot.use(sequentialize(getSessionKey));
  if (config.isDebug) protectedBot.use(updateLogger());
  protectedBot.use(autoChatAction(bot.api));
  protectedBot.use(hydrateReply);
  protectedBot.use(hydrate());
  protectedBot.use(
    session({
      getSessionKey,
      storage: new MemorySessionStorage(),
    }),
  );

  // Handlers
  protectedBot.use(startFeature);
  protectedBot.use(minimizedFeature);
  protectedBot.use(keyboardFeature);
  protectedBot.use(paymentFeature);
  protectedBot.use(contactFeature);
  protectedBot.use(shippingFeature);

  // must be the last handler
  protectedBot.use(unhandledFeature);

  return bot;
}

export type Bot = ReturnType<typeof createBot>;
