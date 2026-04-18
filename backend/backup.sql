PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE enterprises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- FKHNAME: 企业名称
    full_name VARCHAR(255),     -- FENAME: 企业全称
    maintainer VARCHAR(100),    -- 维护人员
    manager VARCHAR(100),       -- KHMANAGE: 客户经理
    color VARCHAR(50),          -- 企业颜色标识
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO enterprises VALUES(NULL,'示例企业A','示例企业A全称科技有限公司','徐祺炜','张经理','#FF5733','2026-04-18 08:29:42');
INSERT INTO enterprises VALUES(NULL,'示例企业B','示例企业B全称网络技术有限公司','李运维','王经理','#33FF57','2026-04-18 08:29:42');
INSERT INTO enterprises VALUES(NULL,'示例企业C','示例企业C全称数据服务有限公司','张技术','赵经理','#3357FF','2026-04-18 08:29:42');
INSERT INTO enterprises VALUES(NULL,'示例企业D','示例企业D全称云存储有限公司','刘支持','孙经理','#F3FF33','2026-04-18 08:29:42');
INSERT INTO enterprises VALUES(NULL,'示例企业A','示例企业A全称科技有限公司','徐祺炜','张经理','#FF5733','2026-04-18 08:33:04');
INSERT INTO enterprises VALUES(NULL,'示例企业B','示例企业B全称网络技术有限公司','李运维','王经理','#33FF57','2026-04-18 08:33:04');
INSERT INTO enterprises VALUES(NULL,'示例企业C','示例企业C全称数据服务有限公司','张技术','赵经理','#3357FF','2026-04-18 08:33:04');
INSERT INTO enterprises VALUES(NULL,'示例企业D','示例企业D全称云存储有限公司','刘支持','孙经理','#F3FF33','2026-04-18 08:33:04');
CREATE TABLE rooms (
    id VARCHAR(50) PRIMARY KEY, -- 机房ID (如 '201', '202')
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    cols INTEGER DEFAULT 30,    -- 3D场景列数
    rows INTEGER DEFAULT 22,    -- 3D场景行数
    max_racks INTEGER,          -- 最大机柜数
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
, is_enabled BOOLEAN DEFAULT TRUE);
INSERT INTO rooms VALUES('201','201机房','二楼东侧',30,22,100,'active','2026-04-18 08:29:42',1);
INSERT INTO rooms VALUES('202','202机房','二楼西侧',30,22,100,'active','2026-04-18 08:29:42',1);
INSERT INTO rooms VALUES('203','203机房','二楼南侧',30,22,100,'active','2026-04-18 08:29:42',1);
INSERT INTO rooms VALUES('204','204机房','二楼北侧',30,22,100,'active','2026-04-18 08:29:42',1);
CREATE TABLE cabinets (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50) REFERENCES rooms(id),
    enterprise_id INTEGER REFERENCES enterprises(id),
    cabinet_label VARCHAR(50) NOT NULL, -- 机柜编号
    status VARCHAR(50) DEFAULT 'active', -- 状态
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(room_id, cabinet_label)
);
INSERT INTO cabinets VALUES(NULL,'201',NULL,'A01','active','2026-04-18 08:29:42');
INSERT INTO cabinets VALUES(NULL,'201',NULL,'A02','active','2026-04-18 08:29:42');
INSERT INTO cabinets VALUES(NULL,'201',NULL,'A03','active','2026-04-18 08:29:42');
INSERT INTO cabinets VALUES(NULL,'201',NULL,'A04','active','2026-04-18 08:29:42');
INSERT INTO cabinets VALUES(NULL,'202',NULL,'B01','active','2026-04-18 08:29:42');
INSERT INTO cabinets VALUES(NULL,'202',NULL,'B02','active','2026-04-18 08:29:42');
CREATE TABLE feature_categories (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT
);
INSERT INTO feature_categories VALUES(NULL,'ENV','基础环境监控','温湿度、水浸、空气质量等环境监控');
INSERT INTO feature_categories VALUES(NULL,'POWER','电力与能源管理','PUE、UPS、能耗与断电监控');
INSERT INTO feature_categories VALUES(NULL,'HW','服务器与硬件监控','CPU、内存、磁盘、风扇等硬件监控');
INSERT INTO feature_categories VALUES(NULL,'NET','网络与连接','流量、丢包、证书与连通性监控');
INSERT INTO feature_categories VALUES(NULL,'APP','应用与服务','接口性能、日志、容器与中间件监控');
INSERT INTO feature_categories VALUES(NULL,'SEC','安防与资产','门禁、视频、资产与登录审计');
INSERT INTO feature_categories VALUES(NULL,'ALERT','告警与通知','告警收敛、升级、通知与自愈');
INSERT INTO feature_categories VALUES(NULL,'OPS','运维与自动化','远程控制、巡检、固件管理');
INSERT INTO feature_categories VALUES(NULL,'CAP','容量规划','U位、电力、存储与资源回收');
CREATE TABLE monitoring_features (
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
INSERT INTO monitoring_features VALUES(NULL,'1.01','温湿度热力图','在机房布局图上叠加实时温度/湿度热力分布层。','ENV',1,'normal','info','°C/%','23.5/45','{"type":"heatmap"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'1.02','机柜进出风口温差监控','监测机柜前后门温差，评估散热效率。','ENV',1,'normal','info','°C','6','{"deltaThreshold":10}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'1.03','水浸检测告警','监测精密空调或管道周围的漏水情况。','ENV',1,'warning','warning',NULL,'0','{"sensor":"leak"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'1.04','烟雾与消防联动','接入烟感信号，触发告警时自动切换大屏至火警模式。','ENV',1,'normal','critical',NULL,'0','{"mode":"fire"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'1.05','空气质量监控','PM2.5/粉尘浓度监测，防止设备积灰短路。','ENV',1,'normal','info','µg/m³','18','{"pm25":18}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'1.06','精密空调状态监控','监控压缩机、风机状态及回风温度。','ENV',1,'normal','info',NULL,'OK','{"compressor":"on"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'1.07','机房噪声监测','监控机房分贝值，判断设备异常震动。','ENV',1,'normal','info','dB','42','{"unit":"dB"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'1.08','气流组织分析','可视化冷热通道气流走向。','ENV',1,'normal','info',NULL,'stable','{"mode":"airflow"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'2.01','实时 PUE 仪表盘','实时计算并展示 Power Usage Effectiveness (PUE) 值。','POWER',1,'normal','info',NULL,'1.38','{"target":1.5}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'2.02','UPS 电池健康度','监控 UPS 电池内阻、剩余容量及预计运行时长。','POWER',1,'normal','info','%','88','{"unit":"%"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'2.03','机柜级能耗排名','列出 Top 10 高能耗机柜/企业。','POWER',1,'normal','info',NULL,'Top10','{"ranking":"cabinets"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'2.04','异常掉电检测','监测市电/UPS 切换状态，断电瞬间触发最高级别告警。','POWER',1,'normal','critical',NULL,'0','{"switch":"normal"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'2.05','电压电流波形分析','监测电压暂降、浪涌等电能质量问题。','POWER',1,'normal','warning',NULL,'stable','{"waveform":"normal"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'2.06','智能PDU端口控制','远程控制 PDU 单个插座的开关（需硬件支持）。','POWER',1,'normal','info',NULL,'enabled','{"ports":24}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'2.07','能源成本计算器','根据实时电价计算每日/月电费成本。','POWER',1,'normal','info','CNY','￥3200','{"currency":"CNY"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'2.08','碳排放统计','将能耗换算为碳排放量，支持 ESG 报告。','POWER',1,'normal','info','tCO2','1.2t','{"unit":"tCO2"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'3.01','CPU 温度过热告警','核心温度超过阈值（如 85°C）即时告警。','HW',1,'normal','warning','°C','62','{"threshold":85}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'3.02','内存泄漏检测','长期内存占用率趋势分析，预测 OOM 风险。','HW',1,'normal','warning',NULL,'trend','{"window":"7d"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'3.03','磁盘 SMART 健康预测','基于 SMART 数据预测硬盘故障寿命。','HW',1,'normal','info','%','92','{"unit":"%"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'3.04','RAID 状态监控','监控 RAID 阵列降级、重建进度。','HW',1,'normal','warning',NULL,'healthy','{"level":"RAID5"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'3.05','风扇转速异常','监控服务器风扇转速，预防散热失效。','HW',1,'normal','warning','RPM','3400','{"unit":"RPM"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'3.06','僵尸进程监控','发现长期占用资源的僵尸或异常进程。','HW',1,'normal','warning','count','0','{"threshold":5}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'3.07','GPU 利用率监控','针对 AI/计算节点，监控 GPU 显存和算力使用率。','HW',1,'normal','info','%','45','{"unit":"%"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'3.08','硬件变更审计','自动记录 CPU/内存/硬盘的拔插变更记录。','HW',1,'normal','info','count','0','{"audit":"enabled"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'4.01','核心交换机流量拓扑','动态展示核心网络链路的实时流量负载。','NET',1,'normal','info',NULL,'stable','{"topology":"core"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'4.02','异常大流量告警','突发流量峰值检测（DDoS 疑似攻击）。','NET',1,'normal','critical','Mbps','0','{"threshold":"80%"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'4.03','端口丢包率监控','监控关键链路的 CRC 错误和丢包率。','NET',1,'normal','warning','%','0.2','{"unit":"%"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'4.04','光模块收发光功率','监测光纤链路衰减，预防光模块故障。','NET',1,'normal','warning','dBm','-2.5','{"unit":"dBm"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'4.05','关键业务 ping 延时','持续 ping 核心网关或外网 DNS，监控网络连通性。','NET',1,'normal','warning','ms','8','{"unit":"ms"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'4.06','TCP 连接数监控','监控服务器 TIME_WAIT、ESTABLISHED 连接数趋势。','NET',1,'normal','info','count','1200','{"state":"ESTABLISHED"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'4.07','DNS 解析耗时','监控内部 DNS 解析响应速度。','NET',1,'normal','warning','ms','20','{"unit":"ms"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'4.08','证书过期提醒','自动扫描 SSL 证书有效期，提前 30 天告警。','NET',1,'normal','warning','days','25','{"unit":"days"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'5.01','数据库慢查询分析','抓取 MySQL/PG 慢查询日志并排行。','APP',1,'normal','warning','s','2.3','{"unit":"s"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'5.02','接口响应时间 (RT) 监控','关键 API 接口的 P95/P99 响应耗时。','APP',1,'normal','warning','ms','450','{"unit":"ms"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'5.03','HTTP 状态码分布','监控 4xx/5xx 错误比例，超过阈值告警。','APP',1,'normal','warning','%','1.2','{"unit":"%"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'5.04','日志关键词告警','实时分析日志文件，匹配 "Error/Exception" 关键字。','APP',1,'normal','warning','count','0','{"keywords":["Error","Exception"]}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'5.05','容器健康检查','Docker 容器存活状态、重启次数监控。','APP',1,'normal','warning','count','0','{"restart":0}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'5.06','中间件积压监控','Redis 队列长度、Kafka 消息堆积量监控。','APP',1,'normal','warning','msg','120','{"unit":"msg"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'6.01','门禁非法闯入告警','非授权时间的机房开门记录告警。','SEC',1,'normal','critical','count','0','{"policy":"office-hours"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'6.02','视频监控画中画','在机房 3D 视图中集成摄像头实时画面。','SEC',1,'normal','info',NULL,'online','{"feeds":4}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'6.03','资产位置漂移','配合 RFID，当资产离开指定机柜时告警。','SEC',1,'normal','warning','count','0','{"rfid":"enabled"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'6.04','维保到期提醒','硬件设备维保期倒计时提醒。','SEC',1,'normal','warning','days','15','{"unit":"days"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'6.05','异常登录审计','监控服务器的 SSH 异常 IP 登录尝试。','SEC',1,'normal','warning','times','2','{"unit":"times"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'7.01','告警收敛与降噪','同一故障源引发的多个告警合并发送。','ALERT',1,'normal','info',NULL,'on','{"dedup":"enabled"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'7.02','多渠道通知','支持邮件、短信、钉钉、企业微信、语音电话通知。','ALERT',1,'normal','info','channels','5','{"channels":5}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'7.03','告警升级机制','15分钟未处理升级通知给上级主管。','ALERT',1,'normal','warning','min','15','{"unit":"min"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'7.04','值班排班表','根据排班表自动将告警发送给当值人员。','ALERT',1,'normal','info',NULL,'on','{"schedule":"enabled"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'7.05','告警自愈脚本','触发特定告警时自动执行重启服务等脚本。','ALERT',1,'normal','warning',NULL,'off','{"autoheal":false}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'7.06','告警大屏模式','专用的红黑榜告警大屏，展示未处理的高危故障。','ALERT',1,'normal','critical','count','3','{"critical":3}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'8.01','远程电源控制 (IPMI)','集成 IPMI，支持远程开关机/重启服务器。','OPS',1,'normal','info',NULL,'ready','{"ipmi":"enabled"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'8.02','批量配置下发','同时对多台服务器执行 Shell 命令。','OPS',1,'normal','warning',NULL,'0','{"batch":10}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'8.03','自动化巡检报告','每日/周自动生成 PDF 巡检报告并发送邮件。','OPS',1,'normal','info',NULL,'weekly','{"frequency":"weekly"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'8.04','固件版本管理','统计所有设备的固件版本，提示升级。','OPS',1,'normal','info',NULL,'ok','{"upgrade":"none"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'8.05','知识库关联','告警时自动推荐相关的历史解决方案或 Wiki 链接。','OPS',1,'normal','info','links','linked','{"links":3}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'9.01','U位碎片整理','分析机柜 U 位碎片情况，推荐最佳上架位置。','CAP',1,'normal','info',NULL,'ok','{"fragmentation":"low"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'9.02','电力容量预测','基于历史增长趋势，预测机房电力何时耗尽。','CAP',1,'normal','warning','days','180','{"unit":"days"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'9.03','存储扩容建议','预测磁盘写满时间，提前给出扩容建议。','CAP',1,'normal','warning','days','60','{"unit":"days"}','2026-04-18 08:29:42');
INSERT INTO monitoring_features VALUES(NULL,'9.04','资源利用率“僵尸”分析','找出长期低负载（CPU<5%）的服务器以供回收。','CAP',1,'normal','info','servers','5','{"unit":"servers"}','2026-04-18 08:29:42');
CREATE TABLE feature_metrics (
    id SERIAL PRIMARY KEY,
    feature_code VARCHAR(20) REFERENCES monitoring_features(code),
    metric_key VARCHAR(100),
    metric_value VARCHAR(100),
    unit VARCHAR(50),
    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO feature_metrics VALUES(NULL,'1.01','temperature','24.5','°C','2026-04-18 07:33:04');
INSERT INTO feature_metrics VALUES(NULL,'1.01','temperature','25.1','°C','2026-04-18 08:03:04');
INSERT INTO feature_metrics VALUES(NULL,'1.01','temperature','23.8','°C','2026-04-18 08:33:04');
INSERT INTO feature_metrics VALUES(NULL,'1.01','humidity','45','%','2026-04-18 07:33:04');
INSERT INTO feature_metrics VALUES(NULL,'1.01','humidity','48','%','2026-04-18 08:33:04');
INSERT INTO feature_metrics VALUES(NULL,'2.01','pue','1.45','','2026-04-18 04:33:04');
INSERT INTO feature_metrics VALUES(NULL,'2.01','pue','1.42','','2026-04-18 05:33:04');
INSERT INTO feature_metrics VALUES(NULL,'2.01','pue','1.39','','2026-04-18 06:33:04');
INSERT INTO feature_metrics VALUES(NULL,'2.01','pue','1.38','','2026-04-18 07:33:04');
INSERT INTO feature_metrics VALUES(NULL,'2.01','pue','1.35','','2026-04-18 08:33:04');
INSERT INTO feature_metrics VALUES(NULL,'3.01','cpu_temp','55','°C','2026-04-18 06:33:04');
INSERT INTO feature_metrics VALUES(NULL,'3.01','cpu_temp','62','°C','2026-04-18 07:33:04');
INSERT INTO feature_metrics VALUES(NULL,'3.01','cpu_temp','58','°C','2026-04-18 08:33:04');
INSERT INTO feature_metrics VALUES(NULL,'4.01','traffic_in','450','Mbps','2026-04-18 07:33:04');
INSERT INTO feature_metrics VALUES(NULL,'4.01','traffic_in','890','Mbps','2026-04-18 08:33:04');
INSERT INTO feature_metrics VALUES(NULL,'4.01','traffic_out','320','Mbps','2026-04-18 07:33:04');
INSERT INTO feature_metrics VALUES(NULL,'4.01','traffic_out','650','Mbps','2026-04-18 08:33:04');
CREATE TABLE alert_rules (
    id SERIAL PRIMARY KEY,
    feature_code VARCHAR(20) REFERENCES monitoring_features(code),
    rule_name VARCHAR(255),
    comparator VARCHAR(10),
    threshold NUMERIC,
    duration_minutes INTEGER DEFAULT 0,
    enabled BOOLEAN DEFAULT TRUE,
    severity VARCHAR(50) DEFAULT 'warning'
);
INSERT INTO alert_rules VALUES(NULL,'1.03','水浸检测告警','>',0,0,1,'critical');
INSERT INTO alert_rules VALUES(NULL,'2.04','异常掉电告警','>',0,0,1,'critical');
INSERT INTO alert_rules VALUES(NULL,'3.01','CPU 温度过热','>',85,5,1,'warning');
INSERT INTO alert_rules VALUES(NULL,'4.02','异常大流量','>',80,5,1,'critical');
INSERT INTO alert_rules VALUES(NULL,'5.03','HTTP 错误比例','>',3,10,1,'warning');
INSERT INTO alert_rules VALUES(NULL,'6.01','门禁非法闯入','>',0,0,1,'critical');
INSERT INTO alert_rules VALUES(NULL,'1.03','水浸检测告警','>',0,0,1,'critical');
INSERT INTO alert_rules VALUES(NULL,'2.04','异常掉电告警','>',0,0,1,'critical');
INSERT INTO alert_rules VALUES(NULL,'3.01','CPU 温度过热','>',85,5,1,'warning');
INSERT INTO alert_rules VALUES(NULL,'4.02','异常大流量','>',80,5,1,'critical');
INSERT INTO alert_rules VALUES(NULL,'5.03','HTTP 错误比例','>',3,10,1,'warning');
INSERT INTO alert_rules VALUES(NULL,'6.01','门禁非法闯入','>',0,0,1,'critical');
CREATE TABLE alerts (
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
INSERT INTO alerts VALUES(NULL,'2.04',NULL,'机房异常掉电','检测到 UPS 切换异常，已触发断电告警。','critical','active','2026-04-18 08:29:42',NULL);
INSERT INTO alerts VALUES(NULL,'3.01',NULL,'CPU 温度过高','服务器 CPU 温度达到 88°C，超过阈值。','warning','active','2026-04-18 08:29:42',NULL);
INSERT INTO alerts VALUES(NULL,'2.04',NULL,'机房异常掉电','检测到 UPS 切换异常，已触发断电告警。','critical','active','2026-04-18 08:33:04',NULL);
INSERT INTO alerts VALUES(NULL,'3.01',NULL,'CPU 温度过高','服务器 CPU 温度达到 88°C，超过阈值。','warning','active','2026-04-18 08:33:04',NULL);
CREATE TABLE environment_readings (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50),
    sensor_type VARCHAR(50),
    value NUMERIC,
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO environment_readings VALUES(NULL,'201','temperature',23.5,'°C','2026-04-18 08:33:04');
INSERT INTO environment_readings VALUES(NULL,'201','humidity',45,'%','2026-04-18 08:33:04');
INSERT INTO environment_readings VALUES(NULL,'202','temperature',22.80000000000000071,'°C','2026-04-18 08:33:04');
INSERT INTO environment_readings VALUES(NULL,'202','humidity',42.5,'%','2026-04-18 08:33:04');
INSERT INTO environment_readings VALUES(NULL,'203','temperature',24.10000000000000142,'°C','2026-04-18 08:33:04');
INSERT INTO environment_readings VALUES(NULL,'203','humidity',48.20000000000000284,'%','2026-04-18 08:33:04');
CREATE TABLE power_events (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50),
    event_type VARCHAR(100),
    severity VARCHAR(50),
    detail TEXT,
    occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO power_events VALUES(NULL,'201','voltage_sag','warning','监测到短暂电压暂降','2026-04-16 08:33:04');
INSERT INTO power_events VALUES(NULL,'203','ups_switch','info','UPS例行自检切换','2026-04-13 08:33:04');
CREATE TABLE server_metrics (
    id SERIAL PRIMARY KEY,
    server_name VARCHAR(100),
    metric_key VARCHAR(100),
    metric_value VARCHAR(100),
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO server_metrics VALUES(NULL,'SRV-A01-01','cpu_usage','45','%','2026-04-18 08:33:04');
INSERT INTO server_metrics VALUES(NULL,'SRV-A01-01','memory_usage','62','%','2026-04-18 08:33:04');
INSERT INTO server_metrics VALUES(NULL,'SRV-A01-01','disk_usage','78','%','2026-04-18 08:33:04');
INSERT INTO server_metrics VALUES(NULL,'SRV-B02-05','cpu_usage','89','%','2026-04-18 08:33:04');
INSERT INTO server_metrics VALUES(NULL,'SRV-B02-05','memory_usage','91','%','2026-04-18 08:33:04');
CREATE TABLE network_metrics (
    id SERIAL PRIMARY KEY,
    link_name VARCHAR(100),
    metric_key VARCHAR(100),
    metric_value VARCHAR(100),
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO network_metrics VALUES(NULL,'Core-Switch-A','throughput','8.5','Gbps','2026-04-18 08:33:04');
INSERT INTO network_metrics VALUES(NULL,'Core-Switch-A','latency','2','ms','2026-04-18 08:33:04');
INSERT INTO network_metrics VALUES(NULL,'Edge-Router-1','packet_loss','0.01','%','2026-04-18 08:33:04');
CREATE TABLE application_metrics (
    id SERIAL PRIMARY KEY,
    app_name VARCHAR(100),
    metric_key VARCHAR(100),
    metric_value VARCHAR(100),
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO application_metrics VALUES(NULL,'Billing-Service','response_time','120','ms','2026-04-18 08:33:04');
INSERT INTO application_metrics VALUES(NULL,'Auth-Service','response_time','45','ms','2026-04-18 08:33:04');
INSERT INTO application_metrics VALUES(NULL,'Data-Pipeline','queue_depth','5400','msg','2026-04-18 08:33:04');
CREATE TABLE security_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100),
    severity VARCHAR(50),
    detail TEXT,
    occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO security_events VALUES(NULL,'unauthorized_access','critical','门禁系统检测到未授权卡片尝试进入204机房','2026-04-18 07:33:04');
INSERT INTO security_events VALUES(NULL,'video_motion','info','201机房G区检测到人员移动','2026-04-18 08:18:04');
CREATE TABLE oncall_schedules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    duty_user VARCHAR(100),
    days VARCHAR(50),
    start_time VARCHAR(20),
    end_time VARCHAR(20)
);
INSERT INTO oncall_schedules VALUES(NULL,'早班','张三','Mon,Tue,Wed,Thu,Fri','08:00','16:00');
INSERT INTO oncall_schedules VALUES(NULL,'中班','李四','Mon,Tue,Wed,Thu,Fri','16:00','24:00');
INSERT INTO oncall_schedules VALUES(NULL,'晚班','王五','Mon,Tue,Wed,Thu,Fri','00:00','08:00');
INSERT INTO oncall_schedules VALUES(NULL,'周末班','赵六','Sat,Sun','09:00','21:00');
INSERT INTO oncall_schedules VALUES(NULL,'早班','张三','Mon,Tue,Wed,Thu,Fri','08:00','16:00');
INSERT INTO oncall_schedules VALUES(NULL,'中班','李四','Mon,Tue,Wed,Thu,Fri','16:00','24:00');
INSERT INTO oncall_schedules VALUES(NULL,'晚班','王五','Mon,Tue,Wed,Thu,Fri','00:00','08:00');
INSERT INTO oncall_schedules VALUES(NULL,'周末班','赵六','Sat,Sun','09:00','21:00');
CREATE TABLE inspection_reports (
    id SERIAL PRIMARY KEY,
    report_date DATE,
    summary TEXT,
    file_url VARCHAR(255)
);
INSERT INTO inspection_reports VALUES(NULL,'2026-04-17 08:33:04','2023年10月23日例行巡检，发现202机房空调异响，已报修。','/reports/20231023.pdf');
INSERT INTO inspection_reports VALUES(NULL,'2026-04-11 08:33:04','周度巡检报告，所有设备运行正常。','/reports/20231016.pdf');
CREATE TABLE firmware_inventory (
    id SERIAL PRIMARY KEY,
    device_name VARCHAR(100),
    device_type VARCHAR(100),
    firmware_version VARCHAR(100),
    last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO firmware_inventory VALUES(NULL,'Core-Switch-01','Switch','v12.4.3','2026-04-18 08:33:04');
INSERT INTO firmware_inventory VALUES(NULL,'UPS-Main-A','UPS','v2.1.0','2026-04-18 08:33:04');
INSERT INTO firmware_inventory VALUES(NULL,'PDU-201-A01','PDU','v1.5.2','2026-04-18 08:33:04');
CREATE TABLE maintenance_assets (
    id SERIAL PRIMARY KEY,
    asset_name VARCHAR(100),
    asset_type VARCHAR(100),
    warranty_expiry DATE
);
INSERT INTO maintenance_assets VALUES(NULL,'Dell PowerEdge R740','Server','2026-12-31');
INSERT INTO maintenance_assets VALUES(NULL,'Cisco Catalyst 9500','Switch','2025-06-30');
INSERT INTO maintenance_assets VALUES(NULL,'Emerson Liebert PEX','AC','2024-10-15');
INSERT INTO maintenance_assets VALUES(NULL,'Dell PowerEdge R740','Server','2026-12-31');
INSERT INTO maintenance_assets VALUES(NULL,'Cisco Catalyst 9500','Switch','2025-06-30');
INSERT INTO maintenance_assets VALUES(NULL,'Emerson Liebert PEX','AC','2024-10-15');
CREATE TABLE knowledge_base_links (
    id SERIAL PRIMARY KEY,
    feature_code VARCHAR(20) REFERENCES monitoring_features(code),
    title VARCHAR(255),
    url VARCHAR(255)
);
INSERT INTO knowledge_base_links VALUES(NULL,'2.04','UPS故障处理SOP','http://wiki.company.com/ops/ups-sop');
INSERT INTO knowledge_base_links VALUES(NULL,'4.02','DDoS攻击应急预案','http://wiki.company.com/security/ddos-plan');
INSERT INTO knowledge_base_links VALUES(NULL,'3.01','服务器过热排查指南','http://wiki.company.com/ops/server-heat');
INSERT INTO knowledge_base_links VALUES(NULL,'2.04','UPS故障处理SOP','http://wiki.company.com/ops/ups-sop');
INSERT INTO knowledge_base_links VALUES(NULL,'4.02','DDoS攻击应急预案','http://wiki.company.com/security/ddos-plan');
INSERT INTO knowledge_base_links VALUES(NULL,'3.01','服务器过热排查指南','http://wiki.company.com/ops/server-heat');
CREATE TABLE data_center_config (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    floor_count INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO data_center_config VALUES(NULL,'北京A数据中心',4,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO data_center_config VALUES(NULL,'北京A数据中心',4,'2026-04-18 08:33:04','2026-04-18 08:33:04');
CREATE TABLE floor_config (
    id SERIAL PRIMARY KEY,
    data_center_id INTEGER REFERENCES data_center_config(id),
    floor_number INTEGER NOT NULL,
    floor_name VARCHAR(100),
    shape VARCHAR(50) DEFAULT 'rectangle',
    width FLOAT DEFAULT 100,
    depth FLOAT DEFAULT 100,
    room_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO floor_config VALUES(NULL,1,1,'一楼','rectangle',100.0,100.0,6,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO floor_config VALUES(NULL,1,2,'二楼','rectangle',100.0,100.0,6,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO floor_config VALUES(NULL,1,3,'三楼','rectangle',100.0,100.0,6,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO floor_config VALUES(NULL,1,4,'四楼','rectangle',100.0,100.0,6,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO floor_config VALUES(NULL,1,1,'一楼','rectangle',100.0,100.0,6,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO floor_config VALUES(NULL,1,2,'二楼','rectangle',100.0,100.0,6,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO floor_config VALUES(NULL,1,3,'三楼','rectangle',100.0,100.0,6,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO floor_config VALUES(NULL,1,4,'四楼','rectangle',100.0,100.0,6,'2026-04-18 08:33:04','2026-04-18 08:33:04');
CREATE TABLE room_config (
    id SERIAL PRIMARY KEY,
    floor_id INTEGER REFERENCES floor_config(id),
    room_number INTEGER NOT NULL,
    room_name VARCHAR(100),
    shape VARCHAR(50) DEFAULT 'rectangle',
    color VARCHAR(50) DEFAULT '#6b7280',
    cabinet_count INTEGER DEFAULT 0,
    position_x FLOAT DEFAULT 0,
    position_y FLOAT DEFAULT 0,
    position_z FLOAT DEFAULT 0,
    rotation FLOAT DEFAULT 0,
    width FLOAT DEFAULT 50,
    depth FLOAT DEFAULT 50,
    height FLOAT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
, is_enabled BOOLEAN DEFAULT TRUE);
INSERT INTO room_config VALUES(NULL,1,1,'核心机房A区','rectangle','#FF6B6B',50,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,1,2,'核心机房B区','rectangle','#4ECDC4',40,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,1,3,'存储机房','rectangle','#45B7D1',60,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,1,4,'网络机房','rectangle','#96CEB4',30,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,1,5,'GPU计算区','rectangle','#FFEAA7',70,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,1,6,'控制机房','rectangle','#DDA0DD',20,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,2,1,'核心机房A区','rectangle','#98FB98',55,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,2,2,'核心机房B区','rectangle','#F0E68C',45,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,2,3,'存储机房','rectangle','#FF6B6B',65,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,2,4,'网络机房','rectangle','#4ECDC4',35,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,2,5,'GPU计算区','rectangle','#45B7D1',75,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,2,6,'控制机房','rectangle','#96CEB4',25,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,3,1,'核心机房A区','rectangle','#FFEAA7',60,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,3,2,'核心机房B区','rectangle','#DDA0DD',50,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,3,3,'存储机房','rectangle','#98FB98',70,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,3,4,'网络机房','rectangle','#F0E68C',40,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,3,5,'GPU计算区','rectangle','#FF6B6B',80,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,3,6,'控制机房','rectangle','#4ECDC4',30,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,4,1,'核心机房A区','rectangle','#45B7D1',65,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,4,2,'核心机房B区','rectangle','#96CEB4',55,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,4,3,'存储机房','rectangle','#FFEAA7',75,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,4,4,'网络机房','rectangle','#DDA0DD',45,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,4,5,'GPU计算区','rectangle','#98FB98',85,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,4,6,'控制机房','rectangle','#F0E68C',35,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:29:42','2026-04-18 08:29:42',1);
INSERT INTO room_config VALUES(NULL,1,1,'核心机房A区','rectangle','#FF6B6B',50,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,1,2,'核心机房B区','rectangle','#4ECDC4',40,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,1,3,'存储机房','rectangle','#45B7D1',60,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,1,4,'网络机房','rectangle','#96CEB4',30,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,1,5,'GPU计算区','rectangle','#FFEAA7',70,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,1,6,'控制机房','rectangle','#DDA0DD',20,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,2,1,'核心机房A区','rectangle','#98FB98',55,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,2,2,'核心机房B区','rectangle','#F0E68C',45,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,2,3,'存储机房','rectangle','#FF6B6B',65,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,2,4,'网络机房','rectangle','#4ECDC4',35,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,2,5,'GPU计算区','rectangle','#45B7D1',75,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,2,6,'控制机房','rectangle','#96CEB4',25,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,3,1,'核心机房A区','rectangle','#FFEAA7',60,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,3,2,'核心机房B区','rectangle','#DDA0DD',50,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,3,3,'存储机房','rectangle','#98FB98',70,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,3,4,'网络机房','rectangle','#F0E68C',40,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,3,5,'GPU计算区','rectangle','#FF6B6B',80,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,3,6,'控制机房','rectangle','#4ECDC4',30,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,4,1,'核心机房A区','rectangle','#45B7D1',65,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,4,2,'核心机房B区','rectangle','#96CEB4',55,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,4,3,'存储机房','rectangle','#FFEAA7',75,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,4,4,'网络机房','rectangle','#DDA0DD',45,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,4,5,'GPU计算区','rectangle','#98FB98',85,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
INSERT INTO room_config VALUES(NULL,4,6,'控制机房','rectangle','#F0E68C',35,0.0,0.0,0.0,0.0,50.0,50.0,30.0,'2026-04-18 08:33:04','2026-04-18 08:33:04',1);
CREATE TABLE cabinet_layout (
    id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES room_config(id),
    layout_type VARCHAR(50) DEFAULT 'row',
    columns INTEGER DEFAULT 10,
    rows INTEGER DEFAULT 10,
    spacing FLOAT DEFAULT 1.0,
    start_position_x FLOAT DEFAULT 0,
    start_position_y FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO cabinet_layout VALUES(NULL,1,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,2,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,3,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,4,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,5,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,6,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,7,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,8,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,9,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,10,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,11,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,12,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,13,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,14,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,15,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,16,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,17,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,18,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,19,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,20,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,21,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,22,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,23,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,24,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_layout VALUES(NULL,1,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,2,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,3,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,4,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,5,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,6,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,7,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,8,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,9,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,10,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,11,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,12,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,13,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,14,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,15,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,16,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,17,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,18,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,19,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,20,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,21,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,22,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,23,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_layout VALUES(NULL,24,'row',10,10,1.0,0.0,0.0,'2026-04-18 08:33:04','2026-04-18 08:33:04');
CREATE TABLE cabinet_grid (
    id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES room_config(id),
    grid_x INTEGER NOT NULL,
    grid_y INTEGER NOT NULL,
    is_occupied BOOLEAN DEFAULT FALSE,
    cabinet_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO cabinet_grid VALUES(NULL,1,0,0,1,1,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,1,1,2,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,2,0,NULL,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,3,1,3,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,4,0,NULL,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,5,1,4,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,6,1,5,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,7,0,NULL,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,8,1,6,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,9,0,NULL,'2026-04-18 08:29:42','2026-04-18 08:29:42');
INSERT INTO cabinet_grid VALUES(NULL,1,0,0,1,1,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_grid VALUES(NULL,1,0,1,1,2,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_grid VALUES(NULL,1,0,2,0,NULL,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_grid VALUES(NULL,1,0,3,1,3,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_grid VALUES(NULL,1,0,4,0,NULL,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_grid VALUES(NULL,1,0,5,1,4,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_grid VALUES(NULL,1,0,6,1,5,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_grid VALUES(NULL,1,0,7,0,NULL,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_grid VALUES(NULL,1,0,8,1,6,'2026-04-18 08:33:04','2026-04-18 08:33:04');
INSERT INTO cabinet_grid VALUES(NULL,1,0,9,0,NULL,'2026-04-18 08:33:04','2026-04-18 08:33:04');
CREATE TABLE resource_overview (
    id SERIAL PRIMARY KEY,
    total_servers INTEGER DEFAULT 0,
    total_it_cabinet_count INTEGER DEFAULT 0,
    total_enterprise_count INTEGER DEFAULT 0,
    should_bill_cabinets INTEGER DEFAULT 0,
    billed_cabinets INTEGER DEFAULT 0,
    reserved_cabinets INTEGER DEFAULT 0,
    available_cabinets INTEGER DEFAULT 0,
    customer_cabinets INTEGER DEFAULT 0,
    self_use_cabinets INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMIT;
