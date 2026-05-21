FROM node:22-alpine

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

COPY pnpm-lock.yaml /app
COPY pnpm-workspace.yaml /app

RUN pnpm install

COPY . /app

RUN pnpm build

EXPOSE 8006

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost:8006/ || exit 1

CMD ["npx", "serve", "-s", "dist", "-l", "8006"]