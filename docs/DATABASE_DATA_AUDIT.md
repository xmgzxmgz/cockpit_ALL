# 数据库数据清单与建议

## 当前项目中“需要连接数据库”的数据

以下数据都已经在后端模型中定义，属于应持久化的数据：

1. 基础资源关系
- `enterprises`：企业信息
- `rooms`：机房信息
- `cabinets`：机柜信息（关联企业与机房）

2. 监控能力元数据
- `feature_categories`：监控分类
- `monitoring_features`：监控项配置/状态
- `feature_metrics`：监控指标时序数据

3. 告警体系
- `alert_rules`：告警规则
- `alerts`：告警事件
- `knowledge_base_links`：告警处置知识库链接

4. 运行观测数据
- `environment_readings`：环境传感器读数
- `power_events`：电力事件
- `server_metrics`：服务器指标
- `network_metrics`：网络指标
- `application_metrics`：应用指标
- `security_events`：安防事件

5. 运维管理数据
- `oncall_schedules`：值班排班
- `inspection_reports`：巡检报告
- `firmware_inventory`：固件版本库存
- `maintenance_assets`：维保资产

## 已创建并填充的数据库对象

- 数据库：`cockpit_db`
- 容器：`cockpit-db`
- 随机种子脚本：`backend/scripts/seed_random_data.py`
- 传输校验脚本：`scripts/test_data_flow.py`

随机数据特征：
- 固定随机种子，可复现实验数据
- 保证外键关系可用（如 `feature_code`、`room_id`、`enterprise_id`）
- 面向大屏和 API 的“关系 + 时序 + 告警”混合数据

## 本次校验结论（数据库 + API）

- 数据库连接：正常
- 后端健康接口：正常（`/health -> {"status":"ok"}`）
- 关键 API 读取：正常（概览、告警、环境、电力等）
- 数据传输链路：`PostgreSQL -> FastAPI -> JSON API` 正常

## 可进一步数据库化（建议新增）

你现在很多“设备/机柜细粒度属性”仍在接口层计算或缺少实体表，建议新增以下表：

1. 设备资产主表（强烈建议）
- `devices`：设备 SN、型号、厂商、所属机柜、上架 U 位、生命周期状态

2. 机柜容量明细
- `cabinet_capacity`：总 U 位、已用 U 位、剩余 U 位、功率容量、实时功率

3. 告警通知闭环
- `alert_notifications`：通知渠道、发送结果、重试次数、回执
- `alert_ack_logs`：告警确认人、确认时间、升级轨迹

4. 配置审计与变更记录
- `config_change_logs`：谁在什么时间修改了阈值/规则/拓扑配置

5. 前端大屏偏好与布局
- `dashboard_layouts`：用户自定义布局、筛选器、主题和可视化配置

6. 组织与权限
- `users`、`roles`、`user_roles`、`access_policies`

7. 外部系统集成映射
- `cmdb_mappings`、`ticket_mappings`、`sensor_bindings`

这些新增后，可以把“监控展示”升级为“可审计、可追踪、可协同闭环”的生产级平台。
