# 本地开发启动指南

## 快速开始

### 前置要求

1. **Python 3.10+**
   ```bash
   python3 --version
   ```

2. **Node.js 20+**
   ```bash
   node --version
   npm --version
   ```

3. **PostgreSQL 12+**
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`
   - 启动: `brew services start postgresql` (macOS) 或 `sudo systemctl start postgresql` (Linux)

### 安装依赖

```bash
# 后端依赖
pip install -r backend/requirements.txt

# 前端依赖
npm install
```

### 启动开发环境

```bash
# 方式一：使用启动脚本（推荐）
python3 dev_start.py

# 方式二：手动启动各个服务
# 终端1 - 启动后端
cd backend
export DATABASE_URL="postgresql://user:password@localhost:5432/cockpit_db"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8002 --reload

# 终端2 - 启动前端
npm run dev
```

## 服务地址

- **前端**: http://127.0.0.1:5174
- **后端**: http://127.0.0.1:8002
- **API 文档**: http://127.0.0.1:8002/docs
- **数据库**: postgresql://user:password@localhost:5432/cockpit_db

## 功能特性

### 前端热调试
- ✅ Vue 3 + Vite 热模块替换 (HMR)
- ✅ Vue DevTools 集成 (vite-plugin-vue-devtools)
- ✅ TypeScript 类型检查
- ✅ ESLint 代码检查

### 后端热调试
- ✅ Uvicorn --reload 自动重启
- ✅ FastAPI 自动 API 文档
- ✅ SQLAlchemy ORM 支持

### 数据库
- ✅ PostgreSQL 本地数据库
- ✅ 自动初始化数据库和表
- ✅ Mock 数据自动填充

## 常见问题

### PostgreSQL 连接失败

```bash
# 检查 PostgreSQL 是否运行
psql -U user -d postgres -c "SELECT 1"

# 如果提示密码错误，重置密码
sudo -u postgres psql
ALTER USER user WITH PASSWORD 'password';
\q
```

### 前端端口被占用

修改 `vite.config.ts` 中的端口配置：
```typescript
export default defineConfig({
  server: {
    port: 5175, // 改为其他端口
  }
})
```

### 后端端口被占用

修改 `dev_start.py` 中的 `BACKEND_PORT` 变量。

### 模块导入错误

```bash
# 清除缓存并重新安装
rm -rf node_modules package-lock.json
npm install

# 后端
rm -rf backend/__pycache__
pip install -r backend/requirements.txt --force-reinstall
```

## 开发工作流

### 修改前端代码
1. 编辑 `src/` 目录下的文件
2. 保存后自动热更新，无需刷新页面
3. 查看浏览器控制台了解任何错误

### 修改后端代码
1. 编辑 `backend/app/` 目录下的文件
2. 后端会自动重启
3. 刷新浏览器查看更改

### 修改数据库模型
1. 编辑 `backend/app/database.py`
2. 后端重启时会自动创建新表
3. 如需清空数据，删除 `cockpit.db` 文件

## 调试技巧

### Vue DevTools
- 在浏览器中安装 Vue DevTools 扩展
- 打开浏览器开发者工具 (F12)
- 切换到 "Vue" 标签页
- 可以实时查看组件状态和事件

### FastAPI 文档
- 访问 http://127.0.0.1:8002/docs
- 可以直接测试所有 API 端点
- 查看请求/响应示例

### 后端日志
- 所有后端日志输出到终端
- 使用 `print()` 或 `logging` 模块调试
- 查看 SQL 查询: 在 `database.py` 中启用 SQLAlchemy 日志

```python
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
```

## 停止服务

```bash
# 使用启动脚本时
Ctrl + C

# 手动启动时
# 在每个终端中按 Ctrl + C
```

## 生产构建

```bash
# 构建前端
npm run build

# 构建后端（使用 Docker）
docker build -f backend/Dockerfile -t cockpit-backend .
```

## 更多信息

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [FastAPI 文档](https://fastapi.tiangolo.com/)
- [SQLAlchemy 文档](https://docs.sqlalchemy.org/)
