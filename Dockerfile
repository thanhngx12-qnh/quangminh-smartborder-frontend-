# dir: ~/quangminh-smart-border/frontend/Dockerfile

# --- STAGE 1: Build Stage ---
# Sử dụng Node.js 20-alpine làm môi trường build
FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các file quản lý dependency
COPY package*.json ./

# Cài đặt tất cả dependencies để build
RUN npm install

# Sao chép toàn bộ source code của frontend vào
# (Chúng ta sẽ cần một file .dockerignore cho frontend)
COPY . .

# Khai báo biến môi trường build-time
# Biến này sẽ được nhận từ docker-compose.yml
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Chạy lệnh build của Next.js
RUN npm run build

# --- STAGE 2: Production Stage ---
# Bắt đầu một image mới, chỉ chứa những gì cần thiết để chạy
FROM node:20-alpine AS runner

WORKDIR /app

# Sao chép file package.json để cài đặt production dependencies nếu cần
# (Next.js standalone build thường không cần)
COPY --from=builder /app/package.json ./package.json

# Sao chép output của Next.js build (bao gồm cả thư mục .next/standalone)
COPY --from=builder /app/.next/standalone ./
# Sao chép các file public và static
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Expose port mà Next.js chạy
EXPOSE 3000

# Lệnh để khởi động Next.js server ở chế độ production
# Next.js standalone output sẽ có một file server.js
CMD ["node", "server.js"]