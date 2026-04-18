# Cockpit 数据库完整结构文档

## 📅 生成日期
- **日期**: 2026年4月19日
- **数据库**: PostgreSQL 15
- **连接**: localhost:5434 / user / password

---

## 📋 数据表列表

| 序号 | 表名 | 说明 |
|------|------|------|
| 1 | `alert_rules` | 告警规则 |
| 2 | `alerts` | 告警记录 |
| 3 | `application_metrics` | 应用指标 |
| 4 | `area_frame_config` | 区域框架配置 |
| 5 | `cabinet_config` | 机柜配置 |
| 6 | `cabinet_grid` | 机柜网格 |
| 7 | `cabinet_layout` | 机柜布局 |
| 8 | `cabinet_layout_order` | 机柜布局顺序 |
| 9 | `cabinets` | 机柜 |
| 10 | `data_center_config` | 数据中心配置 |
| 11 | `db_backup_record` | 数据库备份记录 |
| 12 | `enterprises` | 企业信息 |
| 13 | `environment_readings` | 环境读数 |
| 14 | `feature_categories` | 功能分类 |
| 15 | `feature_metrics` | 功能指标 |
| 16 | `firmware_inventory` | 固件清单 |
| 17 | `floor_config` | 楼层配置 |
| 18 | `inspection_reports` | 巡检报告 |
| 19 | `knowledge_base_links` | 知识库链接 |
| 20 | `maintenance_assets` | 维保资产 |
| 21 | `monitoring_features` | 监控功能 |
| 22 | `network_metrics` | 网络指标 |
| 23 | `oncall_schedules` | 值班排班 |
| 24 | `power_events` | 电力事件 |
| 25 | `resource_overview` | 资源概览 |
| 26 | `room_config` | 机房配置 |
| 27 | `room_layout_config` | 机房布局配置 |
| 28 | `rooms` | 机房信息 |
| 29 | `security_events` | 安全事件 |
| 30 | `server_metrics` | 服务器指标 |

---

## 1. alert_rules
================================================================================
```
                                                                    Table "public.alert_rules"
      Column      |          Type          | Collation | Nullable |                 Default                 | Storage  | Compression | Stats target | Description 
------------------+------------------------+-----------+----------+-----------------------------------------+----------+-------------+--------------+-------------
 id               | integer                |           | not null | nextval('alert_rules_id_seq'::regclass) | plain    |             |              | 
 feature_code     | character varying(20)  |           |          |                                         | extended |             |              | 
 rule_name        | character varying(255) |           |          |                                         | extended |             |              | 
 comparator       | character varying(10)  |           |          |                                         | extended |             |              | 
 threshold        | numeric                |           |          |                                         | main     |             |              | 
 duration_minutes | integer                |           |          | 0                                       | plain    |             |              | 
 enabled          | boolean                |           |          | true                                    | plain    |             |              | 
 severity         | character varying(50)  |           |          | 'warning'::character varying            | extended |             |              | 
Indexes:
    "alert_rules_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "alert_rules_feature_code_fkey" FOREIGN KEY (feature_code) REFERENCES monitoring_features(code)
Referenced by:
    TABLE "alerts" CONSTRAINT "alerts_rule_id_fkey" FOREIGN KEY (rule_id) REFERENCES alert_rules(id)
Access method: heap

```

**数据量**: 20 条

**示例数据**:
```
 id | feature_code |  rule_name   | comparator | threshold | duration_minutes | enabled | severity 
----+--------------+--------------+------------+-----------+------------------+---------+----------
  1 | 6.04         | 6.04阈值规则 | >          |     78.91 |               15 | t       | critical
  2 | 7.02         | 7.02阈值规则 | >          |     81.12 |                5 | t       | critical
  3 | 7.06         | 7.06阈值规则 | >          |     71.65 |                5 | t       | critical
  4 | 8.02         | 8.02阈值规则 | >          |     68.04 |               10 | t       | critical
  5 | 1.01         | 1.01阈值规则 | >          |     82.46 |               10 | t       | critical
(5 rows)

```

---

## 2. alerts
================================================================================
```
                                                                    Table "public.alerts"
    Column    |            Type             | Collation | Nullable |              Default               | Storage  | Compression | Stats target | Description 
--------------+-----------------------------+-----------+----------+------------------------------------+----------+-------------+--------------+-------------
 id           | integer                     |           | not null | nextval('alerts_id_seq'::regclass) | plain    |             |              | 
 feature_code | character varying(20)       |           |          |                                    | extended |             |              | 
 rule_id      | integer                     |           |          |                                    | plain    |             |              | 
 title        | character varying(255)      |           |          |                                    | extended |             |              | 
 message      | text                        |           |          |                                    | extended |             |              | 
 severity     | character varying(50)       |           |          |                                    | extended |             |              | 
 status       | character varying(50)       |           |          | 'active'::character varying        | extended |             |              | 
 triggered_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP                  | plain    |             |              | 
 resolved_at  | timestamp without time zone |           |          |                                    | plain    |             |              | 
Indexes:
    "alerts_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "alerts_feature_code_fkey" FOREIGN KEY (feature_code) REFERENCES monitoring_features(code)
    "alerts_rule_id_fkey" FOREIGN KEY (rule_id) REFERENCES alert_rules(id)
Access method: heap

```

**数据量**: 5 条

**示例数据**:
```
 id | feature_code | rule_id |    title     |        message         | severity |  status  |        triggered_at        | resolved_at 
----+--------------+---------+--------------+------------------------+----------+----------+----------------------------+-------------
  1 | 8.02         |       4 | 8.02触发告警 | 检测到 8.02 指标异常。 | critical | resolved | 2026-04-18 15:42:09.046342 | 
  2 | 1.01         |       5 | 1.01触发告警 | 检测到 1.01 指标异常。 | critical | resolved | 2026-04-18 07:02:09.046342 | 
  3 | 2.05         |      10 | 2.05触发告警 | 检测到 2.05 指标异常。 | critical | resolved | 2026-04-18 05:35:09.046342 | 
  4 | 3.06         |      13 | 3.06触发告警 | 检测到 3.06 指标异常。 | warning  | resolved | 2026-04-18 08:36:09.046342 | 
  5 | 5.02         |      19 | 5.02触发告警 | 检测到 5.02 指标异常。 | warning  | resolved | 2026-04-18 16:53:09.046342 | 
(5 rows)

```

---

## 3. application_metrics
================================================================================
```
                                                                    Table "public.application_metrics"
    Column    |            Type             | Collation | Nullable |                     Default                     | Storage  | Compression | Stats target | Description 
--------------+-----------------------------+-----------+----------+-------------------------------------------------+----------+-------------+--------------+-------------
 id           | integer                     |           | not null | nextval('application_metrics_id_seq'::regclass) | plain    |             |              | 
 app_name     | character varying(100)      |           |          |                                                 | extended |             |              | 
 metric_key   | character varying(100)      |           |          |                                                 | extended |             |              | 
 metric_value | character varying(100)      |           |          |                                                 | extended |             |              | 
 unit         | character varying(20)       |           |          |                                                 | extended |             |              | 
 recorded_at  | timestamp without time zone |           |          | CURRENT_TIMESTAMP                               | plain    |             |              | 
Indexes:
    "application_metrics_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 120 条

**示例数据**:
```
 id | app_name  | metric_key  | metric_value | unit |        recorded_at         
----+-----------+-------------+--------------+------+----------------------------
  1 | service-1 | error_rate  | 4070.35      | ms   | 2026-04-18 06:07:09.046342
  2 | service-2 | error_rate  | 3203.96      | ms   | 2026-04-18 05:55:09.046342
  3 | service-3 | queue_depth | 1089.86      | %    | 2026-04-18 07:27:09.046342
  4 | service-4 | queue_depth | 2585.94      | msg  | 2026-04-18 05:23:09.046342
  5 | service-5 | queue_depth | 740.87       | ms   | 2026-04-18 08:42:09.046342
(5 rows)

```

---

## 4. area_frame_config
================================================================================
```
                                                                     Table "public.area_frame_config"
     Column     |            Type             | Collation | Nullable |                    Default                    | Storage  | Compression | Stats target | Description 
----------------+-----------------------------+-----------+----------+-----------------------------------------------+----------+-------------+--------------+-------------
 id             | integer                     |           | not null | nextval('area_frame_config_id_seq'::regclass) | plain    |             |              | 
 room_id        | character varying(50)       |           | not null |                                               | extended |             |              | 
 frame_id       | character varying(50)       |           | not null |                                               | extended |             |              | 
 label          | character varying(100)      |           |          |                                               | extended |             |              | 
 rack_range     | text                        |           |          |                                               | extended |             |              | 
 color          | character varying(50)       |           |          |                                               | extended |             |              | 
 border_width   | integer                     |           |          |                                               | plain    |             |              | 
 label_position | character varying(20)       |           |          |                                               | extended |             |              | 
 created_at     | timestamp without time zone |           |          |                                               | plain    |             |              | 
 updated_at     | timestamp without time zone |           |          |                                               | plain    |             |              | 
Indexes:
    "area_frame_config_pkey" PRIMARY KEY, btree (id)
    "ix_area_frame_config_id" btree (id)
    "uix_room_frame" UNIQUE CONSTRAINT, btree (room_id, frame_id)
Access method: heap

```

**数据量**: 0 条

**示例数据**:
```
 id | room_id | frame_id | label | rack_range | color | border_width | label_position | created_at | updated_at 
----+---------+----------+-------+------------+-------+--------------+----------------+------------+------------
(0 rows)

```

---

## 5. cabinet_config
================================================================================
```
                                                                     Table "public.cabinet_config"
    Column     |            Type             | Collation | Nullable |                  Default                   | Storage  | Compression | Stats target | Description 
---------------+-----------------------------+-----------+----------+--------------------------------------------+----------+-------------+--------------+-------------
 id            | integer                     |           | not null | nextval('cabinet_config_id_seq'::regclass) | plain    |             |              | 
 room_id       | character varying(50)       |           | not null |                                            | extended |             |              | 
 cabinet_id    | integer                     |           | not null |                                            | plain    |             |              | 
 col_position  | integer                     |           | not null |                                            | plain    |             |              | 
 row_position  | integer                     |           | not null |                                            | plain    |             |              | 
 enterprise    | character varying(255)      |           |          |                                            | extended |             |              | 
 enabled       | boolean                     |           |          |                                            | plain    |             |              | 
 color         | character varying(50)       |           |          |                                            | extended |             |              | 
 is_hidden     | boolean                     |           |          |                                            | plain    |             |              | 
 visible_index | integer                     |           |          |                                            | plain    |             |              | 
 name          | character varying(255)      |           |          |                                            | extended |             |              | 
 maintainer    | character varying(100)      |           |          |                                            | extended |             |              | 
 manager       | character varying(100)      |           |          |                                            | extended |             |              | 
 created_at    | timestamp without time zone |           |          |                                            | plain    |             |              | 
 updated_at    | timestamp without time zone |           |          |                                            | plain    |             |              | 
Indexes:
    "cabinet_config_pkey" PRIMARY KEY, btree (id)
    "ix_cabinet_config_id" btree (id)
    "uix_room_cabinet" UNIQUE CONSTRAINT, btree (room_id, cabinet_id)
Access method: heap

```

**数据量**: 14400 条

**示例数据**:
```
  id  | room_id | cabinet_id | col_position | row_position | enterprise | enabled |  color  | is_hidden | visible_index | name | maintainer |  manager   |         created_at         |         updated_at         
------+---------+------------+--------------+--------------+------------+---------+---------+-----------+---------------+------+------------+------------+----------------------------+----------------------------
 2001 | 102     |          1 |            1 |            1 | 企业05     | t       | #a4e71b | f         |             1 | A01  | 运维05     | 客户经理05 | 2026-04-18 17:45:36.799213 | 2026-04-18 17:48:17.86535
 2002 | 102     |          2 |            2 |            1 | 企业20     | t       | #9eed98 | f         |             2 | A02  | 运维20     | 客户经理20 | 2026-04-18 17:45:36.799214 | 2026-04-18 17:48:17.86535
 2003 | 102     |          3 |            3 |            1 | 企业19     | t       | #953325 | f         |             3 | A03  | 运维19     | 客户经理19 | 2026-04-18 17:45:36.799216 | 2026-04-18 17:48:17.868871
 2004 | 102     |          4 |            4 |            1 | 企业12     | t       | #22b65d | f         |             4 | A04  | 运维12     | 客户经理12 | 2026-04-18 17:45:36.799217 | 2026-04-18 17:48:17.869451
 2005 | 102     |          5 |            5 |            1 | 企业20     | t       | #9eed98 | f         |             5 | A05  | 运维20     | 客户经理20 | 2026-04-18 17:45:36.799218 | 2026-04-18 17:48:17.869455
(5 rows)

```

---

## 6. cabinet_grid
================================================================================
```
                                                                   Table "public.cabinet_grid"
   Column    |            Type             | Collation | Nullable |                 Default                  | Storage | Compression | Stats target | Description 
-------------+-----------------------------+-----------+----------+------------------------------------------+---------+-------------+--------------+-------------
 id          | integer                     |           | not null | nextval('cabinet_grid_id_seq'::regclass) | plain   |             |              | 
 room_id     | integer                     |           |          |                                          | plain   |             |              | 
 grid_x      | integer                     |           | not null |                                          | plain   |             |              | 
 grid_y      | integer                     |           | not null |                                          | plain   |             |              | 
 is_occupied | boolean                     |           |          | false                                    | plain   |             |              | 
 cabinet_id  | integer                     |           |          |                                          | plain   |             |              | 
 created_at  | timestamp without time zone |           |          | CURRENT_TIMESTAMP                        | plain   |             |              | 
 updated_at  | timestamp without time zone |           |          | CURRENT_TIMESTAMP                        | plain   |             |              | 
Indexes:
    "cabinet_grid_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "cabinet_grid_room_id_fkey" FOREIGN KEY (room_id) REFERENCES room_config(id)
Access method: heap

```

**数据量**: 10 条

**示例数据**:
```
 id | room_id | grid_x | grid_y | is_occupied | cabinet_id |         created_at         |         updated_at         
----+---------+--------+--------+-------------+------------+----------------------------+----------------------------
  1 |       1 |      0 |      0 | t           |          1 | 2026-04-18 17:08:41.548961 | 2026-04-18 17:08:41.548961
  2 |       1 |      0 |      1 | t           |          2 | 2026-04-18 17:08:41.548961 | 2026-04-18 17:08:41.548961
  3 |       1 |      0 |      2 | f           |            | 2026-04-18 17:08:41.548961 | 2026-04-18 17:08:41.548961
  4 |       1 |      0 |      3 | t           |          3 | 2026-04-18 17:08:41.548961 | 2026-04-18 17:08:41.548961
  5 |       1 |      0 |      4 | f           |            | 2026-04-18 17:08:41.548961 | 2026-04-18 17:08:41.548961
(5 rows)

```

---

## 7. cabinet_layout
================================================================================
```
                                                                      Table "public.cabinet_layout"
      Column      |            Type             | Collation | Nullable |                  Default                   | Storage  | Compression | Stats target | Description 
------------------+-----------------------------+-----------+----------+--------------------------------------------+----------+-------------+--------------+-------------
 id               | integer                     |           | not null | nextval('cabinet_layout_id_seq'::regclass) | plain    |             |              | 
 room_id          | integer                     |           |          |                                            | plain    |             |              | 
 layout_type      | character varying(50)       |           |          | 'row'::character varying                   | extended |             |              | 
 columns          | integer                     |           |          | 10                                         | plain    |             |              | 
 rows             | integer                     |           |          | 10                                         | plain    |             |              | 
 spacing          | double precision            |           |          | 1.0                                        | plain    |             |              | 
 start_position_x | double precision            |           |          | 0                                          | plain    |             |              | 
 start_position_y | double precision            |           |          | 0                                          | plain    |             |              | 
 created_at       | timestamp without time zone |           |          | CURRENT_TIMESTAMP                          | plain    |             |              | 
 updated_at       | timestamp without time zone |           |          | CURRENT_TIMESTAMP                          | plain    |             |              | 
Indexes:
    "cabinet_layout_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "cabinet_layout_room_id_fkey" FOREIGN KEY (room_id) REFERENCES room_config(id)
Access method: heap

```

**数据量**: 24 条

**示例数据**:
```
 id | room_id | layout_type | columns | rows | spacing | start_position_x | start_position_y |        created_at         |        updated_at         
----+---------+-------------+---------+------+---------+------------------+------------------+---------------------------+---------------------------
  1 |       1 | row         |      10 |   10 |       1 |                0 |                0 | 2026-04-18 17:08:41.54785 | 2026-04-18 17:08:41.54785
  2 |       2 | row         |      10 |   10 |       1 |                0 |                0 | 2026-04-18 17:08:41.54785 | 2026-04-18 17:08:41.54785
  3 |       3 | row         |      10 |   10 |       1 |                0 |                0 | 2026-04-18 17:08:41.54785 | 2026-04-18 17:08:41.54785
  4 |       4 | row         |      10 |   10 |       1 |                0 |                0 | 2026-04-18 17:08:41.54785 | 2026-04-18 17:08:41.54785
  5 |       5 | row         |      10 |   10 |       1 |                0 |                0 | 2026-04-18 17:08:41.54785 | 2026-04-18 17:08:41.54785
(5 rows)

```

---

## 8. cabinet_layout_order
================================================================================
```
                                                                     Table "public.cabinet_layout_order"
     Column     |            Type             | Collation | Nullable |                     Default                      | Storage  | Compression | Stats target | Description 
----------------+-----------------------------+-----------+----------+--------------------------------------------------+----------+-------------+--------------+-------------
 id             | integer                     |           | not null | nextval('cabinet_layout_order_id_seq'::regclass) | plain    |             |              | 
 room_id        | character varying(50)       |           | not null |                                                  | extended |             |              | 
 original_order | json                        |           | not null |                                                  | extended |             |              | 
 shuffled_order | json                        |           | not null |                                                  | extended |             |              | 
 shuffle_seed   | character varying(100)      |           |          |                                                  | extended |             |              | 
 is_active      | boolean                     |           |          |                                                  | plain    |             |              | 
 created_at     | timestamp without time zone |           |          |                                                  | plain    |             |              | 
 updated_at     | timestamp without time zone |           |          |                                                  | plain    |             |              | 
Indexes:
    "cabinet_layout_order_pkey" PRIMARY KEY, btree (id)
    "ix_cabinet_layout_order_id" btree (id)
    "uix_room_active" UNIQUE CONSTRAINT, btree (room_id, is_active)
Access method: heap

```

**数据量**: 23 条

**示例数据**:
```
 id | room_id |                                                                                                             original_order                                                                                                             |                                                                                                             shuffled_order                                                                                                             | shuffle_seed | is_active |         created_at         |         updated_at         
----+---------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------+-----------+----------------------------+----------------------------
  2 | 1-1     | []                                                                                                                                                                                                                                     | []                                                                                                                                                                                                                                     | 57846        | t         | 2026-04-18 17:32:20.79764  | 2026-04-18 17:32:20.797643
  1 | 201     | [1, 3, 4, 6, 7, 8, 12, 13, 14, 17, 19, 24, 25, 26, 29, 30, 32, 33, 34, 36, 41, 42, 43, 44, 45, 48, 49, 51, 52, 56, 57, 58, 59, 60, 64, 65, 66, 67, 70, 74, 76, 78, 80]                                                                 | [59, 67, 30, 44, 56, 58, 14, 29, 17, 51, 34, 32, 3, 65, 24, 74, 48, 41, 25, 36, 66, 26, 1, 57, 13, 43, 52, 70, 19, 7, 76, 80, 60, 42, 64, 45, 4, 12, 78, 49, 8, 33, 6]                                                                 | 123          | f         | 2026-04-18 17:32:10.271845 | 2026-04-18 17:32:20.922395
  3 | 201     | [1, 3, 4, 6, 7, 8, 12, 13, 14, 17, 19, 24, 25, 26, 29, 30, 32, 33, 34, 36, 41, 42, 43, 44, 45, 48, 49, 51, 52, 56, 57, 58, 59, 60, 64, 65, 66, 67, 70, 74, 76, 78, 80]                                                                 | [33, 13, 24, 44, 57, 56, 32, 59, 74, 1, 49, 76, 60, 66, 6, 41, 26, 80, 4, 67, 30, 65, 17, 58, 43, 19, 8, 52, 48, 3, 34, 70, 25, 29, 36, 45, 12, 42, 7, 51, 14, 78, 64]                                                                 | 37380        | t         | 2026-04-18 17:32:20.923371 | 2026-04-18 17:32:20.923373
  4 | 202     | [81, 84, 86, 93, 94, 95, 96, 98, 99, 106, 107, 109, 110, 111, 116, 118, 120, 122, 124, 125, 127, 128, 132, 134, 135, 136, 137, 140, 141, 142, 144, 148, 149, 150, 153, 154, 159]                                                       | [137, 84, 106, 96, 110, 154, 149, 150, 148, 135, 141, 144, 142, 81, 120, 125, 99, 95, 98, 136, 118, 127, 153, 93, 122, 116, 140, 124, 128, 109, 134, 94, 111, 107, 86, 159, 132]                                                       | 37674        | t         | 2026-04-18 17:32:21.092414 | 2026-04-18 17:32:21.092419
  5 | 203     | [164, 166, 167, 168, 169, 173, 174, 175, 176, 177, 181, 182, 185, 188, 189, 190, 191, 192, 193, 194, 195, 198, 201, 202, 204, 205, 211, 212, 213, 214, 215, 217, 220, 222, 223, 224, 225, 226, 227, 229, 230, 232, 233, 234, 236, 238] | [225, 164, 224, 173, 212, 176, 205, 167, 191, 168, 175, 194, 182, 198, 204, 217, 189, 185, 234, 211, 169, 202, 213, 229, 230, 193, 215, 174, 190, 166, 214, 226, 177, 238, 192, 188, 220, 223, 227, 236, 232, 222, 195, 233, 181, 201] | 50130        | t         | 2026-04-18 17:32:21.256452 | 2026-04-18 17:32:21.256456
(5 rows)

```

---

## 9. cabinets
================================================================================
```
                                                                     Table "public.cabinets"
    Column     |            Type             | Collation | Nullable |               Default                | Storage  | Compression | Stats target | Description 
---------------+-----------------------------+-----------+----------+--------------------------------------+----------+-------------+--------------+-------------
 id            | integer                     |           | not null | nextval('cabinets_id_seq'::regclass) | plain    |             |              | 
 room_id       | character varying(50)       |           |          |                                      | extended |             |              | 
 enterprise_id | integer                     |           |          |                                      | plain    |             |              | 
 cabinet_label | character varying(50)       |           | not null |                                      | extended |             |              | 
 status        | character varying(50)       |           |          | 'active'::character varying          | extended |             |              | 
 created_at    | timestamp without time zone |           |          | CURRENT_TIMESTAMP                    | plain    |             |              | 
Indexes:
    "cabinets_pkey" PRIMARY KEY, btree (id)
    "cabinets_room_id_cabinet_label_key" UNIQUE CONSTRAINT, btree (room_id, cabinet_label)
Foreign-key constraints:
    "cabinets_enterprise_id_fkey" FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)
    "cabinets_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id)
Access method: heap

```

**数据量**: 2400 条

**示例数据**:
```
 id  | room_id | enterprise_id | cabinet_label |  status  |         created_at         
-----+---------+---------------+---------------+----------+----------------------------
 481 | 101     |            10 | A01           | active   | 2026-04-18 17:45:27.403675
 482 | 101     |            16 | A02           | active   | 2026-04-18 17:45:27.403675
 483 | 101     |             3 | A03           | active   | 2026-04-18 17:45:27.403675
 484 | 101     |             5 | A04           | active   | 2026-04-18 17:45:27.403675
 485 | 101     |               | A05           | inactive | 2026-04-18 17:45:27.403675
(5 rows)

```

---

## 10. data_center_config
================================================================================
```
                                                                    Table "public.data_center_config"
   Column    |            Type             | Collation | Nullable |                    Default                     | Storage  | Compression | Stats target | Description 
-------------+-----------------------------+-----------+----------+------------------------------------------------+----------+-------------+--------------+-------------
 id          | integer                     |           | not null | nextval('data_center_config_id_seq'::regclass) | plain    |             |              | 
 name        | character varying(255)      |           | not null |                                                | extended |             |              | 
 floor_count | integer                     |           |          | 1                                              | plain    |             |              | 
 created_at  | timestamp without time zone |           |          | CURRENT_TIMESTAMP                              | plain    |             |              | 
 updated_at  | timestamp without time zone |           |          | CURRENT_TIMESTAMP                              | plain    |             |              | 
Indexes:
    "data_center_config_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "floor_config" CONSTRAINT "floor_config_data_center_id_fkey" FOREIGN KEY (data_center_id) REFERENCES data_center_config(id)
Access method: heap

```

**数据量**: 1 条

**示例数据**:
```
 id |     name      | floor_count |         created_at         |         updated_at         
----+---------------+-------------+----------------------------+----------------------------
  1 | 北京A数据中心 |           5 | 2026-04-18 17:08:41.545151 | 2026-04-18 17:08:41.545151
(1 row)

```

---

## 11. db_backup_record
================================================================================
```
                                                                    Table "public.db_backup_record"
   Column    |            Type             | Collation | Nullable |                   Default                    | Storage  | Compression | Stats target | Description 
-------------+-----------------------------+-----------+----------+----------------------------------------------+----------+-------------+--------------+-------------
 id          | integer                     |           | not null | nextval('db_backup_record_id_seq'::regclass) | plain    |             |              | 
 backup_name | character varying(255)      |           | not null |                                              | extended |             |              | 
 backup_path | character varying(500)      |           |          |                                              | extended |             |              | 
 backup_type | character varying(50)       |           |          |                                              | extended |             |              | 
 backup_size | bigint                      |           |          |                                              | plain    |             |              | 
 checksum    | character varying(128)      |           |          |                                              | extended |             |              | 
 created_at  | timestamp without time zone |           |          |                                              | plain    |             |              | 
 description | text                        |           |          |                                              | extended |             |              | 
Indexes:
    "db_backup_record_pkey" PRIMARY KEY, btree (id)
    "ix_db_backup_record_id" btree (id)
Access method: heap

```

**数据量**: 0 条

**示例数据**:
```
 id | backup_name | backup_path | backup_type | backup_size | checksum | created_at | description 
----+-------------+-------------+-------------+-------------+----------+------------+-------------
(0 rows)

```

---

## 12. enterprises
================================================================================
```
                                                                   Table "public.enterprises"
   Column   |            Type             | Collation | Nullable |                 Default                 | Storage  | Compression | Stats target | Description 
------------+-----------------------------+-----------+----------+-----------------------------------------+----------+-------------+--------------+-------------
 id         | integer                     |           | not null | nextval('enterprises_id_seq'::regclass) | plain    |             |              | 
 name       | character varying(255)      |           | not null |                                         | extended |             |              | 
 full_name  | character varying(255)      |           |          |                                         | extended |             |              | 
 maintainer | character varying(100)      |           |          |                                         | extended |             |              | 
 manager    | character varying(100)      |           |          |                                         | extended |             |              | 
 color      | character varying(50)       |           |          |                                         | extended |             |              | 
 created_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP                       | plain    |             |              | 
Indexes:
    "enterprises_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "cabinets" CONSTRAINT "cabinets_enterprise_id_fkey" FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)
Access method: heap

```

**数据量**: 20 条

**示例数据**:
```
 id |  name  |       full_name        | maintainer |  manager   |  color  |         created_at         
----+--------+------------------------+------------+------------+---------+----------------------------
  1 | 企业01 | 企业01数据服务有限公司 | 运维01     | 客户经理01 | #63704e | 2026-04-18 17:15:09.013196
  2 | 企业02 | 企业02数据服务有限公司 | 运维02     | 客户经理02 | #964fbc | 2026-04-18 17:15:09.013196
  3 | 企业03 | 企业03数据服务有限公司 | 运维03     | 客户经理03 | #1bb343 | 2026-04-18 17:15:09.013196
  4 | 企业04 | 企业04数据服务有限公司 | 运维04     | 客户经理04 | #f35696 | 2026-04-18 17:15:09.013196
  5 | 企业05 | 企业05数据服务有限公司 | 运维05     | 客户经理05 | #a4e71b | 2026-04-18 17:15:09.013196
(5 rows)

```

---

## 13. environment_readings
================================================================================
```
                                                                    Table "public.environment_readings"
   Column    |            Type             | Collation | Nullable |                     Default                      | Storage  | Compression | Stats target | Description 
-------------+-----------------------------+-----------+----------+--------------------------------------------------+----------+-------------+--------------+-------------
 id          | integer                     |           | not null | nextval('environment_readings_id_seq'::regclass) | plain    |             |              | 
 room_id     | character varying(50)       |           |          |                                                  | extended |             |              | 
 sensor_type | character varying(50)       |           |          |                                                  | extended |             |              | 
 value       | numeric                     |           |          |                                                  | main     |             |              | 
 unit        | character varying(20)       |           |          |                                                  | extended |             |              | 
 recorded_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP                                | plain    |             |              | 
Indexes:
    "environment_readings_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 120 条

**示例数据**:
```
 id | room_id | sensor_type | value | unit  |        recorded_at         
----+---------+-------------+-------+-------+----------------------------
  1 | 201     | temperature |  28.7 | °C    | 2026-04-17 18:40:09.046342
  2 | 201     | temperature | 26.75 | °C    | 2026-04-18 04:15:09.046342
  3 | 201     | humidity    | 72.09 | %     | 2026-04-18 04:09:09.046342
  4 | 201     | humidity    | 73.24 | %     | 2026-04-18 01:43:09.046342
  5 | 201     | pm25        | 68.49 | ug/m3 | 2026-04-18 02:53:09.046342
(5 rows)

```

---

## 14. feature_categories
================================================================================
```
                                                                 Table "public.feature_categories"
   Column    |          Type          | Collation | Nullable |                    Default                     | Storage  | Compression | Stats target | Description 
-------------+------------------------+-----------+----------+------------------------------------------------+----------+-------------+--------------+-------------
 id          | integer                |           | not null | nextval('feature_categories_id_seq'::regclass) | plain    |             |              | 
 code        | character varying(20)  |           | not null |                                                | extended |             |              | 
 name        | character varying(100) |           | not null |                                                | extended |             |              | 
 description | text                   |           |          |                                                | extended |             |              | 
Indexes:
    "feature_categories_pkey" PRIMARY KEY, btree (id)
    "feature_categories_code_key" UNIQUE CONSTRAINT, btree (code)
Referenced by:
    TABLE "monitoring_features" CONSTRAINT "monitoring_features_category_code_fkey" FOREIGN KEY (category_code) REFERENCES feature_categories(code)
Access method: heap

```

**数据量**: 9 条

**示例数据**:
```
 id | code  |       name       |           description            
----+-------+------------------+----------------------------------
  1 | ENV   | 基础环境监控     | 温湿度、水浸、空气质量等环境监控
  2 | POWER | 电力与能源管理   | PUE、UPS、能耗与断电监控
  3 | HW    | 服务器与硬件监控 | CPU、内存、磁盘、风扇等硬件监控
  4 | NET   | 网络与连接       | 流量、丢包、证书与连通性监控
  5 | APP   | 应用与服务       | 接口性能、日志、容器与中间件监控
(5 rows)

```

---

## 15. feature_metrics
================================================================================
```
                                                                    Table "public.feature_metrics"
    Column    |            Type             | Collation | Nullable |                   Default                   | Storage  | Compression | Stats target | Description 
--------------+-----------------------------+-----------+----------+---------------------------------------------+----------+-------------+--------------+-------------
 id           | integer                     |           | not null | nextval('feature_metrics_id_seq'::regclass) | plain    |             |              | 
 feature_code | character varying(20)       |           |          |                                             | extended |             |              | 
 metric_key   | character varying(100)      |           |          |                                             | extended |             |              | 
 metric_value | character varying(100)      |           |          |                                             | extended |             |              | 
 unit         | character varying(50)       |           |          |                                             | extended |             |              | 
 collected_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP                           | plain    |             |              | 
Indexes:
    "feature_metrics_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "feature_metrics_feature_code_fkey" FOREIGN KEY (feature_code) REFERENCES monitoring_features(code)
Access method: heap

```

**数据量**: 464 条

**示例数据**:
```
 id | feature_code | metric_key | metric_value | unit |        collected_at        
----+--------------+------------+--------------+------+----------------------------
  1 | 6.04         | sample     | 61.56        | unit | 2026-04-18 17:15:09.046342
  2 | 6.04         | sample     | 22.16        | unit | 2026-04-18 17:00:09.046342
  3 | 6.04         | sample     | 71.87        | unit | 2026-04-18 16:45:09.046342
  4 | 6.04         | sample     | 2.9          | unit | 2026-04-18 16:30:09.046342
  5 | 6.04         | sample     | 96.45        | unit | 2026-04-18 16:15:09.046342
(5 rows)

```

---

## 16. firmware_inventory
================================================================================
```
                                                                      Table "public.firmware_inventory"
      Column      |            Type             | Collation | Nullable |                    Default                     | Storage  | Compression | Stats target | Description 
------------------+-----------------------------+-----------+----------+------------------------------------------------+----------+-------------+--------------+-------------
 id               | integer                     |           | not null | nextval('firmware_inventory_id_seq'::regclass) | plain    |             |              | 
 device_name      | character varying(100)      |           |          |                                                | extended |             |              | 
 device_type      | character varying(100)      |           |          |                                                | extended |             |              | 
 firmware_version | character varying(100)      |           |          |                                                | extended |             |              | 
 last_checked     | timestamp without time zone |           |          | CURRENT_TIMESTAMP                              | plain    |             |              | 
Indexes:
    "firmware_inventory_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 20 条

**示例数据**:
```
 id | device_name | device_type | firmware_version |        last_checked        
----+-------------+-------------+------------------+----------------------------
  1 | device-1    | Switch      | v4.0.1           | 2026-02-11 17:15:09.046342
  2 | device-2    | PDU         | v5.3.10          | 2026-03-27 17:15:09.046342
  3 | device-3    | PDU         | v2.3.16          | 2026-03-05 17:15:09.046342
  4 | device-4    | PDU         | v1.6.14          | 2026-03-13 17:15:09.046342
  5 | device-5    | Switch      | v1.9.18          | 2026-02-23 17:15:09.046342
(5 rows)

```

---

## 17. floor_config
================================================================================
```
                                                                     Table "public.floor_config"
     Column     |            Type             | Collation | Nullable |                 Default                  | Storage  | Compression | Stats target | Description 
----------------+-----------------------------+-----------+----------+------------------------------------------+----------+-------------+--------------+-------------
 id             | integer                     |           | not null | nextval('floor_config_id_seq'::regclass) | plain    |             |              | 
 data_center_id | integer                     |           |          |                                          | plain    |             |              | 
 floor_number   | integer                     |           | not null |                                          | plain    |             |              | 
 floor_name     | character varying(100)      |           |          |                                          | extended |             |              | 
 shape          | character varying(50)       |           |          | 'rectangle'::character varying           | extended |             |              | 
 width          | double precision            |           |          | 100                                      | plain    |             |              | 
 depth          | double precision            |           |          | 100                                      | plain    |             |              | 
 room_count     | integer                     |           |          | 0                                        | plain    |             |              | 
 created_at     | timestamp without time zone |           |          | CURRENT_TIMESTAMP                        | plain    |             |              | 
 updated_at     | timestamp without time zone |           |          | CURRENT_TIMESTAMP                        | plain    |             |              | 
Indexes:
    "floor_config_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "floor_config_data_center_id_fkey" FOREIGN KEY (data_center_id) REFERENCES data_center_config(id)
Referenced by:
    TABLE "room_config" CONSTRAINT "room_config_floor_id_fkey" FOREIGN KEY (floor_id) REFERENCES floor_config(id)
Access method: heap

```

**数据量**: 5 条

**示例数据**:
```
 id | data_center_id | floor_number | floor_name |   shape   | width | depth | room_count |         created_at         |         updated_at         
----+----------------+--------------+------------+-----------+-------+-------+------------+----------------------------+----------------------------
  1 |              1 |            1 | 一楼       | rectangle |   100 |   100 |          6 | 2026-04-18 17:08:41.545633 | 2026-04-18 17:08:41.545633
  2 |              1 |            2 | 二楼       | rectangle |   100 |   100 |          6 | 2026-04-18 17:08:41.545633 | 2026-04-18 17:08:41.545633
  3 |              1 |            3 | 三楼       | rectangle |   100 |   100 |          6 | 2026-04-18 17:08:41.545633 | 2026-04-18 17:08:41.545633
  4 |              1 |            4 | 四楼       | rectangle |   100 |   100 |          6 | 2026-04-18 17:08:41.545633 | 2026-04-18 17:08:41.545633
  5 |              1 |            5 | 五楼       | rectangle |   100 |   100 |          6 | 2026-04-18 17:21:04.585506 | 2026-04-18 17:21:04.585506
(5 rows)

```

---

## 18. inspection_reports
================================================================================
```
                                                                 Table "public.inspection_reports"
   Column    |          Type          | Collation | Nullable |                    Default                     | Storage  | Compression | Stats target | Description 
-------------+------------------------+-----------+----------+------------------------------------------------+----------+-------------+--------------+-------------
 id          | integer                |           | not null | nextval('inspection_reports_id_seq'::regclass) | plain    |             |              | 
 report_date | date                   |           |          |                                                | plain    |             |              | 
 summary     | text                   |           |          |                                                | extended |             |              | 
 file_url    | character varying(255) |           |          |                                                | extended |             |              | 
Indexes:
    "inspection_reports_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 12 条

**示例数据**:
```
 id | report_date |    summary     |       file_url       
----+-------------+----------------+----------------------
  1 | 2026-04-18  | 自动巡检报告#1 | /reports/auto_01.pdf
  2 | 2026-04-15  | 自动巡检报告#2 | /reports/auto_02.pdf
  3 | 2026-04-12  | 自动巡检报告#3 | /reports/auto_03.pdf
  4 | 2026-04-09  | 自动巡检报告#4 | /reports/auto_04.pdf
  5 | 2026-04-06  | 自动巡检报告#5 | /reports/auto_05.pdf
(5 rows)

```

---

## 19. knowledge_base_links
================================================================================
```
                                                                  Table "public.knowledge_base_links"
    Column    |          Type          | Collation | Nullable |                     Default                      | Storage  | Compression | Stats target | Description 
--------------+------------------------+-----------+----------+--------------------------------------------------+----------+-------------+--------------+-------------
 id           | integer                |           | not null | nextval('knowledge_base_links_id_seq'::regclass) | plain    |             |              | 
 feature_code | character varying(20)  |           |          |                                                  | extended |             |              | 
 title        | character varying(255) |           |          |                                                  | extended |             |              | 
 url          | character varying(255) |           |          |                                                  | extended |             |              | 
Indexes:
    "knowledge_base_links_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "knowledge_base_links_feature_code_fkey" FOREIGN KEY (feature_code) REFERENCES monitoring_features(code)
Access method: heap

```

**数据量**: 11 条

**示例数据**:
```
 id | feature_code |    title     |          url          
----+--------------+--------------+-----------------------
  1 | 6.04         | 6.04处理指南 | https://kb.local/6-04
  2 | 7.01         | 7.01处理指南 | https://kb.local/7-01
  3 | 8.01         | 8.01处理指南 | https://kb.local/8-01
  4 | 1.07         | 1.07处理指南 | https://kb.local/1-07
  5 | 2.01         | 2.01处理指南 | https://kb.local/2-01
(5 rows)

```

---

## 20. maintenance_assets
================================================================================
```
                                                                   Table "public.maintenance_assets"
     Column      |          Type          | Collation | Nullable |                    Default                     | Storage  | Compression | Stats target | Description 
-----------------+------------------------+-----------+----------+------------------------------------------------+----------+-------------+--------------+-------------
 id              | integer                |           | not null | nextval('maintenance_assets_id_seq'::regclass) | plain    |             |              | 
 asset_name      | character varying(100) |           |          |                                                | extended |             |              | 
 asset_type      | character varying(100) |           |          |                                                | extended |             |              | 
 warranty_expiry | date                   |           |          |                                                | plain    |             |              | 
Indexes:
    "maintenance_assets_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 20 条

**示例数据**:
```
 id | asset_name | asset_type | warranty_expiry 
----+------------+------------+-----------------
  1 | asset-1    | AC         | 2027-07-26
  2 | asset-2    | Server     | 2028-02-24
  3 | asset-3    | Server     | 2028-10-31
  4 | asset-4    | AC         | 2027-03-04
  5 | asset-5    | Server     | 2027-11-22
(5 rows)

```

---

## 21. monitoring_features
================================================================================
```
                                                                     Table "public.monitoring_features"
    Column     |            Type             | Collation | Nullable |                     Default                     | Storage  | Compression | Stats target | Description 
---------------+-----------------------------+-----------+----------+-------------------------------------------------+----------+-------------+--------------+-------------
 id            | integer                     |           | not null | nextval('monitoring_features_id_seq'::regclass) | plain    |             |              | 
 code          | character varying(20)       |           | not null |                                                 | extended |             |              | 
 name          | character varying(255)      |           | not null |                                                 | extended |             |              | 
 description   | text                        |           |          |                                                 | extended |             |              | 
 category_code | character varying(20)       |           |          |                                                 | extended |             |              | 
 enabled       | boolean                     |           |          | true                                            | plain    |             |              | 
 status        | character varying(50)       |           |          | 'normal'::character varying                     | extended |             |              | 
 severity      | character varying(50)       |           |          | 'info'::character varying                       | extended |             |              | 
 unit          | character varying(50)       |           |          |                                                 | extended |             |              | 
 latest_value  | character varying(100)      |           |          |                                                 | extended |             |              | 
 config        | json                        |           |          |                                                 | extended |             |              | 
 updated_at    | timestamp without time zone |           |          | CURRENT_TIMESTAMP                               | plain    |             |              | 
Indexes:
    "monitoring_features_pkey" PRIMARY KEY, btree (id)
    "monitoring_features_code_key" UNIQUE CONSTRAINT, btree (code)
Foreign-key constraints:
    "monitoring_features_category_code_fkey" FOREIGN KEY (category_code) REFERENCES feature_categories(code)
Referenced by:
    TABLE "alert_rules" CONSTRAINT "alert_rules_feature_code_fkey" FOREIGN KEY (feature_code) REFERENCES monitoring_features(code)
    TABLE "alerts" CONSTRAINT "alerts_feature_code_fkey" FOREIGN KEY (feature_code) REFERENCES monitoring_features(code)
    TABLE "feature_metrics" CONSTRAINT "feature_metrics_feature_code_fkey" FOREIGN KEY (feature_code) REFERENCES monitoring_features(code)
    TABLE "knowledge_base_links" CONSTRAINT "knowledge_base_links_feature_code_fkey" FOREIGN KEY (feature_code) REFERENCES monitoring_features(code)
Access method: heap

```

**数据量**: 58 条

**示例数据**:
```
 id | code |      name      |                  description                   | category_code | enabled | status | severity |   unit   | latest_value |       config        |         updated_at         
----+------+----------------+------------------------------------------------+---------------+---------+--------+----------+----------+--------------+---------------------+----------------------------
 42 | 6.04 | 维保到期提醒   | 硬件设备维保期倒计时提醒。                     | SEC           | t       | normal | warning  | days     | 15           | {"unit":"days"}     | 2026-04-18 17:08:41.550482
 43 | 6.05 | 异常登录审计   | 监控服务器的 SSH 异常 IP 登录尝试。            | SEC           | t       | normal | warning  | times    | 2            | {"unit":"times"}    | 2026-04-18 17:08:41.550482
 44 | 7.01 | 告警收敛与降噪 | 同一故障源引发的多个告警合并发送。             | ALERT         | t       | normal | info     |          | on           | {"dedup":"enabled"} | 2026-04-18 17:08:41.550482
 45 | 7.02 | 多渠道通知     | 支持邮件、短信、钉钉、企业微信、语音电话通知。 | ALERT         | t       | normal | info     | channels | 5            | {"channels":5}      | 2026-04-18 17:08:41.550482
 46 | 7.03 | 告警升级机制   | 15分钟未处理升级通知给上级主管。               | ALERT         | t       | normal | warning  | min      | 15           | {"unit":"min"}      | 2026-04-18 17:08:41.550482
(5 rows)

```

---

## 22. network_metrics
================================================================================
```
                                                                    Table "public.network_metrics"
    Column    |            Type             | Collation | Nullable |                   Default                   | Storage  | Compression | Stats target | Description 
--------------+-----------------------------+-----------+----------+---------------------------------------------+----------+-------------+--------------+-------------
 id           | integer                     |           | not null | nextval('network_metrics_id_seq'::regclass) | plain    |             |              | 
 link_name    | character varying(100)      |           |          |                                             | extended |             |              | 
 metric_key   | character varying(100)      |           |          |                                             | extended |             |              | 
 metric_value | character varying(100)      |           |          |                                             | extended |             |              | 
 unit         | character varying(20)       |           |          |                                             | extended |             |              | 
 recorded_at  | timestamp without time zone |           |          | CURRENT_TIMESTAMP                           | plain    |             |              | 
Indexes:
    "network_metrics_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 120 条

**示例数据**:
```
 id |  link_name  | metric_key  | metric_value | unit |        recorded_at         
----+-------------+-------------+--------------+------+----------------------------
  1 | core-link-1 | throughput  | 858.9        | Mbps | 2026-04-18 07:12:09.046342
  2 | core-link-2 | packet_loss | 747.12       | Mbps | 2026-04-18 06:11:09.046342
  3 | core-link-3 | latency     | 143.68       | %    | 2026-04-18 16:03:09.046342
  4 | core-link-4 | latency     | 576.4        | Mbps | 2026-04-18 11:21:09.046342
  5 | core-link-5 | latency     | 848.53       | %    | 2026-04-18 08:19:09.046342
(5 rows)

```

---

## 23. oncall_schedules
================================================================================
```
                                                                 Table "public.oncall_schedules"
   Column   |          Type          | Collation | Nullable |                   Default                    | Storage  | Compression | Stats target | Description 
------------+------------------------+-----------+----------+----------------------------------------------+----------+-------------+--------------+-------------
 id         | integer                |           | not null | nextval('oncall_schedules_id_seq'::regclass) | plain    |             |              | 
 name       | character varying(100) |           |          |                                              | extended |             |              | 
 duty_user  | character varying(100) |           |          |                                              | extended |             |              | 
 days       | character varying(50)  |           |          |                                              | extended |             |              | 
 start_time | character varying(20)  |           |          |                                              | extended |             |              | 
 end_time   | character varying(20)  |           |          |                                              | extended |             |              | 
Indexes:
    "oncall_schedules_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 8 条

**示例数据**:
```
 id |  name   | duty_user |    days     | start_time | end_time 
----+---------+-----------+-------------+------------+----------
  1 | 值班组1 | 工程师1   | Mon-Fri     | 00:00      | 24:00
  2 | 值班组2 | 工程师2   | Tue,Thu     | 08:00      | 24:00
  3 | 值班组3 | 工程师3   | Mon-Fri     | 16:00      | 16:00
  4 | 值班组4 | 工程师4   | Mon,Wed,Fri | 16:00      | 08:00
  5 | 值班组5 | 工程师5   | Sat,Sun     | 16:00      | 24:00
(5 rows)

```

---

## 24. power_events
================================================================================
```
                                                                    Table "public.power_events"
   Column    |            Type             | Collation | Nullable |                 Default                  | Storage  | Compression | Stats target | Description 
-------------+-----------------------------+-----------+----------+------------------------------------------+----------+-------------+--------------+-------------
 id          | integer                     |           | not null | nextval('power_events_id_seq'::regclass) | plain    |             |              | 
 room_id     | character varying(50)       |           |          |                                          | extended |             |              | 
 event_type  | character varying(100)      |           |          |                                          | extended |             |              | 
 severity    | character varying(50)       |           |          |                                          | extended |             |              | 
 detail      | text                        |           |          |                                          | extended |             |              | 
 occurred_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP                        | plain    |             |              | 
Indexes:
    "power_events_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 48 条

**示例数据**:
```
 id | room_id |  event_type   | severity |      detail      |        occurred_at         
----+---------+---------------+----------+------------------+----------------------------
  1 | 201     | power_restore | warning  | 自动生成电力事件 | 2026-04-18 02:15:09.046342
  2 | 201     | voltage_sag   | warning  | 自动生成电力事件 | 2026-04-17 23:15:09.046342
  3 | 201     | power_restore | critical | 自动生成电力事件 | 2026-04-13 02:15:09.046342
  4 | 201     | voltage_sag   | warning  | 自动生成电力事件 | 2026-04-16 18:15:09.046342
  5 | 201     | power_restore | warning  | 自动生成电力事件 | 2026-04-15 03:15:09.046342
(5 rows)

```

---

## 25. resource_overview
================================================================================
```
                                                                         Table "public.resource_overview"
         Column         |            Type             | Collation | Nullable |                    Default                    | Storage | Compression | Stats target | Description 
------------------------+-----------------------------+-----------+----------+-----------------------------------------------+---------+-------------+--------------+-------------
 id                     | integer                     |           | not null | nextval('resource_overview_id_seq'::regclass) | plain   |             |              | 
 total_servers          | integer                     |           |          | 0                                             | plain   |             |              | 
 total_it_cabinet_count | integer                     |           |          | 0                                             | plain   |             |              | 
 total_enterprise_count | integer                     |           |          | 0                                             | plain   |             |              | 
 should_bill_cabinets   | integer                     |           |          | 0                                             | plain   |             |              | 
 billed_cabinets        | integer                     |           |          | 0                                             | plain   |             |              | 
 reserved_cabinets      | integer                     |           |          | 0                                             | plain   |             |              | 
 available_cabinets     | integer                     |           |          | 0                                             | plain   |             |              | 
 customer_cabinets      | integer                     |           |          | 0                                             | plain   |             |              | 
 self_use_cabinets      | integer                     |           |          | 0                                             | plain   |             |              | 
 created_at             | timestamp without time zone |           |          | CURRENT_TIMESTAMP                             | plain   |             |              | 
 updated_at             | timestamp without time zone |           |          | CURRENT_TIMESTAMP                             | plain   |             |              | 
Indexes:
    "resource_overview_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 1 条

**示例数据**:
```
 id | total_servers | total_it_cabinet_count | total_enterprise_count | should_bill_cabinets | billed_cabinets | reserved_cabinets | available_cabinets | customer_cabinets | self_use_cabinets |         created_at         |         updated_at         
----+---------------+------------------------+------------------------+----------------------+-----------------+-------------------+--------------------+-------------------+-------------------+----------------------------+----------------------------
  1 |          2400 |                   1920 |                     20 |                  420 |             385 |                35 |                480 |               385 |                95 | 2026-04-18 17:17:11.982543 | 2026-04-18 17:52:09.720831
(1 row)

```

---

## 26. room_config
================================================================================
```
                                                                     Table "public.room_config"
    Column     |            Type             | Collation | Nullable |                 Default                 | Storage  | Compression | Stats target | Description 
---------------+-----------------------------+-----------+----------+-----------------------------------------+----------+-------------+--------------+-------------
 id            | integer                     |           | not null | nextval('room_config_id_seq'::regclass) | plain    |             |              | 
 floor_id      | integer                     |           |          |                                         | plain    |             |              | 
 room_number   | integer                     |           | not null |                                         | plain    |             |              | 
 room_name     | character varying(100)      |           |          |                                         | extended |             |              | 
 shape         | character varying(50)       |           |          | 'rectangle'::character varying          | extended |             |              | 
 color         | character varying(50)       |           |          | '#6b7280'::character varying            | extended |             |              | 
 cabinet_count | integer                     |           |          | 0                                       | plain    |             |              | 
 position_x    | double precision            |           |          | 0                                       | plain    |             |              | 
 position_y    | double precision            |           |          | 0                                       | plain    |             |              | 
 position_z    | double precision            |           |          | 0                                       | plain    |             |              | 
 rotation      | double precision            |           |          | 0                                       | plain    |             |              | 
 width         | double precision            |           |          | 50                                      | plain    |             |              | 
 depth         | double precision            |           |          | 50                                      | plain    |             |              | 
 height        | double precision            |           |          | 30                                      | plain    |             |              | 
 is_enabled    | boolean                     |           |          | true                                    | plain    |             |              | 
 created_at    | timestamp without time zone |           |          | CURRENT_TIMESTAMP                       | plain    |             |              | 
 updated_at    | timestamp without time zone |           |          | CURRENT_TIMESTAMP                       | plain    |             |              | 
Indexes:
    "room_config_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "room_config_floor_id_fkey" FOREIGN KEY (floor_id) REFERENCES floor_config(id)
Referenced by:
    TABLE "cabinet_grid" CONSTRAINT "cabinet_grid_room_id_fkey" FOREIGN KEY (room_id) REFERENCES room_config(id)
    TABLE "cabinet_layout" CONSTRAINT "cabinet_layout_room_id_fkey" FOREIGN KEY (room_id) REFERENCES room_config(id)
Access method: heap

```

**数据量**: 30 条

**示例数据**:
```
 id | floor_id | room_number |  room_name  |   shape   |  color  | cabinet_count | position_x | position_y | position_z | rotation | width | depth | height | is_enabled |         created_at         |         updated_at         
----+----------+-------------+-------------+-----------+---------+---------------+------------+------------+------------+----------+-------+-------+--------+------------+----------------------------+----------------------------
  1 |        1 |           1 | 核心机房A区 | rectangle | #FF6B6B |            50 |          0 |          0 |          0 |        0 |    50 |    50 |     30 | t          | 2026-04-18 17:08:41.546521 | 2026-04-18 17:08:41.546521
  2 |        1 |           2 | 核心机房B区 | rectangle | #4ECDC4 |            40 |          0 |          0 |          0 |        0 |    50 |    50 |     30 | t          | 2026-04-18 17:08:41.546521 | 2026-04-18 17:08:41.546521
  3 |        1 |           3 | 存储机房    | rectangle | #45B7D1 |            60 |          0 |          0 |          0 |        0 |    50 |    50 |     30 | t          | 2026-04-18 17:08:41.546521 | 2026-04-18 17:08:41.546521
  4 |        1 |           4 | 网络机房    | rectangle | #96CEB4 |            30 |          0 |          0 |          0 |        0 |    50 |    50 |     30 | t          | 2026-04-18 17:08:41.546521 | 2026-04-18 17:08:41.546521
  5 |        1 |           5 | GPU计算区   | rectangle | #FFEAA7 |            70 |          0 |          0 |          0 |        0 |    50 |    50 |     30 | t          | 2026-04-18 17:08:41.546521 | 2026-04-18 17:08:41.546521
(5 rows)

```

---

## 27. room_layout_config
================================================================================
```
                                                                           Table "public.room_layout_config"
           Column           |            Type             | Collation | Nullable |                    Default                     | Storage  | Compression | Stats target | Description 
----------------------------+-----------------------------+-----------+----------+------------------------------------------------+----------+-------------+--------------+-------------
 id                         | integer                     |           | not null | nextval('room_layout_config_id_seq'::regclass) | plain    |             |              | 
 room_id                    | character varying(50)       |           | not null |                                                | extended |             |              | 
 room_name                  | character varying(100)      |           |          |                                                | extended |             |              | 
 cols                       | integer                     |           |          |                                                | plain    |             |              | 
 rows                       | integer                     |           |          |                                                | plain    |             |              | 
 max_racks                  | integer                     |           |          |                                                | plain    |             |              | 
 default_color              | character varying(50)       |           |          |                                                | extended |             |              | 
 is_clickable               | boolean                     |           |          |                                                | plain    |             |              | 
 is_hover_animation_enabled | boolean                     |           |          |                                                | plain    |             |              | 
 hover_duration             | integer                     |           |          |                                                | plain    |             |              | 
 hover_easing               | character varying(50)       |           |          |                                                | extended |             |              | 
 hover_scale                | double precision            |           |          |                                                | plain    |             |              | 
 hover_shadow_intensity     | double precision            |           |          |                                                | plain    |             |              | 
 created_at                 | timestamp without time zone |           |          |                                                | plain    |             |              | 
 updated_at                 | timestamp without time zone |           |          |                                                | plain    |             |              | 
Indexes:
    "room_layout_config_pkey" PRIMARY KEY, btree (id)
    "ix_room_layout_config_id" btree (id)
    "room_layout_config_room_id_key" UNIQUE CONSTRAINT, btree (room_id)
Access method: heap

```

**数据量**: 37 条

**示例数据**:
```
 id | room_id | room_name | cols | rows | max_racks | default_color | is_clickable | is_hover_animation_enabled | hover_duration | hover_easing | hover_scale | hover_shadow_intensity |         created_at         |         updated_at         
----+---------+-----------+------+------+-----------+---------------+--------------+----------------------------+----------------+--------------+-------------+------------------------+----------------------------+----------------------------
  1 | 1-1     | 1-1机房   |   30 |   20 |       600 | #4a4a4a       | t            | t                          |            200 | ease-out     |        1.05 |                    0.3 | 2026-04-18 17:30:20.699848 | 2026-04-18 17:30:20.699856
  8 | 3-1     | 3-1机房   |   30 |   20 |       600 | #4a4a4a       | t            | t                          |            200 | ease-out     |        1.05 |                    0.3 | 2026-04-18 17:30:20.699867 | 2026-04-18 17:30:20.699867
  9 | 3-2     | 3-2机房   |   30 |   20 |       600 | #4a4a4a       | t            | t                          |            200 | ease-out     |        1.05 |                    0.3 | 2026-04-18 17:30:20.699868 | 2026-04-18 17:30:20.699869
 10 | 3-3     | 3-3机房   |   30 |   20 |       600 | #4a4a4a       | t            | t                          |            200 | ease-out     |        1.05 |                    0.3 | 2026-04-18 17:30:20.69987  | 2026-04-18 17:30:20.69987
 11 | 3-4     | 3-4机房   |   30 |   20 |       600 | #4a4a4a       | t            | t                          |            200 | ease-out     |        1.05 |                    0.3 | 2026-04-18 17:30:20.699871 | 2026-04-18 17:30:20.699872
(5 rows)

```

---

## 28. rooms
================================================================================
```
                                                                Table "public.rooms"
   Column   |            Type             | Collation | Nullable |           Default           | Storage  | Compression | Stats target | Description 
------------+-----------------------------+-----------+----------+-----------------------------+----------+-------------+--------------+-------------
 id         | character varying(50)       |           | not null |                             | extended |             |              | 
 name       | character varying(100)      |           | not null |                             | extended |             |              | 
 location   | character varying(255)      |           |          |                             | extended |             |              | 
 cols       | integer                     |           |          | 30                          | plain    |             |              | 
 rows       | integer                     |           |          | 22                          | plain    |             |              | 
 max_racks  | integer                     |           |          |                             | plain    |             |              | 
 status     | character varying(50)       |           |          | 'active'::character varying | extended |             |              | 
 created_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP           | plain    |             |              | 
 is_enabled | boolean                     |           |          | true                        | plain    |             |              | 
Indexes:
    "rooms_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "cabinets" CONSTRAINT "cabinets_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id)
Access method: heap

```

**数据量**: 30 条

**示例数据**:
```
 id  |  name   | location | cols | rows | max_racks | status |         created_at         | is_enabled 
-----+---------+----------+------+------+-----------+--------+----------------------------+------------
 201 | 201机房 | 2楼01区  |   30 |   22 |       120 | active | 2026-04-18 17:15:09.013196 | t
 202 | 202机房 | 2楼02区  |   30 |   22 |       120 | active | 2026-04-18 17:15:09.013196 | t
 203 | 203机房 | 2楼03区  |   30 |   22 |       120 | active | 2026-04-18 17:15:09.013196 | t
 204 | 204机房 | 2楼04区  |   30 |   22 |       120 | active | 2026-04-18 17:15:09.013196 | t
 301 | 301机房 | 3楼01区  |   30 |   22 |       120 | active | 2026-04-18 17:15:09.013196 | t
(5 rows)

```

---

## 29. security_events
================================================================================
```
                                                                    Table "public.security_events"
   Column    |            Type             | Collation | Nullable |                   Default                   | Storage  | Compression | Stats target | Description 
-------------+-----------------------------+-----------+----------+---------------------------------------------+----------+-------------+--------------+-------------
 id          | integer                     |           | not null | nextval('security_events_id_seq'::regclass) | plain    |             |              | 
 event_type  | character varying(100)      |           |          |                                             | extended |             |              | 
 severity    | character varying(50)       |           |          |                                             | extended |             |              | 
 detail      | text                        |           |          |                                             | extended |             |              | 
 occurred_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP                           | plain    |             |              | 
Indexes:
    "security_events_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 30 条

**示例数据**:
```
 id |     event_type      | severity |      detail      |        occurred_at         
----+---------------------+----------+------------------+----------------------------
  1 | unauthorized_access | critical | 自动生成安防事件 | 2026-04-18 01:04:09.046342
  2 | unauthorized_access | info     | 自动生成安防事件 | 2026-04-17 20:15:09.046342
  3 | unauthorized_access | warning  | 自动生成安防事件 | 2026-04-18 07:31:09.046342
  4 | video_motion        | warning  | 自动生成安防事件 | 2026-04-17 19:25:09.046342
  5 | abnormal_login      | critical | 自动生成安防事件 | 2026-04-16 08:00:09.046342
(5 rows)

```

---

## 30. server_metrics
================================================================================
```
                                                                    Table "public.server_metrics"
    Column    |            Type             | Collation | Nullable |                  Default                   | Storage  | Compression | Stats target | Description 
--------------+-----------------------------+-----------+----------+--------------------------------------------+----------+-------------+--------------+-------------
 id           | integer                     |           | not null | nextval('server_metrics_id_seq'::regclass) | plain    |             |              | 
 server_name  | character varying(100)      |           |          |                                            | extended |             |              | 
 metric_key   | character varying(100)      |           |          |                                            | extended |             |              | 
 metric_value | character varying(100)      |           |          |                                            | extended |             |              | 
 unit         | character varying(20)       |           |          |                                            | extended |             |              | 
 recorded_at  | timestamp without time zone |           |          | CURRENT_TIMESTAMP                          | plain    |             |              | 
Indexes:
    "server_metrics_pkey" PRIMARY KEY, btree (id)
Access method: heap

```

**数据量**: 120 条

**示例数据**:
```
 id | server_name |  metric_key  | metric_value | unit |        recorded_at         
----+-------------+--------------+--------------+------+----------------------------
  1 | SRV-01      | disk_usage   | 50.8         | %    | 2026-04-18 09:49:09.046342
  2 | SRV-02      | cpu_usage    | 53.77        | %    | 2026-04-18 13:57:09.046342
  3 | SRV-03      | memory_usage | 6.81         | %    | 2026-04-18 10:47:09.046342
  4 | SRV-04      | memory_usage | 6.76         | %    | 2026-04-18 14:53:09.046342
  5 | SRV-05      | memory_usage | 67.33        | %    | 2026-04-18 09:58:09.046342
(5 rows)

```

---
