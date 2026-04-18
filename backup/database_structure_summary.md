# Cockpit 数据库结构汇总

## 📊 快速概览

**总计**: 30 个数据表

---

## 1. 核心业务表

| 表名 | 数据量 | 说明 | 关键字段 |
|------|--------|------|----------|
| **enterprises** | 20条 | 企业信息 | id, name, color, manager |
| **rooms** | 30条 | 机房信息 | id, name, status |
| **cabinets** | 24,000+条 | 机柜分配 | id, room_id, enterprise_id |

---

## 2. 机房布局配置表

| 表名 | 数据量 | 说明 | 关键字段 |
|------|--------|------|----------|
| **room_layout_config** | 37条 | 机房布局配置 | room_id, max_racks, rows, cols |
| **cabinet_config** | 14,400条 | 机柜详细配置 | room_id, cabinet_id, enterprise |
| **cabinet_layout** | - | 机柜布局 | - |
| **cabinet_grid** | - | 机柜网格 | - |
| **cabinet_layout_order** | - | 布局顺序 | - |
| **floor_config** | - | 楼层配置 | - |
| **room_config** | - | 机房配置 | - |
| **area_frame_config** | - | 区域框架配置 | - |
| **data_center_config** | - | 数据中心配置 | - |

---

## 3. 监控功能表

| 表名 | 数据量 | 说明 | 关键字段 |
|------|--------|------|----------|
| **feature_categories** | 9条 | 功能分类 | code, name |
| **monitoring_features** | 58条 | 监控功能 | code, name, status, severity |
| **feature_metrics** | 464条 | 功能指标 | feature_code, metric_value |
| **alert_rules** | 20条 | 告警规则 | rule_name, threshold, severity |
| **alerts** | 5条 | 告警记录 | title, message, status |

---

## 4. 时序数据表

| 表名 | 数据量 | 说明 | 关键字段 |
|------|--------|------|----------|
| **environment_readings** | 120条 | 环境读数 | room_id, sensor_type, value |
| **power_events** | 48条 | 电力事件 | event_type, severity, detail |
| **server_metrics** | 120条 | 服务器指标 | server_name, metric_key, value |
| **network_metrics** | 120条 | 网络指标 | link_name, metric_key, value |
| **application_metrics** | 120条 | 应用指标 | app_name, metric_key, value |
| **security_events** | 30条 | 安全事件 | event_type, severity, detail |

---

## 5. 运维管理表

| 表名 | 数据量 | 说明 | 关键字段 |
|------|--------|------|----------|
| **oncall_schedules** | 8条 | 值班排班 | name, duty_user, days |
| **inspection_reports** | 12条 | 巡检报告 | report_date, summary, file_url |
| **firmware_inventory** | 20条 | 固件清单 | device_name, device_type, version |
| **maintenance_assets** | 20条 | 维保资产 | asset_name, asset_type, expiry |
| **knowledge_base_links** | 11条 | 知识库链接 | feature_code, title, url |
| **resource_overview** | 1条 | 资源概览 | total_servers, total_cabinets |

---

## 6. 管理表

| 表名 | 数据量 | 说明 | 关键字段 |
|------|--------|------|----------|
| **db_backup_record** | - | 备份记录 | - |

---

## 📁 相关文件

| 文件 | 说明 |
|------|------|
| `database_structure.md` | **完整数据库结构文档**（包含每个表的详细字段和示例数据） |
| `public.sql` | Navicat 完整备份 |
| `cockpit_db_full.sql` | pg_dump 完整备份 |
| `README.md` | 备份说明 |

---

## 🔗 主要关系图

```
enterprises (企业)
    ↓ (1:N)
cabinets (机柜)
    ↓ (N:1)
rooms (机房)

monitoring_features (监控功能)
    ↓ (1:N)
feature_metrics (功能指标)
    ↓ (1:N)
alerts (告警)
```

---

## 💾 数据库连接信息

| 配置项 | 值 |
|--------|-----|
| 类型 | PostgreSQL 15 |
| 主机 | localhost |
| 端口 | 5434 |
| 用户名 | user |
| 密码 | password |
| 数据库名 | cockpit_db |
