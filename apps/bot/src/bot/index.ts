import { autoChatAction } from "@grammyjs/auto-chat-action";
import { hydrate } from "@grammyjs/hydrate";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { sequentialize } from "@grammyjs/runner";
import type { BotConfig } from "grammy";
import { MemorySessionStorage, Bot as TelegramBot } from "grammy";
import type { Config } from "../config";
import type { Logger } from "../logger";
import type { Context } from "./context";
import { contactFeature } from "./features/contact";
import { keyboardFeature } from "./features/keyboard";
import { minimizedFeature } from "./features/minimized";
import { paymentFeature } from "./features/payment";
import { shippingFeature } from "./features/shipping";
import { startFeature } from "./features/start";
import { unhandledFeature } from "./features/unhandled";
import { errorHandler } from "./handlers/error";
import { session } from "./middlewares/session";
import { updateLogger } from "./middlewares/update-logger";

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
