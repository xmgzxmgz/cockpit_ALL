# Cockpit 监控大屏项目

## 项目简介

本项目是一个基于 Vue 3 + Vite + FastAPI + PostgreSQL 的现代化监控大屏系统，支持 Docker 容器化部署。项目包含前端可视化展示、后端 API 服务以及数据库存储。

## 目录结构

- `src/`: 前端源代码 (Vue 3)
- `backend/`: 后端源代码 (FastAPI)
- `docker-compose.yml`: Docker 编排文件
- `database_schema.sql`: 数据库初始化脚本 (包含表结构和初始数据)
- `Dockerfile`: 前端构建文件
- `backend/Dockerfile`: 后端构建文件

## 技术栈

- **前端**: Vue 3, Vite, TypeScript, Pinia, TailwindCSS, ECharts (或类似图表库)
- **后端**: Python 3.11, FastAPI, SQLAlchemy, Pydantic
- **数据库**: PostgreSQL 15
- **部署**: Docker, Docker Compose

## 快速开始

### 前提条件

- 安装 Docker 和 Docker Compose

### 启动项目

在项目根目录下运行以下命令：

```bash
docker-compose up -d --build
```

该命令将自动构建前端和后端镜像，启动数据库，并初始化表结构和数据。

### 访问服务

- **前端页面**: [http://localhost:5174](http://localhost:5174)
- **后端 API 文档**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **数据库**: 端口 5432 (用户: user, 密码: password, 数据库: cockpit_db)

## 数据库设计

数据库包含以下核心表：
1.  **enterprises**: 企业信息表
2.  **rooms**: 机房信息表
3.  **cabinets**: 机柜信息表

详细字段定义请参考根目录下的 `database_schema.sql` 文件。

## 开发指南

### 本地开发 (非 Docker)

1.  **启动数据库**: 需本地安装 PostgreSQL 或使用 Docker 启动 db 服务。
2.  **启动后端**:
    ```bash
    cd backend
    pip install -r requirements.txt
    uvicorn app.main:app --reload
    ```
3.  **启动前端**:
    ```bash
    npm install
    npm run dev
    ```

## 注意事项

- 数据库初始化数据位于 `database_schema.sql`，首次启动 Docker 容器时会自动导入。
- 前端通过 `/api` 路径代理访问后端接口。
