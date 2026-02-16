declare module "bun" {
  interface Env {
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
    DEBUG?: boolean;
    BOT_ALLOWED_UPDATES?: string[];
    BOT_WEBHOOK?: string;
    BOT_WEBHOOK_SECRET?: string;
    SERVER_HOST?: string;
    SERVER_PORT?: number;
  }
}
