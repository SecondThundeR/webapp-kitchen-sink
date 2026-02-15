declare module "bun" {
  interface Env {
    FRONTEND_URL: string;
    PORT?: string;
    BOT_TOKEN: string;
  }
}
