const REQUIRED_ENV_VARS = ["BOT_TOKEN", "FRONTEND_URL"] as const;

function validateEnv() {
  const missingEnvVars = REQUIRED_ENV_VARS.filter((key) => !Bun.env[key]);

  if (missingEnvVars.length > 0) {
    console.error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`,
    );
    process.exit(1);
  }
}

validateEnv();

export const env = {
  BOT_TOKEN: Bun.env.BOT_TOKEN,
  PORT: Number(Bun.env.PORT ?? 3000),
  FRONTEND_URL: Bun.env.FRONTEND_URL,
} as const;
