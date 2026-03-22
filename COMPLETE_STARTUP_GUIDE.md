# 完整启动修复指南 - 所有解决方案

## 🔍 问题诊断

Docker 容器无法连接到端口 5433。可能的原因：
1. 容器未运行
2. 容器启动失败
3. 端口映射错误
4. Docker 权限问题

## ✅ 完整修复流程

### 方案 A：使用本地 PostgreSQL（最简单）

如果你不想使用 Docker，可以使用本地 PostgreSQL：

**步骤 1：启动本地 PostgreSQL**

```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

**步骤 2：修改 dev_start.py**

编辑 `/Users/xiamuguizhi/code/cockpit_ALL/dev_start.py`，找到这一行：

```python
DB_PORT = 5433  # Docker 容器映射的端口
```

改为：

```python
DB_PORT = 5432  # 本地 PostgreSQL 默认端口
```

**步骤 3：创建数据库用户**

```bash
sudo -u postgres psql -c "CREATE USER user WITH PASSWORD 'password';"
sudo -u postgres psql -c "ALTER USER user CREATEDB;"
```

**步骤 4：启动开发环境**

```bash
python3 dev_start.py
```

---

### 方案 B：修复 Docker 容器（推荐）

**步骤 1：清理旧容器**

在终端中运行：

```bash
docker stop cockpit-db 2>/dev/null || true
docker rm cockpit-db 2>/dev/null || true
```

**步骤 2：创建新容器**

```bash
docker run -d \
  --name cockpit-db \
  --platform linux/arm64 \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -p 5433:5432 \
  postgres:15-alpine
```

**步骤 3：等待容器启动**

```bash
sleep 15
```

**步骤 4：验证容器运行**

```bash
docker ps | grep cockpit-db
```

应该看到容器正在运行。

**步骤 5：测试数据库连接**

```bash
docker exec cockpit-db psql -U user -d postgres -c "SELECT 1"
```

应该返回 `1`。

**步骤 6：启动开发环境**

```bash
python3 dev_start.py
```

---

### 方案 C：使用 Docker Compose（最稳定）

**步骤 1：创建 docker-compose.yml**

在项目根目录创建文件 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: cockpit-db
    platform: linux/arm64
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: cockpit_db
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

**步骤 2：启动容器**

```bash
docker-compose up -d
```

**步骤 3：等待容器启动**

```bash
sleep 15
```

**步骤 4：验证**

```bash
docker-compose ps
```

**步骤 5：启动开发环境**

```bash
python3 dev_start.py
```

---

## 🎯 推荐流程（最快）

### 使用本地 PostgreSQL（无需 Docker）

```bash
# 1. 启动 PostgreSQL
brew services start postgresql

# 2. 修改 dev_start.py 中的 DB_PORT 为 5432

# 3. 创建数据库用户
sudo -u postgres psql << EOF
CREATE USER user WITH PASSWORD 'password';
ALTER USER user CREATEDB;
EOF

# 4. 启动开发环境
python3 dev_start.py

# 5. 打开浏览器
# http://127.0.0.1:5174
```

---

## 📍 服务地址

启动成功后访问：

```
前端:     http://127.0.0.1:5174
后端:     http://127.0.0.1:8002
API文档:  http://127.0.0.1:8002/docs
```

---

## 🐳 Docker 故障排查

### 检查容器状态

```bash
# 查看所有容器
docker ps -a

# 查看容器日志
docker logs cockpit-db

# 进入容器
docker exec -it cockpit-db bash

# 测试连接
docker exec cockpit-db psql -U user -d postgres -c "SELECT 1"
```

### 常见错误

**错误：Connection refused**
- 容器未运行：`docker start cockpit-db`
- 端口被占用：`lsof -i :5433`

**错误：permission denied**
- 使用 sudo：`sudo docker ps`
- 或添加用户到 docker 组：`sudo usermod -aG docker $USER`

**错误：platform not available**
- 确保使用 `--platform linux/arm64`

---

## ✨ 成功标志

当你看到以下输出时，说明启动成功：

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
```

---

## 🚀 立即开始

选择上面的任何一个方案，按步骤执行即可。

**推荐：使用本地 PostgreSQL（最简单快速）**

祝你开发愉快！🎉
