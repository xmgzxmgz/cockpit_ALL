from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    ForeignKey,
    Boolean,
    DateTime,
    Float,
    Text,
    JSON,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/cockpit_db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class Enterprise(Base):
    __tablename__ = "enterprises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    full_name = Column(String)
    maintainer = Column(String)
    manager = Column(String)
    color = Column(String)

    cabinets = relationship("Cabinet", back_populates="enterprise")


class Room(Base):
    __tablename__ = "rooms"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String)
    cols = Column(Integer, default=30)
    rows = Column(Integer, default=22)
    max_racks = Column(Integer)
    status = Column(String, default="active")

    cabinets = relationship("Cabinet", back_populates="room")


class Cabinet(Base):
    __tablename__ = "cabinets"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String, ForeignKey("rooms.id"))
    enterprise_id = Column(Integer, ForeignKey("enterprises.id"))
    cabinet_label = Column(String, nullable=False)
    status = Column(String, default="active")

    room = relationship("Room", back_populates="cabinets")
    enterprise = relationship("Enterprise", back_populates="cabinets")


class FeatureCategory(Base):
    __tablename__ = "feature_categories"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)


class MonitoringFeature(Base):
    __tablename__ = "monitoring_features"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    category_code = Column(String, ForeignKey("feature_categories.code"))
    enabled = Column(Boolean, default=True)
    status = Column(String, default="normal")
    severity = Column(String, default="info")
    unit = Column(String)
    latest_value = Column(String)
    config = Column(JSON)
    updated_at = Column(DateTime, default=datetime.utcnow)

    metrics = relationship("FeatureMetric", back_populates="feature")
    alerts = relationship("Alert", back_populates="feature")
    rules = relationship("AlertRule", back_populates="feature")


class FeatureMetric(Base):
    __tablename__ = "feature_metrics"

    id = Column(Integer, primary_key=True, index=True)
    feature_code = Column(String, ForeignKey("monitoring_features.code"))
    metric_key = Column(String)
    metric_value = Column(String)
    unit = Column(String)
    collected_at = Column(DateTime, default=datetime.utcnow)

    feature = relationship("MonitoringFeature", back_populates="metrics")


class AlertRule(Base):
    __tablename__ = "alert_rules"

    id = Column(Integer, primary_key=True, index=True)
    feature_code = Column(String, ForeignKey("monitoring_features.code"))
    rule_name = Column(String)
    comparator = Column(String)
    threshold = Column(Float)
    duration_minutes = Column(Integer, default=0)
    enabled = Column(Boolean, default=True)
    severity = Column(String, default="warning")

    feature = relationship("MonitoringFeature", back_populates="rules")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    feature_code = Column(String, ForeignKey("monitoring_features.code"))
    rule_id = Column(Integer, ForeignKey("alert_rules.id"), nullable=True)
    title = Column(String)
    message = Column(Text)
    severity = Column(String)
    status = Column(String, default="active")
    triggered_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

    feature = relationship("MonitoringFeature", back_populates="alerts")


class EnvironmentReading(Base):
    __tablename__ = "environment_readings"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String)
    sensor_type = Column(String)
    value = Column(Float)
    unit = Column(String)
    recorded_at = Column(DateTime, default=datetime.utcnow)


class PowerEvent(Base):
    __tablename__ = "power_events"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String)
    event_type = Column(String)
    severity = Column(String)
    detail = Column(Text)
    occurred_at = Column(DateTime, default=datetime.utcnow)


class ServerMetric(Base):
    __tablename__ = "server_metrics"

    id = Column(Integer, primary_key=True, index=True)
    server_name = Column(String)
    metric_key = Column(String)
    metric_value = Column(String)
    unit = Column(String)
    recorded_at = Column(DateTime, default=datetime.utcnow)


class NetworkMetric(Base):
    __tablename__ = "network_metrics"

    id = Column(Integer, primary_key=True, index=True)
    link_name = Column(String)
    metric_key = Column(String)
    metric_value = Column(String)
    unit = Column(String)
    recorded_at = Column(DateTime, default=datetime.utcnow)


class ApplicationMetric(Base):
    __tablename__ = "application_metrics"

    id = Column(Integer, primary_key=True, index=True)
    app_name = Column(String)
    metric_key = Column(String)
    metric_value = Column(String)
    unit = Column(String)
    recorded_at = Column(DateTime, default=datetime.utcnow)


class SecurityEvent(Base):
    __tablename__ = "security_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String)
    severity = Column(String)
    detail = Column(Text)
    occurred_at = Column(DateTime, default=datetime.utcnow)


class OncallSchedule(Base):
    __tablename__ = "oncall_schedules"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    duty_user = Column(String)
    days = Column(String)
    start_time = Column(String)
    end_time = Column(String)


class InspectionReport(Base):
    __tablename__ = "inspection_reports"

    id = Column(Integer, primary_key=True, index=True)
    report_date = Column(DateTime)
    summary = Column(Text)
    file_url = Column(String)


class FirmwareInventory(Base):
    __tablename__ = "firmware_inventory"

    id = Column(Integer, primary_key=True, index=True)
    device_name = Column(String)
    device_type = Column(String)
    firmware_version = Column(String)
    last_checked = Column(DateTime, default=datetime.utcnow)


class MaintenanceAsset(Base):
    __tablename__ = "maintenance_assets"

    id = Column(Integer, primary_key=True, index=True)
    asset_name = Column(String)
    asset_type = Column(String)
    warranty_expiry = Column(DateTime)


class KnowledgeBaseLink(Base):
    __tablename__ = "knowledge_base_links"

    id = Column(Integer, primary_key=True, index=True)
    feature_code = Column(String, ForeignKey("monitoring_features.code"))
    title = Column(String)
    url = Column(String)


def get_db():
    """
    获取数据库会话。

    Returns:
        Generator: SQLAlchemy session 生成器。
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
