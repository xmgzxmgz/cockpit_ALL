from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class CabinetResponse(BaseModel):
    room_id: str
    FKHNAME: str
    cabinet_id: str
    FENAME: Optional[str] = None
    maintainer: Optional[str] = None
    KHMANAGE: Optional[str] = None
    color: Optional[str] = None # Added for frontend compatibility

    class Config:
        from_attributes = True

class CabinetDetailResponse(BaseModel):
    id: int
    cabinet_label: str
    room_id: str
    enterprise_name: Optional[str] = None
    status: str
    total_u: int
    used_u: int
    power_usage: float
    temperature: float
    device_count: int
    updated_at: datetime
    
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

# New schemas for Cockpit

class CockpitStats(BaseModel):
    total_cabinets: int
    total_power: float
    total_capacity: float
    active_alerts: int
    pue: float

class EnterpriseResponse(BaseModel):
    id: int
    name: str
    contact: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    color: Optional[str] = None

    class Config:
        from_attributes = True

class RoomResponse(BaseModel):
    id: str
    name: str
    location: Optional[str] = None
    manager: Optional[str] = None
    phone: Optional[str] = None
    
    class Config:
        from_attributes = True
