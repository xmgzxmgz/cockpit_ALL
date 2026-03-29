┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               Cockpit 系统数据库 ER 图                               │
├─────────────────────┬─────────────────────┬────────────────────────────────────────────┤
│      表名           │      关系           │                  说明                       │
├─────────────────────┼─────────────────────┼────────────────────────────────────────────┤
│ data_center_config  │ 1:N 楼层配置        │ 数据中心配置，包含名称、楼层数等基本信息     │
│                     │                     │                                          │
│ floor_config        │ N:1 数据中心        │ 楼层配置，包含楼层编号、名称、形状、尺寸等   │
│                     │ 1:N 机房配置        │                                          │
│                     │                     │                                          │
│ room_config         │ N:1 楼层配置        │ 机房配置，包含机房编号、名称、形状、颜色等   │
│                     │ 1:1 机柜布局        │                                          │
│                     │ 1:N 机柜网格        │                                          │
│                     │                     │                                          │
│ cabinet_layout      │ N:1 机房配置        │ 机柜排列配置，包含排列方式、行列数、间距等   │
│                     │                     │                                          │
│ cabinet_grid        │ N:1 机房配置        │ 机柜网格，用于鼠标框选和机柜位置管理        │
│                     │                     │                                          │
│ enterprises         │ 1:N 机柜            │ 企业信息，包含名称、联系人、颜色等          │
│                     │                     │                                          │
│ rooms               │ 1:N 机柜            │ 机房基本信息，包含ID、名称、位置、规模等     │
│                     │                     │                                          │
│ cabinets            │ N:1 企业            │ 机柜信息，包含编号、状态、所属企业和机房     │
│                     │ N:1 机房            │                                          │
│                     │                     │                                          │
│ feature_categories  │ 1:N 监控功能        │ 功能分类，如环境监控、电力管理等            │
│                     │                     │                                          │
│ monitoring_features │ N:1 功能分类        │ 监控功能模块，包含各种监控指标和状态        │
│                     │ 1:N 功能指标        │                                          │
│                     │ 1:N 告警规则        │                                          │
│                     │ 1:N 告警事件        │                                          │
│                     │ 1:N 知识库链接      │                                          │
│                     │                     │                                          │
│ feature_metrics     │ N:1 监控功能        │ 功能指标记录，存储历史监控数据             │
│                     │                     │                                          │
│ alert_rules         │ N:1 监控功能        │ 告警规则配置，定义阈值和触发条件           │
│                     │ 1:N 告警事件        │                                          │
│                     │                     │                                          │
│ alerts              │ N:1 监控功能        │ 告警事件记录，存储告警信息和状态           │
│                     │ N:1 告警规则        │                                          │
│                     │                     │                                          │
│ environment_readings│ -                   │ 环境读数，如温度、湿度等环境数据            │
│                     │                     │                                          │
│ power_events        │ -                   │ 电力事件，如电压暂降、UPS切换等            │
│                     │                     │                                          │
│ server_metrics      │ -                   │ 服务器指标，如CPU、内存、磁盘使用率等       │
│                     │                     │                                          │
│ network_metrics     │ -                   │ 网络指标，如吞吐量、延迟、丢包率等          │
│                     │                     │                                          │
│ application_metrics │ -                   │ 应用指标，如响应时间、队列深度等            │
│                     │                     │                                          │
│ security_events     │ -                   │ 安防事件，如未授权访问、视频移动等          │
│                     │                     │                                          │
│ oncall_schedules    │ -                   │ 值班排班表，记录值班人员和时间安排          │
│                     │                     │                                          │
│ inspection_reports  │ -                   │ 巡检报告，记录巡检日期、摘要和文件链接      │
│                     │                     │                                          │
│ firmware_inventory  │ -                   │ 固件版本清单，记录设备固件版本信息          │
│                     │                     │                                          │
│ maintenance_assets  │ -                   │ 维保资产，记录资产名称、类型和维保到期日    │
│                     │                     │                                          │
│ knowledge_base_links│ N:1 监控功能        │ 知识库链接，关联功能与相关文档             │
│                     │                     │                                          │
│ resource_overview   │ -                   │ 资源概览，记录服务器、机柜、企业等统计数据   │
└─────────────────────┴─────────────────────┴────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               主要表结构详细说明                                      │
├─────────────────────┬────────────────────────────────────────────────────────────────┤
│      表名           │                      关键字段                                    │
├─────────────────────┼────────────────────────────────────────────────────────────────┤
│ data_center_config  │ id, name, floor_count, created_at, updated_at                │
│ floor_config        │ id, data_center_id, floor_number, floor_name, shape, width, depth │
│ room_config         │ id, floor_id, room_number, room_name, shape, color, cabinet_count │
│ cabinet_layout      │ id, room_id, layout_type, columns, rows, spacing             │
│ cabinet_grid        │ id, room_id, grid_x, grid_y, is_occupied, cabinet_id        │
│ enterprises         │ id, name, full_name, maintainer, manager, color               │
│ rooms               │ id, name, location, cols, rows, max_racks, status            │
│ cabinets            │ id, room_id, enterprise_id, cabinet_label, status            │
│ feature_categories  │ id, code, name, description                                  │
│ monitoring_features │ id, code, name, description, category_code, status, severity  │
│ feature_metrics     │ id, feature_code, metric_key, metric_value, unit, collected_at │
│ alert_rules         │ id, feature_code, rule_name, comparator, threshold, severity  │
│ alerts              │ id, feature_code, rule_id, title, message, severity, status   │
│ environment_readings│ id, room_id, sensor_type, value, unit, recorded_at            │
│ power_events        │ id, room_id, event_type, severity, detail, occurred_at        │
│ server_metrics      │ id, server_name, metric_key, metric_value, unit, recorded_at  │
│ network_metrics     │ id, link_name, metric_key, metric_value, unit, recorded_at    │
│ application_metrics │ id, app_name, metric_key, metric_value, unit, recorded_at     │
│ security_events     │ id, event_type, severity, detail, occurred_at                 │
│ oncall_schedules    │ id, name, duty_user, days, start_time, end_time              │
│ inspection_reports  │ id, report_date, summary, file_url                           │
│ firmware_inventory  │ id, device_name, device_type, firmware_version, last_checked  │
│ maintenance_assets  │ id, asset_name, asset_type, warranty_expiry                  │
│ knowledge_base_links│ id, feature_code, title, url                                │
│ resource_overview   │ id, total_servers, total_it_cabinet_count, total_enterprise_count │
└─────────────────────┴────────────────────────────────────────────────────────────────┘