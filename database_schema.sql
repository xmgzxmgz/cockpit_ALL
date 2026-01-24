
-- 数据库初始化脚本
-- 创建表结构

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

-- 插入初始模拟数据 (为了演示功能)

-- 插入机房
INSERT INTO rooms (id, name, location, cols, rows, max_racks, status) VALUES 
('201', '201机房', '二楼东侧', 30, 22, 100, 'active'),
('202', '202机房', '二楼西侧', 30, 22, 100, 'active'),
('203', '203机房', '二楼南侧', 30, 22, 100, 'active'),
('204', '204机房', '二楼北侧', 30, 22, 100, 'active')
ON CONFLICT (id) DO UPDATE SET 
    cols = EXCLUDED.cols, 
    rows = EXCLUDED.rows, 
    max_racks = EXCLUDED.max_racks, 
    status = EXCLUDED.status;

-- 插入企业
INSERT INTO enterprises (name, full_name, maintainer, manager, color) VALUES 
('示例企业A', '示例企业A全称科技有限公司', '徐祺炜', '张经理', '#FF5733'),
('示例企业B', '示例企业B全称网络技术有限公司', '李运维', '王经理', '#33FF57'),
('示例企业C', '示例企业C全称数据服务有限公司', '张技术', '赵经理', '#3357FF'),
('示例企业D', '示例企业D全称云存储有限公司', '刘支持', '孙经理', '#F3FF33')
ON CONFLICT DO NOTHING;
-- 更新现有数据的颜色
UPDATE enterprises SET color = '#FF5733' WHERE name = '示例企业A' AND color IS NULL;
UPDATE enterprises SET color = '#33FF57' WHERE name = '示例企业B' AND color IS NULL;
UPDATE enterprises SET color = '#3357FF' WHERE name = '示例企业C' AND color IS NULL;
UPDATE enterprises SET color = '#F3FF33' WHERE name = '示例企业D' AND color IS NULL;


-- 插入机柜数据 (示例)
-- 201机房分配给企业A和B
INSERT INTO cabinets (room_id, enterprise_id, cabinet_label) 
SELECT '201', id, 'A01' FROM enterprises WHERE name = '示例企业A'
UNION ALL
SELECT '201', id, 'A02' FROM enterprises WHERE name = '示例企业B'
UNION ALL
SELECT '201', id, 'A03' FROM enterprises WHERE name = '示例企业A'
UNION ALL
SELECT '201', id, 'A04' FROM enterprises WHERE name = '示例企业B'
ON CONFLICT DO NOTHING;

-- 202机房分配给企业C
INSERT INTO cabinets (room_id, enterprise_id, cabinet_label)
SELECT '202', id, 'B01' FROM enterprises WHERE name = '示例企业C'
UNION ALL
SELECT '202', id, 'B02' FROM enterprises WHERE name = '示例企业C'
ON CONFLICT DO NOTHING;

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

-- 插入功能分类数据
INSERT INTO feature_categories (code, name, description) VALUES
('ENV', '基础环境监控', '温湿度、水浸、空气质量等环境监控'),
('POWER', '电力与能源管理', 'PUE、UPS、能耗与断电监控'),
('HW', '服务器与硬件监控', 'CPU、内存、磁盘、风扇等硬件监控'),
('NET', '网络与连接', '流量、丢包、证书与连通性监控'),
('APP', '应用与服务', '接口性能、日志、容器与中间件监控'),
('SEC', '安防与资产', '门禁、视频、资产与登录审计'),
('ALERT', '告警与通知', '告警收敛、升级、通知与自愈'),
('OPS', '运维与自动化', '远程控制、巡检、固件管理'),
('CAP', '容量规划', 'U位、电力、存储与资源回收')
ON CONFLICT (code) DO NOTHING;

-- 插入功能模块数据（包含全部 50+ 项）
INSERT INTO monitoring_features (code, name, description, category_code, enabled, status, severity, unit, latest_value, config) VALUES
('1.01', '温湿度热力图', '在机房布局图上叠加实时温度/湿度热力分布层。', 'ENV', TRUE, 'normal', 'info', '°C/%', '23.5/45', '{"type":"heatmap"}'),
('1.02', '机柜进出风口温差监控', '监测机柜前后门温差，评估散热效率。', 'ENV', TRUE, 'normal', 'info', '°C', '6', '{"deltaThreshold":10}'),
('1.03', '水浸检测告警', '监测精密空调或管道周围的漏水情况。', 'ENV', TRUE, 'warning', 'warning', NULL, '0', '{"sensor":"leak"}'),
('1.04', '烟雾与消防联动', '接入烟感信号，触发告警时自动切换大屏至火警模式。', 'ENV', TRUE, 'normal', 'critical', NULL, '0', '{"mode":"fire"}'),
('1.05', '空气质量监控', 'PM2.5/粉尘浓度监测，防止设备积灰短路。', 'ENV', TRUE, 'normal', 'info', 'µg/m³', '18', '{"pm25":18}'),
('1.06', '精密空调状态监控', '监控压缩机、风机状态及回风温度。', 'ENV', TRUE, 'normal', 'info', NULL, 'OK', '{"compressor":"on"}'),
('1.07', '机房噪声监测', '监控机房分贝值，判断设备异常震动。', 'ENV', TRUE, 'normal', 'info', 'dB', '42', '{"unit":"dB"}'),
('1.08', '气流组织分析', '可视化冷热通道气流走向。', 'ENV', TRUE, 'normal', 'info', NULL, 'stable', '{"mode":"airflow"}'),

('2.01', '实时 PUE 仪表盘', '实时计算并展示 Power Usage Effectiveness (PUE) 值。', 'POWER', TRUE, 'normal', 'info', NULL, '1.38', '{"target":1.5}'),
('2.02', 'UPS 电池健康度', '监控 UPS 电池内阻、剩余容量及预计运行时长。', 'POWER', TRUE, 'normal', 'info', '%', '88', '{"unit":"%"}'),
('2.03', '机柜级能耗排名', '列出 Top 10 高能耗机柜/企业。', 'POWER', TRUE, 'normal', 'info', NULL, 'Top10', '{"ranking":"cabinets"}'),
('2.04', '异常掉电检测', '监测市电/UPS 切换状态，断电瞬间触发最高级别告警。', 'POWER', TRUE, 'normal', 'critical', NULL, '0', '{"switch":"normal"}'),
('2.05', '电压电流波形分析', '监测电压暂降、浪涌等电能质量问题。', 'POWER', TRUE, 'normal', 'warning', NULL, 'stable', '{"waveform":"normal"}'),
('2.06', '智能PDU端口控制', '远程控制 PDU 单个插座的开关（需硬件支持）。', 'POWER', TRUE, 'normal', 'info', NULL, 'enabled', '{"ports":24}'),
('2.07', '能源成本计算器', '根据实时电价计算每日/月电费成本。', 'POWER', TRUE, 'normal', 'info', 'CNY', '￥3200', '{"currency":"CNY"}'),
('2.08', '碳排放统计', '将能耗换算为碳排放量，支持 ESG 报告。', 'POWER', TRUE, 'normal', 'info', 'tCO2', '1.2t', '{"unit":"tCO2"}'),

('3.01', 'CPU 温度过热告警', '核心温度超过阈值（如 85°C）即时告警。', 'HW', TRUE, 'normal', 'warning', '°C', '62', '{"threshold":85}'),
('3.02', '内存泄漏检测', '长期内存占用率趋势分析，预测 OOM 风险。', 'HW', TRUE, 'normal', 'warning', NULL, 'trend', '{"window":"7d"}'),
('3.03', '磁盘 SMART 健康预测', '基于 SMART 数据预测硬盘故障寿命。', 'HW', TRUE, 'normal', 'info', '%', '92', '{"unit":"%"}'),
('3.04', 'RAID 状态监控', '监控 RAID 阵列降级、重建进度。', 'HW', TRUE, 'normal', 'warning', NULL, 'healthy', '{"level":"RAID5"}'),
('3.05', '风扇转速异常', '监控服务器风扇转速，预防散热失效。', 'HW', TRUE, 'normal', 'warning', 'RPM', '3400', '{"unit":"RPM"}'),
('3.06', '僵尸进程监控', '发现长期占用资源的僵尸或异常进程。', 'HW', TRUE, 'normal', 'warning', 'count', '0', '{"threshold":5}'),
('3.07', 'GPU 利用率监控', '针对 AI/计算节点，监控 GPU 显存和算力使用率。', 'HW', TRUE, 'normal', 'info', '%', '45', '{"unit":"%"}'),
('3.08', '硬件变更审计', '自动记录 CPU/内存/硬盘的拔插变更记录。', 'HW', TRUE, 'normal', 'info', 'count', '0', '{"audit":"enabled"}'),

('4.01', '核心交换机流量拓扑', '动态展示核心网络链路的实时流量负载。', 'NET', TRUE, 'normal', 'info', NULL, 'stable', '{"topology":"core"}'),
('4.02', '异常大流量告警', '突发流量峰值检测（DDoS 疑似攻击）。', 'NET', TRUE, 'normal', 'critical', 'Mbps', '0', '{"threshold":"80%"}'),
('4.03', '端口丢包率监控', '监控关键链路的 CRC 错误和丢包率。', 'NET', TRUE, 'normal', 'warning', '%', '0.2', '{"unit":"%"}'),
('4.04', '光模块收发光功率', '监测光纤链路衰减，预防光模块故障。', 'NET', TRUE, 'normal', 'warning', 'dBm', '-2.5', '{"unit":"dBm"}'),
('4.05', '关键业务 ping 延时', '持续 ping 核心网关或外网 DNS，监控网络连通性。', 'NET', TRUE, 'normal', 'warning', 'ms', '8', '{"unit":"ms"}'),
('4.06', 'TCP 连接数监控', '监控服务器 TIME_WAIT、ESTABLISHED 连接数趋势。', 'NET', TRUE, 'normal', 'info', 'count', '1200', '{"state":"ESTABLISHED"}'),
('4.07', 'DNS 解析耗时', '监控内部 DNS 解析响应速度。', 'NET', TRUE, 'normal', 'warning', 'ms', '20', '{"unit":"ms"}'),
('4.08', '证书过期提醒', '自动扫描 SSL 证书有效期，提前 30 天告警。', 'NET', TRUE, 'normal', 'warning', 'days', '25', '{"unit":"days"}'),

('5.01', '数据库慢查询分析', '抓取 MySQL/PG 慢查询日志并排行。', 'APP', TRUE, 'normal', 'warning', 's', '2.3', '{"unit":"s"}'),
('5.02', '接口响应时间 (RT) 监控', '关键 API 接口的 P95/P99 响应耗时。', 'APP', TRUE, 'normal', 'warning', 'ms', '450', '{"unit":"ms"}'),
('5.03', 'HTTP 状态码分布', '监控 4xx/5xx 错误比例，超过阈值告警。', 'APP', TRUE, 'normal', 'warning', '%', '1.2', '{"unit":"%"}'),
('5.04', '日志关键词告警', '实时分析日志文件，匹配 "Error/Exception" 关键字。', 'APP', TRUE, 'normal', 'warning', 'count', '0', '{"keywords":["Error","Exception"]}'),
('5.05', '容器健康检查', 'Docker 容器存活状态、重启次数监控。', 'APP', TRUE, 'normal', 'warning', 'count', '0', '{"restart":0}'),
('5.06', '中间件积压监控', 'Redis 队列长度、Kafka 消息堆积量监控。', 'APP', TRUE, 'normal', 'warning', 'msg', '120', '{"unit":"msg"}'),

('6.01', '门禁非法闯入告警', '非授权时间的机房开门记录告警。', 'SEC', TRUE, 'normal', 'critical', 'count', '0', '{"policy":"office-hours"}'),
('6.02', '视频监控画中画', '在机房 3D 视图中集成摄像头实时画面。', 'SEC', TRUE, 'normal', 'info', NULL, 'online', '{"feeds":4}'),
('6.03', '资产位置漂移', '配合 RFID，当资产离开指定机柜时告警。', 'SEC', TRUE, 'normal', 'warning', 'count', '0', '{"rfid":"enabled"}'),
('6.04', '维保到期提醒', '硬件设备维保期倒计时提醒。', 'SEC', TRUE, 'normal', 'warning', 'days', '15', '{"unit":"days"}'),
('6.05', '异常登录审计', '监控服务器的 SSH 异常 IP 登录尝试。', 'SEC', TRUE, 'normal', 'warning', 'times', '2', '{"unit":"times"}'),

('7.01', '告警收敛与降噪', '同一故障源引发的多个告警合并发送。', 'ALERT', TRUE, 'normal', 'info', NULL, 'on', '{"dedup":"enabled"}'),
('7.02', '多渠道通知', '支持邮件、短信、钉钉、企业微信、语音电话通知。', 'ALERT', TRUE, 'normal', 'info', 'channels', '5', '{"channels":5}'),
('7.03', '告警升级机制', '15分钟未处理升级通知给上级主管。', 'ALERT', TRUE, 'normal', 'warning', 'min', '15', '{"unit":"min"}'),
('7.04', '值班排班表', '根据排班表自动将告警发送给当值人员。', 'ALERT', TRUE, 'normal', 'info', NULL, 'on', '{"schedule":"enabled"}'),
('7.05', '告警自愈脚本', '触发特定告警时自动执行重启服务等脚本。', 'ALERT', TRUE, 'normal', 'warning', NULL, 'off', '{"autoheal":false}'),
('7.06', '告警大屏模式', '专用的红黑榜告警大屏，展示未处理的高危故障。', 'ALERT', TRUE, 'normal', 'critical', 'count', '3', '{"critical":3}'),

('8.01', '远程电源控制 (IPMI)', '集成 IPMI，支持远程开关机/重启服务器。', 'OPS', TRUE, 'normal', 'info', NULL, 'ready', '{"ipmi":"enabled"}'),
('8.02', '批量配置下发', '同时对多台服务器执行 Shell 命令。', 'OPS', TRUE, 'normal', 'warning', NULL, '0', '{"batch":10}'),
('8.03', '自动化巡检报告', '每日/周自动生成 PDF 巡检报告并发送邮件。', 'OPS', TRUE, 'normal', 'info', NULL, 'weekly', '{"frequency":"weekly"}'),
('8.04', '固件版本管理', '统计所有设备的固件版本，提示升级。', 'OPS', TRUE, 'normal', 'info', NULL, 'ok', '{"upgrade":"none"}'),
('8.05', '知识库关联', '告警时自动推荐相关的历史解决方案或 Wiki 链接。', 'OPS', TRUE, 'normal', 'info', 'links', 'linked', '{"links":3}'),

('9.01', 'U位碎片整理', '分析机柜 U 位碎片情况，推荐最佳上架位置。', 'CAP', TRUE, 'normal', 'info', NULL, 'ok', '{"fragmentation":"low"}'),
('9.02', '电力容量预测', '基于历史增长趋势，预测机房电力何时耗尽。', 'CAP', TRUE, 'normal', 'warning', 'days', '180', '{"unit":"days"}'),
('9.03', '存储扩容建议', '预测磁盘写满时间，提前给出扩容建议。', 'CAP', TRUE, 'normal', 'warning', 'days', '60', '{"unit":"days"}'),
('9.04', '资源利用率“僵尸”分析', '找出长期低负载（CPU<5%）的服务器以供回收。', 'CAP', TRUE, 'normal', 'info', 'servers', '5', '{"unit":"servers"}')
ON CONFLICT (code) DO NOTHING;

-- 初始化告警规则（部分示例）
INSERT INTO alert_rules (feature_code, rule_name, comparator, threshold, duration_minutes, enabled, severity) VALUES
('1.03', '水浸检测告警', '>', 0, 0, TRUE, 'critical'),
('2.04', '异常掉电告警', '>', 0, 0, TRUE, 'critical'),
('3.01', 'CPU 温度过热', '>', 85, 5, TRUE, 'warning'),
('4.02', '异常大流量', '>', 80, 5, TRUE, 'critical'),
('5.03', 'HTTP 错误比例', '>', 3, 10, TRUE, 'warning'),
('6.01', '门禁非法闯入', '>', 0, 0, TRUE, 'critical')
ON CONFLICT DO NOTHING;

-- 初始化告警事件（示例）
INSERT INTO alerts (feature_code, title, message, severity, status) VALUES
('2.04', '机房异常掉电', '检测到 UPS 切换异常，已触发断电告警。', 'critical', 'active'),
('3.01', 'CPU 温度过高', '服务器 CPU 温度达到 88°C，超过阈值。', 'warning', 'active')
ON CONFLICT DO NOTHING;

-- 插入全面模拟数据

-- 6. 功能指标记录 (Feature Metrics) - 为图表提供数据
INSERT INTO feature_metrics (feature_code, metric_key, metric_value, unit, collected_at) VALUES
('1.01', 'temperature', '24.5', '°C', NOW() - INTERVAL '1 hour'),
('1.01', 'temperature', '25.1', '°C', NOW() - INTERVAL '30 minutes'),
('1.01', 'temperature', '23.8', '°C', NOW()),
('1.01', 'humidity', '45', '%', NOW() - INTERVAL '1 hour'),
('1.01', 'humidity', '48', '%', NOW()),

('2.01', 'pue', '1.45', '', NOW() - INTERVAL '4 hour'),
('2.01', 'pue', '1.42', '', NOW() - INTERVAL '3 hour'),
('2.01', 'pue', '1.39', '', NOW() - INTERVAL '2 hour'),
('2.01', 'pue', '1.38', '', NOW() - INTERVAL '1 hour'),
('2.01', 'pue', '1.35', '', NOW()),

('3.01', 'cpu_temp', '55', '°C', NOW() - INTERVAL '2 hour'),
('3.01', 'cpu_temp', '62', '°C', NOW() - INTERVAL '1 hour'),
('3.01', 'cpu_temp', '58', '°C', NOW()),

('4.01', 'traffic_in', '450', 'Mbps', NOW() - INTERVAL '1 hour'),
('4.01', 'traffic_in', '890', 'Mbps', NOW()),
('4.01', 'traffic_out', '320', 'Mbps', NOW() - INTERVAL '1 hour'),
('4.01', 'traffic_out', '650', 'Mbps', NOW());

-- 9. 环境读数 (Environment Readings)
INSERT INTO environment_readings (room_id, sensor_type, value, unit, recorded_at) VALUES
('201', 'temperature', 23.5, '°C', NOW()),
('201', 'humidity', 45.0, '%', NOW()),
('202', 'temperature', 22.8, '°C', NOW()),
('202', 'humidity', 42.5, '%', NOW()),
('203', 'temperature', 24.1, '°C', NOW()),
('203', 'humidity', 48.2, '%', NOW());

-- 10. 电力事件 (Power Events)
INSERT INTO power_events (room_id, event_type, severity, detail, occurred_at) VALUES
('201', 'voltage_sag', 'warning', '监测到短暂电压暂降', NOW() - INTERVAL '2 days'),
('203', 'ups_switch', 'info', 'UPS例行自检切换', NOW() - INTERVAL '5 days');

-- 11. 服务器指标 (Server Metrics)
INSERT INTO server_metrics (server_name, metric_key, metric_value, unit, recorded_at) VALUES
('SRV-A01-01', 'cpu_usage', '45', '%', NOW()),
('SRV-A01-01', 'memory_usage', '62', '%', NOW()),
('SRV-A01-01', 'disk_usage', '78', '%', NOW()),
('SRV-B02-05', 'cpu_usage', '89', '%', NOW()), -- High load
('SRV-B02-05', 'memory_usage', '91', '%', NOW());

-- 12. 网络指标 (Network Metrics)
INSERT INTO network_metrics (link_name, metric_key, metric_value, unit, recorded_at) VALUES
('Core-Switch-A', 'throughput', '8.5', 'Gbps', NOW()),
('Core-Switch-A', 'latency', '2', 'ms', NOW()),
('Edge-Router-1', 'packet_loss', '0.01', '%', NOW());

-- 13. 应用指标 (Application Metrics)
INSERT INTO application_metrics (app_name, metric_key, metric_value, unit, recorded_at) VALUES
('Billing-Service', 'response_time', '120', 'ms', NOW()),
('Auth-Service', 'response_time', '45', 'ms', NOW()),
('Data-Pipeline', 'queue_depth', '5400', 'msg', NOW());

-- 14. 安防事件 (Security Events)
INSERT INTO security_events (event_type, severity, detail, occurred_at) VALUES
('unauthorized_access', 'critical', '门禁系统检测到未授权卡片尝试进入204机房', NOW() - INTERVAL '1 hour'),
('video_motion', 'info', '201机房G区检测到人员移动', NOW() - INTERVAL '15 minutes');

-- 15. 值班排班 (Oncall Schedules)
INSERT INTO oncall_schedules (name, duty_user, days, start_time, end_time) VALUES
('早班', '张三', 'Mon,Tue,Wed,Thu,Fri', '08:00', '16:00'),
('中班', '李四', 'Mon,Tue,Wed,Thu,Fri', '16:00', '24:00'),
('晚班', '王五', 'Mon,Tue,Wed,Thu,Fri', '00:00', '08:00'),
('周末班', '赵六', 'Sat,Sun', '09:00', '21:00');

-- 16. 巡检报告 (Inspection Reports)
INSERT INTO inspection_reports (report_date, summary, file_url) VALUES
(NOW() - INTERVAL '1 day', '2023年10月23日例行巡检，发现202机房空调异响，已报修。', '/reports/20231023.pdf'),
(NOW() - INTERVAL '7 days', '周度巡检报告，所有设备运行正常。', '/reports/20231016.pdf');

-- 17. 固件版本 (Firmware Inventory)
INSERT INTO firmware_inventory (device_name, device_type, firmware_version, last_checked) VALUES
('Core-Switch-01', 'Switch', 'v12.4.3', NOW()),
('UPS-Main-A', 'UPS', 'v2.1.0', NOW()),
('PDU-201-A01', 'PDU', 'v1.5.2', NOW());

-- 18. 维保资产 (Maintenance Assets)
INSERT INTO maintenance_assets (asset_name, asset_type, warranty_expiry) VALUES
('Dell PowerEdge R740', 'Server', '2026-12-31'),
('Cisco Catalyst 9500', 'Switch', '2025-06-30'),
('Emerson Liebert PEX', 'AC', '2024-10-15');

-- 19. 知识库链接 (Knowledge Base Links)
INSERT INTO knowledge_base_links (feature_code, title, url) VALUES
('2.04', 'UPS故障处理SOP', 'http://wiki.company.com/ops/ups-sop'),
('4.02', 'DDoS攻击应急预案', 'http://wiki.company.com/security/ddos-plan'),
('3.01', '服务器过热排查指南', 'http://wiki.company.com/ops/server-heat');
