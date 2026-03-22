@echo off
REM 本地开发启动脚本 - Windows 版本
REM 支持前后端热调试

setlocal enabledelayedexpansion

set PROJECT_ROOT=%~dp0
set BACKEND_DIR=%PROJECT_ROOT%backend

REM 配置
set DB_HOST=localhost
set DB_PORT=5433
set DB_USER=user
set DB_PASSWORD=password
set DB_NAME=cockpit_db
set BACKEND_PORT=8002
set FRONTEND_PORT=5174
set DATABASE_URL=postgresql://%DB_USER%:%DB_PASSWORD%@%DB_HOST%:%DB_PORT%/%DB_NAME%

echo.
echo ==========================================
echo Cockpit 本地开发启动
echo ==========================================
echo.

REM 检查依赖
echo [INFO] 检查依赖...
where python >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Python 未安装
    exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js 未安装
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npm 未安装
    exit /b 1
)

REM 检查 PostgreSQL
echo [INFO] 检查 PostgreSQL...
psql -h %DB_HOST% -U %DB_USER% -d postgres -c "SELECT 1" >nul 2>nul
if errorlevel 1 (
    echo [WARN] PostgreSQL 未运行，尝试启动 Docker 容器...
    
    REM 检查 Docker 是否安装
    where docker >nul 2>nul
    if errorlevel 1 (
        echo [ERROR] Docker 未安装
        exit /b 1
    )
    
    REM 启动 Docker 容器
    echo [INFO] 启动 Docker PostgreSQL 容器...
    for /f "tokens=*" %%i in ('docker ps -a --filter "name=cockpit-db" --format "{{.ID}}"') do (
        set CONTAINER_ID=%%i
    )
    
    if defined CONTAINER_ID (
        docker start %CONTAINER_ID%
        echo [INFO] 等待 PostgreSQL 启动...
        timeout /t 3 /nobreak
    ) else (
        echo [ERROR] 未找到 cockpit-db 容器
        exit /b 1
    )
) else (
    echo [OK] PostgreSQL 已连接
)

psql -h %DB_HOST% -U %DB_USER% -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '%DB_NAME%'" | findstr /r "1" >nul
if errorlevel 1 (
    echo [INFO] 创建数据库 %DB_NAME%...
    psql -h %DB_HOST% -U %DB_USER% -d postgres -c "CREATE DATABASE %DB_NAME%"
    if errorlevel 1 (
        echo [ERROR] 创建数据库失败
        exit /b 1
    )
) else (
    echo [INFO] 数据库已存在
)

REM 启动后端
echo [INFO] 启动后端服务...
cd /d %BACKEND_DIR%
set DATABASE_URL=%DATABASE_URL%
set PYTHONUNBUFFERED=1
start "Cockpit Backend" python -m uvicorn app.main:app --host 127.0.0.1 --port %BACKEND_PORT% --reload

timeout /t 2 /nobreak

REM 启动前端
echo [INFO] 启动前端服务...
cd /d %PROJECT_ROOT%
start "Cockpit Frontend" npm run dev

echo.
echo ==========================================
echo [OK] 所有服务已启动
echo ==========================================
echo [INFO] 前端地址: http://127.0.0.1:%FRONTEND_PORT%
echo [INFO] 后端地址: http://127.0.0.1:%BACKEND_PORT%
echo [INFO] API文档: http://127.0.0.1:%BACKEND_PORT%/docs
echo [INFO] 数据库: %DATABASE_URL%
echo ==========================================
echo [INFO] 关闭此窗口以停止所有服务
echo ==========================================
echo.

pause
