declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      WEB_APP_URL: string;
      BOT_MODE: "polling" | "webhook";
      LOG_LEVEL?:
        | "trace"
        | "debug"
        | "info"
        | "warn"
        | "error"
        | "fatal"
        | "silent";
      DEBUG?: string;
      BOT_ALLOWED_UPDATES?: string;
      BOT_WEBHOOK?: string;
      BOT_WEBHOOK_SECRET?: string;
      SERVER_HOST?: string;
      SERVER_PORT?: string;
    }
  }
}

export {};
