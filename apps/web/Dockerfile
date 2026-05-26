FROM node:22.22.3-alpine AS builder
WORKDIR /repo

RUN corepack enable && corepack prepare pnpm@11.3.0 --activate

# Copy workspace metadata first so dependency install caches across source changes
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/api/package.json ./apps/api/
COPY apps/bot/package.json ./apps/bot/
COPY apps/web/package.json ./apps/web/
COPY packages/config/package.json ./packages/config/
COPY packages/contracts/package.json ./packages/contracts/

RUN pnpm install --frozen-lockfile --filter=@webapp-kitchen-sink/web...

COPY . .
RUN pnpm --filter=@webapp-kitchen-sink/web build

FROM nginx:1.29-alpine-slim AS runner
COPY --from=builder /repo/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
