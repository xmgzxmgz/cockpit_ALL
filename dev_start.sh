#!/bin/bash

# 本地开发启动脚本 - Shell 版本
# 支持前后端热调试

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置
DB_HOST="localhost"
DB_PORT="5433"  # Docker 容器映射的端口
DB_USER="user"
DB_PASSWORD="password"
DB_NAME="cockpit_db"
BACKEND_PORT="8002"
FRONTEND_PORT="5174"
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

# PID 列表
PIDS=()

log() {
    local level=$1
    shift
    local msg="$@"
    local timestamp=$(date '+%H:%M:%S')
    
    case $level in
        INFO)
            echo -e "${BLUE}[$timestamp] [INFO]${NC} $msg"
            ;;
        OK)
            echo -e "${GREEN}[$timestamp] [OK]${NC} $msg"
            ;;
        WARN)
            echo -e "${YELLOW}[$timestamp] [WARN]${NC} $msg"
            ;;
        ERROR)
            echo -e "${RED}[$timestamp] [ERROR]${NC} $msg"
            ;;
    esac
}

cleanup() {
    log WARN "关闭所有服务..."
    for pid in "${PIDS[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid" 2>/dev/null || true
        fi
    done
    wait 2>/dev/null || true
    log OK "完成"
    exit 0
}

trap cleanup SIGINT SIGTERM

check_command() {
    if ! command -v "$1" &> /dev/null; then
        log ERROR "$1 未安装"
        return 1
    fi
    return 0
}

check_postgres() {
    if ! psql -h "$DB_HOST" -U "$DB_USER" -d postgres -c "SELECT 1" &>/dev/null; then
        return 1
    fi
    return 0
}

start_docker_postgres() {
    log INFO "启动 Docker PostgreSQL 容器..."
    
    # 检查 Docker 是否安装
    if ! command -v docker &> /dev/null; then
        log ERROR "Docker 未安装"
        return 1
    fi
    
    # 停止旧的 PostgreSQL 容器
    log INFO "检查并停止旧的 PostgreSQL 容器..."
    docker ps -a --filter "ancestor=postgres:15-alpine" --format "{{.ID}}|{{.Names}}" | while IFS='|' read -r container_id container_name; do
        if [[ "$container_name" != *"cockpit-db"* ]]; then
            log INFO "停止容器: $container_name"
            docker stop "$container_id" 2>/dev/null || true
            docker rm "$container_id" 2>/dev/null || true
        fi
    done
    
    # 检查容器是否存在
    if docker ps -a --filter "name=cockpit-db" --format "{{.ID}}" | grep -q .; then
        container_id=$(docker ps -a --filter "name=cockpit-db" --format "{{.ID}}" | head -1)
        
        # 检查容器是否运行
        if ! docker ps --filter "id=$container_id" --format "{{.ID}}" | grep -q .; then
            log INFO "启动已存在的容器..."
            docker start "$container_id"
            log INFO "容器已启动，等待 PostgreSQL 初始化..."
            sleep 5
        else
            log INFO "容器已在运行，重启以确保干净状态..."
            docker restart "$container_id"
            sleep 5
        fi
        return 0
    else
        log WARN "未找到 cockpit-db 容器"
        return 1
    fi
}

init_database() {
    log INFO "初始化数据库..."
    
    # 检查数据库是否存在
    if psql -h "$DB_HOST" -U "$DB_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1; then
        log INFO "数据库已存在"
        return 0
    fi
    
    log INFO "创建数据库 $DB_NAME..."
    PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME" || {
        log ERROR "创建数据库失败"
        return 1
    }
    
    return 0
}

main() {
    log INFO "=========================================="
    log INFO "Cockpit 本地开发启动"
    log INFO "=========================================="
    
    # 检查依赖
    log INFO "检查依赖..."
    check_command "python3" || exit 1
    check_command "node" || exit 1
    check_command "npm" || exit 1
    check_command "psql" || exit 1
    
    # 检查 PostgreSQL
    log INFO "检查 PostgreSQL..."
    if ! check_postgres; then
        log WARN "PostgreSQL 未运行，尝试启动 Docker 容器..."
        if ! start_docker_postgres; then
            log ERROR "启动 Docker 容器失败"
            exit 1
        fi
        
        # 等待容器启动（增加到 60 秒）
        log INFO "等待 PostgreSQL 启动..."
        for i in {1..60}; do
            sleep 1
            if check_postgres; then
                log OK "PostgreSQL 已连接"
                break
            fi
            if [ $((i % 10)) -eq 0 ]; then
                log INFO "已等待 $i 秒..."
            fi
        done
    else
        log OK "PostgreSQL 已连接"
    fi
    
    # 初始化数据库
    if ! init_database; then
        exit 1
    fi
    
    # 启动后端
    log INFO "启动后端服务..."
    cd "$BACKEND_DIR"
    export DATABASE_URL="$DATABASE_URL"
    export PYTHONUNBUFFERED=1
    python3 -m uvicorn app.main:app --host 127.0.0.1 --port "$BACKEND_PORT" --reload &
    PIDS+=($!)
    
    sleep 2
    
    # 启动前端
    log INFO "启动前端服务..."
    cd "$PROJECT_ROOT"
    npm run dev &
    PIDS+=($!)
    
    log OK "=========================================="
    log OK "✓ 所有服务已启动"
    log OK "=========================================="
    log INFO "前端地址: http://127.0.0.1:$FRONTEND_PORT"
    log INFO "后端地址: http://127.0.0.1:$BACKEND_PORT"
    log INFO "API文档: http://127.0.0.1:$BACKEND_PORT/docs"
    log INFO "数据库: $DATABASE_URL"
    log OK "=========================================="
    log INFO "按 Ctrl+C 停止所有服务"
    log OK "=========================================="
    
    # 等待所有进程
    wait
}

main
