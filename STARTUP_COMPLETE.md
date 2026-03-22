# 启动脚本修复完成 - 最终总结

## ✅ 完成的工作

已为你的项目创建了完整的本地开发启动解决方案。

## 📋 可用的启动脚本

### 1. `dev_start.py` - 推荐使用
- 使用本地 PostgreSQL（端口 5432）
- 自动初始化数据库
- 启动 FastAPI 后端
- 启动 Vite 前端

### 2. `dev_start_simple.py` - 简化版
- 功能同上
- 代码更简洁

### 3. `dev_start_local.py` - 本地 PostgreSQL 专用
- 仅使用本地 PostgreSQL
- 不依赖 Docker

### 4. `dev_start.sh` - Shell 脚本
- macOS/Linux 用户推荐
- 功能完整

### 5. `dev_start.bat` - Windows 脚本
- Windows 用户使用

## 🚀 使用方式

### 前置要求

**macOS:**
```bash
# 安装 PostgreSQL
brew install postgresql

# 启动 PostgreSQL
brew services start postgresql

# 验证
psql --version
```

**Linux:**
```bash
# 安装 PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# 启动 PostgreSQL
sudo systemctl start postgresql

# 验证
psql --version
```

### 启动开发环境

**macOS/Linux:**
```bash
python3 dev_start.py
```

**Windows:**
```bash
python dev_start.py
```

**或使用 Shell 脚本（macOS/Linux）:**
```bash
bash dev_start.sh
```

## 📍 服务地址

启动成功后访问：

```
前端:     http://127.0.0.1:5174
后端:     http://127.0.0.1:8002
API文档:  http://127.0.0.1:8002/docs
数据库:   postgresql://user:password@localhost:5432/cockpit_db
```

## 🔧 数据库配置

### 创建数据库用户（如果不存在）

```bash
# macOS/Linux
sudo -u postgres psql -c "CREATE USER user WITH PASSWORD 'password';"
sudo -u postgres psql -c "ALTER USER user CREATEDB;"

# 验证
psql -h localhost -U user -d postgres -c "SELECT 1"
```

### 数据库连接字符串

```
postgresql://user:password@localhost:5432/cockpit_db
```

## 📚 文档

- `QUICK_START.md` - 快速参考
- `LOCAL_DEV_SETUP.md` - 完整设置
- `DEV_GUIDE.md` - 开发指南
- `DOCKER_FIX_COMPLETE.md` - Docker 修复说明

## ❓ 常见问题

### Q: PostgreSQL 连接失败
A: 确保 PostgreSQL 已启动
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# 验证
psql --version
```

### Q: 数据库用户不存在
A: 创建用户
```bash
sudo -u postgres psql
CREATE USER user WITH PASSWORD 'password';
ALTER USER user CREATEDB;
\q
```

### Q: 端口被占用
A: 修改脚本中的端口配置或杀死占用进程

### Q: 前端/后端无法启动
A: 检查依赖是否安装
```bash
pip install -r backend/requirements.txt
npm install
```

## 🎯 启动流程

1. 检查 PostgreSQL 连接
2. 初始化数据库（如果不存在）
3. 启动 FastAPI 后端（端口 8002）
4. 启动 Vite 前端（端口 5174）
5. 显示服务地址

## 💡 关键特性

- ✅ 自动数据库初始化
- ✅ 前端热更新（HMR）
- ✅ 后端自动重启（--reload）
- ✅ 详细的启动日志
- ✅ 优雅的关闭处理（Ctrl+C）

## 🛑 停止服务

```bash
# 在启动脚本的终端中按
Ctrl + C
```

## 📝 启动日志示例

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
[HH:MM:SS] [INFO] 按 Ctrl+C 停止
[HH:MM:SS] [OK] ============================================================
```

## 🎉 开始开发

```bash
# 1. 确保 PostgreSQL 已启动
brew services start postgresql  # macOS
# 或
sudo systemctl start postgresql # Linux

# 2. 运行启动脚本
python3 dev_start.py

# 3. 打开浏览器
# http://127.0.0.1:5174

# 4. 开始开发！
```

## 📞 需要帮助？

1. 检查 PostgreSQL 是否运行
2. 检查数据库用户是否存在
3. 查看启动脚本的日志输出
4. 检查端口是否被占用

祝你开发愉快！🚀
