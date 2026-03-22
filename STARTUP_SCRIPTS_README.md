# 本地开发启动脚本 - 完成总结

## ✅ 已完成

为你的项目创建了完整的本地开发启动解决方案，支持前后端热调试和自动数据库初始化。

## 📦 创建的文件

### 启动脚本

| 文件 | 平台 | 说明 |
|------|------|------|
| `dev_start.sh` | macOS/Linux | Shell 脚本，推荐使用 |
| `dev_start_simple.py` | 跨平台 | Python 脚本，简化版 |
| `dev_start.py` | 跨平台 | Python 脚本，完整版 |
| `dev_start.bat` | Windows | 批处理脚本 |

### 文档

| 文件 | 说明 |
|------|------|
| `QUICK_START.md` | 快速参考指南（推荐首先阅读） |
| `DEV_GUIDE.md` | 详细开发指南 |
| `LOCAL_DEV_SETUP.md` | 完整设置说明 |

## 🚀 快速开始

### macOS/Linux（推荐）
```bash
bash dev_start.sh
```

### Windows
```bash
dev_start.bat
```

### 跨平台
```bash
python3 dev_start_simple.py
```

## 🎯 功能特性

### ✨ 前端热调试
- Vue 3 + Vite HMR（热模块替换）
- 修改代码自动刷新，无需手动刷新
- Vue DevTools 集成
- TypeScript 类型检查
- ESLint 代码检查

### ⚡ 后端热调试
- FastAPI 自动 API 文档 (/docs)
- Uvicorn --reload 自动重启
- 修改代码自动重启服务
- SQLAlchemy ORM 支持
- 自动数据库初始化

### 🗄️ 数据库
- PostgreSQL 本地数据库
- 自动创建数据库和表
- 自动填充 Mock 数据
- 支持热重载

## 📍 服务地址

启动后访问：

```
前端:     http://127.0.0.1:5174
后端:     http://127.0.0.1:8002
API文档:  http://127.0.0.1:8002/docs
数据库:   postgresql://user:password@localhost:5432/cockpit_db
```

## 🔧 前置要求

### macOS
```bash
brew install python@3.11 node postgresql
brew services start postgresql
```

### Linux
```bash
sudo apt-get install python3 python3-pip nodejs npm postgresql
sudo systemctl start postgresql
```

### Windows
1. 安装 Python 3.11+
2. 安装 Node.js 20+
3. 安装 PostgreSQL 12+

## 📦 安装依赖

```bash
# 后端
pip install -r backend/requirements.txt

# 前端
npm install
```

## 🎮 使用方式

### 方式1：一键启动（推荐）
```bash
bash dev_start.sh
```

### 方式2：手动启动

**终端1 - 后端**
```bash
cd backend
export DATABASE_URL="postgresql://user:password@localhost:5432/cockpit_db"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload
```

**终端2 - 前端**
```bash
npm run dev
```

## 🛑 停止服务

```bash
Ctrl + C
```

## 📚 文档说明

### QUICK_START.md
- 快速参考指南
- 前置要求和安装步骤
- 常见问题解答
- 调试技巧

### DEV_GUIDE.md
- 详细开发指南
- 工作流说明
- 调试方法
- 生产构建

### LOCAL_DEV_SETUP.md
- 完整设置说明
- 功能特性详解
- 配置修改方法
- 学习资源

## 💡 关键特性

### 自动初始化
- ✅ 自动检查 PostgreSQL
- ✅ 自动创建数据库
- ✅ 自动创建表
- ✅ 自动填充 Mock 数据

### 热调试支持
- ✅ 前端代码修改自动刷新
- ✅ 后端代码修改自动重启
- ✅ 无需手动刷新浏览器
- ✅ 无需重启服务

### 开发友好
- ✅ 彩色日志输出
- ✅ 详细错误提示
- ✅ 自动依赖检查
- ✅ 优雅关闭处理

## 🐛 调试工具

### Vue DevTools
```
1. 安装浏览器扩展
2. 打开 F12 开发者工具
3. 切换到 "Vue" 标签页
4. 实时查看组件状态
```

### FastAPI 文档
```
访问 http://127.0.0.1:8002/docs
可以直接测试所有 API 端点
```

### 后端日志
```python
# 在 backend/app/database.py 中启用 SQL 日志
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
```

## ⚙️ 配置修改

### 修改端口
编辑启动脚本中的变量：
```python
BACKEND_PORT = 8002      # 后端端口
FRONTEND_PORT = 5174     # 前端端口
```

### 修改数据库
编辑启动脚本中的变量：
```python
DB_HOST = "localhost"
DB_PORT = 5432
DB_USER = "user"
DB_PASSWORD = "password"
DB_NAME = "cockpit_db"
```

## ❓ 常见问题

### PostgreSQL 连接失败
```bash
# 启动 PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux
```

### 端口被占用
```bash
# 查找占用进程
lsof -i :5174
lsof -i :8002

# 杀死进程
kill -9 <PID>
```

### 依赖安装失败
```bash
pip cache purge
npm cache clean --force
pip install -r backend/requirements.txt --force-reinstall
npm install --force
```

## 📖 推荐阅读顺序

1. **QUICK_START.md** - 快速上手
2. **LOCAL_DEV_SETUP.md** - 了解完整功能
3. **DEV_GUIDE.md** - 深入开发指南

## 🎓 相关资源

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [FastAPI 文档](https://fastapi.tiangolo.com/)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)

## 🎉 开始开发

```bash
# 1. 安装依赖
pip install -r backend/requirements.txt
npm install

# 2. 启动服务
bash dev_start.sh

# 3. 打开浏览器
# http://127.0.0.1:5174

# 4. 开始编码！
```

## 📝 脚本对比

| 特性 | dev_start.sh | dev_start_simple.py | dev_start.py | dev_start.bat |
|------|--------------|-------------------|--------------|---------------|
| 平台 | macOS/Linux | 跨平台 | 跨平台 | Windows |
| 复杂度 | 简单 | 简单 | 完整 | 简单 |
| 功能 | 基础 | 基础 | 完整 | 基础 |
| 推荐 | ⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐ |

## 🚀 下一步

1. 阅读 `QUICK_START.md`
2. 安装前置要求
3. 运行启动脚本
4. 开始开发！

祝你开发愉快！🎉
