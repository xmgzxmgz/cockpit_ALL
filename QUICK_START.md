# 快速启动指南

## 一键启动

### macOS / Linux
```bash
# 方式1：使用 Shell 脚本（推荐）
bash dev_start.sh

# 方式2：使用 Python 脚本
python3 dev_start_simple.py
```

### Windows
```bash
# 双击运行
dev_start.bat

# 或在命令行运行
cmd /c dev_start.bat
```

## 前置要求

### macOS
```bash
# 安装 Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装依赖
brew install python@3.11 node postgresql

# 启动 PostgreSQL
brew services start postgresql

# 验证安装
python3 --version
node --version
npm --version
psql --version
```

### Linux (Ubuntu/Debian)
```bash
# 安装依赖
sudo apt-get update
sudo apt-get install python3 python3-pip nodejs npm postgresql postgresql-contrib

# 启动 PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 验证安装
python3 --version
node --version
npm --version
psql --version
```

### Windows
1. 安装 Python 3.11+: https://www.python.org/downloads/
2. 安装 Node.js 20+: https://nodejs.org/
3. 安装 PostgreSQL 12+: https://www.postgresql.org/download/windows/
4. 在安装 PostgreSQL 时记住密码（默认用户: postgres）

## 配置数据库

### macOS/Linux
```bash
# 创建用户（如果不存在）
sudo -u postgres psql -c "CREATE USER user WITH PASSWORD 'password';"
sudo -u postgres psql -c "ALTER USER user CREATEDB;"

# 验证
psql -h localhost -U user -d postgres -c "SELECT 1"
```

### Windows
```bash
# 使用 pgAdmin 或命令行
psql -U postgres
# 输入密码后执行：
CREATE USER user WITH PASSWORD 'password';
ALTER USER user CREATEDB;
\q
```

## 安装项目依赖

```bash
# 后端依赖
pip install -r backend/requirements.txt

# 前端依赖
npm install
```

## 启动开发环境

### 自动启动（推荐）
```bash
# macOS/Linux
bash dev_start.sh

# Windows
dev_start.bat

# Python 版本（跨平台）
python3 dev_start_simple.py
```

### 手动启动

**终端1 - 启动后端**
```bash
cd backend
export DATABASE_URL="postgresql://user:password@localhost:5432/cockpit_db"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload
```

**终端2 - 启动前端**
```bash
npm run dev
```

## 访问应用

- **前端**: http://127.0.0.1:5174
- **后端 API**: http://127.0.0.1:8002
- **API 文档**: http://127.0.0.1:8002/docs
- **数据库**: postgresql://user:password@localhost:5432/cockpit_db

## 热调试功能

### Vue 前端热更新
- 修改 `src/` 目录下的文件
- 保存后自动刷新，无需手动刷新浏览器
- 支持 Vue DevTools 浏览器扩展

### FastAPI 后端热重启
- 修改 `backend/app/` 目录下的文件
- 后端自动重启（--reload 模式）
- 刷新浏览器查看更改

### 数据库自动初始化
- 启动脚本自动创建数据库
- 自动创建所有表
- 自动填充 Mock 数据

## 常见问题

### PostgreSQL 连接失败
```bash
# 检查 PostgreSQL 是否运行
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Windows
# 在服务管理器中检查 PostgreSQL 服务

# 重启 PostgreSQL
# macOS
brew services restart postgresql

# Linux
sudo systemctl restart postgresql
```

### 端口被占用
```bash
# 查找占用端口的进程
# macOS/Linux
lsof -i :5174  # 前端
lsof -i :8002  # 后端

# Windows
netstat -ano | findstr :5174
netstat -ano | findstr :8002

# 修改端口
# 编辑 dev_start.sh 或 dev_start_simple.py 中的端口配置
```

### 依赖安装失败
```bash
# 清除缓存
pip cache purge
npm cache clean --force

# 重新安装
pip install -r backend/requirements.txt --force-reinstall
npm install --force
```

### 数据库初始化失败
```bash
# 手动初始化
psql -h localhost -U user -d postgres -c "CREATE DATABASE cockpit_db;"

# 或删除后重新创建
psql -h localhost -U user -d postgres -c "DROP DATABASE IF EXISTS cockpit_db;"
psql -h localhost -U user -d postgres -c "CREATE DATABASE cockpit_db;"
```

## 停止服务

```bash
# 使用启动脚本时
Ctrl + C

# 手动启动时
# 在每个终端中按 Ctrl + C
```

## 调试技巧

### 查看后端日志
```bash
# 后端输出会显示在启动脚本的终端中
# 查看 SQL 查询
# 在 backend/app/database.py 中添加：
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
```

### 查看前端日志
```bash
# 打开浏览器开发者工具 (F12)
# 查看 Console 标签页
# 查看 Network 标签页查看 API 请求
```

### 使用 Vue DevTools
1. 安装浏览器扩展: https://devtools.vuejs.org/
2. 打开浏览器开发者工具 (F12)
3. 切换到 "Vue" 标签页
4. 实时查看组件状态和事件

### 使用 FastAPI 文档
1. 访问 http://127.0.0.1:8002/docs
2. 可以直接测试所有 API 端点
3. 查看请求/响应示例

## 生产构建

```bash
# 构建前端
npm run build

# 输出在 dist/ 目录

# 构建后端（使用 Docker）
docker build -f backend/Dockerfile -t cockpit-backend .
```

## 更多帮助

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [FastAPI 文档](https://fastapi.tiangolo.com/)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)
