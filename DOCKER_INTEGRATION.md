# Docker 数据库集成 - 更新说明

## 📝 更新内容

所有启动脚本已更新，现在支持自动启动 Docker PostgreSQL 容器。

## 🐳 Docker 容器信息

```
容器名称: cockpit-db
镜像: postgres:15-alpine
端口映射: 5433:5432
数据库用户: user
数据库密码: password
数据库名称: cockpit_db
```

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

## ✨ 新增功能

### 自动 Docker 启动
- ✅ 检查 Docker 容器是否存在
- ✅ 如果容器未运行，自动启动
- ✅ 等待容器完全启动后继续
- ✅ 自动初始化数据库

### 智能连接检查
- ✅ 检查 PostgreSQL 连接
- ✅ 如果连接失败，尝试启动 Docker
- ✅ 最多等待 30 秒
- ✅ 连接成功后继续启动服务

## 🔧 配置更改

### 数据库端口
所有脚本已更新为使用 Docker 容器的端口：
```
旧端口: 5432
新端口: 5433
```

### 数据库连接字符串
```
postgresql://user:password@localhost:5433/cockpit_db
```

## 📋 启动流程

1. **检查 Docker** - 确保 Docker 已安装
2. **启动容器** - 如果容器未运行，启动它
3. **等待启动** - 等待 PostgreSQL 完全启动（最多 30 秒）
4. **初始化数据库** - 创建数据库和表
5. **启动后端** - 启动 FastAPI 服务
6. **启动前端** - 启动 Vite 开发服务器

## 🎯 服务地址

启动后访问：

```
前端:     http://127.0.0.1:5174
后端:     http://127.0.0.1:8002
API文档:  http://127.0.0.1:8002/docs
数据库:   postgresql://user:password@localhost:5433/cockpit_db
```

## ❓ 常见问题

### Q: Docker 容器不存在怎么办？
A: 需要先创建容器。使用以下命令：
```bash
docker run -d \
  --name cockpit-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=cockpit_db \
  -p 5433:5432 \
  postgres:15-alpine
```

### Q: 容器启动失败
A: 检查 Docker 是否运行：
```bash
docker ps
```

### Q: 端口 5433 被占用
A: 修改脚本中的 `DB_PORT` 变量或杀死占用进程：
```bash
lsof -i :5433
kill -9 <PID>
```

### Q: 数据库连接超时
A: 增加等待时间，修改脚本中的循环次数（默认 30 秒）

## 🔄 更新的文件

- ✅ `dev_start.py` - 完整版 Python 脚本
- ✅ `dev_start_simple.py` - 简化版 Python 脚本
- ✅ `dev_start.sh` - Shell 脚本
- ✅ `dev_start.bat` - Windows 批处理脚本

## 📚 相关文档

- `QUICK_START.md` - 快速参考
- `LOCAL_DEV_SETUP.md` - 完整设置
- `DEV_GUIDE.md` - 开发指南

## 🎉 开始使用

```bash
# 1. 确保 Docker 容器已创建
docker ps -a | grep cockpit-db

# 2. 运行启动脚本
bash dev_start.sh

# 3. 打开浏览器
# http://127.0.0.1:5174

# 4. 开始开发！
```

## 💡 提示

- 首次运行可能需要等待 Docker 容器启动，请耐心等待
- 如果容器已在运行，启动会很快
- 所有日志都会输出到终端，便于调试
- 按 Ctrl+C 可以优雅地关闭所有服务

祝你开发愉快！🚀
