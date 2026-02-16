import { autoRetry } from "@grammyjs/auto-retry";
import { hydrate } from "@grammyjs/hydrate";
import { run } from "@grammyjs/runner";
import { Bot } from "grammy";

import { startCommand } from "./src/commands/start";
import { catchHandler } from "./src/handlers/catch";
import { contactQueryHandler } from "./src/handlers/contact";
import { paymentQueryHandler } from "./src/handlers/payment";
import type { BotContext } from "./src/types/bot";

const BOT_TOKEN = Bun.env.BOT_TOKEN || "";
if (!BOT_TOKEN) {
  console.error(
    "[@webapp-kitchen-sink/bot] BOT_TOKEN environment variable is missing",
  );
  process.exit(1);
}

const bot = new Bot<BotContext>(BOT_TOKEN);
bot.api.config.use(autoRetry());

bot
  .use(hydrate())
  .use(startCommand)
  .use(paymentQueryHandler)
  .use(contactQueryHandler);

bot.catch(catchHandler);

const runner = run(bot);

const stopRunner = async () => {
  if (runner.isRunning()) {
    await runner.stop();
  }
  process.exit();
};

process.on("SIGINT", stopRunner);
process.on("SIGTERM", stopRunner);
process.on("uncaughtException", (error) => {
  console.error("Caught unhandled exception", { error });
});

try {
  const { first_name, username } = await bot.api.getMe();
  console.log(
    `Started as ${first_name} (@${username})\nRunning on Bun ${Bun.version}`,
  );
} catch (e) {
  console.error(e);
}
