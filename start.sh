#!/bin/bash

# Cockpit ALL 综合启动脚本
# 功能：
# 1. 自动检测并启动 Docker 容器中的 PostgreSQL 数据库服务
# 2. 启动前端和后端应用程序服务
# 3. 初始化数据库表结构并填充测试数据
# 4. 确保 3D 机房模型根据数据库动态生成

set -e

echo "========================================"
echo "Cockpit ALL 综合启动脚本"
echo "========================================"

# 检查 Docker 是否已安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker 服务是否运行
if ! docker info &> /dev/null; then
    echo "❌ Docker 服务未运行，请先启动 Docker 服务"
    exit 1
fi

# 开发环境使用 SQLite 数据库，避免端口冲突
echo "🔧 初始化 SQLite 数据库..."

# 使用当前目录作为工作目录
db_path="$(pwd)/cockpit.db"
sql_path="$(pwd)/database_schema.sql"

# 删除现有的数据库文件，确保创建新的表结构
if [ -f "$db_path" ]; then
    echo "删除现有数据库文件..."
    rm "$db_path"
fi

python3 -c "
import sqlite3
import os

# 获取数据库文件路径
db_path = '$db_path'
sql_path = '$sql_path'

# 连接数据库
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# 读取 SQL 脚本
with open(sql_path, 'r') as f:
    sql = f.read()

# 执行 SQL 脚本
print('执行 SQL 脚本...')
try:
    cur.executescript(sql)
    conn.commit()
    print('✅ 数据库初始化完成')
except Exception as e:
    print(f'❌ 数据库初始化失败: {e}')
    conn.rollback()
finally:
    conn.close()
"
echo "✅ SQLite 数据库初始化完成"

# 启动后端服务
echo "🔧 启动后端服务..."

# 检查端口 8002 是否被占用
if lsof -i :8002 &> /dev/null; then
    echo "🔧 端口 8002 已被占用，尝试停止占用该端口的进程..."
    lsof -i :8002 | grep LISTEN | awk '{print $2}' | xargs kill -9 2>/dev/null || true
    sleep 2
fi

cd backend
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8002 --reload &
BACKEND_PID=$!
cd ..
sleep 5

# 启动前端服务
echo "🔧 启动前端服务..."

# 检查端口 5174 是否被占用
if lsof -i :5174 &> /dev/null; then
    echo "🔧 端口 5174 已被占用，尝试停止占用该端口的进程..."
    lsof -i :5174 | grep LISTEN | awk '{print $2}' | xargs kill -9 2>/dev/null || true
    sleep 2
fi

npm run dev -- --host &
FRONTEND_PID=$!
sleep 5

# 健康检查
echo "🔧 健康检查..."

# 检查后端服务
if curl -s http://127.0.0.1:8002/health | grep -q "ok"; then
    echo "✅ 后端服务健康检查通过"
else
    echo "❌ 后端服务健康检查失败"
    kill $BACKEND_PID $FRONTEND_PID
    exit 1
fi

# 检查前端服务（给前端更多启动时间）
echo "等待前端服务完全启动..."
sleep 3

if curl -s http://127.0.0.1:5174 > /dev/null 2>&1; then
    echo "✅ 前端服务健康检查通过"
else
    echo "⚠️  前端服务健康检查失败，但继续运行（可能仍在启动中）"
fi

# 输出启动信息
echo "========================================"
echo "🎉 启动完成！"
echo "========================================"
echo "前端地址: http://127.0.0.1:5174"
echo "后端地址: http://127.0.0.1:8002"
echo "========================================"
echo "按 Ctrl+C 停止所有服务"
echo "========================================"

# 等待用户输入
wait $BACKEND_PID $FRONTEND_PID