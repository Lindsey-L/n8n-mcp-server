# 使用 Node.js 20 作为基础镜像
FROM node:20

# 在容器中创建工作目录
WORKDIR /app

# 先复制 package.json 和 tsconfig.json
COPY package.json tsconfig.json ./

# 安装依赖
RUN npm install

# 复制源码
COPY src ./src

# 编译 TypeScript
RUN npx tsc

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["node", "dist/index.js"]

