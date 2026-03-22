#!/usr/bin/env python3
"""
简化版本地开发启动脚本
支持前后端热调试，自动初始化数据库
"""

import subprocess
import sys
import time
import os
import signal
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
BACKEND_DIR = PROJECT_ROOT / "backend"

# 配置
DB_URL = "postgresql://user:password@localhost:5433/cockpit_db"  # Docker 端口
BACKEND_PORT = 8002
FRONTEND_PORT = 5174

processes = []


def log(msg, level="INFO"):
    ts = time.strftime("%H:%M:%S")
    print(f"[{ts}] [{level}] {msg}")


def cleanup(sig=None, frame=None):
    log("关闭所有服务...", "WARN")
    for name, proc in processes:
        try:
            proc.terminate()
            proc.wait(timeout=3)
        except:
            proc.kill()
    log("完成", "OK")
    sys.exit(0)


def check_db():
    """检查数据库连接"""
    try:
        import psycopg2
        psycopg2.connect(
            host="localhost",
            port=5433,  # Docker 端口
            user="user",
            password="password",
            database="cockpit_db",
        ).close()
        return True
    except:
        return False


def stop_old_postgres_containers():
    """停止所有旧的 PostgreSQL 容器"""
    try:
        log("检查并停止旧的 PostgreSQL 容器...")
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
                parts = container_info.split('|')
                if len(parts) != 2:
                    continue
                container_id, container_name = parts
                
                if 'cockpit-db' in container_name:
                    continue
                
                log(f"停止容器: {container_name}")
                subprocess.run(["docker", "stop", container_id], timeout=10, capture_output=True)
                subprocess.run(["docker", "rm", container_id], timeout=10, capture_output=True)
        
        return True
    except Exception as e:
        log(f"清理旧容器时出错: {e}", "WARN")
        return True


def start_docker_postgres():
    """启动 Docker PostgreSQL 容器"""
    try:
        log("启动 Docker PostgreSQL 容器...")
        
        stop_old_postgres_containers()
        
        result = subprocess.run(
            ["docker", "ps", "-a", "--filter", "name=cockpit-db", "--format", "{{.ID}}"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        
        if result.returncode == 0 and result.stdout.strip():
            container_id = result.stdout.strip()
            
            result = subprocess.run(
                ["docker", "ps", "--filter", f"id={container_id}", "--format", "{{.ID}}"],
                capture_output=True,
                text=True,
                timeout=5,
            )
            
            if not result.stdout.strip():
                log("启动已存在的容器...")
                subprocess.run(["docker", "start", container_id], timeout=10)
                log("容器已启动，等待 PostgreSQL 初始化...", "INFO")
                time.sleep(5)
            else:
                log("容器已在运行，重启以确保干净状态...", "INFO")
                subprocess.run(["docker", "restart", container_id], timeout=10)
                time.sleep(5)
            
            return True
        else:
            log("未找到 cockpit-db 容器", "WARN")
            return False
    except FileNotFoundError:
        log("Docker 未安装", "ERROR")
        return False
    except Exception as e:
        log(f"启动 Docker 容器失败: {e}", "ERROR")
        return False


def init_db():
    """初始化数据库"""
    log("初始化数据库...")
    try:
        import psycopg2
        conn = psycopg2.connect(
            host="localhost",
            port=5432,
            user="user",
            password="password",
            database="postgres",
        )
        conn.autocommit = True
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'cockpit_db'")
        if not cursor.fetchone():
            log("创建数据库...")
            cursor.execute("CREATE DATABASE cockpit_db")
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        log(f"数据库初始化失败: {e}", "ERROR")
        return False


def start_service(cmd, cwd, name, env_vars=None):
    """启动服务"""
    try:
        env = os.environ.copy()
        if env_vars:
            env.update(env_vars)
        
        log(f"启动 {name}...")
        proc = subprocess.Popen(
            cmd,
            cwd=cwd,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
        processes.append((name, proc))
        return proc
    except Exception as e:
        log(f"启动失败: {e}", "ERROR")
        return None


def main():
    signal.signal(signal.SIGINT, cleanup)
    signal.signal(signal.SIGTERM, cleanup)
    
    log("=" * 50)
    log("Cockpit 本地开发启动")
    log("=" * 50)
    
    # 检查 PostgreSQL
    log("检查 PostgreSQL...")
    if not check_db():
        log("PostgreSQL 未运行，尝试启动 Docker 容器...", "WARN")
        if not start_docker_postgres():
            log("启动 Docker 容器失败", "ERROR")
            sys.exit(1)
        
        # 等待容器启动（增加到 60 秒）
        log("等待 PostgreSQL 启动...", "INFO")
        for i in range(60):
            time.sleep(1)
            if check_db():
                log("PostgreSQL 已连接", "OK")
                break
            if (i + 1) % 10 == 0:
                log(f"已等待 {i + 1} 秒...", "INFO")
        else:
            log("PostgreSQL 启动超时（60秒）", "ERROR")
            sys.exit(1)
    else:
        log("PostgreSQL 已连接", "OK")
    
    # 初始化数据库
    if not init_db():
        sys.exit(1)
    
    # 启动后端
    backend_env = {"DATABASE_URL": DB_URL, "PYTHONUNBUFFERED": "1"}
    backend_proc = start_service(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", str(BACKEND_PORT), "--reload"],
        BACKEND_DIR,
        "后端 (FastAPI)",
        backend_env,
    )
    
    time.sleep(2)
    
    # 启动前端
    frontend_proc = start_service(
        ["npm", "run", "dev"],
        PROJECT_ROOT,
        "前端 (Vite)",
    )
    
    log("=" * 50)
    log("✓ 服务已启动", "OK")
    log("=" * 50)
    log(f"前端: http://127.0.0.1:{FRONTEND_PORT}", "INFO")
    log(f"后端: http://127.0.0.1:{BACKEND_PORT}", "INFO")
    log(f"API文档: http://127.0.0.1:{BACKEND_PORT}/docs", "INFO")
    log("=" * 50)
    log("按 Ctrl+C 停止", "INFO")
    log("=" * 50)
    
    # 监控输出
    import threading
    
    def print_output(proc, name):
        try:
            for line in iter(proc.stdout.readline, ""):
                if line:
                    print(f"[{name}] {line.rstrip()}")
        except:
            pass
    
    if backend_proc:
        threading.Thread(target=print_output, args=(backend_proc, "Backend"), daemon=True).start()
    if frontend_proc:
        threading.Thread(target=print_output, args=(frontend_proc, "Frontend"), daemon=True).start()
    
    # 保持运行
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        cleanup()


if __name__ == "__main__":
    main()
