# Docker 数据库启动修复 - 更新说明

## 🔧 修复内容

所有启动脚本已更新，现在支持：
- ✅ 自动停止旧的 PostgreSQL 容器
- ✅ 自动重启 cockpit-db 容器
- ✅ 增加 PostgreSQL 启动等待时间（60秒）
- ✅ 更好的容器状态检查
- ✅ 详细的启动日志

## 🚀 使用方式

### macOS/Linux
```bash
bash dev_start.sh
```

### Windows
```bash
dev_start.bat
```

### 跨平台 Python
```bash
python3 dev_start_simple.py
```

## 📋 启动流程

1. **停止旧容器** - 自动停止并删除其他 PostgreSQL 容器
2. **检查 cockpit-db** - 查找 cockpit-db 容器
3. **启动/重启容器** - 启动或重启容器以确保干净状态
4. **等待初始化** - 等待 PostgreSQL 完全启动（最多 60 秒）
5. **初始化数据库** - 创建数据库和表
6. **启动后端** - 启动 FastAPI 服务
7. **启动前端** - 启动 Vite 开发服务器

## 🐳 Docker 容器信息

```
容器名称: cockpit-db
镜像: postgres:15-alpine
端口映射: 5433:5432
数据库用户: user
数据库密码: password
数据库名称: cockpit_db
```

## 📍 服务地址

启动后访问：

```
前端:     http://127.0.0.1:5174
后端:     http://127.0.0.1:8002
API文档:  http://127.0.0.1:8002/docs
数据库:   postgresql://user:password@localhost:5433/cockpit_db
```

## ❓ 常见问题

### Q: 容器不存在怎么办？
A: 使用以下命令创建容器：
```bash
docker run -d \
  --name cockpit-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=cockpit_db \
  -p 5433:5432 \
  postgres:15-alpine
```

### Q: 启动超时
A: 检查 Docker 容器日志：
```bash
docker logs cockpit-db
```

### Q: 端口 5433 被占用
A: 修改脚本中的 `DB_PORT` 或杀死占用进程：
```bash
lsof -i :5433
kill -9 <PID>
```

### Q: 数据库连接失败
A: 确保容器正在运行：
```bash
docker ps | grep cockpit-db
```

## 🔄 更新的文件

- ✅ `dev_start.py` - 完整版 Python 脚本
- ✅ `dev_start_simple.py` - 简化版 Python 脚本
- ✅ `dev_start.sh` - Shell 脚本

## 💡 关键改进

1. **自动清理** - 自动停止旧容器，避免端口冲突
2. **容器重启** - 确保容器处于干净状态
3. **更长等待** - 从 30 秒增加到 60 秒
4. **进度提示** - 每 10 秒显示一次等待进度
5. **详细日志** - 更清晰的启动过程日志

## 🎉 开始使用

```bash
# 1. 确保 Docker 容器已创建
docker ps -a | grep cockpit-db

# 2. 运行启动脚本
bash dev_start.sh

# 3. 等待启动完成（可能需要 30-60 秒）

# 4. 打开浏览器
# http://127.0.0.1:5174

# 5. 开始开发！
```

## 📝 启动日志示例

```
[HH:MM:SS] [INFO] ============================================================
[HH:MM:SS] [INFO] Cockpit 本地开发启动脚本
[HH:MM:SS] [INFO] ============================================================
[HH:MM:SS] [INFO] 检查 PostgreSQL...
[HH:MM:SS] [WARN] PostgreSQL 未运行，尝试启动 Docker 容器...
[HH:MM:SS] [INFO] 启动 Docker PostgreSQL 容器...
[HH:MM:SS] [INFO] 检查并停止旧的 PostgreSQL 容器...
[HH:MM:SS] [INFO] 容器已在运行，重启以确保干净状态...
[HH:MM:SS] [INFO] 等待 PostgreSQL 启动...
[HH:MM:SS] [INFO] 已等待 10 秒...
[HH:MM:SS] [INFO] 已等待 20 秒...
[HH:MM:SS] [OK] PostgreSQL 已连接
[HH:MM:SS] [INFO] 启动后端服务...
[HH:MM:SS] [INFO] 启动前端服务...
[HH:MM:SS] [OK] ============================================================
[HH:MM:SS] [OK] ✓ 所有服务已启动
[HH:MM:SS] [OK] ============================================================
```

## 🚀 下一步

1. 运行启动脚本
2. 等待所有服务启动
3. 打开浏览器访问前端
4. 开始开发！

祝你开发愉快！🎉
