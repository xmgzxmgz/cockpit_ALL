# 快速参考 - Docker 启动脚本

## 🚀 一键启动

```bash
# macOS/Linux
bash dev_start.sh

# Windows
dev_start.bat

# 跨平台
python3 dev_start_simple.py
```

## 📍 服务地址

| 服务 | 地址 |
|------|------|
| 前端 | http://127.0.0.1:5174 |
| 后端 | http://127.0.0.1:8002 |
| API文档 | http://127.0.0.1:8002/docs |
| 数据库 | postgresql://user:password@localhost:5433/cockpit_db |

## 🐳 Docker 容器

```bash
# 创建容器
docker run -d \
  --name cockpit-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=cockpit_db \
  -p 5433:5432 \
  postgres:15-alpine

# 查看容器
docker ps | grep cockpit-db

# 查看日志
docker logs cockpit-db

# 重启容器
docker restart cockpit-db

# 停止容器
docker stop cockpit-db
```

## 🔧 常见命令

```bash
# 查看运行的服务
docker ps

# 查看所有容器
docker ps -a

# 查看容器日志
docker logs cockpit-db

# 进入容器
docker exec -it cockpit-db psql -U user -d cockpit_db

# 查看端口占用
lsof -i :5433
lsof -i :8002
lsof -i :5174

# 杀死进程
kill -9 <PID>
```

## ❓ 快速排查

| 问题 | 解决方案 |
|------|---------|
| 容器不存在 | 使用上面的创建命令 |
| 启动超时 | `docker logs cockpit-db` 查看日志 |
| 端口被占用 | `lsof -i :5433` 查找进程 |
| 连接失败 | 确保容器正在运行 |
| 数据库错误 | 重启容器 `docker restart cockpit-db` |

## 📚 文档

- `DOCKER_FIX_COMPLETE.md` - 完整修复报告
- `QUICK_START.md` - 快速开始指南
- `LOCAL_DEV_SETUP.md` - 完整设置说明
- `DEV_GUIDE.md` - 开发指南

## 💡 提示

- 首次启动可能需要 30-60 秒
- 脚本会自动清理旧容器
- 每 10 秒显示一次进度
- 按 Ctrl+C 可以停止所有服务

祝你开发愉快！🎉
