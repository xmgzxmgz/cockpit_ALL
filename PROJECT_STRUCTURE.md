# Cockpit 项目结构

## 📅 文档信息
- **更新日期**: 2026年4月19日
- **项目类型**: Vue 3 + FastAPI 全栈应用

---

## 🎯 项目概览

```
cockpit_ALL/
├── backend/          # 后端 (FastAPI + PostgreSQL)
├── src/              # 前端 (Vue 3 + TypeScript)
├── public/           # 静态资源
├── docs/             # 项目文档
├── backup/           # 数据库备份
└── 配置文件
```

---

## 📦 后端结构 (backend/)

```
backend/
├── app/
│   ├── main.py              # FastAPI 主应用
│   ├── database.py           # 数据库连接
│   ├── mock_data.py         # Mock 数据
│   ├── room_layout_db.py    # 机房布局数据库模型
│   ├── schemas.py           # Pydantic 模型
│   └── routers/              # API 路由
│       ├── cockpit.py        # 驾驶舱 API
│       ├── config.py         # 配置 API
│       └── room_layout.py    # 机房布局 API
├── scripts/                  # 脚本工具
│   ├── init_db.py           # 初始化数据库
│   ├── seed_data.py         # 种子数据
│   ├── seed_random_data.py  # 随机数据生成
│   ├── sync_all_rooms.py   # 同步所有机房
│   ├── sync_cabinet_config_v3.py  # 同步机柜配置
│   ├── database_schema.sql  # 数据库 schema
│   ├── room_layout_schema.sql  # 机房布局 schema
│   └── start.sh            # 启动脚本
├── config/
│   └── nginx.conf          # Nginx 配置
├── Dockerfile              # Docker 配置
└── requirements.txt        # Python 依赖
```

---

## 🎨 前端结构 (src/)

```
src/
├── main.ts                 # Vue 入口
├── App.vue                 # 根组件
├── api/                    # API 调用
│   ├── monitoring.ts       # 监控 API
│   └── roomLayout.ts      # 机房布局 API
├── assets/                 # 静态资源
│   ├── base.css
│   ├── main.css
│   └── logo.svg
├── components/             # 公共组件 (如需添加)
├── config/                 # 配置文件
│   ├── enterprises.ts      # 企业配置
│   └── roomConfig.ts       # 机房配置
├── router/                 # 路由
│   └── index.ts
├── stores/                 # 状态管理
│   ├── configStore.ts
│   └── dashboard.ts
├── styles/                 # 全局样式
│   ├── panels.css
│   └── room-layout.css
├── types/                  # TypeScript 类型
│   └── index.ts
├── utils/                  # 工具函数
│   ├── rackController.ts   # 机柜控制器
│   ├── request.ts          # 请求封装
│   ├── roomInitializer.ts  # 机房初始化
│   ├── roomLayoutService.ts  # 机房布局服务
│   ├── usageRateColor.ts   # 占用率颜色
│   ├── three-helpers.js    # Three.js 辅助
│   └── three-helpers.d.ts  # Three.js 类型
└── views/                  # 页面视图
    ├── MonitoringDashboard.vue      # 监控驾驶舱主页面
    └── MonitoringDashboard/components/
        ├── ThreeScene.vue          # 3D 场景
        ├── ResourceOverview.vue    # 资源概览
        ├── EnterpriseOverviewPanel.vue  # 企业概览
        ├── DetailsPanel.vue        # 详情面板
        ├── RoomLayoutDiagram.vue  # 机房布局图
        ├── RackDashboard.vue       # 机柜仪表板
        ├── CabinetGridEditor.vue  # 机柜网格编辑器
        ├── FloorControls.vue       # 楼层控制
        ├── TimePanel.vue          # 时间面板
        ├── LogoPanel.vue          # Logo 面板
        └── SettingsPanel.vue      # 设置面板
```

---

## 📂 其他目录

```
public/                     # 静态公共资源
├── background-photo.png
├── background.mp4
├── d3.js
├── favicon.ico
└── favicon.png

docs/                      # 项目文档
├── DATABASE_DATA_AUDIT.md
└── ER_INFO.md

backup/                    # 数据库备份
├── README.md
├── public.sql             # Navicat 完整备份
├── cockpit_db_full.sql     # pg_dump 备份
├── cockpit_db_schema.sql   # 数据库结构
├── database_structure.md   # 结构文档
├── database_structure_summary.md  # 结构汇总
└── cockpit_db_backup_20260419.tar.gz  # 压缩备份
```

---

## ⚙️ 配置文件

| 文件 | 说明 |
|------|------|
| `package.json` | 前端依赖 |
| `vite.config.ts` | Vite 配置 |
| `tsconfig.json` | TypeScript 配置 |
| `eslint.config.ts` | ESLint 配置 |
| `docker-compose.yml` | Docker 编排 |
| `nginx.conf` | Nginx 配置 (backend/config/) |
| `start.sh` | 启动脚本 (backend/scripts/) |

---

## 🗄️ 数据库

- **类型**: PostgreSQL 15
- **连接**: localhost:5434
- **数据库名**: cockpit_db
- **备份**: `backup/public.sql` (Navicat)

### 主要表

| 表 | 数量 | 说明 |
|---|------|------|
| enterprises | 20 | 企业 |
| rooms | 30 | 机房 |
| cabinets | 24000+ | 机柜 |
| room_layout_config | 37 | 机房配置 |
| cabinet_config | 14400 | 机柜配置 |
| monitoring_features | 58 | 监控功能 |

---

## 🚀 启动方式

### 前端
```bash
cd src
npm install
npm run dev
```

### 后端
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Docker
```bash
docker-compose up -d
```

---

## 📝 备注

1. 所有备份文件保存在 `backup/` 目录
2. 数据库 schema 文件已移至 `backend/scripts/`
3. 配置文件已整理至 `backend/config/`
4. 前端代码使用 Vue 3 + TypeScript + Pinia
5. 后端使用 FastAPI + SQLAlchemy
