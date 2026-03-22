#!/usr/bin/env python3
"""
本地开发启动脚本 - 不需要 Docker
支持前后端热调试
"""

import subprocess
import sys
import time
import os
import signal
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
BACKEND_DIR = PROJECT_ROOT / "backend"

# 配置 - 使用本地 PostgreSQL
DB_HOST = "localhost"
DB_PORT = 5432  # 本地 PostgreSQL 默认端口
DB_USER = "user"
DB_PASSWORD = "password"
DB_NAME = "cockpit_db"
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
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
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
        ).close()
        return True
    except:
        return False


def init_db():
    """初始化数据库"""
    log("初始化数据库...")
    try:
        import psycopg2
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
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
    log("Cockpit 本地开发启动 (本地 PostgreSQL)")
    log("=" * 50)
    
    # 检查 PostgreSQL
    log("检查 PostgreSQL...")
    if not check_db():
        log("PostgreSQL 未运行或连接失败", "ERROR")
        log("请先启动 PostgreSQL:", "INFO")
        log("  macOS: brew services start postgresql", "INFO")
        log("  Linux: sudo systemctl start postgresql", "INFO")
        sys.exit(1)
    log("PostgreSQL 已连接", "OK")
    
    # 初始化数据库
    if not init_db():
        sys.exit(1)
    
    # 启动后端
    backend_env = {"DATABASE_URL": DATABASE_URL, "PYTHONUNBUFFERED": "1"}
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
