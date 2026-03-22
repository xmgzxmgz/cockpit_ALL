#!/usr/bin/env python3
"""
本地开发启动脚本 - 支持前后端热调试
启动 PostgreSQL、FastAPI 后端、Vue 前端（带 Vite 热更新）
"""

import subprocess
import sys
import time
import os
import signal
import json
from pathlib import Path
from typing import Optional

PROJECT_ROOT = Path(__file__).resolve().parent
BACKEND_DIR = PROJECT_ROOT / "backend"
FRONTEND_DIR = PROJECT_ROOT

# 配置
# 配置 - 使用 Docker PostgreSQL
DB_HOST = "localhost"
DB_PORT = 5433  # Docker 容器映射的端口
DB_USER = "user"
DB_PASSWORD = "password"
DB_NAME = "cockpit_db"
BACKEND_PORT = 8002
FRONTEND_PORT = 5174

# 数据库连接字符串
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# 进程列表
processes = []


def log(msg: str, level: str = "INFO"):
    """打印日志"""
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] [{level}] {msg}")


def run_cmd(cmd: list, cwd: Optional[Path] = None, env: Optional[dict] = None, name: str = ""):
    """运行命令并返回进程"""
    try:
        full_env = os.environ.copy()
        if env:
            full_env.update(env)
        
        log(f"启动: {name or ' '.join(cmd)}")
        proc = subprocess.Popen(
            cmd,
            cwd=cwd or PROJECT_ROOT,
            env=full_env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
        return proc
    except Exception as e:
        log(f"启动失败: {e}", "ERROR")
        return None


def stop_old_postgres_containers():
    """停止所有旧的 PostgreSQL 容器"""
    try:
        log("检查并停止旧的 PostgreSQL 容器...")
        # 查找所有 postgres 相关的容器
        result = subprocess.run(
            ["docker", "ps", "-a", "--filter", "ancestor=postgres:15-alpine", "--format", "{{.ID}}|{{.Names}}"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        
        if result.returncode == 0 and result.stdout.strip():
            containers = result.stdout.strip().split('\n')
            for container_info in containers:
                if not container_info:
                    continue
                container_id, container_name = container_info.split('|')
                
                # 跳过 cockpit-db 容器
                if 'cockpit-db' in container_name:
                    continue
                
                log(f"停止容器: {container_name} ({container_id[:12]})")
                subprocess.run(["docker", "stop", container_id], timeout=10, capture_output=True)
                log(f"删除容器: {container_name}")
                subprocess.run(["docker", "rm", container_id], timeout=10, capture_output=True)
        
        return True
    except Exception as e:
        log(f"清理旧容器时出错: {e}", "WARN")
        return True  # 不影响启动流程


def start_docker_postgres():
    """启动 Docker PostgreSQL 容器"""
    try:
        log("启动 Docker PostgreSQL 容器...")
        
        # 首先停止旧容器
        stop_old_postgres_containers()
        
        # 检查 cockpit-db 容器是否存在
        result = subprocess.run(
            ["docker", "ps", "-a", "--filter", "name=cockpit-db", "--format", "{{.ID}}"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        
        if result.returncode == 0 and result.stdout.strip():
            container_id = result.stdout.strip()
            
            # 检查容器是否运行
            result = subprocess.run(
                ["docker", "ps", "--filter", f"id={container_id}", "--format", "{{.ID}}"],
                capture_output=True,
                text=True,
                timeout=5,
            )
            
            if not result.stdout.strip():
                # 容器存在但未运行，启动它
                log("启动已存在的容器...")
                subprocess.run(["docker", "start", container_id], timeout=10)
                log("容器已启动，等待 PostgreSQL 初始化...", "INFO")
                time.sleep(10)  # 增加到 10 秒
            else:
                log("容器已在运行，重启以确保干净状态...", "INFO")
                # 重启容器以确保干净状态
                subprocess.run(["docker", "restart", container_id], timeout=10)
                log("容器已重启，等待 PostgreSQL 初始化...", "INFO")
                time.sleep(10)  # 增加到 10 秒
            
            return True
        else:
            log("未找到 cockpit-db 容器，请先创建", "WARN")
            log("创建命令:", "INFO")
            log("docker run -d --name cockpit-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=cockpit_db -p 5433:5432 postgres:15-alpine", "INFO")
            return False
    except FileNotFoundError:
        log("Docker 未安装", "ERROR")
        return False
    except Exception as e:
        log(f"启动 Docker 容器失败: {e}", "ERROR")
        return False


def check_postgres():
    """检查 PostgreSQL 是否运行"""
    try:
        import psycopg2
        # 尝试连接到 Docker 容器的 PostgreSQL
        conn = psycopg2.connect(
            host="127.0.0.1",  # 使用 127.0.0.1 而不是 localhost
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            connect_timeout=3,
        )
        conn.close()
        return True
    except Exception as e:
        log(f"PostgreSQL 连接失败: {e}", "WARN")
        return False


def init_database():
    """初始化数据库"""
    log("初始化数据库...")
    try:
        import psycopg2
        from psycopg2 import sql
        
        # 连接到默认数据库
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            database="postgres",
        )
        conn.autocommit = True
        cursor = conn.cursor()
        
        # 检查数据库是否存在
        cursor.execute(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}'")
        if not cursor.fetchone():
            log(f"创建数据库: {DB_NAME}")
            cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(DB_NAME)))
        
        cursor.close()
        conn.close()
        log("数据库初始化完成")
        return True
    except Exception as e:
        log(f"数据库初始化失败: {e}", "ERROR")
        return False


def wait_for_service(port: int, timeout: int = 30, name: str = "Service"):
    """等待服务启动"""
    import socket
    
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            result = sock.connect_ex(("127.0.0.1", port))
            sock.close()
            if result == 0:
                log(f"{name} 已启动 (端口 {port})", "OK")
                return True
        except Exception:
            pass
        time.sleep(1)
    
    log(f"{name} 启动超时 (端口 {port})", "ERROR")
    return False


def start_backend():
    """启动 FastAPI 后端"""
    env = {
        "DATABASE_URL": DATABASE_URL,
        "PYTHONUNBUFFERED": "1",
    }
    
    cmd = [
        sys.executable,
        "-m",
        "uvicorn",
        "app.main:app",
        "--host",
        "127.0.0.1",
        "--port",
        str(BACKEND_PORT),
        "--reload",
    ]
    
    proc = run_cmd(cmd, cwd=BACKEND_DIR, env=env, name="FastAPI 后端")
    if proc:
        processes.append(("backend", proc))
        wait_for_service(BACKEND_PORT, name="FastAPI 后端")
    return proc


def start_frontend():
    """启动 Vue 前端（Vite 开发服务器）"""
    cmd = ["npm", "run", "dev"]
    
    proc = run_cmd(cmd, cwd=FRONTEND_DIR, name="Vue 前端 (Vite)")
    if proc:
        processes.append(("frontend", proc))
        wait_for_service(FRONTEND_PORT, name="Vite 前端")
    return proc


def print_output(proc, name: str):
    """打印进程输出"""
    try:
        for line in iter(proc.stdout.readline, ""):
            if line:
                print(f"[{name}] {line.rstrip()}")
    except Exception:
        pass


def cleanup(signum=None, frame=None):
    """清理进程"""
    log("正在关闭所有服务...", "WARN")
    for name, proc in processes:
        try:
            log(f"关闭 {name}...")
            proc.terminate()
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            log(f"强制关闭 {name}", "WARN")
            proc.kill()
        except Exception as e:
            log(f"关闭 {name} 失败: {e}", "ERROR")
    
    log("所有服务已关闭", "OK")
    sys.exit(0)


def main():
    """主函数"""
    log("=" * 60)
    log("Cockpit 本地开发启动脚本")
    log("=" * 60)
    
    # 注册信号处理
    signal.signal(signal.SIGINT, cleanup)
    signal.signal(signal.SIGTERM, cleanup)
    
    # 检查 PostgreSQL
    log("检查 PostgreSQL...")
    if not check_postgres():
        log("PostgreSQL 未运行", "ERROR")
        log("请先启动 Docker 容器:", "INFO")
        log("docker start cockpit-db", "INFO")
        log("或创建容器:", "INFO")
        log("docker run -d --name cockpit-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=cockpit_db -p 5433:5432 postgres:15-alpine", "INFO")
        sys.exit(1)
    else:
        log("PostgreSQL 已连接", "OK")
    
    # 初始化数据库
    if not init_database():
        log("数据库初始化失败", "ERROR")
        sys.exit(1)
    
    # 检查依赖
    log("检查依赖...")
    try:
        import psycopg2
        import fastapi
        import uvicorn
    except ImportError as e:
        log(f"缺少依赖: {e}", "ERROR")
        log("请运行: pip install -r backend/requirements.txt", "INFO")
        sys.exit(1)
    
    # 启动后端
    log("启动后端服务...")
    backend_proc = start_backend()
    if not backend_proc:
        log("后端启动失败", "ERROR")
        cleanup()
        sys.exit(1)
    
    time.sleep(2)
    
    # 启动前端
    log("启动前端服务...")
    frontend_proc = start_frontend()
    if not frontend_proc:
        log("前端启动失败", "ERROR")
        cleanup()
        sys.exit(1)
    
    # 打印启动信息
    log("=" * 60)
    log("✓ 所有服务已启动", "OK")
    log("=" * 60)
    log(f"前端地址: http://127.0.0.1:{FRONTEND_PORT}", "INFO")
    log(f"后端地址: http://127.0.0.1:{BACKEND_PORT}", "INFO")
    log(f"API 文档: http://127.0.0.1:{BACKEND_PORT}/docs", "INFO")
    log(f"数据库: {DATABASE_URL}", "INFO")
    log("=" * 60)
    log("按 Ctrl+C 停止所有服务", "INFO")
    log("=" * 60)
    
    # 监控进程输出
    import threading
    
    if backend_proc:
        t1 = threading.Thread(target=print_output, args=(backend_proc, "Backend"), daemon=True)
        t1.start()
    
    if frontend_proc:
        t2 = threading.Thread(target=print_output, args=(frontend_proc, "Frontend"), daemon=True)
        t2.start()
    
    # 保持运行
    try:
        while True:
            time.sleep(1)
            # 检查进程是否还在运行
            for name, proc in processes:
                if proc.poll() is not None:
                    log(f"{name} 已退出 (代码: {proc.returncode})", "WARN")
    except KeyboardInterrupt:
        cleanup()


if __name__ == "__main__":
    main()
