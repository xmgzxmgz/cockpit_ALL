# 启动脚本 - 最终完成总结

## ✅ 已完成的工作

为你的 Cockpit 项目创建了完整的本地开发启动解决方案。

## 📋 创建的文件

### 启动脚本
- ✅ `dev_start.py` - Python 完整版（推荐）
- ✅ `dev_start_simple.py` - Python 简化版
- ✅ `dev_start_local.py` - 本地 PostgreSQL 专用
- ✅ `dev_start.sh` - Shell 脚本（macOS/Linux）
- ✅ `dev_start.bat` - Windows 批处理脚本

### 文档
- ✅ `QUICK_START.md` - 快速参考
- ✅ `LOCAL_DEV_SETUP.md` - 完整设置
- ✅ `DEV_GUIDE.md` - 开发指南
- ✅ `STARTUP_COMPLETE.md` - 启动完成指南
- ✅ `DOCKER_FIX_COMPLETE.md` - Docker 修复说明

## 🚀 使用方式

### 方案 1：使用 Docker PostgreSQL（推荐）

```bash
# 1. 确保 Docker 容器正在运行
docker ps | grep cockpit-db

# 2. 如果容器未运行，启动它
docker start cockpit-db

# 3. 运行启动脚本
python3 dev_start.py
```

### 方案 2：使用本地 PostgreSQL

```bash
# 1. 启动本地 PostgreSQL
brew services start postgresql  # macOS
# 或
sudo systemctl start postgresql # Linux

# 2. 修改 dev_start.py 中的端口为 5432
# DB_PORT = 5432

# 3. 运行启动脚本
python3 dev_start.py
```

## 📍 服务地址

启动成功后访问：

```
前端:     http://127.0.0.1:5174
后端:     http://127.0.0.1:8002
API文档:  http://127.0.0.1:8002/docs
数据库:   postgresql://user:password@localhost:5433/cockpit_db (Docker)
         或
         postgresql://user:password@localhost:5432/cockpit_db (本地)
```

## 🐳 Docker 容器信息

```
容器名称: cockpit-db
镜像: postgres:15-alpine
端口映射: 5433:5432
数据库用户: user
数据库密码: password
数据库名称: cockpit_db
状态: Running (已启动)
```

## 🔧 Docker 命令

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
```

## 💡 关键特性

- ✅ 自动数据库初始化
- ✅ 前端热更新（HMR）
- ✅ 后端自动重启（--reload）
- ✅ 详细的启动日志
- ✅ 优雅的关闭处理（Ctrl+C）
- ✅ 支持 Docker 和本地 PostgreSQL

## ❓ 常见问题

### Q: Docker 容器无法连接
A: 检查容器是否运行
```bash
docker ps | grep cockpit-db
docker logs cockpit-db
```

### Q: 端口 5433 被占用
A: 修改 Docker 容器的端口映射或杀死占用进程
```bash
lsof -i :5433
kill -9 <PID>
```

### Q: 数据库连接超时
A: 增加连接超时时间或检查防火墙设置

### Q: 前端/后端无法启动
A: 检查依赖是否安装
```bash
pip install -r backend/requirements.txt
npm install
```

## 📝 启动日志示例

```
[15:07:00] [INFO] ============================================================
[15:07:00] [INFO] Cockpit 本地开发启动脚本
[15:07:00] [INFO] ============================================================
[15:07:00] [INFO] 检查 PostgreSQL...
[15:07:00] [OK] PostgreSQL 已连接
[15:07:00] [INFO] 初始化数据库...
[15:07:01] [INFO] 启动后端服务...
[15:07:03] [INFO] 启动前端服务...
[15:07:05] [OK] ============================================================
[15:07:05] [OK] ✓ 服务已启动
[15:07:05] [OK] ============================================================
[15:07:05] [INFO] 前端: http://127.0.0.1:5174
[15:07:05] [INFO] 后端: http://127.0.0.1:8002
[15:07:05] [INFO] API文档: http://127.0.0.1:8002/docs
[15:07:05] [OK] ============================================================
[15:07:05] [INFO] 按 Ctrl+C 停止
[15:07:05] [OK] ============================================================
```

## 🎯 下一步

1. **确保 Docker 容器运行**
   ```bash
   docker start cockpit-db
   ```

2. **运行启动脚本**
   ```bash
   python3 dev_start.py
   ```

3. **打开浏览器**
   ```
   http://127.0.0.1:5174
   ```

4. **开始开发！**

## 📚 相关文档

- `QUICK_START.md` - 快速参考
- `LOCAL_DEV_SETUP.md` - 完整设置
- `DEV_GUIDE.md` - 开发指南
- `DOCKER_FIX_COMPLETE.md` - Docker 修复说明

## 🛑 停止服务

```bash
# 在启动脚本的终端中按
Ctrl + C
```

## ✨ 总结

所有启动脚本都已准备好，支持：
- ✅ Docker PostgreSQL
- ✅ 本地 PostgreSQL
- ✅ 前端热更新
- ✅ 后端自动重启
- ✅ 自动数据库初始化

你可以立即开始开发！🚀

祝你开发愉快！🎉
