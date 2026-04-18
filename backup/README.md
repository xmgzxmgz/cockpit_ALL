# Cockpit 数据库备份说明

## 📅 备份信息
- **备份日期**：2026年4月19日
- **数据库系统**：PostgreSQL 15
- **数据库名称**：cockpit_db
- **备份工具**：pg_dump + Navicat Premium

## 📁 备份文件列表

### 1. `public.sql` (6.1MB) ⭐ **推荐使用**
- **内容**：Navicat Premium 完整转储（结构 + 数据）
- **来源**：Navicat Premium 手动导出
- **用途**：推荐用于完整恢复（兼容性最好）
- **恢复方法**：Navicat 右键 → 运行 SQL 文件

### 2. `cockpit_db_full.sql` (1.9MB)
- **内容**：pg_dump 完整数据库备份（结构+数据）
- **用途**：完整恢复数据库
- **创建命令**：`pg_dump -U user cockpit_db`

### 3. `cockpit_db_schema.sql` (45KB)
- **内容**：仅数据库表结构
- **用途**：用于重建数据库结构
- **创建命令**：`pg_dump -U user -s cockpit_db`

### 4. `cockpit_db_backup_20260419.tar.gz` (340KB)
- **内容**：压缩备份包（pg_dump 版本）
- **用途**：长期存档备份

## 📊 数据库内容概览

### 核心表（主要数据）
| 表名 | 数据量 | 说明 |
|------|--------|------|
| `enterprises` | 20条 | 企业信息（含颜色标识） |
| `rooms` | 30条 | 机房信息（101-106, 201-206, 301-306, 401-406, 501-506） |
| `cabinets` | 约24000条 | 机柜分配信息 |

### 机房布局表（新增）
| 表名 | 数据量 | 说明 |
|------|--------|------|
| `room_layout_config` | 37条 | 机房布局配置 |
| `cabinet_config` | 14400条 | 机柜详细配置 |

### 监控相关表
| 表名 | 数据量 | 说明 |
|------|--------|------|
| `feature_categories` | 9条 | 功能分类 |
| `monitoring_features` | 58条 | 监控功能 |
| `feature_metrics` | 464条 | 指标数据 |
| `alert_rules` | 20条 | 告警规则 |
| `alerts` | 5条 | 告警记录 |

### 时序数据表
| 表名 | 数据量 | 说明 |
|------|--------|------|
| `environment_readings` | 120条 | 环境读数 |
| `power_events` | 48条 | 电力事件 |
| `server_metrics` | 120条 | 服务器指标 |
| `network_metrics` | 120条 | 网络指标 |
| `application_metrics` | 120条 | 应用指标 |
| `security_events` | 30条 | 安全事件 |

### 运维管理表
| 表名 | 数据量 | 说明 |
|------|--------|------|
| `oncall_schedules` | 8条 | 值班排班 |
| `inspection_reports` | 12条 | 巡检报告 |
| `firmware_inventory` | 20条 | 固件清单 |
| `maintenance_assets` | 20条 | 维保资产 |
| `knowledge_base_links` | 11条 | 知识库链接 |
| `resource_overview` | 1条 | 资源概览 |

## 🔧 数据恢复方法

### 推荐方法：使用 Navicat 恢复（最简单）
1. 在 Navicat 中连接到 PostgreSQL
2. 右键点击 `cockpit_db` 数据库
3. 选择 **"运行 SQL 文件"**
4. 选择 `public.sql`
5. 点击 **开始** 运行

### 完整恢复（命令行）
```bash
# 1. 确保 docker 容器运行
docker-compose up -d

# 2. 恢复完整备份
docker exec -i cockpit-db psql -U user -d cockpit_db < /path/to/backup/cockpit_db_full.sql
```

### 仅恢复结构
```bash
docker exec -i cockpit-db psql -U user -d cockpit_db < /path/to/backup/cockpit_db_schema.sql
```

### 从 Docker 容器内直接操作
```bash
# 进入容器
docker exec -it cockpit-db psql -U user -d cockpit_db

# 或者执行 SQL
docker exec -i cockpit-db psql -U user -d cockpit_db -c "SELECT * FROM enterprises;"
```

## 📝 备注

1. **企业分配情况**：所有 30 个机房都有约 80% 的机柜分配给了 20 个企业
2. **机柜布局**：每个机房 600 个机柜，30 列 × 20 行
3. **数据库连接**：localhost:5434 / user / password
4. **Docker 数据卷**：`postgres_data`（持久化存储）

## 📍 备份位置
`/Users/xiamuguizhi/code/cockpit_ALL/backup/`
