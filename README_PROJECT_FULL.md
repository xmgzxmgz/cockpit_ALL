# Cockpit ALL 项目完整说明

## 1. 项目定位

`cockpit_ALL` 是一个面向机房/数据中心可视化监控的全栈项目，提供：

- 前端监控大屏（Vue 3 + Vite + TypeScript）
- 后端 API 与业务编排（FastAPI + SQLAlchemy）
- PostgreSQL 数据存储（容器化）
- Docker Compose 一键部署运行

---

## 2. 技术栈

- 前端：`Vue 3`、`Vite`、`TypeScript`、`Pinia`、`Element Plus`、`Three.js`
- 后端：`Python 3.11`、`FastAPI`、`SQLAlchemy`、`Pydantic`
- 数据库：`PostgreSQL 15`
- 运行与部署：`Docker`、`Docker Compose`

---

## 3. 数据库现状与结论

当前项目主数据库是 **PostgreSQL**，依据如下：

- `backend/app/database.py` 默认连接串是 `postgresql://user:password@localhost:5432/cockpit_db`
- `docker-compose.yml` 中 `db` 服务使用镜像 `postgres:15-alpine`
- 后端容器通过环境变量 `DATABASE_URL=postgresql://user:password@db:5432/cockpit_db` 连接数据库
- 根目录 `database_schema.sql` 负责初始化表结构和演示数据

---

## 4. 一键启动（前端 + 后端 + 数据库 + 健康检查）

项目新增脚本：`scripts/start_stack.py`

功能：

- 自动执行 `docker compose up -d --build`
- 检查后端健康接口 `http://127.0.0.1:8002/health`
- 检查前端页面 `http://127.0.0.1:5174`
- 验证 PostgreSQL 连接（容器内执行 `SELECT`）
- 失败时返回结构化报错 JSON（包含错误信息与排查提示）

运行方式：

```bash
python3 scripts/start_stack.py
```

可选参数：

```bash
python3 scripts/start_stack.py --no-build --timeout 120
```

---

## 5. ER 图信息导出

项目新增脚本：`scripts/export_er_info.py`

功能：

- 读取数据库中 **当前真实表结构**
- 导出表清单、字段类型、主键、可空性、默认值
- 导出外键关系
- 导出各表当前行数（反映“现有数据库状态”）
- 生成可直接给 Gemini 的 JSON 数据

运行方式：

```bash
python3 scripts/export_er_info.py
```

输出文件：

- `docs/ER_INFO.md`

---

## 6. 项目树状结构（含模块简介）

```text
cockpit_ALL/
├── src/                                   # 前端源码目录
│   ├── App.vue                            # 前端根组件
│   └── views/
│       └── MonitoringDashboard/           # 监控大屏核心页面
│           ├── MonitoringDashboard.vue    # 页面主容器
│           └── components/
│               ├── DetailsPanel.vue       # 明细信息面板
│               ├── EnterpriseOverviewPanel.vue # 企业总览面板
│               ├── FloorControls.vue      # 楼层/区域控制
│               ├── LogoPanel.vue          # 标识与头部展示
│               ├── RackDashboard.vue      # 机柜看板
│               ├── ResourceOverview.vue   # 资源统计总览
│               ├── RoomLayoutDiagram.vue  # 机房布局图
│               ├── ThreeScene.vue         # 3D 场景渲染
│               └── TimePanel.vue          # 时间状态面板
├── backend/                               # 后端服务目录
│   ├── app/
│   │   ├── main.py                        # FastAPI 主应用与路由
│   │   ├── database.py                    # SQLAlchemy 模型与 DB 会话
│   │   ├── schemas.py                     # Pydantic 数据模型
│   │   ├── mock_data.py                   # 模拟数据
│   │   └── routers/
│   │       └── cockpit.py                 # 分路由（如有启用）
│   ├── scripts/
│   │   ├── init_db.py                     # 初始化 SQL 脚本执行
│   │   ├── seed_data.py                   # 填充数据
│   │   └── verify_api.py                  # API 验证脚本
│   ├── requirements.txt                   # Python 依赖
│   └── Dockerfile                         # 后端镜像构建
├── scripts/                               # 本次新增自动化脚本
│   ├── start_stack.py                     # 一键启动 + 健康检查 + DB连通性
│   └── export_er_info.py                  # ER 图资料导出
├── docs/
│   └── ER_INFO.md                         # ER 绘图原始数据（脚本生成）
├── database_schema.sql                    # PostgreSQL 初始化结构与数据
├── docker-compose.yml                     # 前后端+DB 容器编排
├── Dockerfile                             # 前端镜像构建
├── nginx.conf                             # 前端容器 Nginx 配置
├── package.json                           # 前端依赖与脚本
├── README.md                              # 原项目说明
└── README_PROJECT_FULL.md                 # 本完整说明文档
```

---

## 7. 核心业务模型（数据库）

核心关系链路：

- 企业 `enterprises` 1:N 机柜 `cabinets`
- 机房 `rooms` 1:N 机柜 `cabinets`
- 功能分类 `feature_categories` 1:N 功能模块 `monitoring_features`
- 功能模块 `monitoring_features` 1:N
  - 指标 `feature_metrics`
  - 告警规则 `alert_rules`
  - 告警事件 `alerts`
  - 知识库链接 `knowledge_base_links`
- 告警规则 `alert_rules` 1:N 告警事件 `alerts`（`alerts.rule_id` 可空）

其余如环境读数、电力事件、网络/服务器/应用指标等以时序记录为主。

---

## 8. 常用开发命令

### 容器化方式（推荐）

```bash
python3 scripts/start_stack.py
```

### 手动方式

```bash
# 仅启动数据库
docker compose up -d db

# 启动后端
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# 启动前端（另开终端）
cd ..
npm install
npm run dev
```

---

## 9. 访问地址

- 前端：`http://localhost:5174`
- 后端健康检查：`http://localhost:8002/health`
- PostgreSQL：`localhost:5433`（用户 `user` / 密码 `password` / 库 `cockpit_db`）

---

## 10. 你后续给 Gemini 画 ER 图时的建议输入

可以把 `docs/ER_INFO.md` 中以下两部分直接喂给 Gemini：

- 外键关系（用于画关系线）
- `JSON` 区块（用于完整字段信息和表说明）

这样能确保图和你当前数据库状态一致。
