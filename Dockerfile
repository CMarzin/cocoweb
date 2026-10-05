# syntax=docker/dockerfile:1
FROM node:24-alpine AS build
WORKDIR /app
ENV CI=true
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir /pnpm/store
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  absolute_redirect off;
  location / { try_files \$uri \$uri.html \$uri/index.html \$uri/ =404; }
  location /_astro/ { expires 1y; add_header Cache-Control "public, immutable"; }
  error_page 404 /404.html;
  gzip on;
  gzip_types text/css application/javascript application/xml application/rss+xml image/svg+xml;
}
EOF
COPY --from=build /app/dist /usr/share/nginx/html
