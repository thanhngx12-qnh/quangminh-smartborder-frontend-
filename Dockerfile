# dir: ~/quangminh-smart-border/frontend/Dockerfile

# --- STAGE 1: Dependencies ---
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# --- STAGE 2: Builder ---
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# SỬA LỖI Ở ĐÂY: Nhận biến môi trường tại thời điểm build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

# --- STAGE 3: Production Runner ---
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV production

# SỬA LỖI Ở ĐÂY: Truyền biến môi trường vào runtime
# Điều này cần thiết cho chế độ standalone
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]