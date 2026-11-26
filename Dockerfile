# syntax=docker/dockerfile:1

# ───────────────────────── build ─────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Workspace manifests first, so the install layer caches independently of source.
# Prisma's engines link against libssl; without this its platform detection
# falls back to openssl-1.1.x and the engine fails to load at runtime.
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
RUN npm ci

COPY . .

# The Prisma client must exist before tsc type-checks the API source.
RUN npm exec --workspace apps/api -- prisma generate
RUN npm run build --workspace apps/web
RUN npm run build --workspace apps/api

# ─────────────────────── production deps ───────────────────────
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
# The web workspace is only needed at build time; the API ships without dev deps.
RUN npm ci --omit=dev
COPY apps/api/prisma ./apps/api/prisma
RUN npm exec --workspace apps/api -- prisma generate

# ───────────────────────── runtime ─────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Uploads live on the mounted Railway volume; the SPA is served by this process.
ENV UPLOAD_DIR=/data/uploads
ENV WEB_DIST_DIR=/app/apps/web/dist

RUN apk add --no-cache dumb-init openssl

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/prisma ./apps/api/prisma
COPY --from=build /app/apps/web/dist ./apps/web/dist
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/

WORKDIR /app/apps/api
EXPOSE 4000

# Apply pending migrations, then serve. The API and the SPA come off one
# process, so production has a single origin and no CORS.
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "npm exec -- prisma migrate deploy && node dist/server.js"]
