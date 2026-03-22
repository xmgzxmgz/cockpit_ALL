# Docker 容器启动失败 - 修复指南

## 🔍 问题分析

Docker 容器创建后立即关闭，原因是初始化脚本在完成后没有保持容器运行。

## ✅ 解决方案

### 步骤 1：在终端中手动创建容器

复制以下命令到终端并运行：

```bash
docker run -d \
  --name cockpit-db \
  --platform linux/arm64 \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -p 5433:5432 \
  postgres:15-alpine
```

### 步骤 2：验证容器运行

```bash
docker ps | grep cockpit-db
```

应该看到：
```
CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS                    NAMES
a449f50cf37b   postgres:15-alpine    "docker-entrypoint.s…"   5 seconds ago   Up 4 seconds   0.0.0.0:5433->5432/tcp  cockpit-db
```

### 步骤 3：等待容器完全启动

```bash
sleep 10
```

### 步骤 4：测试连接

```bash
docker exec cockpit-db psql -U user -d postgres -c "SELECT 1"
```

应该看到：
```
 ?column? 
----------
        1
(1 row)
```

### 步骤 5：启动开发环境

```bash
python3 dev_start.py
```

## 📍 预期输出

当启动成功时，你应该看到：

```
[HH:MM:SS] [INFO] ============================================================
[HH:MM:SS] [INFO] Cockpit 本地开发启动脚本
[HH:MM:SS] [INFO] ============================================================
[HH:MM:SS] [INFO] 检查 PostgreSQL...
[HH:MM:SS] [OK] PostgreSQL 已连接
[HH:MM:SS] [INFO] 初始化数据库...
[HH:MM:SS] [INFO] 启动后端服务...
[HH:MM:SS] [INFO] 启动前端服务...
[HH:MM:SS] [OK] ============================================================
[HH:MM:SS] [OK] ✓ 服务已启动
[HH:MM:SS] [OK] ============================================================
[HH:MM:SS] [INFO] 前端: http://127.0.0.1:5174
[HH:MM:SS] [INFO] 后端: http://127.0.0.1:8002
[HH:MM:SS] [INFO] API文档: http://127.0.0.1:8002/docs
[HH:MM:SS] [OK] ============================================================
```

## 🐳 Docker 命令参考

```bash
# 查看容器状态
docker ps -a | grep cockpit-db

# 查看容器日志
docker logs cockpit-db

# 进入容器
docker exec -it cockpit-db psql -U user -d cockpit_db

# 重启容器
docker restart cockpit-db

# 停止容器
docker stop cockpit-db

# 启动容器
docker start cockpit-db

# 删除容器
docker rm cockpit-db
```

## 🎯 完整流程

```bash
# 1. 创建容器
docker run -d \
  --name cockpit-db \
  --platform linux/arm64 \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -p 5433:5432 \
  postgres:15-alpine

# 2. 等待启动
sleep 10

# 3. 验证连接
docker exec cockpit-db psql -U user -d postgres -c "SELECT 1"

# 4. 启动开发环境
python3 dev_start.py

# 5. 打开浏览器
# http://127.0.0.1:5174
```

## 📍 服务地址

启动成功后访问：

```
前端:     http://127.0.0.1:5174
后端:     http://127.0.0.1:8002
API文档:  http://127.0.0.1:8002/docs
数据库:   postgresql://user:password@localhost:5433/cockpit_db
```

## ❓ 常见问题

### Q: 容器仍然立即关闭
A: 检查容器日志
```bash
docker logs cockpit-db
```

### Q: 连接被拒绝
A: 确保容器正在运行
```bash
docker ps | grep cockpit-db
```

### Q: 权限被拒绝
A: 确保 Docker Desktop 已启动并有权限

### Q: 端口被占用
A: 修改端口映射
```bash
docker run -d \
  --name cockpit-db \
  --platform linux/arm64 \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -p 5434:5432 \
  postgres:15-alpine
```

然后修改 `dev_start.py` 中的 `DB_PORT = 5434`

## ✨ 成功标志

- ✅ `docker ps` 显示容器正在运行
- ✅ `docker logs cockpit-db` 显示 "database system is ready to accept connections"
- ✅ `docker exec cockpit-db psql -U user -d postgres -c "SELECT 1"` 返回 1
- ✅ `python3 dev_start.py` 显示 "PostgreSQL 已连接"

## 🚀 现在就开始

1. 在终端中运行上面的完整流程
2. 打开浏览器访问 http://127.0.0.1:5174
3. 开始开发！

祝你开发愉快！🎉
