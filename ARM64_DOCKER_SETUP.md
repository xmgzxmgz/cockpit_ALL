# ARM64 Mac - Docker 容器创建指南

## 🔧 问题

你的 Mac 是 ARM64 架构，需要使用 ARM64 兼容的 PostgreSQL 镜像。

## ✅ 解决方案

### 步骤 1：删除旧容器

在终端中运行：

```bash
docker stop cockpit-db
docker rm cockpit-db
```

### 步骤 2：创建 ARM64 兼容的容器

```bash
docker run -d \
  --name cockpit-db \
  --platform linux/arm64 \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=cockpit_db \
  -p 5433:5432 \
  postgres:15-alpine
```

### 步骤 3：验证容器运行

```bash
docker ps | grep cockpit-db
```

应该看到类似的输出：

```
CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS                    NAMES
47552d87a635   postgres:15-alpine    "docker-entrypoint.s…"   2 seconds ago   Up 1 second    0.0.0.0:5433->5432/tcp  cockpit-db
```

### 步骤 4：启动开发环境

```bash
python3 dev_start.py
```

## 📍 服务地址

启动成功后访问：

```
前端:     http://127.0.0.1:5174
后端:     http://127.0.0.1:8002
API文档:  http://127.0.0.1:8002/docs
数据库:   postgresql://user:password@localhost:5433/cockpit_db
```

## 🐳 Docker 命令参考

```bash
# 查看容器状态
docker ps -a | grep cockpit-db

# 启动容器
docker start cockpit-db

# 停止容器
docker stop cockpit-db

# 查看容器日志
docker logs cockpit-db

# 进入容器
docker exec -it cockpit-db psql -U user -d cockpit_db

# 重启容器
docker restart cockpit-db

# 删除容器
docker rm cockpit-db
```

## 💡 关键参数说明

| 参数 | 说明 |
|------|------|
| `--platform linux/arm64` | 指定 ARM64 架构（重要！） |
| `-d` | 后台运行 |
| `--name cockpit-db` | 容器名称 |
| `-e POSTGRES_USER=user` | PostgreSQL 用户 |
| `-e POSTGRES_PASSWORD=password` | PostgreSQL 密码 |
| `-e POSTGRES_DB=cockpit_db` | 默认数据库 |
| `-p 5433:5432` | 端口映射（主机:容器） |
| `postgres:15-alpine` | 镜像名称 |

## ❓ 常见问题

### Q: 容器创建失败
A: 确保 Docker Desktop 已启动
```bash
docker ps
```

### Q: 连接超时
A: 等待容器完全启动（通常需要 10-30 秒）
```bash
docker logs cockpit-db
```

### Q: 权限被拒绝
A: 确保有 Docker 权限或使用 `sudo`
```bash
sudo docker ps
```

## 🎯 完整流程

```bash
# 1. 删除旧容器
docker stop cockpit-db
docker rm cockpit-db

# 2. 创建新容器（ARM64）
docker run -d \
  --name cockpit-db \
  --platform linux/arm64 \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=cockpit_db \
  -p 5433:5432 \
  postgres:15-alpine

# 3. 等待容器启动
sleep 5

# 4. 验证容器
docker ps | grep cockpit-db

# 5. 启动开发环境
python3 dev_start.py

# 6. 打开浏览器
# http://127.0.0.1:5174
```

## ✨ 成功标志

当你看到以下日志时，说明启动成功：

```
[HH:MM:SS] [INFO] ============================================================
[HH:MM:SS] [INFO] Cockpit 本地开发启动脚本
[HH:MM:SS] [INFO] ============================================================
[HH:MM:SS] [INFO] 检查 PostgreSQL...
[HH:MM:SS] [OK] PostgreSQL 已连接
[HH:MM:SS] [INFO] 初始化数据库...
[HH:MM:SS] [INFO] 启动后端服务...
[HH:MM:SS] [INFO] 启动前端服务...
[HH:MM:SS] [OK] ✓ 服务已启动
```

## 🚀 现在就开始

1. 在终端中运行上面的完整流程
2. 打开浏览器访问 http://127.0.0.1:5174
3. 开始开发！

祝你开发愉快！🎉
