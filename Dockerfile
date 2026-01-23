# 使用 Node.js 作为基础镜像
FROM node:20

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖（使用淘宝源）
RUN npm config set registry https://registry.npmmirror.com && \
    npm install

# 复制项目文件
COPY . .

# 暴露端口
EXPOSE 5174

# 启动命令
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
