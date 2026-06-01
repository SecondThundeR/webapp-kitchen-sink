# Telegram Mini Apps Kitchen Sink

A monorepo featuring every possible use case of Telegram Mini App SDK, covering all available public API. This monorepo runs on **Node 22** with **pnpm** as the package manager, **Hono** as the API framework, **Grammy** as the Telegram Bot framework, and **React + Vite** for the frontend. Backend apps are bundled with **tsdown** for production. Currently designed for seamless deployment on Railway with end-to-end type safety between frontend and backend.

[Demo](https://t.me/webappkitchensink_bot)

[Demo with deeplink to handlers page](https://t.me/webappkitchensink_bot/handlers)

[Demo with deeplink to handlers page with predefined query](https://t.me/webappkitchensink_bot/handlers?startapp=close)

## Project Structure

```
webapp-kitchen-sink/
├── apps/
│   ├── api/          # Hono backend server
│   ├── bot/          # Grammy Telegram bot
│   └── web/          # React + Vite frontend (served by nginx in prod)
│       ├── Dockerfile  # Multi-stage build → nginx:alpine
│       └── nginx.conf  # Static serving on port 3001
├── packages/
│   ├── config/       # Shared env config (valibot)
│   └── contracts/    # Shared type definitions
├── biome.json        # Linting & formatting config
├── pnpm-workspace.yaml # Workspace packages and dependency catalog
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

| Variable              | Required | Description                                                                                                                                        |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BOT_TOKEN`           | Yes      | Token for Telegram's Bot                                                                                                                           |
| `WEB_APP_URL`         | Yes      | Frontend origin for Web App keyboard. Use `${{web.RAILWAY_PUBLIC_DOMAIN}}` to reference the UI service                                             |
| `BOT_MODE`            | Yes      | Use this to launch bot in `polling` or `webhook` mode                                                                                              |
| `LOG_LEVEL`           | No       | Level for pino logger. Defaults to `info`                                                                                                          |
| `DEBUG`               | No       | Enable verbose logging. Defaults to `false`                                                                                                        |
| `BOT_WEBHOOK`         | No       | Bot's backend origin for webhook. Use `${{bot.RAILWAY_PUBLIC_LOGIN}}` as origin. Required if `BOT_MODE` is set to `webhook`                        |
| `BOT_WEBHOOK_SECRET`  | No       | Secret data for validating webhook requests. Use `openssl rand --hex 32` to generate new one. Required if `BOT_MODE` is set to `webhook`           |
| `BOT_ALLOWED_UPDATES` | No       | List of allowed update types. Useful if you want to receive certain updates from the Bot API, rather than just those that are delivered by default |
| `SERVER_HOST`         | No       | Bot's backend host. Required if `BOT_MODE` is set to `webhook`                                                                                     |
| `SERVER_PORT`         | No       | Bot's backend port. Required if `BOT_MODE` is set to `webhook`                                                                                     |

### Web Service

| Variable       | Required | Description                                                                                                               |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL` | Yes      | API base URL. Use `${{api.RAILWAY_PRIVATE_DOMAIN}}` for private networking or `${{api.RAILWAY_PUBLIC_DOMAIN}}` for public |

> The web service is served by nginx and listens on **port 3001** (hardcoded in `apps/web/nginx.conf`). No `PORT` env is consumed at runtime.

## Local Development

### Prerequisites

- [Node](https://nodejs.org) 22.22.3 (see `.nvmrc`)
- [pnpm](https://pnpm.io) 11.5.0+

Both are enforced via `engine-strict=true` in `.npmrc`. A `preinstall` hook also blocks `npm`/`yarn`.

### Setup

```bash
# Install dependencies
pnpm install

# Start all services in development mode
pnpm dev
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

| Setting       | Value                                          |
| ------------- | ---------------------------------------------- |
| Build Command | `pnpm --filter @webapp-kitchen-sink/api build` |
| Start Command | `pnpm --filter @webapp-kitchen-sink/api start` |
| Watch Paths   | `apps/api/**`, `packages/**`                   |

#### Bot Service

| Setting       | Value                                          |
| ------------- | ---------------------------------------------- |
| Build Command | `pnpm --filter @webapp-kitchen-sink/bot build` |
| Start Command | `pnpm --filter @webapp-kitchen-sink/bot start` |
| Watch Paths   | `apps/bot/**`, `packages/**`                   |

#### Web Service

Built and served via Docker — multi-stage build produces an `nginx:alpine` image serving the Vite output on port 3001. Idle RAM is ~5–15 MB (no Node runtime).

| Setting         | Value                                  |
| --------------- | -------------------------------------- |
| Builder         | Dockerfile                             |
| Dockerfile Path | `apps/web/Dockerfile`                  |
| Root Directory  | _empty_ (must be repo root)            |
| Watch Paths     | `apps/web/**`, `packages/contracts/**` |

> The build context must be the repo root because the Dockerfile installs from the workspace lockfile. Do not set Root Directory to `apps/web` — relative `COPY` paths would break.

### Health Checks

The API includes a health endpoint at `/health`. Configure Railway's health check:

| Setting | Value     |
| ------- | --------- |
| Path    | `/health` |
| Timeout | `30s`     |

## Available Scripts

### Root

| Script               | Description                                         |
| -------------------- | --------------------------------------------------- |
| `pnpm dev`           | Start all services in development mode              |
| `pnpm build`         | Build all packages (bot + api bundles, web bundle)  |
| `pnpm typecheck`     | Run `tsc` across the workspace (project references) |
| `pnpm lint`          | Check for linting issues                            |
| `pnpm lint:write`    | Fix linting issues automatically                    |
| `pnpm format`        | Format all files                                    |
| `pnpm clean:modules` | Remove all `node_modules` and lockfile              |

### API (`apps/api`)

| Script           | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `pnpm dev`       | Run via `node --watch` with native TS support        |
| `pnpm build`     | Bundle to `dist/index.mjs` with tsdown               |
| `pnpm start`     | Run the production bundle                            |
| `pnpm typecheck` | Type-check and emit `.d.ts` for downstream consumers |

### Bot (`apps/bot`)

| Script           | Description                                   |
| ---------------- | --------------------------------------------- |
| `pnpm dev`       | Run via `node --watch` with native TS support |
| `pnpm build`     | Bundle to `dist/main.mjs` with tsdown         |
| `pnpm start`     | Run the production bundle                     |
| `pnpm typecheck` | Type-check the bot package                    |

### Web (`apps/web`)

| Script           | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| `pnpm dev`       | Start Vite dev server                                              |
| `pnpm build`     | Build for production (output → `dist/`, served by nginx in Docker) |
| `pnpm analyze`   | Build for production with rollup bundle visualizer                 |
| `pnpm preview`   | Preview production build locally (Vite — not used in deployment)   |
| `pnpm typecheck` | Type-check the React app                                           |

## Dependency Management

Shared dependency versions live in `pnpm-workspace.yaml` under `catalog:`. Packages reference them with `"hono": "catalog:"` etc. To check for updates: `pnpm outdated -r`. To upgrade interactively: `pnpm update -r --latest -i`. Renovate is configured (`renovate.json`) to open weekly PRs.

## Credits

- [telegram-bot-template](https://github.com/bot-base/telegram-bot-template)

## License

[MIT](./LICENSE)
