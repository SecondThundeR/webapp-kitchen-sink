FROM node:22.22.3-alpine AS builder
WORKDIR /repo

RUN corepack enable && corepack prepare pnpm@11.8.0 --activate

# Copy workspace metadata first so dependency install caches across source changes
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/api/package.json ./apps/api/
COPY apps/bot/package.json ./apps/bot/
COPY apps/web/package.json ./apps/web/
COPY packages/config/package.json ./packages/config/
COPY packages/contracts/package.json ./packages/contracts/

RUN pnpm install --frozen-lockfile --filter=@webapp-kitchen-sink/web...

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG PORT
ENV PORT=$PORT

RUN pnpm --filter=@webapp-kitchen-sink/web build

FROM nginx:1.29-alpine-slim AS runner
RUN apk add --no-cache gettext

COPY --from=builder /repo/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 3001

CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
