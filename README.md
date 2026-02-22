# Telegram Mini Apps Kitchen Sink

A monorepo featuring every possible use case of Telegram Mini App SDK, covering all available public API. This monorepo comes with **Bun** as the package manager and runtime, **Elysia** as the API framework, **Grammy** as the Telegram Bot framework, and **React + Vite** for the frontend. Currently designed for seamless deployment on Railway with end-to-end type safety between frontend and backend

## Project Structure

```
webapp-kitchen-sink/
├── apps/
│   ├── api/          # Elysia backend server
│   └── bot/          # Grammy Telegram bot
│   └── web/          # React + Vite frontend
├── packages/
│   └── contracts/    # Shared type definitions
├── biome.json        # Linting & formatting config
├── package.json      # Root workspace configuration
└── tsconfig.base.json
```

## Environment Variables

### API Service

| Variable                 | Required | Description                                                                                |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------ |
| `BOT_TOKEN`              | Yes      | Token for Telegram's Bot                                                                   |
| `PAYMENT_PROVIDER_TOKEN` | Yes      | Test token for payment provider. Better to use Smart Glocal Test token                     |
| `PORT`                   | No       | Server port. Defaults to `3000`. Railway sets this automatically                           |
| `FRONTEND_URL`           | Yes      | Frontend origin for CORS. Use `${{web.RAILWAY_PUBLIC_DOMAIN}}` to reference the UI service |

### Bot Service

| Variable             | Required | Description                                                                                                                              |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `BOT_TOKEN`          | Yes      | Token for Telegram's Bot                                                                                                                 |
| `WEB_APP_URL`        | Yes      | Frontend origin for Web App keyboard. Use `${{web.RAILWAY_PUBLIC_DOMAIN}}` to reference the UI service                                   |
| `BOT_MODE`           | Yes      | Use this to launch bot in `polling` or `webhook` mode                                                                                    |
| `LOG_LEVEL`          | No       | Level for pino logger. Defaults to `info`                                                                                                |
| `DEBUG`              | No       | Enable verbose logging. Defaults to `false`                                                                                              |
| `BOT_WEBHOOK`        | No       | Bot's backend origin for webhook. Use `${{bot.RAILWAY_PUBLIC_LOGIN}}` as origin. Required if `BOT_MODE` is set to `webhook`              |
| `BOT_WEBHOOK_SECRET` | No       | Secret data for validating webhook requests. Use `openssl rand --hex 32` to generate new one. Required if `BOT_MODE` is set to `webhook` |
| `SERVER_HOST`        | No       | Bot's backend host. Required if `BOT_MODE` is set to `webhook`                                                                           |
| `SERVER_PORT`        | No       | Bot's backend port. Required if `BOT_MODE` is set to `webhook`                                                                           |

### Web Service

| Variable       | Required | Description                                                                                                               |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL` | Yes      | API base URL. Use `${{api.RAILWAY_PRIVATE_DOMAIN}}` for private networking or `${{api.RAILWAY_PUBLIC_DOMAIN}}` for public |
| `PORT`         | No       | Frontend port. Defaults to `3001`. Railway sets this automatically                                                        |

## Local Development

### Prerequisites

- [Bun](https://bun.sh) >= 1.3.9

### Setup

```bash
# Install dependencies
bun install

# Start all services in development mode
bun dev
```

### Environment Files

Create `.env` files for local development:

**`apps/api/.env`**

```env
BOT_TOKEN=<bot token>
PAYMENT_PROVIDER_TOKEN=<token from payment provider>
PORT=3000
FRONTEND_URL=<url from tunnel>
```

**`apps/bot/.env`**

```env
BOT_TOKEN=<bot token>
WEB_APP_URL=<url from tunnel>
BOT_MODE=polling
LOG_LEVEL=debug
DEBUG=true
```

**`apps/web/.env`**

```env
VITE_API_URL=<url from tunnel>
PORT=3001
```

## Railway Deployment

### Service Configuration

#### API Service

| Setting       | Value                                         |
| ------------- | --------------------------------------------- |
| Build Command | `bun --filter @webapp-kitchen-sink/api build` |
| Start Command | `./apps/api/dist/server`                      |
| Watch Paths   | `apps/api/**`, `packages/contracts/**`        |

#### Bot Service

| Setting       | Value                                         |
| ------------- | --------------------------------------------- |
| Start Command | `bun --filter @webapp-kitchen-sink/bot start` |
| Watch Paths   | `apps/bot/**`                                 |

#### Web Service

| Setting       | Value                                                        |
| ------------- | ------------------------------------------------------------ |
| Build Command | `bun --filter @webapp-kitchen-sink/web build`                |
| Start Command | `bunx --bun serve -s ./apps/web/dist -l tcp://0.0.0.0:$PORT` |
| Watch Paths   | `apps/web/**`, `packages/contracts/**`                       |

### Health Checks

The API includes a health endpoint at `/health`. Configure Railway's health check:

| Setting | Value     |
| ------- | --------- |
| Path    | `/health` |
| Timeout | `30s`     |

## Available Scripts

### Root

| Script              | Description                            |
| ------------------- | -------------------------------------- |
| `bun dev`           | Start all services in development mode |
| `bun lint`          | Check for linting issues               |
| `bun lint:write`    | Fix linting issues automatically       |
| `bun format`        | Format all files                       |
| `bun clean:modules` | Remove all `node_modules` and lockfile |

### API (`apps/api`)

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `bun dev`       | Start with hot reload                    |
| `bun run build` | Compile to native binary (`dist/server`) |

### Bot (`apps/bot`)

| Script      | Description              |
| ----------- | ------------------------ |
| `bun dev`   | Start with hot reload    |
| `bun start` | Start without hot reload |

### Web (`apps/web`)

| Script          | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `bun dev`       | Start Vite dev server                                      |
| `bun run build` | Build for production                                       |
| `bun analyze`   | Build for production with enabled rollup-bundle-visualizer |
| `bun preview`   | Preview production build locally                           |

## Credits

- [railway-bun-monorepo-elysia-starter](https://github.com/Salam81/railway-bun-monorepo-elysia-starter)
- [telegram-bot-template](https://github.com/bot-base/telegram-bot-template)

## License

[MIT](./LICENSE)
