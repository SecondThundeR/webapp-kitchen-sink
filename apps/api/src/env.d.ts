declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_URL: string;
      PAYMENT_PROVIDER_TOKEN: string;
      PORT?: string;
      BOT_TOKEN: string;
    }
  }
}

export {};
