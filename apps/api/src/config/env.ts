const REQUIRED_ENV_VARS = [
  "BOT_TOKEN",
  "FRONTEND_URL",
  "PAYMENT_PROVIDER_TOKEN",
] as const;

function validateEnv() {
  const missingEnvVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missingEnvVars.length > 0) {
    console.error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`,
    );
    process.exit(1);
  }
}

validateEnv();

export const env = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  PORT: Number(process.env.PORT ?? 3000),
  FRONTEND_URL: process.env.FRONTEND_URL,
  PAYMENT_PROVIDER_TOKEN: process.env.PAYMENT_PROVIDER_TOKEN,
} as const;
