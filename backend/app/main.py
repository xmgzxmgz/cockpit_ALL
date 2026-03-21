from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime

from .database import (
    Base,
    engine,
    get_db,
    Enterprise,
    Room,
    Cabinet,
    FeatureCategory,
    MonitoringFeature,
    FeatureMetric,
    Alert,
    AlertRule,
    EnvironmentReading,
    PowerEvent,
    ServerMetric,
    NetworkMetric,
    ApplicationMetric,
    SecurityEvent,
    OncallSchedule,
    InspectionReport,
    FirmwareInventory,
    MaintenanceAsset,
    KnowledgeBaseLink,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cockpit Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CabinetResponse(BaseModel):
    room_id: str
    FKHNAME: str
    cabinet_id: str
    FENAME: Optional[str] = None
    maintainer: Optional[str] = None
    KHMANAGE: Optional[str] = None

    class Config:
        from_attributes = True


class EnterpriseStat(BaseModel):
    fkhname: str
    cabinetCount: int


class FeatureCategoryResponse(BaseModel):
    code: str
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class MonitoringFeatureResponse(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    category_code: Optional[str] = None
    enabled: bool
    status: str
    severity: str
    unit: Optional[str] = None
    latest_value: Optional[str] = None
    config: Optional[Dict[str, Any]] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class MonitoringFeatureCreate(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    category_code: str
    enabled: bool = True
    status: str = "normal"
    severity: str = "info"
    unit: Optional[str] = None
    latest_value: Optional[str] = None
    config: Optional[Dict[str, Any]] = None


class MonitoringFeatureUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category_code: Optional[str] = None
    enabled: Optional[bool] = None
    status: Optional[str] = None
    severity: Optional[str] = None
    unit: Optional[str] = None
    latest_value: Optional[str] = None
    config: Optional[Dict[str, Any]] = None


class FeatureMetricResponse(BaseModel):
    id: int
    feature_code: str
    metric_key: str
    metric_value: str
    unit: Optional[str] = None
    collected_at: datetime

    class Config:
        from_attributes = True


class FeatureMetricCreate(BaseModel):
    metric_key: str
    metric_value: str
    unit: Optional[str] = None


class AlertRuleResponse(BaseModel):
    id: int
    feature_code: str
    rule_name: str
    comparator: str
    threshold: float
    duration_minutes: int
    enabled: bool
    severity: str

    class Config:
        from_attributes = True


class AlertRuleCreate(BaseModel):
    feature_code: str
    rule_name: str
    comparator: str
    threshold: float
    duration_minutes: int = 0
    enabled: bool = True
    severity: str = "warning"


class AlertRuleUpdate(BaseModel):
    rule_name: Optional[str] = None
    comparator: Optional[str] = None
    threshold: Optional[float] = None
    duration_minutes: Optional[int] = None
    enabled: Optional[bool] = None
    severity: Optional[str] = None


class AlertResponse(BaseModel):
    id: int
    feature_code: str
    rule_id: Optional[int] = None
    title: str
    message: str
    severity: str
    status: str
    triggered_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AlertCreate(BaseModel):
    feature_code: str
    rule_id: Optional[int] = None
    title: str
    message: str
    severity: str = "warning"


class AlertResolve(BaseModel):
    resolved_at: Optional[datetime] = None


class AlertNotificationRequest(BaseModel):
    feature_code: str
    message: str
    severity: str
    channels: List[str]


class EnvironmentReadingResponse(BaseModel):
    id: int
    room_id: str
    sensor_type: str
    value: float
    unit: str
    recorded_at: datetime

    class Config:
        from_attributes = True


class EnvironmentReadingCreate(BaseModel):
    room_id: str
    sensor_type: str
    value: float
    unit: str


class PowerEventResponse(BaseModel):
    id: int
    room_id: str
    event_type: str
    severity: str
    detail: str
    occurred_at: datetime

    class Config:
        from_attributes = True


class PowerEventCreate(BaseModel):
    room_id: str
    event_type: str
    severity: str
    detail: str


class SecurityEventResponse(BaseModel):
    id: int
    event_type: str
    severity: str
    detail: str
    occurred_at: datetime

    class Config:
        from_attributes = True


class SecurityEventCreate(BaseModel):
    event_type: str
    severity: str
    detail: str


class EnvironmentReadingUpdate(BaseModel):
    room_id: Optional[str] = None
    sensor_type: Optional[str] = None
    value: Optional[float] = None
    unit: Optional[str] = None


class PowerEventUpdate(BaseModel):
    room_id: Optional[str] = None
    event_type: Optional[str] = None
    severity: Optional[str] = None
    detail: Optional[str] = None


class SecurityEventUpdate(BaseModel):
    event_type: Optional[str] = None
    severity: Optional[str] = None
    detail: Optional[str] = None


class ServerMetricResponse(BaseModel):
    id: int
    server_name: str
    metric_key: str
    metric_value: str
    unit: Optional[str] = None
    recorded_at: datetime

    class Config:
        from_attributes = True


class ServerMetricCreate(BaseModel):
    server_name: str
    metric_key: str
    metric_value: str
    unit: Optional[str] = None


class ServerMetricUpdate(BaseModel):
    server_name: Optional[str] = None
    metric_key: Optional[str] = None
    metric_value: Optional[str] = None
    unit: Optional[str] = None


class NetworkMetricResponse(BaseModel):
    id: int
    link_name: str
    metric_key: str
    metric_value: str
    unit: Optional[str] = None
    recorded_at: datetime

    class Config:
        from_attributes = True


class NetworkMetricCreate(BaseModel):
    link_name: str
    metric_key: str
    metric_value: str
    unit: Optional[str] = None


class NetworkMetricUpdate(BaseModel):
    link_name: Optional[str] = None
    metric_key: Optional[str] = None
    metric_value: Optional[str] = None
    unit: Optional[str] = None


class ApplicationMetricResponse(BaseModel):
    id: int
    app_name: str
    metric_key: str
    metric_value: str
    unit: Optional[str] = None
    recorded_at: datetime

    class Config:
        from_attributes = True


class ApplicationMetricCreate(BaseModel):
    app_name: str
    metric_key: str
    metric_value: str
    unit: Optional[str] = None


class ApplicationMetricUpdate(BaseModel):
    app_name: Optional[str] = None
    metric_key: Optional[str] = None
    metric_value: Optional[str] = None
    unit: Optional[str] = None


class OncallScheduleResponse(BaseModel):
    id: int
    name: str
    duty_user: str
    days: str
    start_time: str
    end_time: str

    class Config:
        from_attributes = True


class OncallScheduleCreate(BaseModel):
    name: str
    duty_user: str
    days: str
    start_time: str
    end_time: str


class OncallScheduleUpdate(BaseModel):
    name: Optional[str] = None
    duty_user: Optional[str] = None
    days: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None


class InspectionReportResponse(BaseModel):
    id: int
    report_date: datetime
    summary: str
    file_url: str

    class Config:
        from_attributes = True


class InspectionReportCreate(BaseModel):
    report_date: datetime
    summary: str
    file_url: str


class InspectionReportUpdate(BaseModel):
    report_date: Optional[datetime] = None
    summary: Optional[str] = None
    file_url: Optional[str] = None


class FirmwareInventoryResponse(BaseModel):
    id: int
    device_name: str
    device_type: str
    firmware_version: str
    last_checked: datetime

    class Config:
        from_attributes = True


class FirmwareInventoryCreate(BaseModel):
    device_name: str
    device_type: str
    firmware_version: str
    last_checked: Optional[datetime] = None


class FirmwareInventoryUpdate(BaseModel):
    device_name: Optional[str] = None
    device_type: Optional[str] = None
    firmware_version: Optional[str] = None
    last_checked: Optional[datetime] = None


class MaintenanceAssetResponse(BaseModel):
    id: int
    asset_name: str
    asset_type: str
    warranty_expiry: datetime

    class Config:
        from_attributes = True


class MaintenanceAssetCreate(BaseModel):
    asset_name: str
    asset_type: str
    warranty_expiry: datetime


class MaintenanceAssetUpdate(BaseModel):
    asset_name: Optional[str] = None
    asset_type: Optional[str] = None
    warranty_expiry: Optional[datetime] = None


class KnowledgeBaseLinkResponse(BaseModel):
    id: int
    feature_code: str
    title: str
    url: str

    class Config:
        from_attributes = True


class KnowledgeBaseLinkCreate(BaseModel):
    feature_code: str
    title: str
    url: str


class KnowledgeBaseLinkUpdate(BaseModel):
    feature_code: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


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


def seed_mock_data(db: Session) -> None:
    """
    初始化数据库 Mock 数据。

    Args:
        db (Session): SQLAlchemy 数据库会话。
    """
    if db.query(FeatureCategory).count() == 0:
        db.add_all([FeatureCategory(**item) for item in MOCK_CATEGORIES])
        db.commit()

    if db.query(MonitoringFeature).count() == 0:
        features = [MonitoringFeature(enabled=True, status="normal", **item) for item in MOCK_FEATURES]
        db.add_all(features)
        db.commit()

    if db.query(FeatureMetric).count() == 0:
        metrics = []
        for feature in MOCK_FEATURES:
            metrics.append(
                FeatureMetric(
                    feature_code=feature["code"],
                    metric_key="latest",
                    metric_value=str(feature.get("latest_value", "")),
                    unit=feature.get("unit"),
                )
            )
        db.add_all(metrics)
        db.commit()

    if db.query(AlertRule).count() == 0:
        rules = [
            AlertRule(feature_code="1.03", rule_name="水浸检测告警", comparator=">", threshold=0, duration_minutes=0, severity="critical"),
            AlertRule(feature_code="2.04", rule_name="异常掉电告警", comparator=">", threshold=0, duration_minutes=0, severity="critical"),
            AlertRule(feature_code="3.01", rule_name="CPU 温度过热", comparator=">", threshold=85, duration_minutes=5, severity="warning"),
            AlertRule(feature_code="4.02", rule_name="异常大流量", comparator=">", threshold=80, duration_minutes=5, severity="critical"),
            AlertRule(feature_code="5.03", rule_name="HTTP 错误比例", comparator=">", threshold=3, duration_minutes=10, severity="warning"),
            AlertRule(feature_code="6.01", rule_name="门禁非法闯入", comparator=">", threshold=0, duration_minutes=0, severity="critical"),
        ]
        db.add_all(rules)
        db.commit()

    if db.query(Alert).count() == 0:
        alerts = [
            Alert(feature_code="2.04", title="机房异常掉电", message="检测到 UPS 切换异常，已触发断电告警。", severity="critical", status="active"),
            Alert(feature_code="3.01", title="CPU 温度过高", message="服务器 CPU 温度达到 88°C，超过阈值。", severity="warning", status="active"),
        ]
        db.add_all(alerts)
        db.commit()

    if db.query(EnvironmentReading).count() == 0:
        db.add_all(
            [
                EnvironmentReading(room_id="201", sensor_type="temperature", value=23.5, unit="°C"),
                EnvironmentReading(room_id="201", sensor_type="humidity", value=45, unit="%"),
            ]
        )
        db.commit()

    if db.query(PowerEvent).count() == 0:
        db.add_all(
            [
                PowerEvent(room_id="201", event_type="UPS Switch", severity="critical", detail="UPS 切换异常"),
                PowerEvent(room_id="202", event_type="Voltage Dip", severity="warning", detail="检测到电压暂降"),
            ]
        )
        db.commit()

    if db.query(SecurityEvent).count() == 0:
        db.add(SecurityEvent(event_type="非法门禁", severity="critical", detail="非授权时间门禁打开"))
        db.commit()

    if db.query(ServerMetric).count() == 0:
        db.add_all(
            [
                ServerMetric(server_name="server-01", metric_key="cpu_temp", metric_value="62", unit="°C"),
                ServerMetric(server_name="server-02", metric_key="memory_usage", metric_value="68", unit="%"),
            ]
        )
        db.commit()

    if db.query(NetworkMetric).count() == 0:
        db.add_all(
            [
                NetworkMetric(link_name="core-switch-1", metric_key="packet_loss", metric_value="0.2", unit="%"),
                NetworkMetric(link_name="core-switch-2", metric_key="latency", metric_value="8", unit="ms"),
            ]
        )
        db.commit()

    if db.query(ApplicationMetric).count() == 0:
        db.add_all(
            [
                ApplicationMetric(app_name="auth-service", metric_key="p95_latency", metric_value="320", unit="ms"),
                ApplicationMetric(app_name="billing-service", metric_key="error_rate", metric_value="0.6", unit="%"),
            ]
        )
        db.commit()

    if db.query(OncallSchedule).count() == 0:
        db.add(OncallSchedule(name="默认排班", duty_user="值班工程师A", days="Mon-Fri", start_time="09:00", end_time="18:00"))
        db.commit()

    if db.query(InspectionReport).count() == 0:
        db.add(InspectionReport(report_date=datetime.utcnow(), summary="巡检一切正常", file_url="/reports/weekly.pdf"))
        db.commit()

    if db.query(FirmwareInventory).count() == 0:
        db.add(FirmwareInventory(device_name="核心交换机", device_type="Switch", firmware_version="v1.2.3"))
        db.commit()

    if db.query(MaintenanceAsset).count() == 0:
        db.add(MaintenanceAsset(asset_name="UPS-01", asset_type="UPS", warranty_expiry=datetime.utcnow()))
        db.commit()

    if db.query(KnowledgeBaseLink).count() == 0:
        db.add(KnowledgeBaseLink(feature_code="7.01", title="告警收敛指南", url="https://kb.example.com/alert-dedup"))
        db.commit()


@app.on_event("startup")
def on_startup() -> None:
    """
    服务启动时初始化 Mock 数据。
    """
    db = next(get_db())
    try:
        seed_mock_data(db)
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/room/{room_id}/cabinets", response_model=List[CabinetResponse])
def get_room_cabinets(room_id: str, db: Session = Depends(get_db)):
    """
    获取指定机房的机柜与企业分配数据。
    """
    cabinets = db.query(Cabinet).filter(Cabinet.room_id == room_id).all()
    result = []
    for cab in cabinets:
        if cab.enterprise:
            result.append(
                {
                    "room_id": cab.room_id,
                    "FKHNAME": cab.enterprise.name,
                    "cabinet_id": cab.cabinet_label,
                    "FENAME": cab.enterprise.full_name,
                    "maintainer": cab.enterprise.maintainer,
                    "KHMANAGE": cab.enterprise.manager,
                }
            )
    return result


@app.get("/api/stats/overview")
def get_overview_stats(db: Session = Depends(get_db)):
    """
    获取资源概览统计数据。
    """
    total_cabinets = db.query(Cabinet).count()
    total_enterprises = db.query(Enterprise).count()
    return {"totalITCabinetCount": total_cabinets, "totalEnterpriseCount": total_enterprises}


@app.get("/api/stats/enterprises", response_model=List[EnterpriseStat])
def get_enterprise_stats(db: Session = Depends(get_db)):
    """
    获取企业机柜统计数据。
    """
    stats = (
        db.query(Enterprise.name, func.count(Cabinet.id).label("count"))
        .join(Cabinet)
        .group_by(Enterprise.name)
        .all()
    )
    return [{"fkhname": name, "cabinetCount": count} for name, count in stats]


@app.get("/api/feature-categories", response_model=List[FeatureCategoryResponse])
def list_feature_categories(db: Session = Depends(get_db)):
    """
    获取所有功能分类。
    """
    return db.query(FeatureCategory).all()


@app.get("/api/features", response_model=List[MonitoringFeatureResponse])
def list_features(
    category_code: Optional[str] = Query(None),
    enabled: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
):
    """
    获取功能模块列表。
    """
    query = db.query(MonitoringFeature)
    if category_code:
        query = query.filter(MonitoringFeature.category_code == category_code)
    if enabled is not None:
        query = query.filter(MonitoringFeature.enabled == enabled)
    return query.order_by(MonitoringFeature.code.asc()).all()


@app.get("/api/features/{code}", response_model=MonitoringFeatureResponse)
def get_feature(code: str, db: Session = Depends(get_db)):
    """
    获取单个功能模块详情。
    """
    feature = db.query(MonitoringFeature).filter(MonitoringFeature.code == code).first()
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    return feature


@app.post("/api/features", response_model=MonitoringFeatureResponse)
def create_feature(payload: MonitoringFeatureCreate, db: Session = Depends(get_db)):
    """
    创建功能模块。
    """
    existing = db.query(MonitoringFeature).filter(MonitoringFeature.code == payload.code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Feature code already exists")
    feature = MonitoringFeature(**payload.model_dump(), updated_at=datetime.utcnow())
    db.add(feature)
    db.commit()
    db.refresh(feature)
    return feature


@app.put("/api/features/{code}", response_model=MonitoringFeatureResponse)
def update_feature(code: str, payload: MonitoringFeatureUpdate, db: Session = Depends(get_db)):
    """
    更新功能模块信息。
    """
    feature = db.query(MonitoringFeature).filter(MonitoringFeature.code == code).first()
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(feature, key, value)
    feature.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(feature)
    return feature


@app.delete("/api/features/{code}")
def delete_feature(code: str, db: Session = Depends(get_db)):
    """
    删除功能模块。
    """
    feature = db.query(MonitoringFeature).filter(MonitoringFeature.code == code).first()
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    db.delete(feature)
    db.commit()
    return {"success": True}


@app.get("/api/features/{code}/metrics", response_model=List[FeatureMetricResponse])
def list_feature_metrics(code: str, db: Session = Depends(get_db)):
    """
    获取功能模块的指标记录。
    """
    return (
        db.query(FeatureMetric)
        .filter(FeatureMetric.feature_code == code)
        .order_by(FeatureMetric.collected_at.desc())
        .all()
    )


@app.post("/api/features/{code}/metrics", response_model=FeatureMetricResponse)
def create_feature_metric(code: str, payload: FeatureMetricCreate, db: Session = Depends(get_db)):
    """
    创建功能模块指标记录。
    """
    feature = db.query(MonitoringFeature).filter(MonitoringFeature.code == code).first()
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    metric = FeatureMetric(feature_code=code, **payload.model_dump())
    db.add(metric)
    feature.latest_value = payload.metric_value
    feature.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(metric)
    return metric


@app.get("/api/alerts", response_model=List[AlertResponse])
def list_alerts(db: Session = Depends(get_db)):
    """
    获取所有告警事件。
    """
    return db.query(Alert).order_by(Alert.triggered_at.desc()).all()


@app.get("/api/features/{code}/alerts", response_model=List[AlertResponse])
def list_feature_alerts(code: str, db: Session = Depends(get_db)):
    """
    获取指定功能模块的告警事件。
    """
    return (
        db.query(Alert)
        .filter(Alert.feature_code == code)
        .order_by(Alert.triggered_at.desc())
        .all()
    )


@app.post("/api/features/{code}/alerts", response_model=AlertResponse)
def create_alert(code: str, payload: AlertCreate, db: Session = Depends(get_db)):
    """
    创建告警事件。
    """
    feature = db.query(MonitoringFeature).filter(MonitoringFeature.code == code).first()
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    alert = Alert(feature_code=code, **payload.model_dump(exclude={"feature_code"}))
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert


@app.put("/api/alerts/{alert_id}/resolve", response_model=AlertResponse)
def resolve_alert(alert_id: int, payload: AlertResolve, db: Session = Depends(get_db)):
    """
    处理告警恢复。
    """
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert.status = "resolved"
    alert.resolved_at = payload.resolved_at or datetime.utcnow()
    db.commit()
    db.refresh(alert)
    return alert


@app.get("/api/alert-rules", response_model=List[AlertRuleResponse])
def list_alert_rules(db: Session = Depends(get_db)):
    """
    获取告警规则列表。
    """
    return db.query(AlertRule).order_by(AlertRule.id.asc()).all()


@app.post("/api/alert-rules", response_model=AlertRuleResponse)
def create_alert_rule(payload: AlertRuleCreate, db: Session = Depends(get_db)):
    """
    创建告警规则。
    """
    rule = AlertRule(**payload.model_dump())
    db.add(rule)
    db.commit()
    db.refresh(rule)
    return rule


@app.put("/api/alert-rules/{rule_id}", response_model=AlertRuleResponse)
def update_alert_rule(rule_id: int, payload: AlertRuleUpdate, db: Session = Depends(get_db)):
    """
    更新告警规则。
    """
    rule = db.query(AlertRule).filter(AlertRule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(rule, key, value)
    db.commit()
    db.refresh(rule)
    return rule


@app.delete("/api/alert-rules/{rule_id}")
def delete_alert_rule(rule_id: int, db: Session = Depends(get_db)):
    """
    删除告警规则。
    """
    rule = db.query(AlertRule).filter(AlertRule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    db.delete(rule)
    db.commit()
    return {"success": True}


@app.get("/api/environment/readings", response_model=List[EnvironmentReadingResponse])
def list_environment_readings(db: Session = Depends(get_db)):
    """
    获取环境读数列表。
    """
    return db.query(EnvironmentReading).order_by(EnvironmentReading.recorded_at.desc()).all()


@app.post("/api/environment/readings", response_model=EnvironmentReadingResponse)
def create_environment_reading(payload: EnvironmentReadingCreate, db: Session = Depends(get_db)):
    """
    创建环境读数记录。
    """
    reading = EnvironmentReading(**payload.model_dump())
    db.add(reading)
    db.commit()
    db.refresh(reading)
    return reading


@app.get("/api/power/events", response_model=List[PowerEventResponse])
def list_power_events(db: Session = Depends(get_db)):
    """
    获取电力事件列表。
    """
    return db.query(PowerEvent).order_by(PowerEvent.occurred_at.desc()).all()


@app.post("/api/power/events", response_model=PowerEventResponse)
def create_power_event(payload: PowerEventCreate, db: Session = Depends(get_db)):
    """
    创建电力事件。
    """
    event = PowerEvent(**payload.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@app.get("/api/security/events", response_model=List[SecurityEventResponse])
def list_security_events(db: Session = Depends(get_db)):
    """
    获取安防事件列表。
    """
    return db.query(SecurityEvent).order_by(SecurityEvent.occurred_at.desc()).all()


@app.post("/api/security/events", response_model=SecurityEventResponse)
def create_security_event(payload: SecurityEventCreate, db: Session = Depends(get_db)):
    """
    创建安防事件。
    """
    event = SecurityEvent(**payload.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@app.get("/api/operations/oncall")
def list_oncall(db: Session = Depends(get_db)):
    """
    获取值班排班表。
    """
    return db.query(OncallSchedule).all()


@app.get("/api/operations/inspection-reports")
def list_inspection_reports(db: Session = Depends(get_db)):
    """
    获取巡检报告列表。
    """
    return db.query(InspectionReport).all()


@app.get("/api/operations/firmware")
def list_firmware(db: Session = Depends(get_db)):
    """
    获取固件版本库存。
    """
    return db.query(FirmwareInventory).all()


@app.get("/api/operations/maintenance")
def list_maintenance_assets(db: Session = Depends(get_db)):
    """
    获取维保资产清单。
    """
    return db.query(MaintenanceAsset).all()


@app.get("/api/operations/knowledge-base")
def list_kb_links(db: Session = Depends(get_db)):
    return db.query(KnowledgeBaseLink).all()


@app.get("/api/environment/readings/{reading_id}", response_model=EnvironmentReadingResponse)
def get_environment_reading(reading_id: int, db: Session = Depends(get_db)):
    reading = db.query(EnvironmentReading).filter(EnvironmentReading.id == reading_id).first()
    if not reading:
        raise HTTPException(status_code=404, detail="Environment reading not found")
    return reading


@app.put("/api/environment/readings/{reading_id}", response_model=EnvironmentReadingResponse)
def update_environment_reading(
    reading_id: int, payload: EnvironmentReadingUpdate, db: Session = Depends(get_db)
):
    reading = db.query(EnvironmentReading).filter(EnvironmentReading.id == reading_id).first()
    if not reading:
        raise HTTPException(status_code=404, detail="Environment reading not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(reading, key, value)
    db.commit()
    db.refresh(reading)
    return reading


@app.delete("/api/environment/readings/{reading_id}")
def delete_environment_reading(reading_id: int, db: Session = Depends(get_db)):
    reading = db.query(EnvironmentReading).filter(EnvironmentReading.id == reading_id).first()
    if not reading:
        raise HTTPException(status_code=404, detail="Environment reading not found")
    db.delete(reading)
    db.commit()
    return {"success": True}


@app.get("/api/power/events/{event_id}", response_model=PowerEventResponse)
def get_power_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(PowerEvent).filter(PowerEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Power event not found")
    return event


@app.put("/api/power/events/{event_id}", response_model=PowerEventResponse)
def update_power_event(event_id: int, payload: PowerEventUpdate, db: Session = Depends(get_db)):
    event = db.query(PowerEvent).filter(PowerEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Power event not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(event, key, value)
    db.commit()
    db.refresh(event)
    return event


@app.delete("/api/power/events/{event_id}")
def delete_power_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(PowerEvent).filter(PowerEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Power event not found")
    db.delete(event)
    db.commit()
    return {"success": True}


@app.get("/api/security/events/{event_id}", response_model=SecurityEventResponse)
def get_security_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(SecurityEvent).filter(SecurityEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Security event not found")
    return event


@app.put("/api/security/events/{event_id}", response_model=SecurityEventResponse)
def update_security_event(event_id: int, payload: SecurityEventUpdate, db: Session = Depends(get_db)):
    event = db.query(SecurityEvent).filter(SecurityEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Security event not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(event, key, value)
    db.commit()
    db.refresh(event)
    return event


@app.delete("/api/security/events/{event_id}")
def delete_security_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(SecurityEvent).filter(SecurityEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Security event not found")
    db.delete(event)
    db.commit()
    return {"success": True}


@app.get("/api/servers/metrics", response_model=List[ServerMetricResponse])
def list_server_metrics(db: Session = Depends(get_db)):
    return db.query(ServerMetric).order_by(ServerMetric.recorded_at.desc()).all()


@app.post("/api/servers/metrics", response_model=ServerMetricResponse)
def create_server_metric(payload: ServerMetricCreate, db: Session = Depends(get_db)):
    metric = ServerMetric(**payload.model_dump())
    db.add(metric)
    db.commit()
    db.refresh(metric)
    return metric


@app.get("/api/servers/metrics/{metric_id}", response_model=ServerMetricResponse)
def get_server_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = db.query(ServerMetric).filter(ServerMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Server metric not found")
    return metric


@app.put("/api/servers/metrics/{metric_id}", response_model=ServerMetricResponse)
def update_server_metric(metric_id: int, payload: ServerMetricUpdate, db: Session = Depends(get_db)):
    metric = db.query(ServerMetric).filter(ServerMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Server metric not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(metric, key, value)
    db.commit()
    db.refresh(metric)
    return metric


@app.delete("/api/servers/metrics/{metric_id}")
def delete_server_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = db.query(ServerMetric).filter(ServerMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Server metric not found")
    db.delete(metric)
    db.commit()
    return {"success": True}


@app.get("/api/network/metrics", response_model=List[NetworkMetricResponse])
def list_network_metrics(db: Session = Depends(get_db)):
    return db.query(NetworkMetric).order_by(NetworkMetric.recorded_at.desc()).all()


@app.post("/api/network/metrics", response_model=NetworkMetricResponse)
def create_network_metric(payload: NetworkMetricCreate, db: Session = Depends(get_db)):
    metric = NetworkMetric(**payload.model_dump())
    db.add(metric)
    db.commit()
    db.refresh(metric)
    return metric


@app.get("/api/network/metrics/{metric_id}", response_model=NetworkMetricResponse)
def get_network_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = db.query(NetworkMetric).filter(NetworkMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Network metric not found")
    return metric


@app.put("/api/network/metrics/{metric_id}", response_model=NetworkMetricResponse)
def update_network_metric(metric_id: int, payload: NetworkMetricUpdate, db: Session = Depends(get_db)):
    metric = db.query(NetworkMetric).filter(NetworkMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Network metric not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(metric, key, value)
    db.commit()
    db.refresh(metric)
    return metric


@app.delete("/api/network/metrics/{metric_id}")
def delete_network_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = db.query(NetworkMetric).filter(NetworkMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Network metric not found")
    db.delete(metric)
    db.commit()
    return {"success": True}


@app.get("/api/applications/metrics", response_model=List[ApplicationMetricResponse])
def list_application_metrics(db: Session = Depends(get_db)):
    return db.query(ApplicationMetric).order_by(ApplicationMetric.recorded_at.desc()).all()


@app.post("/api/applications/metrics", response_model=ApplicationMetricResponse)
def create_application_metric(payload: ApplicationMetricCreate, db: Session = Depends(get_db)):
    metric = ApplicationMetric(**payload.model_dump())
    db.add(metric)
    db.commit()
    db.refresh(metric)
    return metric


@app.get("/api/applications/metrics/{metric_id}", response_model=ApplicationMetricResponse)
def get_application_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = db.query(ApplicationMetric).filter(ApplicationMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Application metric not found")
    return metric


@app.put("/api/applications/metrics/{metric_id}", response_model=ApplicationMetricResponse)
def update_application_metric(
    metric_id: int, payload: ApplicationMetricUpdate, db: Session = Depends(get_db)
):
    metric = db.query(ApplicationMetric).filter(ApplicationMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Application metric not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(metric, key, value)
    db.commit()
    db.refresh(metric)
    return metric


@app.delete("/api/applications/metrics/{metric_id}")
def delete_application_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = db.query(ApplicationMetric).filter(ApplicationMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Application metric not found")
    db.delete(metric)
    db.commit()
    return {"success": True}


@app.post("/api/operations/oncall", response_model=OncallScheduleResponse)
def create_oncall_schedule(payload: OncallScheduleCreate, db: Session = Depends(get_db)):
    schedule = OncallSchedule(**payload.model_dump())
    db.add(schedule)
    db.commit()
    db.refresh(schedule)
    return schedule


@app.get("/api/operations/oncall/{schedule_id}", response_model=OncallScheduleResponse)
def get_oncall_schedule(schedule_id: int, db: Session = Depends(get_db)):
    schedule = db.query(OncallSchedule).filter(OncallSchedule.id == schedule_id).first()
    if not schedule:
        raise HTTPException(status_code=404, detail="Oncall schedule not found")
    return schedule


@app.put("/api/operations/oncall/{schedule_id}", response_model=OncallScheduleResponse)
def update_oncall_schedule(
    schedule_id: int, payload: OncallScheduleUpdate, db: Session = Depends(get_db)
):
    schedule = db.query(OncallSchedule).filter(OncallSchedule.id == schedule_id).first()
    if not schedule:
        raise HTTPException(status_code=404, detail="Oncall schedule not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(schedule, key, value)
    db.commit()
    db.refresh(schedule)
    return schedule


@app.delete("/api/operations/oncall/{schedule_id}")
def delete_oncall_schedule(schedule_id: int, db: Session = Depends(get_db)):
    schedule = db.query(OncallSchedule).filter(OncallSchedule.id == schedule_id).first()
    if not schedule:
        raise HTTPException(status_code=404, detail="Oncall schedule not found")
    db.delete(schedule)
    db.commit()
    return {"success": True}


@app.post("/api/operations/inspection-reports", response_model=InspectionReportResponse)
def create_inspection_report(payload: InspectionReportCreate, db: Session = Depends(get_db)):
    report = InspectionReport(**payload.model_dump())
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@app.get("/api/operations/inspection-reports/{report_id}", response_model=InspectionReportResponse)
def get_inspection_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(InspectionReport).filter(InspectionReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Inspection report not found")
    return report


@app.put("/api/operations/inspection-reports/{report_id}", response_model=InspectionReportResponse)
def update_inspection_report(
    report_id: int, payload: InspectionReportUpdate, db: Session = Depends(get_db)
):
    report = db.query(InspectionReport).filter(InspectionReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Inspection report not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(report, key, value)
    db.commit()
    db.refresh(report)
    return report


@app.delete("/api/operations/inspection-reports/{report_id}")
def delete_inspection_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(InspectionReport).filter(InspectionReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Inspection report not found")
    db.delete(report)
    db.commit()
    return {"success": True}


@app.post("/api/operations/firmware", response_model=FirmwareInventoryResponse)
def create_firmware(payload: FirmwareInventoryCreate, db: Session = Depends(get_db)):
    firmware = FirmwareInventory(**payload.model_dump())
    db.add(firmware)
    db.commit()
    db.refresh(firmware)
    return firmware


@app.get("/api/operations/firmware/{firmware_id}", response_model=FirmwareInventoryResponse)
def get_firmware(firmware_id: int, db: Session = Depends(get_db)):
    firmware = db.query(FirmwareInventory).filter(FirmwareInventory.id == firmware_id).first()
    if not firmware:
        raise HTTPException(status_code=404, detail="Firmware not found")
    return firmware


@app.put("/api/operations/firmware/{firmware_id}", response_model=FirmwareInventoryResponse)
def update_firmware(
    firmware_id: int, payload: FirmwareInventoryUpdate, db: Session = Depends(get_db)
):
    firmware = db.query(FirmwareInventory).filter(FirmwareInventory.id == firmware_id).first()
    if not firmware:
        raise HTTPException(status_code=404, detail="Firmware not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(firmware, key, value)
    db.commit()
    db.refresh(firmware)
    return firmware


@app.delete("/api/operations/firmware/{firmware_id}")
def delete_firmware(firmware_id: int, db: Session = Depends(get_db)):
    firmware = db.query(FirmwareInventory).filter(FirmwareInventory.id == firmware_id).first()
    if not firmware:
        raise HTTPException(status_code=404, detail="Firmware not found")
    db.delete(firmware)
    db.commit()
    return {"success": True}


@app.post("/api/operations/maintenance", response_model=MaintenanceAssetResponse)
def create_maintenance_asset(payload: MaintenanceAssetCreate, db: Session = Depends(get_db)):
    asset = MaintenanceAsset(**payload.model_dump())
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset


@app.get("/api/operations/maintenance/{asset_id}", response_model=MaintenanceAssetResponse)
def get_maintenance_asset(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(MaintenanceAsset).filter(MaintenanceAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Maintenance asset not found")
    return asset


@app.put("/api/operations/maintenance/{asset_id}", response_model=MaintenanceAssetResponse)
def update_maintenance_asset(
    asset_id: int, payload: MaintenanceAssetUpdate, db: Session = Depends(get_db)
):
    asset = db.query(MaintenanceAsset).filter(MaintenanceAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Maintenance asset not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(asset, key, value)
    db.commit()
    db.refresh(asset)
    return asset


@app.delete("/api/operations/maintenance/{asset_id}")
def delete_maintenance_asset(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(MaintenanceAsset).filter(MaintenanceAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Maintenance asset not found")
    db.delete(asset)
    db.commit()
    return {"success": True}


@app.post("/api/operations/knowledge-base", response_model=KnowledgeBaseLinkResponse)
def create_kb_link(payload: KnowledgeBaseLinkCreate, db: Session = Depends(get_db)):
    link = KnowledgeBaseLink(**payload.model_dump())
    db.add(link)
    db.commit()
    db.refresh(link)
    return link


@app.get("/api/operations/knowledge-base/{link_id}", response_model=KnowledgeBaseLinkResponse)
def get_kb_link(link_id: int, db: Session = Depends(get_db)):
    link = db.query(KnowledgeBaseLink).filter(KnowledgeBaseLink.id == link_id).first()
    if not link:
        raise HTTPException(status_code=404, detail="Knowledge base link not found")
    return link


@app.put("/api/operations/knowledge-base/{link_id}", response_model=KnowledgeBaseLinkResponse)
def update_kb_link(link_id: int, payload: KnowledgeBaseLinkUpdate, db: Session = Depends(get_db)):
    link = db.query(KnowledgeBaseLink).filter(KnowledgeBaseLink.id == link_id).first()
    if not link:
        raise HTTPException(status_code=404, detail="Knowledge base link not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(link, key, value)
    db.commit()
    db.refresh(link)
    return link


@app.delete("/api/operations/knowledge-base/{link_id}")
def delete_kb_link(link_id: int, db: Session = Depends(get_db)):
    link = db.query(KnowledgeBaseLink).filter(KnowledgeBaseLink.id == link_id).first()
    if not link:
        raise HTTPException(status_code=404, detail="Knowledge base link not found")
    db.delete(link)
    db.commit()
    return {"success": True}


@app.post("/api/alerting/multi-channel", response_model=AlertResponse)
def send_multi_channel_alert(payload: AlertNotificationRequest, db: Session = Depends(get_db)):
    feature = db.query(MonitoringFeature).filter(MonitoringFeature.code == payload.feature_code).first()
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    alert = Alert(
        feature_code=payload.feature_code,
        title="多渠道通知",
        message=f"{payload.message} | 通道: {', '.join(payload.channels)}",
        severity=payload.severity,
        status="active",
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert
