declare module "bun" {
  interface Env {
    FRONTEND_URL: string;
    PAYMENT_PROVIDER_TOKEN: string;
    PORT?: string;
    BOT_TOKEN: string;
  }
}
