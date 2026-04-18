# Cockpit 数据中心可视化监控系统

<p align="center">
  <img src="https://img.shields.io/badge/PostgreSQL-15-blue" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/FastAPI-0.100-green" alt="FastAPI">
  <img src="https://img.shields.io/badge/Vue-3.5-yellow" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Docker-Ready-blue" alt="Docker">
</p>

## 📖 目录

- [项目简介](#项目简介)
- [技术栈](#技术栈)
- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [数据库说明](#数据库说明)
- [API 文档](#api-文档)
- [开发指南](#开发指南)
- [部署指南](#部署指南)
- [运维管理](#运维管理)
- [常见问题](#常见问题)

---

## 🎯 项目简介

**Cockpit** 是一个面向数据中心/机房可视化监控的全栈管理平台，提供：

### 核心功能

1. **🖥️ 3D 可视化机房监控**
   - Three.js 实现的 3D 机房模型
   - 实时机柜状态展示
   - 楼层切换与导航

2. **📊 企业资源管理**
   - 多企业机柜分配
   - 企业颜色标识
   - 机房使用率统计

3. **🔔 监控与告警**
   - 58 个监控功能模块
   - 实时告警规则
   - 告警通知管理

4. **📈 时序数据分析**
   - 服务器指标监控
   - 网络流量监控
   - 环境参数监控（温湿度等）

5. **🛠️ 运维管理**
   - 值班排班管理
   - 巡检报告管理
   - 固件版本管理

---

## 💻 技术栈

### 前端技术

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vue.js** | 3.5+ | 渐进式 JavaScript 框架 |
| **TypeScript** | 5.8+ | JavaScript 超集，提供类型检查 |
| **Vite** | 7.0+ | 新一代前端构建工具 |
| **Pinia** | 3.0+ | Vue 状态管理 |
| **Vue Router** | 4.5+ | Vue.js 官方路由 |
| **Three.js** | 0.179+ | 3D 图形库 |
| **Element Plus** | 2.10+ | Vue 3 UI 组件库 |
| **TailwindCSS** | 4.1+ | Utility-First CSS 框架 |

### 后端技术

| 技术 | 版本 | 说明 |
|------|------|------|
| **Python** | 3.11+ | 后端开发语言 |
| **FastAPI** | 0.100+ | 现代高性能 Web 框架 |
| **SQLAlchemy** | 2.0+ | Python ORM |
| **Pydantic** | 2.0+ | 数据验证库 |
| **Uvicorn** | 0.30+ | ASGI 服务器 |

### 数据存储

| 技术 | 版本 | 说明 |
|------|------|------|
| **PostgreSQL** | 15+ | 关系型数据库 |
| **Docker** | 24+ | 容器化平台 |

---

## 📋 环境要求

### 最低要求

| 组件 | 要求 |
|------|------|
| **CPU** | 2 核 |
| **内存** | 4 GB |
| **磁盘** | 20 GB |
| **Node.js** | 20.19.0+ |
| **Python** | 3.11+ |
| **Docker** | 24+ |

### 推荐环境

| 组件 | 推荐配置 |
|------|----------|
| **CPU** | 4 核+ |
| **内存** | 8 GB+ |
| **磁盘** | 50 GB+ |

---

## 🚀 快速开始

### 方式一：Docker 一键启动（推荐）

```bash
# 1. 克隆项目
git clone <repository-url>
cd cockpit_ALL

# 2. 启动所有服务
docker-compose up -d

# 3. 验证服务状态
docker-compose ps

# 4. 访问应用
# 前端: http://localhost:5174
# 后端: http://localhost:8002
# 数据库: localhost:5434
```

### 方式二：手动启动

#### 1. 启动数据库

```bash
# 使用 Docker 启动 PostgreSQL
docker run -d \
  --name cockpit-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=cockpit_db \
  -p 5434:5432 \
  postgres:15-alpine
```

#### 2. 启动后端

```bash
# 进入后端目录
cd backend

# 安装依赖
pip install -r requirements.txt

# 设置环境变量
export DATABASE_URL="postgresql://user:password@localhost:5434/cockpit_db"

# 启动服务
uvicorn app.main:app --host 0.0.0.0 --port 8002 --reload
```

#### 3. 启动前端

```bash
# 进入前端目录
cd src

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 方式三：使用启动脚本

```bash
# 一键启动（包含健康检查）
python3 backend/scripts/start.sh
```

---

## 📁 项目结构

```
cockpit_ALL/
├── src/                              # 🎨 前端源码目录
│   ├── main.ts                       # Vue 应用入口
│   ├── App.vue                       # 根组件
│   ├── api/                         # API 调用层
│   │   ├── monitoring.ts           # 监控相关 API
│   │   └── roomLayout.ts          # 机房布局 API
│   ├── assets/                      # 静态资源
│   │   ├── base.css               # 基础样式
│   │   ├── main.css               # 主样式
│   │   └── logo.svg               # Logo
│   ├── components/                  # 公共组件
│   ├── config/                     # 前端配置
│   │   ├── enterprises.ts          # 企业配置
│   │   └── roomConfig.ts          # 机房配置
│   ├── router/                     # 路由配置
│   │   └── index.ts
│   ├── stores/                     # 状态管理
│   │   ├── configStore.ts         # 配置状态
│   │   └── dashboard.ts           # 仪表盘状态
│   ├── styles/                     # 全局样式
│   │   ├── panels.css            # 面板样式
│   │   └── room-layout.css      # 机房布局样式
│   ├── types/                      # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/                      # 工具函数
│   │   ├── rackController.ts       # 机柜控制器
│   │   ├── request.ts            # HTTP 请求封装
│   │   ├── roomInitializer.ts    # 机房初始化
│   │   ├── roomLayoutService.ts  # 机房布局服务
│   │   ├── usageRateColor.ts     # 占用率颜色工具
│   │   ├── three-helpers.js      # Three.js 辅助函数
│   │   └── three-helpers.d.ts    # Three.js 类型定义
│   └── views/                      # 页面视图
│       ├── MonitoringDashboard.vue # 监控驾驶舱主页面
│       └── MonitoringDashboard/
│           └── components/        # 监控驾驶舱组件
│               ├── ThreeScene.vue          # 3D 场景渲染
│               ├── ResourceOverview.vue   # 资源统计概览
│               ├── EnterpriseOverviewPanel.vue  # 企业信息概览
│               ├── DetailsPanel.vue       # 机房详细信息面板
│               ├── RoomLayoutDiagram.vue # 机房布局图
│               ├── RackDashboard.vue      # 机柜仪表板
│               ├── CabinetGridEditor.vue  # 机柜网格编辑器
│               ├── FloorControls.vue      # 楼层切换控制
│               ├── TimePanel.vue         # 时间显示面板
│               ├── LogoPanel.vue         # Logo 面板
│               └── SettingsPanel.vue     # 设置面板
│
├── backend/                          # ⚙️ 后端服务目录
│   ├── app/                         # 应用主目录
│   │   ├── main.py                 # FastAPI 应用入口
│   │   ├── database.py            # 数据库连接与模型
│   │   ├── schemas.py             # Pydantic 数据模型
│   │   ├── mock_data.py          # Mock 数据生成
│   │   ├── room_layout_db.py     # 机房布局数据库模型
│   │   └── routers/              # API 路由
│   │       ├── cockpit.py        # 驾驶舱 API
│   │       ├── config.py        # 配置 API
│   │       └── room_layout.py   # 机房布局 API
│   ├── scripts/                   # 🛠️ 脚本工具
│   │   ├── init_db.py            # 数据库初始化
│   │   ├── seed_data.py          # 种子数据
│   │   ├── seed_random_data.py   # 随机数据生成
│   │   ├── sync_all_rooms.py    # 同步所有机房数据
│   │   ├── sync_cabinet_config_v3.py  # 同步机柜配置
│   │   ├── assign_80percent_600_cabinets.py  # 分配机柜
│   │   ├── regenerate_cabinets_30x20.py  # 重新生成机柜
│   │   ├── random_assign_enterprises.py  # 随机分配企业
│   │   ├── generate_all_cabinets.py  # 生成所有机柜
│   │   ├── init_room_layout_config.py  # 初始化机房布局配置
│   │   ├── verify_api.py         # API 验证脚本
│   │   ├── database_schema.sql   # 数据库结构定义
│   │   ├── room_layout_schema.sql  # 机房布局结构
│   │   └── start.sh            # 启动脚本
│   ├── config/                   # 📄 配置文件
│   │   └── nginx.conf          # Nginx 配置
│   ├── Dockerfile                # 🐳 后端 Docker 镜像
│   └── requirements.txt         # 📦 Python 依赖
│
├── public/                        # 🌐 公共静态资源
│   ├── background-photo.png      # 背景图片
│   ├── background.mp4            # 背景视频
│   ├── d3.js                    # D3.js 库
│   ├── favicon.ico              # 网站图标
│   └── favicon.png              # PNG 图标
│
├── docs/                          # 📚 项目文档
│   ├── DATABASE_DATA_AUDIT.md   # 数据库审计报告
│   └── ER_INFO.md               # ER 图信息
│
├── backup/                        # 💾 数据库备份
│   ├── README.md                 # 备份说明
│   ├── public.sql               # Navicat 完整备份
│   ├── cockpit_db_full.sql       # pg_dump 完整备份
│   ├── cockpit_db_schema.sql     # 数据库结构
│   ├── database_structure.md     # 数据库结构文档
│   ├── database_structure_summary.md  # 结构汇总
│   ├── export_structure.sh      # 导出脚本
│   ├── generate_structure.py     # 生成结构文档脚本
│   └── cockpit_db_backup_20260419.tar.gz  # 压缩备份
│
├── .gitignore                    # Git 忽略文件
├── docker-compose.yml            # 🐳 Docker 容器编排
├── Dockerfile                    # 🐳 前端 Docker 镜像
├── nginx.conf                    # 🌐 Nginx 配置（已移至 backend/config/）
├── package.json                  # 📦 前端依赖配置
├── vite.config.ts              # ⚡ Vite 配置
├── tsconfig.json                # 📘 TypeScript 配置
├── eslint.config.ts            # 🔍 ESLint 配置
├── playwright.config.ts         # 🎭 Playwright 配置
├── PROJECT_STRUCTURE.md         # 📋 项目结构文档
├── README.md                   # 📖 项目说明
└── README_PROJECT_FULL.md      # 📖 完整项目说明
```

---

## 🗄️ 数据库说明

### 数据库信息

| 配置项 | 值 |
|--------|-----|
| **数据库类型** | PostgreSQL 15 |
| **数据库名称** | cockpit_db |
| **连接地址** | localhost:5434 |
| **用户名** | user |
| **密码** | password |
| **字符编码** | UTF-8 |

### 数据表概览

#### 核心业务表

| 表名 | 数据量 | 说明 |
|------|--------|------|
| `enterprises` | 20 | 企业信息表 |
| `rooms` | 30 | 机房信息表 |
| `cabinets` | 24,000+ | 机柜分配表 |

#### 机房布局配置表

| 表名 | 数据量 | 说明 |
|------|--------|------|
| `room_layout_config` | 37 | 机房布局配置 |
| `cabinet_config` | 14,400 | 机柜详细配置 |
| `cabinet_layout` | - | 机柜布局定义 |
| `cabinet_grid` | - | 机柜网格数据 |
| `floor_config` | - | 楼层配置 |
| `room_config` | - | 机房配置 |
| `area_frame_config` | - | 区域框架配置 |
| `data_center_config` | - | 数据中心配置 |

#### 监控功能表

| 表名 | 数据量 | 说明 |
|------|--------|------|
| `feature_categories` | 9 | 功能分类表 |
| `monitoring_features` | 58 | 监控功能表 |
| `feature_metrics` | 464 | 功能指标表 |
| `alert_rules` | 20 | 告警规则表 |
| `alerts` | 5 | 告警事件表 |

#### 时序数据表

| 表名 | 数据量 | 说明 |
|------|--------|------|
| `environment_readings` | 120 | 环境读数表 |
| `power_events` | 48 | 电力事件表 |
| `server_metrics` | 120 | 服务器指标表 |
| `network_metrics` | 120 | 网络指标表 |
| `application_metrics` | 120 | 应用指标表 |
| `security_events` | 30 | 安全事件表 |

#### 运维管理表

| 表名 | 数据量 | 说明 |
|------|--------|------|
| `oncall_schedules` | 8 | 值班排班表 |
| `inspection_reports` | 12 | 巡检报告表 |
| `firmware_inventory` | 20 | 固件清单表 |
| `maintenance_assets` | 20 | 维保资产表 |
| `knowledge_base_links` | 11 | 知识库链接表 |
| `resource_overview` | 1 | 资源概览表 |

### 表关系图

```
┌─────────────────┐
│   enterprises   │ 1
│    (企业表)     │
└────────┬────────┘
         │ 1:N
         ▼
┌─────────────────┐
│    cabinets     │ N
│    (机柜表)     │◄──────────┐
└────────┬────────┘           │
         │ N:1              │ N:1
         ▼                   │
┌─────────────────┐         │
│     rooms       │──────────┘
│    (机房表)     │
└─────────────────┘

┌─────────────────────┐     1:N     ┌─────────────────────┐
│ monitoring_features  │─────────────▶│  feature_metrics    │
│   (监控功能表)       │             │    (功能指标表)      │
└─────────────────────┘             └─────────────────────┘
         │
         │ 1:N
         ├──────────────▶┌─────────────────────┐
         │               │    alert_rules     │
         │               │    (告警规则表)      │
         │               └─────────────────────┘
         │
         └──────────────▶┌─────────────────────┐
                         │      alerts       │
                         │    (告警事件表)    │
                         └─────────────────────┘
```

---

## 📡 API 文档

### 后端 API

访问地址：http://localhost:8002/docs

#### 主要 API 端点

##### 健康检查
```
GET /health
返回: { "status": "ok" }
```

##### 资源概览
```
GET /api/stats/overview
返回: { "totalITCabinetCount": ..., "totalEnterpriseCount": ... }
```

##### 企业统计
```
GET /api/config/enterprise-stats
返回: [
  {
    "id": 1,
    "name": "企业01",
    "color": "#63704e",
    "manager": "客户经理01",
    "total_cabinets": 89,
    "active_cabinets": 89,
    "rooms": "101机房, 102机房, ...",
    "room_ids": ["101", "102", ...]
  },
  ...
]
```

##### 机房布局
```
GET /api/room-layout/rooms/{room_id}
GET /api/room-layout/rooms/{room_id}/cabinets
```

##### 功能模块
```
GET /api/feature-categories
GET /api/features
GET /api/features/{code}
```

##### 告警管理
```
GET /api/alerts
GET /api/alert-rules
```

##### 运维数据
```
GET /api/environment/readings
GET /api/power/events
GET /api/security/events
GET /api/operations/oncall
GET /api/operations/inspection-reports
```

### 前端 API 调用

前端 API 封装在 `src/api/` 目录下：

```typescript
// 机房布局 API
import { getRoomLayout, getRoomCabinets } from '@/api/roomLayout'

// 监控 API
import { getFeatures, getFeatureMetrics } from '@/api/monitoring'
```

---

## 🛠️ 开发指南

### 开发环境设置

#### 1. 克隆代码
```bash
git clone <repository-url>
cd cockpit_ALL
```

#### 2. 安装前端依赖
```bash
cd src
npm install
```

#### 3. 安装后端依赖
```bash
cd backend
pip install -r requirements.txt
```

#### 4. 配置环境变量（可选）
```bash
# 后端
export DATABASE_URL="postgresql://user:password@localhost:5434/cockpit_db"

# 前端 (.env)
VITE_API_BASE_URL=http://localhost:8002
```

### 开发命令

#### 前端开发
```bash
cd src

# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 构建生产版本
npm run build

# 代码格式化和修复
npm run lint
npm run format
```

#### 后端开发
```bash
cd backend

# 启动开发服务器（热重载）
uvicorn app.main:app --reload --host 0.0.0.0 --port 8002

# 运行测试
pytest

# 代码格式化
black .
```

### 代码规范

#### 前端规范
- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化

#### 后端规范
- 遵循 PEP 8 Python 代码规范
- 使用 Pydantic 进行数据验证
- 使用 SQLAlchemy ORM 进行数据库操作

---

## 🚢 部署指南

### Docker 部署

#### 1. 构建镜像
```bash
# 构建前端镜像
docker build -t cockpit-frontend .

# 构建后端镜像
docker build -t cockpit-backend ./backend
```

#### 2. 使用 Docker Compose 部署
```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

#### 3. 生产环境配置

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  backend:
    image: cockpit-backend
    environment:
      DATABASE_URL: ${DATABASE_URL}
    depends_on:
      - db
    restart: always

  frontend:
    image: cockpit-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always
```

### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API 代理
    location /api {
        proxy_pass http://backend:8002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🔧 运维管理

### 数据库备份

#### 使用 Navicat（推荐）
1. 连接到数据库
2. 右键数据库 → 转储 → SQL 文件
3. 选择"结构和数据"
4. 保存为 `public.sql`

#### 使用命令行
```bash
# 完整备份
docker exec cockpit-db pg_dump -U user cockpit_db > backup.sql

# 仅结构
docker exec cockpit-db pg_dump -U user -s cockpit_db > schema.sql

# 恢复备份
docker exec -i cockpit-db psql -U user -d cockpit_db < backup.sql
```

### 日志管理

```bash
# 查看后端日志
docker-compose logs backend -f

# 查看数据库日志
docker-compose logs db -f

# 查看前端日志
docker-compose logs frontend -f
```

### 性能监控

```bash
# 查看容器资源使用
docker stats

# 查看数据库连接
docker exec cockpit-db psql -U user -d cockpit_db -c "SELECT * FROM pg_stat_activity;"
```

---

## ❓ 常见问题

### Q1: 数据库连接失败？

**A:** 检查以下几点：
1. PostgreSQL 容器是否运行：`docker ps | grep postgres`
2. 端口是否正确：默认 5434
3. 用户名密码是否正确：user / password
4. 环境变量是否设置：
   ```bash
   export DATABASE_URL="postgresql://user:password@localhost:5434/cockpit_db"
   ```

### Q2: 前端无法访问后端 API？

**A:** 检查以下几点：
1. 后端服务是否运行：`curl http://localhost:8002/health`
2. CORS 配置是否正确
3. API 地址是否正确配置在 `.env` 文件中

### Q3: 如何重置数据库？

**A:** 执行以下步骤：
```bash
# 1. 停止服务
docker-compose down

# 2. 删除数据卷
docker volume rm cockpit_ALL_postgres_data

# 3. 重新启动
docker-compose up -d

# 4. 重新初始化数据
docker exec -i cockpit-db psql -U user -d cockpit_db < backup/public.sql
```

### Q4: 如何查看当前数据状态？

**A:** 有以下几种方式：
1. **Navicat**：图形化界面查看
2. **命令行**：
   ```bash
   docker exec -it cockpit-db psql -U user -d cockpit_db
   # 然后执行 SQL 查询
   SELECT * FROM enterprises;
   ```
3. **API**：访问 `http://localhost:8002/api/stats/overview`

### Q5: 如何添加新的监控功能？

**A:** 步骤如下：
1. 在 `monitoring_features` 表中添加新功能
2. 在后端 `app/routers/` 中添加对应的 API
3. 在前端 `src/views/MonitoringDashboard/components/` 中添加对应的组件
4. 更新前端路由和状态管理

---

## 📞 技术支持

如有问题，请通过以下方式联系：

- 📧 邮箱：support@example.com
- 💬 Issues：https://github.com/your-repo/issues

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Three.js](https://threejs.org/)
- [Element Plus](https://element-plus.org/)
- [TailwindCSS](https://tailwindcss.com/)

---

<p align="center">
  ❤️ Cockpit 数据中心可视化监控系统 ❤️
</p>
