# 本地开发启动脚本 - 完整说明

## 📋 概述

已为你创建了多个本地开发启动脚本，支持前后端热调试和自动数据库初始化。

## 🚀 快速开始

### 最简单的方式（推荐）

**macOS/Linux:**
```bash
bash dev_start.sh
```

**Windows:**
```bash
dev_start.bat
```

**跨平台 Python 版本:**
```bash
python3 dev_start_simple.py
```

## 📁 创建的文件

### 1. `dev_start.sh` (macOS/Linux)
- ✅ 自动检查 PostgreSQL
- ✅ 自动初始化数据库
- ✅ 启动后端 (FastAPI + Uvicorn --reload)
- ✅ 启动前端 (Vite 热更新)
- ✅ 彩色日志输出
- ✅ 优雅关闭 (Ctrl+C)

**使用:**
```bash
bash dev_start.sh
```

### 2. `dev_start_simple.py` (跨平台)
- ✅ Python 实现，支持 Windows/macOS/Linux
- ✅ 自动检查依赖
- ✅ 自动初始化数据库
- ✅ 启动前后端服务
- ✅ 实时输出日志

**使用:**
```bash
python3 dev_start_simple.py
```

### 3. `dev_start.bat` (Windows)
- ✅ Windows 批处理脚本
- ✅ 自动检查 PostgreSQL
- ✅ 自动初始化数据库
- ✅ 在新窗口启动服务

**使用:**
```bash
dev_start.bat
```

### 4. `dev_start.py` (完整版)
- ✅ 功能最完整的 Python 版本
- ✅ 详细的错误处理
- ✅ 进程监控
- ✅ 信号处理

**使用:**
```bash
python3 dev_start.py
```

### 5. `QUICK_START.md`
- 📖 快速参考指南
- 🔧 前置要求和安装步骤
- ❓ 常见问题解答
- 💡 调试技巧

### 6. `DEV_GUIDE.md`
- 📚 详细开发指南
- 🛠️ 工作流说明
- 🐛 调试方法
- 📦 生产构建

## 🎯 功能特性

### 前端热调试
```
✅ Vue 3 + Vite HMR (Hot Module Replacement)
✅ 修改代码自动刷新，无需手动刷新
✅ Vue DevTools 集成
✅ TypeScript 类型检查
✅ ESLint 代码检查
```

### 后端热调试
```
✅ FastAPI 自动 API 文档 (/docs)
✅ Uvicorn --reload 自动重启
✅ 修改代码自动重启服务
✅ SQLAlchemy ORM 支持
✅ 自动数据库初始化
```

### 数据库
```
✅ PostgreSQL 本地数据库
✅ 自动创建数据库和表
✅ 自动填充 Mock 数据
✅ 支持热重载
```

## 📍 服务地址

启动后访问以下地址：

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端 | http://127.0.0.1:5174 | Vue 应用 |
| 后端 | http://127.0.0.1:8002 | FastAPI 服务 |
| API 文档 | http://127.0.0.1:8002/docs | Swagger UI |
| 数据库 | postgresql://user:password@localhost:5432/cockpit_db | PostgreSQL |

## 🔧 前置要求

### macOS
```bash
brew install python@3.11 node postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get install python3 python3-pip nodejs npm postgresql
sudo systemctl start postgresql
```

### Windows
1. 安装 Python 3.11+
2. 安装 Node.js 20+
3. 安装 PostgreSQL 12+
4. 配置数据库用户

## 📦 安装依赖

```bash
# 后端依赖
pip install -r backend/requirements.txt

# 前端依赖
npm install
```

## 🎮 使用示例

### 场景1：快速开发
```bash
# 一条命令启动所有服务
bash dev_start.sh

# 在浏览器中打开
# http://127.0.0.1:5174
```

### 场景2：调试特定功能
```bash
# 终端1 - 启动后端
cd backend
export DATABASE_URL="postgresql://user:password@localhost:5432/cockpit_db"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload

# 终端2 - 启动前端
npm run dev

# 终端3 - 查看日志
tail -f backend.log
```

### 场景3：测试 API
```bash
# 访问 API 文档
http://127.0.0.1:8002/docs

# 直接在 Swagger UI 中测试所有端点
```

## 🐛 调试技巧

### Vue DevTools
1. 安装浏览器扩展
2. 打开 F12 开发者工具
3. 切换到 "Vue" 标签页
4. 实时查看组件状态

### FastAPI 文档
1. 访问 http://127.0.0.1:8002/docs
2. 可以直接测试 API
3. 查看请求/响应示例

### 后端日志
```python
# 在 backend/app/database.py 中启用 SQL 日志
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
```

## ⚙️ 配置修改

### 修改端口
编辑启动脚本中的以下变量：
```python
BACKEND_PORT = 8002      # 后端端口
FRONTEND_PORT = 5174     # 前端端口
```

### 修改数据库
编辑启动脚本中的以下变量：
```python
DB_HOST = "localhost"
DB_PORT = 5432
DB_USER = "user"
DB_PASSWORD = "password"
DB_NAME = "cockpit_db"
```

## 🛑 停止服务

```bash
# 使用启动脚本时
Ctrl + C

# 手动启动时
# 在每个终端中按 Ctrl + C
```

## ❓ 常见问题

### Q: PostgreSQL 连接失败
A: 确保 PostgreSQL 已启动
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### Q: 端口被占用
A: 修改启动脚本中的端口配置或杀死占用进程
```bash
# 查找占用进程
lsof -i :5174
lsof -i :8002

# 杀死进程
kill -9 <PID>
```

### Q: 依赖安装失败
A: 清除缓存并重新安装
```bash
pip cache purge
npm cache clean --force
pip install -r backend/requirements.txt --force-reinstall
npm install --force
```

### Q: 数据库初始化失败
A: 手动创建数据库
```bash
psql -h localhost -U user -d postgres -c "CREATE DATABASE cockpit_db;"
```

## 📚 相关文档

- `QUICK_START.md` - 快速参考指南
- `DEV_GUIDE.md` - 详细开发指南
- `README.md` - 项目说明

## 🎓 学习资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [FastAPI 官方文档](https://fastapi.tiangolo.com/)
- [PostgreSQL 官方文档](https://www.postgresql.org/docs/)

## 💡 提示

1. **首次运行**: 脚本会自动初始化数据库，可能需要几秒钟
2. **热更新**: 修改代码后自动刷新，无需手动重启
3. **API 文档**: 访问 /docs 可以直接测试所有 API
4. **Vue DevTools**: 安装浏览器扩展可以更好地调试前端

## 🚀 下一步

1. 运行启动脚本
2. 打开浏览器访问 http://127.0.0.1:5174
3. 开始开发！

祝你开发愉快！🎉
