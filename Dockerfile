# dir: ~/quangminh-smart-border/frontend/Dockerfile

# --- STAGE 1: Dependencies ---
# Tách riêng việc cài đặt dependencies để tận dụng cache tốt hơn
FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


# --- STAGE 2: Builder ---
# Stage này chỉ tập trung vào việc build code
FROM node:20-alpine AS builder

WORKDIR /app
# Sao chép dependencies đã được cài đặt từ stage trước
COPY --from=deps /app/node_modules ./node_modules
# Sao chép các file cần thiết cho việc build
COPY . .

# Chạy lệnh build của Next.js
RUN npm run build


# --- STAGE 3: Production Runner ---
# Stage cuối cùng, tạo ra image nhỏ gọn nhất để chạy ứng dụng
FROM node:20-alpine AS runner

WORKDIR /app

# Thiết lập môi trường là production
ENV NODE_ENV production

# Sao chép output của Next.js build (chế độ standalone) từ stage builder
# Thư mục standalone đã chứa sẵn một phiên bản node_modules tối ưu
COPY --from=builder /app/.next/standalone ./

# Sao chép thư mục public (chứa fonts, images, etc.)
COPY --from=builder /app/public ./public

# Sao chép các file static đã được build
COPY --from=builder /app/.next/static ./.next/static

# Expose port mà Next.js chạy
EXPOSE 3000

# Lệnh để khởi động Next.js server ở chế độ production
# File server.js nằm trong thư mục standalone
CMD ["node", "server.js"]