# ER 图数据说明

- 导出时间(UTC): 2026-03-21T14:30:52.149799+00:00
- 数据库: `cockpit_db`
- 容器: `cockpit-db`

## 表清单与行数

- `alert_rules`: 20 rows
- `alerts`: 5 rows
- `application_metrics`: 120 rows
- `cabinets`: 480 rows
- `enterprises`: 20 rows
- `environment_readings`: 120 rows
- `feature_categories`: 9 rows
- `feature_metrics`: 464 rows
- `firmware_inventory`: 20 rows
- `inspection_reports`: 12 rows
- `knowledge_base_links`: 11 rows
- `maintenance_assets`: 20 rows
- `monitoring_features`: 58 rows
- `network_metrics`: 120 rows
- `oncall_schedules`: 8 rows
- `power_events`: 48 rows
- `rooms`: 6 rows
- `security_events`: 30 rows
- `server_metrics`: 120 rows

## 外键关系

- `alert_rules.feature_code` -> `monitoring_features.code` (alert_rules_feature_code_fkey)
- `alerts.feature_code` -> `monitoring_features.code` (alerts_feature_code_fkey)
- `alerts.rule_id` -> `alert_rules.id` (alerts_rule_id_fkey)
- `cabinets.enterprise_id` -> `enterprises.id` (cabinets_enterprise_id_fkey)
- `cabinets.room_id` -> `rooms.id` (cabinets_room_id_fkey)
- `feature_metrics.feature_code` -> `monitoring_features.code` (feature_metrics_feature_code_fkey)
- `knowledge_base_links.feature_code` -> `monitoring_features.code` (knowledge_base_links_feature_code_fkey)
- `monitoring_features.category_code` -> `feature_categories.code` (monitoring_features_category_code_fkey)

## 字段明细

### `alert_rules`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('alert_rules_id_seq'::regclass)` |
| `feature_code` | `character varying` | NO | YES | `` |
| `rule_name` | `character varying` | NO | YES | `` |
| `comparator` | `character varying` | NO | YES | `` |
| `threshold` | `numeric` | NO | YES | `` |
| `duration_minutes` | `integer` | NO | YES | `0` |
| `enabled` | `boolean` | NO | YES | `true` |
| `severity` | `character varying` | NO | YES | `'warning'::character varying` |

### `alerts`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('alerts_id_seq'::regclass)` |
| `feature_code` | `character varying` | NO | YES | `` |
| `rule_id` | `integer` | NO | YES | `` |
| `title` | `character varying` | NO | YES | `` |
| `message` | `text` | NO | YES | `` |
| `severity` | `character varying` | NO | YES | `` |
| `status` | `character varying` | NO | YES | `'active'::character varying` |
| `triggered_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |
| `resolved_at` | `timestamp without time zone` | NO | YES | `` |

### `application_metrics`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('application_metrics_id_seq'::regclass)` |
| `app_name` | `character varying` | NO | YES | `` |
| `metric_key` | `character varying` | NO | YES | `` |
| `metric_value` | `character varying` | NO | YES | `` |
| `unit` | `character varying` | NO | YES | `` |
| `recorded_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `cabinets`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('cabinets_id_seq'::regclass)` |
| `room_id` | `character varying` | NO | YES | `` |
| `room_id` | `character varying` | NO | YES | `` |
| `enterprise_id` | `integer` | NO | YES | `` |
| `cabinet_label` | `character varying` | NO | NO | `` |
| `status` | `character varying` | NO | YES | `'active'::character varying` |
| `created_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `enterprises`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('enterprises_id_seq'::regclass)` |
| `name` | `character varying` | NO | NO | `` |
| `full_name` | `character varying` | NO | YES | `` |
| `maintainer` | `character varying` | NO | YES | `` |
| `manager` | `character varying` | NO | YES | `` |
| `color` | `character varying` | NO | YES | `` |
| `created_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `environment_readings`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('environment_readings_id_seq'::regclass)` |
| `room_id` | `character varying` | NO | YES | `` |
| `sensor_type` | `character varying` | NO | YES | `` |
| `value` | `numeric` | NO | YES | `` |
| `unit` | `character varying` | NO | YES | `` |
| `recorded_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `feature_categories`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('feature_categories_id_seq'::regclass)` |
| `code` | `character varying` | NO | NO | `` |
| `name` | `character varying` | NO | NO | `` |
| `description` | `text` | NO | YES | `` |

### `feature_metrics`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('feature_metrics_id_seq'::regclass)` |
| `feature_code` | `character varying` | NO | YES | `` |
| `metric_key` | `character varying` | NO | YES | `` |
| `metric_value` | `character varying` | NO | YES | `` |
| `unit` | `character varying` | NO | YES | `` |
| `collected_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `firmware_inventory`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('firmware_inventory_id_seq'::regclass)` |
| `device_name` | `character varying` | NO | YES | `` |
| `device_type` | `character varying` | NO | YES | `` |
| `firmware_version` | `character varying` | NO | YES | `` |
| `last_checked` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `inspection_reports`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('inspection_reports_id_seq'::regclass)` |
| `report_date` | `date` | NO | YES | `` |
| `summary` | `text` | NO | YES | `` |
| `file_url` | `character varying` | NO | YES | `` |

### `knowledge_base_links`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('knowledge_base_links_id_seq'::regclass)` |
| `feature_code` | `character varying` | NO | YES | `` |
| `title` | `character varying` | NO | YES | `` |
| `url` | `character varying` | NO | YES | `` |

### `maintenance_assets`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('maintenance_assets_id_seq'::regclass)` |
| `asset_name` | `character varying` | NO | YES | `` |
| `asset_type` | `character varying` | NO | YES | `` |
| `warranty_expiry` | `date` | NO | YES | `` |

### `monitoring_features`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('monitoring_features_id_seq'::regclass)` |
| `code` | `character varying` | NO | NO | `` |
| `name` | `character varying` | NO | NO | `` |
| `description` | `text` | NO | YES | `` |
| `category_code` | `character varying` | NO | YES | `` |
| `enabled` | `boolean` | NO | YES | `true` |
| `status` | `character varying` | NO | YES | `'normal'::character varying` |
| `severity` | `character varying` | NO | YES | `'info'::character varying` |
| `unit` | `character varying` | NO | YES | `` |
| `latest_value` | `character varying` | NO | YES | `` |
| `config` | `jsonb` | NO | YES | `` |
| `updated_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `network_metrics`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('network_metrics_id_seq'::regclass)` |
| `link_name` | `character varying` | NO | YES | `` |
| `metric_key` | `character varying` | NO | YES | `` |
| `metric_value` | `character varying` | NO | YES | `` |
| `unit` | `character varying` | NO | YES | `` |
| `recorded_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `oncall_schedules`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('oncall_schedules_id_seq'::regclass)` |
| `name` | `character varying` | NO | YES | `` |
| `duty_user` | `character varying` | NO | YES | `` |
| `days` | `character varying` | NO | YES | `` |
| `start_time` | `character varying` | NO | YES | `` |
| `end_time` | `character varying` | NO | YES | `` |

### `power_events`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('power_events_id_seq'::regclass)` |
| `room_id` | `character varying` | NO | YES | `` |
| `event_type` | `character varying` | NO | YES | `` |
| `severity` | `character varying` | NO | YES | `` |
| `detail` | `text` | NO | YES | `` |
| `occurred_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `rooms`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `character varying` | YES | NO | `` |
| `name` | `character varying` | NO | NO | `` |
| `location` | `character varying` | NO | YES | `` |
| `cols` | `integer` | NO | YES | `30` |
| `rows` | `integer` | NO | YES | `22` |
| `max_racks` | `integer` | NO | YES | `` |
| `status` | `character varying` | NO | YES | `'active'::character varying` |
| `created_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `security_events`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('security_events_id_seq'::regclass)` |
| `event_type` | `character varying` | NO | YES | `` |
| `severity` | `character varying` | NO | YES | `` |
| `detail` | `text` | NO | YES | `` |
| `occurred_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

### `server_metrics`

| column | type | pk | nullable | default |
|---|---|---|---|---|
| `id` | `integer` | YES | NO | `nextval('server_metrics_id_seq'::regclass)` |
| `server_name` | `character varying` | NO | YES | `` |
| `metric_key` | `character varying` | NO | YES | `` |
| `metric_value` | `character varying` | NO | YES | `` |
| `unit` | `character varying` | NO | YES | `` |
| `recorded_at` | `timestamp without time zone` | NO | YES | `CURRENT_TIMESTAMP` |

## 可直接给 Gemini 的结构化 JSON

```json
{
  "tables": [
    "alert_rules",
    "alerts",
    "application_metrics",
    "cabinets",
    "enterprises",
    "environment_readings",
    "feature_categories",
    "feature_metrics",
    "firmware_inventory",
    "inspection_reports",
    "knowledge_base_links",
    "maintenance_assets",
    "monitoring_features",
    "network_metrics",
    "oncall_schedules",
    "power_events",
    "rooms",
    "security_events",
    "server_metrics"
  ],
  "row_counts": {
    "alert_rules": 20,
    "alerts": 5,
    "application_metrics": 120,
    "cabinets": 480,
    "enterprises": 20,
    "environment_readings": 120,
    "feature_categories": 9,
    "feature_metrics": 464,
    "firmware_inventory": 20,
    "inspection_reports": 12,
    "knowledge_base_links": 11,
    "maintenance_assets": 20,
    "monitoring_features": 58,
    "network_metrics": 120,
    "oncall_schedules": 8,
    "power_events": 48,
    "rooms": 6,
    "security_events": 30,
    "server_metrics": 120
  },
  "foreign_keys": [
    {
      "constraint": "alert_rules_feature_code_fkey",
      "source_table": "alert_rules",
      "source_column": "feature_code",
      "target_table": "monitoring_features",
      "target_column": "code"
    },
    {
      "constraint": "alerts_feature_code_fkey",
      "source_table": "alerts",
      "source_column": "feature_code",
      "target_table": "monitoring_features",
      "target_column": "code"
    },
    {
      "constraint": "alerts_rule_id_fkey",
      "source_table": "alerts",
      "source_column": "rule_id",
      "target_table": "alert_rules",
      "target_column": "id"
    },
    {
      "constraint": "cabinets_enterprise_id_fkey",
      "source_table": "cabinets",
      "source_column": "enterprise_id",
      "target_table": "enterprises",
      "target_column": "id"
    },
    {
      "constraint": "cabinets_room_id_fkey",
      "source_table": "cabinets",
      "source_column": "room_id",
      "target_table": "rooms",
      "target_column": "id"
    },
    {
      "constraint": "feature_metrics_feature_code_fkey",
      "source_table": "feature_metrics",
      "source_column": "feature_code",
      "target_table": "monitoring_features",
      "target_column": "code"
    },
    {
      "constraint": "knowledge_base_links_feature_code_fkey",
      "source_table": "knowledge_base_links",
      "source_column": "feature_code",
      "target_table": "monitoring_features",
      "target_column": "code"
    },
    {
      "constraint": "monitoring_features_category_code_fkey",
      "source_table": "monitoring_features",
      "source_column": "category_code",
      "target_table": "feature_categories",
      "target_column": "code"
    }
  ],
  "columns": [
    {
      "table": "alert_rules",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('alert_rules_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "alert_rules",
      "column": "feature_code",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "alert_rules",
      "column": "rule_name",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "alert_rules",
      "column": "comparator",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "alert_rules",
      "column": "threshold",
      "data_type": "numeric",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "alert_rules",
      "column": "duration_minutes",
      "data_type": "integer",
      "nullable": "YES",
      "default": "0",
      "is_pk": "NO"
    },
    {
      "table": "alert_rules",
      "column": "enabled",
      "data_type": "boolean",
      "nullable": "YES",
      "default": "true",
      "is_pk": "NO"
    },
    {
      "table": "alert_rules",
      "column": "severity",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "'warning'::character varying",
      "is_pk": "NO"
    },
    {
      "table": "alerts",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('alerts_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "alerts",
      "column": "feature_code",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "alerts",
      "column": "rule_id",
      "data_type": "integer",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "alerts",
      "column": "title",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "alerts",
      "column": "message",
      "data_type": "text",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "alerts",
      "column": "severity",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "alerts",
      "column": "status",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "'active'::character varying",
      "is_pk": "NO"
    },
    {
      "table": "alerts",
      "column": "triggered_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "alerts",
      "column": "resolved_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "application_metrics",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('application_metrics_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "application_metrics",
      "column": "app_name",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "application_metrics",
      "column": "metric_key",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "application_metrics",
      "column": "metric_value",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "application_metrics",
      "column": "unit",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "application_metrics",
      "column": "recorded_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "cabinets",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('cabinets_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "cabinets",
      "column": "room_id",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "cabinets",
      "column": "room_id",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "cabinets",
      "column": "enterprise_id",
      "data_type": "integer",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "cabinets",
      "column": "cabinet_label",
      "data_type": "character varying",
      "nullable": "NO",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "cabinets",
      "column": "status",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "'active'::character varying",
      "is_pk": "NO"
    },
    {
      "table": "cabinets",
      "column": "created_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "enterprises",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('enterprises_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "enterprises",
      "column": "name",
      "data_type": "character varying",
      "nullable": "NO",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "enterprises",
      "column": "full_name",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "enterprises",
      "column": "maintainer",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "enterprises",
      "column": "manager",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "enterprises",
      "column": "color",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "enterprises",
      "column": "created_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "environment_readings",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('environment_readings_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "environment_readings",
      "column": "room_id",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "environment_readings",
      "column": "sensor_type",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "environment_readings",
      "column": "value",
      "data_type": "numeric",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "environment_readings",
      "column": "unit",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "environment_readings",
      "column": "recorded_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "feature_categories",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('feature_categories_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "feature_categories",
      "column": "code",
      "data_type": "character varying",
      "nullable": "NO",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "feature_categories",
      "column": "name",
      "data_type": "character varying",
      "nullable": "NO",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "feature_categories",
      "column": "description",
      "data_type": "text",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "feature_metrics",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('feature_metrics_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "feature_metrics",
      "column": "feature_code",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "feature_metrics",
      "column": "metric_key",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "feature_metrics",
      "column": "metric_value",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "feature_metrics",
      "column": "unit",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "feature_metrics",
      "column": "collected_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "firmware_inventory",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('firmware_inventory_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "firmware_inventory",
      "column": "device_name",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "firmware_inventory",
      "column": "device_type",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "firmware_inventory",
      "column": "firmware_version",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "firmware_inventory",
      "column": "last_checked",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "inspection_reports",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('inspection_reports_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "inspection_reports",
      "column": "report_date",
      "data_type": "date",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "inspection_reports",
      "column": "summary",
      "data_type": "text",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "inspection_reports",
      "column": "file_url",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "knowledge_base_links",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('knowledge_base_links_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "knowledge_base_links",
      "column": "feature_code",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "knowledge_base_links",
      "column": "title",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "knowledge_base_links",
      "column": "url",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "maintenance_assets",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('maintenance_assets_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "maintenance_assets",
      "column": "asset_name",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "maintenance_assets",
      "column": "asset_type",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "maintenance_assets",
      "column": "warranty_expiry",
      "data_type": "date",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('monitoring_features_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "monitoring_features",
      "column": "code",
      "data_type": "character varying",
      "nullable": "NO",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "name",
      "data_type": "character varying",
      "nullable": "NO",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "description",
      "data_type": "text",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "category_code",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "enabled",
      "data_type": "boolean",
      "nullable": "YES",
      "default": "true",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "status",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "'normal'::character varying",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "severity",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "'info'::character varying",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "unit",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "latest_value",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "config",
      "data_type": "jsonb",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "monitoring_features",
      "column": "updated_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "network_metrics",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('network_metrics_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "network_metrics",
      "column": "link_name",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "network_metrics",
      "column": "metric_key",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "network_metrics",
      "column": "metric_value",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "network_metrics",
      "column": "unit",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "network_metrics",
      "column": "recorded_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "oncall_schedules",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('oncall_schedules_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "oncall_schedules",
      "column": "name",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "oncall_schedules",
      "column": "duty_user",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "oncall_schedules",
      "column": "days",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "oncall_schedules",
      "column": "start_time",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "oncall_schedules",
      "column": "end_time",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "power_events",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('power_events_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "power_events",
      "column": "room_id",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "power_events",
      "column": "event_type",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "power_events",
      "column": "severity",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "power_events",
      "column": "detail",
      "data_type": "text",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "power_events",
      "column": "occurred_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "rooms",
      "column": "id",
      "data_type": "character varying",
      "nullable": "NO",
      "default": "",
      "is_pk": "YES"
    },
    {
      "table": "rooms",
      "column": "name",
      "data_type": "character varying",
      "nullable": "NO",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "rooms",
      "column": "location",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "rooms",
      "column": "cols",
      "data_type": "integer",
      "nullable": "YES",
      "default": "30",
      "is_pk": "NO"
    },
    {
      "table": "rooms",
      "column": "rows",
      "data_type": "integer",
      "nullable": "YES",
      "default": "22",
      "is_pk": "NO"
    },
    {
      "table": "rooms",
      "column": "max_racks",
      "data_type": "integer",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "rooms",
      "column": "status",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "'active'::character varying",
      "is_pk": "NO"
    },
    {
      "table": "rooms",
      "column": "created_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "security_events",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('security_events_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "security_events",
      "column": "event_type",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "security_events",
      "column": "severity",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "security_events",
      "column": "detail",
      "data_type": "text",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "security_events",
      "column": "occurred_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    },
    {
      "table": "server_metrics",
      "column": "id",
      "data_type": "integer",
      "nullable": "NO",
      "default": "nextval('server_metrics_id_seq'::regclass)",
      "is_pk": "YES"
    },
    {
      "table": "server_metrics",
      "column": "server_name",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "server_metrics",
      "column": "metric_key",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "server_metrics",
      "column": "metric_value",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "server_metrics",
      "column": "unit",
      "data_type": "character varying",
      "nullable": "YES",
      "default": "",
      "is_pk": "NO"
    },
    {
      "table": "server_metrics",
      "column": "recorded_at",
      "data_type": "timestamp without time zone",
      "nullable": "YES",
      "default": "CURRENT_TIMESTAMP",
      "is_pk": "NO"
    }
  ]
}
```
