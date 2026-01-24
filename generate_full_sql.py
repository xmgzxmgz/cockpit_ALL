import random
import json
from datetime import datetime, timedelta

# --- Schema Definition ---

SCHEMA_SQL = """
-- Clean up existing tables
DROP TABLE IF EXISTS knowledge_base_links, maintenance_assets, firmware_inventory, inspection_reports, oncall_schedules, security_events, application_metrics, network_metrics, server_metrics, power_events, environment_readings, alerts, alert_rules, feature_metrics, monitoring_features, feature_categories, cabinets, rooms, enterprises CASCADE;

-- 1. 企业表 (Enterprises)
CREATE TABLE IF NOT EXISTS enterprises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- FKHNAME: 企业名称
    full_name VARCHAR(255),     -- FENAME: 企业全称
    maintainer VARCHAR(100),    -- 维护人员
    manager VARCHAR(100),       -- KHMANAGE: 客户经理
    color VARCHAR(50),          -- 企业颜色标识
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 机房表 (Rooms)
CREATE TABLE IF NOT EXISTS rooms (
    id VARCHAR(50) PRIMARY KEY, -- 机房ID (如 '201', '202')
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    cols INTEGER DEFAULT 30,    -- 3D场景列数
    rows INTEGER DEFAULT 22,    -- 3D场景行数
    max_racks INTEGER,          -- 最大机柜数
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. 机柜表 (Cabinets)
CREATE TABLE IF NOT EXISTS cabinets (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50) REFERENCES rooms(id),
    enterprise_id INTEGER REFERENCES enterprises(id),
    cabinet_label VARCHAR(50) NOT NULL, -- 机柜编号
    status VARCHAR(50) DEFAULT 'active', -- 状态
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(room_id, cabinet_label)
);

-- 4. 功能分类表 (Feature Categories)
CREATE TABLE IF NOT EXISTS feature_categories (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 5. 功能模块表 (Monitoring Features)
CREATE TABLE IF NOT EXISTS monitoring_features (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_code VARCHAR(20) REFERENCES feature_categories(code),
    enabled BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'normal',
    severity VARCHAR(50) DEFAULT 'info',
    unit VARCHAR(50),
    latest_value VARCHAR(100),
    config JSONB,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. 功能指标记录 (Feature Metrics)
CREATE TABLE IF NOT EXISTS feature_metrics (
    id SERIAL PRIMARY KEY,
    feature_code VARCHAR(20) REFERENCES monitoring_features(code),
    metric_key VARCHAR(100),
    metric_value VARCHAR(100),
    unit VARCHAR(50),
    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. 告警规则表 (Alert Rules)
CREATE TABLE IF NOT EXISTS alert_rules (
    id SERIAL PRIMARY KEY,
    feature_code VARCHAR(20) REFERENCES monitoring_features(code),
    rule_name VARCHAR(255),
    comparator VARCHAR(10),
    threshold NUMERIC,
    duration_minutes INTEGER DEFAULT 0,
    enabled BOOLEAN DEFAULT TRUE,
    severity VARCHAR(50) DEFAULT 'warning'
);

-- 8. 告警事件表 (Alerts)
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    feature_code VARCHAR(20) REFERENCES monitoring_features(code),
    rule_id INTEGER REFERENCES alert_rules(id),
    title VARCHAR(255),
    message TEXT,
    severity VARCHAR(50),
    status VARCHAR(50) DEFAULT 'active',
    triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

-- 9. 环境读数表 (Environment Readings)
CREATE TABLE IF NOT EXISTS environment_readings (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50),
    sensor_type VARCHAR(50),
    value NUMERIC,
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. 电力事件表 (Power Events)
CREATE TABLE IF NOT EXISTS power_events (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50),
    event_type VARCHAR(100),
    severity VARCHAR(50),
    detail TEXT,
    occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. 服务器指标表 (Server Metrics)
CREATE TABLE IF NOT EXISTS server_metrics (
    id SERIAL PRIMARY KEY,
    server_name VARCHAR(100),
    metric_key VARCHAR(100),
    metric_value VARCHAR(100),
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. 网络指标表 (Network Metrics)
CREATE TABLE IF NOT EXISTS network_metrics (
    id SERIAL PRIMARY KEY,
    link_name VARCHAR(100),
    metric_key VARCHAR(100),
    metric_value VARCHAR(100),
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. 应用指标表 (Application Metrics)
CREATE TABLE IF NOT EXISTS application_metrics (
    id SERIAL PRIMARY KEY,
    app_name VARCHAR(100),
    metric_key VARCHAR(100),
    metric_value VARCHAR(100),
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. 安防事件表 (Security Events)
CREATE TABLE IF NOT EXISTS security_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100),
    severity VARCHAR(50),
    detail TEXT,
    occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. 值班排班表 (Oncall Schedules)
CREATE TABLE IF NOT EXISTS oncall_schedules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    duty_user VARCHAR(100),
    days VARCHAR(50),
    start_time VARCHAR(20),
    end_time VARCHAR(20)
);

-- 16. 巡检报告表 (Inspection Reports)
CREATE TABLE IF NOT EXISTS inspection_reports (
    id SERIAL PRIMARY KEY,
    report_date DATE,
    summary TEXT,
    file_url VARCHAR(255)
);

-- 17. 固件版本表 (Firmware Inventory)
CREATE TABLE IF NOT EXISTS firmware_inventory (
    id SERIAL PRIMARY KEY,
    device_name VARCHAR(100),
    device_type VARCHAR(100),
    firmware_version VARCHAR(100),
    last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 18. 维保资产表 (Maintenance Assets)
CREATE TABLE IF NOT EXISTS maintenance_assets (
    id SERIAL PRIMARY KEY,
    asset_name VARCHAR(100),
    asset_type VARCHAR(100),
    warranty_expiry DATE
);

-- 19. 知识库链接表 (Knowledge Base Links)
CREATE TABLE IF NOT EXISTS knowledge_base_links (
    id SERIAL PRIMARY KEY,
    feature_code VARCHAR(20) REFERENCES monitoring_features(code),
    title VARCHAR(255),
    url VARCHAR(255)
);
"""

# --- Data Definitions ---

MOCK_CATEGORIES = [
    {"code": "ENV", "name": "基础环境监控", "description": "温湿度、水浸、空气质量等环境监控"},
    {"code": "POWER", "name": "电力与能源管理", "description": "PUE、UPS、能耗与断电监控"},
    {"code": "HW", "name": "服务器与硬件监控", "description": "CPU、内存、磁盘、风扇等硬件监控"},
    {"code": "NET", "name": "网络与连接", "description": "流量、丢包、证书与连通性监控"},
    {"code": "APP", "name": "应用与服务", "description": "接口性能、日志、容器与中间件监控"},
    {"code": "SEC", "name": "安防与资产", "description": "门禁、视频、资产与登录审计"},
    {"code": "ALERT", "name": "告警与通知", "description": "告警收敛、升级、通知与自愈"},
    {"code": "OPS", "name": "运维与自动化", "description": "远程控制、巡检、固件管理"},
    {"code": "CAP", "name": "容量规划", "description": "U位、电力、存储与资源回收"},
]

MOCK_FEATURES = [
    {"code": "1.01", "name": "温湿度热力图", "description": "在机房布局图上叠加实时温度/湿度热力分布层。", "category_code": "ENV", "severity": "info", "unit": "°C/%", "latest_value": "23.5/45", "config": {"type": "heatmap"}},
    {"code": "1.02", "name": "机柜进出风口温差监控", "description": "监测机柜前后门温差，评估散热效率。", "category_code": "ENV", "severity": "info", "unit": "°C", "latest_value": "6", "config": {"deltaThreshold": 10}},
    {"code": "1.03", "name": "水浸检测告警", "description": "监测精密空调或管道周围的漏水情况。", "category_code": "ENV", "severity": "critical", "unit": "次", "latest_value": "0", "config": {"sensor": "leak"}},
    {"code": "1.04", "name": "烟雾与消防联动", "description": "接入烟感信号，触发告警时自动切换大屏至火警模式。", "category_code": "ENV", "severity": "critical", "unit": "次", "latest_value": "0", "config": {"mode": "fire"}},
    {"code": "1.05", "name": "空气质量监控", "description": "PM2.5/粉尘浓度监测，防止设备积灰短路。", "category_code": "ENV", "severity": "info", "unit": "μg/m³", "latest_value": "18", "config": {"pm25": 18}},
    {"code": "1.06", "name": "精密空调状态监控", "description": "监控压缩机、风机状态及回风温度。", "category_code": "ENV", "severity": "info", "unit": "状态", "latest_value": "OK", "config": {"compressor": "on"}},
    {"code": "1.07", "name": "机房噪声监测", "description": "监控机房分贝值，判断设备异常震动。", "category_code": "ENV", "severity": "info", "unit": "dB", "latest_value": "42", "config": {"unit": "dB"}},
    {"code": "1.08", "name": "气流组织分析", "description": "可视化冷热通道气流走向。", "category_code": "ENV", "severity": "info", "unit": "状态", "latest_value": "stable", "config": {"mode": "airflow"}},
    {"code": "2.01", "name": "实时 PUE 仪表盘", "description": "实时计算并展示 Power Usage Effectiveness (PUE) 值。", "category_code": "POWER", "severity": "info", "unit": "", "latest_value": "1.38", "config": {"target": 1.5}},
    {"code": "2.02", "name": "UPS 电池健康度", "description": "监控 UPS 电池内阻、剩余容量及预计运行时长。", "category_code": "POWER", "severity": "info", "unit": "%", "latest_value": "88", "config": {"unit": "%"}},
    {"code": "2.03", "name": "机柜级能耗排名", "description": "列出 Top 10 高能耗机柜/企业。", "category_code": "POWER", "severity": "info", "unit": "榜单", "latest_value": "Top10", "config": {"ranking": "cabinets"}},
    {"code": "2.04", "name": "异常掉电检测", "description": "监测市电/UPS 切换状态，断电瞬间触发最高级别告警。", "category_code": "POWER", "severity": "critical", "unit": "次", "latest_value": "0", "config": {"switch": "normal"}},
    {"code": "2.05", "name": "电压电流波形分析", "description": "监测电压暂降、浪涌等电能质量问题。", "category_code": "POWER", "severity": "warning", "unit": "状态", "latest_value": "stable", "config": {"waveform": "normal"}},
    {"code": "2.06", "name": "智能PDU端口控制", "description": "远程控制 PDU 单个插座的开关（需硬件支持）。", "category_code": "POWER", "severity": "info", "unit": "端口", "latest_value": "24", "config": {"ports": 24}},
    {"code": "2.07", "name": "能源成本计算器", "description": "根据实时电价计算每日/月电费成本。", "category_code": "POWER", "severity": "info", "unit": "¥", "latest_value": "3200", "config": {"currency": "CNY"}},
    {"code": "2.08", "name": "碳排放统计", "description": "将能耗换算为碳排放量，支持 ESG 报告。", "category_code": "POWER", "severity": "info", "unit": "tCO2", "latest_value": "1.2", "config": {"unit": "tCO2"}},
    {"code": "3.01", "name": "CPU 温度过热告警", "description": "核心温度超过阈值（如 85°C）即时告警。", "category_code": "HW", "severity": "warning", "unit": "°C", "latest_value": "62", "config": {"threshold": 85}},
    {"code": "3.02", "name": "内存泄漏检测", "description": "长期内存占用率趋势分析，预测 OOM 风险。", "category_code": "HW", "severity": "warning", "unit": "趋势", "latest_value": "trend", "config": {"window": "7d"}},
    {"code": "3.03", "name": "磁盘 SMART 健康预测", "description": "基于 SMART 数据预测硬盘故障寿命。", "category_code": "HW", "severity": "info", "unit": "%", "latest_value": "92", "config": {"unit": "%"}},
    {"code": "3.04", "name": "RAID 状态监控", "description": "监控 RAID 阵列降级、重建进度。", "category_code": "HW", "severity": "warning", "unit": "状态", "latest_value": "healthy", "config": {"level": "RAID5"}},
    {"code": "3.05", "name": "风扇转速异常", "description": "监控服务器风扇转速，预防散热失效。", "category_code": "HW", "severity": "warning", "unit": "RPM", "latest_value": "3400", "config": {"unit": "RPM"}},
    {"code": "3.06", "name": "僵尸进程监控", "description": "发现长期占用资源的僵尸或异常进程。", "category_code": "HW", "severity": "warning", "unit": "个", "latest_value": "0", "config": {"threshold": 5}},
    {"code": "3.07", "name": "GPU 利用率监控", "description": "针对 AI/计算节点，监控 GPU 显存和算力使用率。", "category_code": "HW", "severity": "info", "unit": "%", "latest_value": "45", "config": {"unit": "%"}},
    {"code": "3.08", "name": "硬件变更审计", "description": "自动记录 CPU/内存/硬盘的拔插变更记录。", "category_code": "HW", "severity": "info", "unit": "次", "latest_value": "0", "config": {"audit": "enabled"}},
    {"code": "4.01", "name": "核心交换机流量拓扑", "description": "动态展示核心网络链路的实时流量负载。", "category_code": "NET", "severity": "info", "unit": "状态", "latest_value": "stable", "config": {"topology": "core"}},
    {"code": "4.02", "name": "异常大流量告警", "description": "突发流量峰值检测（DDoS 疑似攻击）。", "category_code": "NET", "severity": "critical", "unit": "%", "latest_value": "0", "config": {"threshold": "80%"}},
    {"code": "4.03", "name": "端口丢包率监控", "description": "监控关键链路的 CRC 错误和丢包率。", "category_code": "NET", "severity": "warning", "unit": "%", "latest_value": "0.2", "config": {"unit": "%"}},
    {"code": "4.04", "name": "光模块收发光功率", "description": "监测光纤链路衰减，预防光模块故障。", "category_code": "NET", "severity": "warning", "unit": "dBm", "latest_value": "-2.5", "config": {"unit": "dBm"}},
    {"code": "4.05", "name": "关键业务 ping 延时", "description": "持续 ping 核心网关或外网 DNS，监控网络连通性。", "category_code": "NET", "severity": "warning", "unit": "ms", "latest_value": "8", "config": {"unit": "ms"}},
    {"code": "4.06", "name": "TCP 连接数监控", "description": "监控服务器 TIME_WAIT、ESTABLISHED 连接数趋势。", "category_code": "NET", "severity": "info", "unit": "条", "latest_value": "1200", "config": {"state": "ESTABLISHED"}},
    {"code": "4.07", "name": "DNS 解析耗时", "description": "监控内部 DNS 解析响应速度。", "category_code": "NET", "severity": "warning", "unit": "ms", "latest_value": "20", "config": {"unit": "ms"}},
    {"code": "4.08", "name": "证书过期提醒", "description": "自动扫描 SSL 证书有效期，提前 30 天告警。", "category_code": "NET", "severity": "warning", "unit": "天", "latest_value": "25", "config": {"unit": "days"}},
    {"code": "5.01", "name": "数据库慢查询分析", "description": "抓取 MySQL/PG 慢查询日志并排行。", "category_code": "APP", "severity": "warning", "unit": "s", "latest_value": "2.3", "config": {"unit": "s"}},
    {"code": "5.02", "name": "接口响应时间 (RT) 监控", "description": "关键 API 接口的 P95/P99 响应耗时。", "category_code": "APP", "severity": "warning", "unit": "ms", "latest_value": "450", "config": {"unit": "ms"}},
    {"code": "5.03", "name": "HTTP 状态码分布", "description": "监控 4xx/5xx 错误比例，超过阈值告警。", "category_code": "APP", "severity": "warning", "unit": "%", "latest_value": "1.2", "config": {"unit": "%"}},
    {"code": "5.04", "name": "日志关键词告警", "description": "实时分析日志文件，匹配 Error/Exception 关键字。", "category_code": "APP", "severity": "warning", "unit": "次", "latest_value": "0", "config": {"keywords": ["Error", "Exception"]}},
    {"code": "5.05", "name": "容器健康检查", "description": "Docker 容器存活状态、重启次数监控。", "category_code": "APP", "severity": "warning", "unit": "次", "latest_value": "0", "config": {"restart": 0}},
    {"code": "5.06", "name": "中间件积压监控", "description": "Redis 队列长度、Kafka 消息堆积量监控。", "category_code": "APP", "severity": "warning", "unit": "条", "latest_value": "120", "config": {"unit": "msg"}},
    {"code": "6.01", "name": "门禁非法闯入告警", "description": "非授权时间的机房开门记录告警。", "category_code": "SEC", "severity": "critical", "unit": "次", "latest_value": "0", "config": {"policy": "office-hours"}},
    {"code": "6.02", "name": "视频监控画中画", "description": "在机房 3D 视图中集成摄像头实时画面。", "category_code": "SEC", "severity": "info", "unit": "路", "latest_value": "4", "config": {"feeds": 4}},
    {"code": "6.03", "name": "资产位置漂移", "description": "配合 RFID，当资产离开指定机柜时告警。", "category_code": "SEC", "severity": "warning", "unit": "次", "latest_value": "0", "config": {"rfid": "enabled"}},
    {"code": "6.04", "name": "维保到期提醒", "description": "硬件设备维保期倒计时提醒。", "category_code": "SEC", "severity": "warning", "unit": "天", "latest_value": "15", "config": {"unit": "days"}},
    {"code": "6.05", "name": "异常登录审计", "description": "监控服务器的 SSH 异常 IP 登录尝试。", "category_code": "SEC", "severity": "warning", "unit": "次", "latest_value": "2", "config": {"unit": "times"}},
    {"code": "7.01", "name": "告警收敛与降噪", "description": "同一故障源引发的多个告警合并发送。", "category_code": "ALERT", "severity": "info", "unit": "状态", "latest_value": "on", "config": {"dedup": "enabled"}},
    {"code": "7.02", "name": "多渠道通知", "description": "支持邮件、短信、钉钉、企业微信、语音电话通知。", "category_code": "ALERT", "severity": "info", "unit": "通道", "latest_value": "5", "config": {"channels": 5}},
    {"code": "7.03", "name": "告警升级机制", "description": "15分钟未处理升级通知给上级主管。", "category_code": "ALERT", "severity": "warning", "unit": "分钟", "latest_value": "15", "config": {"unit": "min"}},
    {"code": "7.04", "name": "值班排班表", "description": "根据排班表自动将告警发送给当值人员。", "category_code": "ALERT", "severity": "info", "unit": "状态", "latest_value": "on", "config": {"schedule": "enabled"}},
    {"code": "7.05", "name": "告警自愈脚本", "description": "触发特定告警时自动执行重启服务等脚本。", "category_code": "ALERT", "severity": "warning", "unit": "状态", "latest_value": "off", "config": {"autoheal": False}},
    {"code": "7.06", "name": "告警大屏模式", "description": "专用的红黑榜告警大屏，展示未处理的高危故障。", "category_code": "ALERT", "severity": "critical", "unit": "条", "latest_value": "3", "config": {"critical": 3}},
    {"code": "8.01", "name": "远程电源控制 (IPMI)", "description": "集成 IPMI，支持远程开关机/重启服务器。", "category_code": "OPS", "severity": "info", "unit": "状态", "latest_value": "ready", "config": {"ipmi": "enabled"}},
    {"code": "8.02", "name": "批量配置下发", "description": "同时对多台服务器执行 Shell 命令。", "category_code": "OPS", "severity": "warning", "unit": "台", "latest_value": "0", "config": {"batch": 10}},
    {"code": "8.03", "name": "自动化巡检报告", "description": "每日/周自动生成 PDF 巡检报告并发送邮件。", "category_code": "OPS", "severity": "info", "unit": "频率", "latest_value": "weekly", "config": {"frequency": "weekly"}},
    {"code": "8.04", "name": "固件版本管理", "description": "统计所有设备的固件版本，提示升级。", "category_code": "OPS", "severity": "info", "unit": "状态", "latest_value": "ok", "config": {"upgrade": "none"}},
    {"code": "8.05", "name": "知识库关联", "description": "告警时自动推荐相关的历史解决方案或 Wiki 链接。", "category_code": "OPS", "severity": "info", "unit": "条", "latest_value": "3", "config": {"links": 3}},
    {"code": "9.01", "name": "U位碎片整理", "description": "分析机柜 U 位碎片情况，推荐最佳上架位置。", "category_code": "CAP", "severity": "info", "unit": "状态", "latest_value": "ok", "config": {"fragmentation": "low"}},
    {"code": "9.02", "name": "电力容量预测", "description": "基于历史增长趋势，预测机房电力何时耗尽。", "category_code": "CAP", "severity": "warning", "unit": "天", "latest_value": "180", "config": {"unit": "days"}},
    {"code": "9.03", "name": "存储扩容建议", "description": "预测磁盘写满时间，提前给出扩容建议。", "category_code": "CAP", "severity": "warning", "unit": "天", "latest_value": "60", "config": {"unit": "days"}},
    {"code": "9.04", "name": "资源利用率“僵尸”分析", "description": "找出长期低负载（CPU<5%）的服务器以供回收。", "category_code": "CAP", "severity": "info", "unit": "台", "latest_value": "5", "config": {"unit": "servers"}},
]

COMPANY_NAMES = [
    "TechGlobal", "DataFlow", "CloudNine", "NetSphere", "CyberCore",
    "InfoWave", "SysMatrix", "WebNexus", "ByteDance", "Tencent",
    "Alibaba", "Huawei", "Baidu", "JD", "Meituan",
    "NIO", "XPeng", "LiAuto", "BYD", "Xiaomi",
    "Lenovo", "ZTE", "Hikvision", "iFlytek", "DJI",
    "SenseTime", "Megvii", "Yitu", "CloudWalk", "Horizon",
    "PonyAI", "WeRide", "Momenta", "TuSimple", "AutoX",
    "Didi", "Grab", "Uber", "Lyft", "Airbnb",
    "Google", "Amazon", "Microsoft", "Apple", "Facebook",
    "Netflix", "Tesla", "SpaceX", "Oracle", "IBM"
]

COLORS = [
    "#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3",
    "#33FFF3", "#800000", "#008000", "#000080", "#808000",
    "#800080", "#008080", "#C0C0C0", "#808080", "#9999FF",
    "#993366", "#FFFFCC", "#CCFFFF", "#660066", "#FF8080"
]

ROOMS = [
    {"id": "201", "name": "201机房", "location": "二楼东侧", "cols": 30, "rows": 22, "max_racks": 100},
    {"id": "202", "name": "202机房", "location": "二楼西侧", "cols": 30, "rows": 22, "max_racks": 100},
    {"id": "203", "name": "203机房", "location": "二楼南侧", "cols": 30, "rows": 22, "max_racks": 100},
    {"id": "204", "name": "204机房", "location": "二楼北侧", "cols": 30, "rows": 22, "max_racks": 100},
]

# --- Helper Functions ---

def escape_str(s):
    if s is None:
        return "NULL"
    if isinstance(s, bool):
        return "TRUE" if s else "FALSE"
    if isinstance(s, (int, float)):
        return str(s)
    if isinstance(s, dict):
        return "'" + json.dumps(s, ensure_ascii=False) + "'"
    return "'" + str(s).replace("'", "''") + "'"

def generate_insert(table, columns, values_list):
    if not values_list:
        return ""
    
    col_str = ", ".join(columns)
    sql = f"INSERT INTO {table} ({col_str}) VALUES \n"
    
    rows = []
    for vals in values_list:
        row_str = "(" + ", ".join(escape_str(v) for v in vals) + ")"
        rows.append(row_str)
    
    sql += ",\n".join(rows) + "\nON CONFLICT DO NOTHING;\n\n"
    return sql

# --- Generators ---

def generate_enterprises():
    ents = []
    for i, name in enumerate(COMPANY_NAMES):
        color = COLORS[i % len(COLORS)]
        ents.append([
            i + 1, # id
            name, # name
            f"{name} Technology Co., Ltd.", # full_name
            f"Maintainer {i+1}", # maintainer
            f"Manager {i+1}", # manager
            color # color
        ])
    return ents

def generate_rooms_data():
    data = []
    for r in ROOMS:
        data.append([
            r["id"], r["name"], r["location"], r["cols"], r["rows"], r["max_racks"], "active"
        ])
    return data

def generate_cabinets(enterprises):
    cabinets = []
    
    # Fill rooms with cabinets
    for room in ROOMS:
        rows = 10 # 10 rows
        cols = 10 # 10 cols per row block
        
        for r in range(rows):
            for c in range(cols):
                # Randomly assign an enterprise or leave empty (80% occupancy)
                if random.random() < 0.8:
                    ent = random.choice(enterprises)
                    ent_id = ent[0]
                    # Label like A01, A02... J10
                    row_char = chr(65 + r) # A, B, C...
                    col_num = c + 1
                    label = f"{row_char}{col_num:02d}"
                    
                    cabinets.append([
                        # id (serial, skip), room_id, enterprise_id, cabinet_label, status
                        room["id"], ent_id, label, "active"
                    ])
    return cabinets

def generate_feature_metrics():
    metrics = []
    now = datetime.now()
    
    for feature in MOCK_FEATURES:
        code = feature["code"]
        val_str = feature["latest_value"]
        unit = feature.get("unit", "")
        
        # Generate 24 hourly points
        try:
            base_val = float(val_str)
            is_numeric = True
        except:
            base_val = 0
            is_numeric = False
            
        for i in range(24):
            time_point = now - timedelta(hours=24-i)
            
            if is_numeric:
                # Add some random fluctuation
                val = base_val + (random.random() - 0.5) * (base_val * 0.1)
                val_formatted = f"{val:.2f}"
            else:
                val_formatted = val_str
            
            metrics.append([
                code, "value", val_formatted, unit, time_point.strftime("%Y-%m-%d %H:%M:%S")
            ])
            
    return metrics

def generate_alerts():
    alerts = []
    # Generate some active alerts
    active_features = random.sample(MOCK_FEATURES, 5)
    for f in active_features:
        alerts.append([
            f["code"],
            None, # rule_id
            f"{f['name']} 异常",
            f"检测到 {f['name']} 数值异常",
            f["severity"],
            "active",
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            None
        ])
    return alerts

def generate_env_readings():
    readings = []
    for room in ROOMS:
        readings.append([room["id"], "temperature", 22 + random.random() * 2, "°C", datetime.now().strftime("%Y-%m-%d %H:%M:%S")])
    return readings

def main():
    sql = SCHEMA_SQL + "\n\n"
    
    # 1. Enterprises
    ents = generate_enterprises()
    sql += generate_insert("enterprises", ["id", "name", "full_name", "maintainer", "manager", "color"], ents)
    
    # 2. Rooms
    rooms = generate_rooms_data()
    sql += generate_insert("rooms", ["id", "name", "location", "cols", "rows", "max_racks", "status"], rooms)
    
    # 3. Cabinets
    cabs = generate_cabinets(ents)
    sql += generate_insert("cabinets", ["room_id", "enterprise_id", "cabinet_label", "status"], cabs)
    
    # 4. Feature Categories
    cats = [[c["code"], c["name"], c["description"]] for c in MOCK_CATEGORIES]
    sql += generate_insert("feature_categories", ["code", "name", "description"], cats)
    
    # 5. Monitoring Features
    feats = []
    for f in MOCK_FEATURES:
        feats.append([
            f["code"], f["name"], f.get("description"), f["category_code"], 
            True, "normal", f["severity"], f.get("unit"), f.get("latest_value"), f.get("config")
        ])
    sql += generate_insert("monitoring_features", ["code", "name", "description", "category_code", "enabled", "status", "severity", "unit", "latest_value", "config"], feats)
    
    # 6. Feature Metrics
    metrics = generate_feature_metrics()
    sql += generate_insert("feature_metrics", ["feature_code", "metric_key", "metric_value", "unit", "collected_at"], metrics)
    
    # 7. Alerts
    alerts = generate_alerts()
    sql += generate_insert("alerts", ["feature_code", "rule_id", "title", "message", "severity", "status", "triggered_at", "resolved_at"], alerts)
    
    # 8. Environment Readings
    env = generate_env_readings()
    sql += generate_insert("environment_readings", ["room_id", "sensor_type", "value", "unit", "recorded_at"], env)
    
    # Print generated SQL
    print(sql)

if __name__ == "__main__":
    main()
