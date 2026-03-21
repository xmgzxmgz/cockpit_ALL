import os
import random
import sys
from datetime import datetime, timedelta

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import (  # noqa: E402
    Alert,
    AlertRule,
    ApplicationMetric,
    Cabinet,
    Enterprise,
    EnvironmentReading,
    FeatureCategory,
    FeatureMetric,
    FirmwareInventory,
    InspectionReport,
    KnowledgeBaseLink,
    MaintenanceAsset,
    MonitoringFeature,
    NetworkMetric,
    OncallSchedule,
    PowerEvent,
    Room,
    SecurityEvent,
    ServerMetric,
)
from app.mock_data import MOCK_CATEGORIES, MOCK_FEATURES  # noqa: E402


DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/cockpit_db")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def _rhex() -> str:
    return f"#{random.randint(0, 0xFFFFFF):06x}"


def _seed_reference_data(db):
    for item in MOCK_CATEGORIES:
        row = db.query(FeatureCategory).filter(FeatureCategory.code == item["code"]).first()
        if row:
            row.name = item["name"]
            row.description = item["description"]
        else:
            db.add(FeatureCategory(**item))

    for item in MOCK_FEATURES:
        row = db.query(MonitoringFeature).filter(MonitoringFeature.code == item["code"]).first()
        payload = dict(item)
        payload.setdefault("enabled", True)
        payload.setdefault("status", "normal")
        payload.setdefault("severity", "info")
        if row:
            for k, v in payload.items():
                setattr(row, k, v)
            row.updated_at = datetime.utcnow()
        else:
            db.add(MonitoringFeature(updated_at=datetime.utcnow(), **payload))

    db.commit()


def _truncate_fact_tables(db):
    tables = [
        "knowledge_base_links",
        "alerts",
        "alert_rules",
        "feature_metrics",
        "environment_readings",
        "power_events",
        "server_metrics",
        "network_metrics",
        "application_metrics",
        "security_events",
        "oncall_schedules",
        "inspection_reports",
        "firmware_inventory",
        "maintenance_assets",
        "cabinets",
        "rooms",
        "enterprises",
    ]
    for t in tables:
        db.execute(text(f"TRUNCATE TABLE {t} RESTART IDENTITY CASCADE"))
    db.commit()


def seed_random_data() -> None:
    db = SessionLocal()
    try:
        random.seed(20260321)
        _truncate_fact_tables(db)
        _seed_reference_data(db)

        enterprises = []
        for i in range(1, 21):
            e = Enterprise(
                name=f"企业{i:02d}",
                full_name=f"企业{i:02d}数据服务有限公司",
                maintainer=f"运维{i:02d}",
                manager=f"客户经理{i:02d}",
                color=_rhex(),
            )
            enterprises.append(e)
            db.add(e)
        db.flush()

        room_ids = ["201", "202", "203", "204", "301", "302"]
        rooms = []
        for rid in room_ids:
            room = Room(
                id=rid,
                name=f"{rid}机房",
                location=f"{rid[0]}楼{rid[1:]}区",
                cols=30,
                rows=22,
                max_racks=120,
                status="active",
            )
            rooms.append(room)
            db.add(room)
        db.flush()

        # Unique cabinet labels per room: A01..A80
        for room in rooms:
            for idx in range(1, 81):
                owner = random.choice(enterprises + [None, None, None])
                db.add(
                    Cabinet(
                        room_id=room.id,
                        enterprise_id=owner.id if owner else None,
                        cabinet_label=f"A{idx:02d}",
                        status=random.choice(["active", "active", "warning", "inactive"]),
                    )
                )

        db.flush()

        feature_codes = [f.code for f in db.query(MonitoringFeature.code).all()]
        now = datetime.utcnow()

        for code in feature_codes:
            for j in range(8):
                db.add(
                    FeatureMetric(
                        feature_code=code,
                        metric_key="sample",
                        metric_value=str(round(random.uniform(1, 100), 2)),
                        unit="unit",
                        collected_at=now - timedelta(minutes=15 * j),
                    )
                )

            if random.random() < 0.35:
                rule = AlertRule(
                    feature_code=code,
                    rule_name=f"{code}阈值规则",
                    comparator=">",
                    threshold=round(random.uniform(50, 95), 2),
                    duration_minutes=random.choice([0, 5, 10, 15]),
                    enabled=True,
                    severity=random.choice(["warning", "critical"]),
                )
                db.add(rule)
                db.flush()
                if random.random() < 0.5:
                    db.add(
                        Alert(
                            feature_code=code,
                            rule_id=rule.id,
                            title=f"{code}触发告警",
                            message=f"检测到 {code} 指标异常。",
                            severity=rule.severity,
                            status=random.choice(["active", "resolved"]),
                            triggered_at=now - timedelta(minutes=random.randint(1, 720)),
                            resolved_at=None,
                        )
                    )

            if random.random() < 0.25:
                db.add(
                    KnowledgeBaseLink(
                        feature_code=code,
                        title=f"{code}处理指南",
                        url=f"https://kb.local/{code.replace('.', '-')}",
                    )
                )

        sensor_types = [("temperature", "°C", 18, 33), ("humidity", "%", 30, 75), ("pm25", "ug/m3", 5, 70)]
        for room in rooms:
            for _ in range(20):
                s, u, lo, hi = random.choice(sensor_types)
                db.add(
                    EnvironmentReading(
                        room_id=room.id,
                        sensor_type=s,
                        value=round(random.uniform(lo, hi), 2),
                        unit=u,
                        recorded_at=now - timedelta(minutes=random.randint(1, 1440)),
                    )
                )

            for _ in range(8):
                db.add(
                    PowerEvent(
                        room_id=room.id,
                        event_type=random.choice(["ups_switch", "voltage_sag", "power_restore"]),
                        severity=random.choice(["info", "warning", "critical"]),
                        detail="自动生成电力事件",
                        occurred_at=now - timedelta(hours=random.randint(1, 240)),
                    )
                )

        for i in range(120):
            db.add(
                ServerMetric(
                    server_name=f"SRV-{i % 20 + 1:02d}",
                    metric_key=random.choice(["cpu_usage", "memory_usage", "disk_usage"]),
                    metric_value=str(round(random.uniform(1, 99), 2)),
                    unit="%",
                    recorded_at=now - timedelta(minutes=random.randint(1, 720)),
                )
            )
            db.add(
                NetworkMetric(
                    link_name=f"core-link-{i % 10 + 1}",
                    metric_key=random.choice(["latency", "packet_loss", "throughput"]),
                    metric_value=str(round(random.uniform(0.1, 900), 2)),
                    unit=random.choice(["ms", "%", "Mbps"]),
                    recorded_at=now - timedelta(minutes=random.randint(1, 720)),
                )
            )
            db.add(
                ApplicationMetric(
                    app_name=f"service-{i % 12 + 1}",
                    metric_key=random.choice(["response_time", "error_rate", "queue_depth"]),
                    metric_value=str(round(random.uniform(0.1, 5000), 2)),
                    unit=random.choice(["ms", "%", "msg"]),
                    recorded_at=now - timedelta(minutes=random.randint(1, 720)),
                )
            )

        for _ in range(30):
            db.add(
                SecurityEvent(
                    event_type=random.choice(["unauthorized_access", "abnormal_login", "video_motion"]),
                    severity=random.choice(["info", "warning", "critical"]),
                    detail="自动生成安防事件",
                    occurred_at=now - timedelta(minutes=random.randint(1, 4320)),
                )
            )

        for i in range(8):
            db.add(
                OncallSchedule(
                    name=f"值班组{i + 1}",
                    duty_user=f"工程师{i + 1}",
                    days=random.choice(["Mon-Fri", "Sat,Sun", "Mon,Wed,Fri", "Tue,Thu"]),
                    start_time=random.choice(["00:00", "08:00", "16:00"]),
                    end_time=random.choice(["08:00", "16:00", "24:00"]),
                )
            )

        for i in range(12):
            db.add(
                InspectionReport(
                    report_date=now - timedelta(days=i * 3),
                    summary=f"自动巡检报告#{i + 1}",
                    file_url=f"/reports/auto_{i + 1:02d}.pdf",
                )
            )

        for i in range(20):
            db.add(
                FirmwareInventory(
                    device_name=f"device-{i + 1}",
                    device_type=random.choice(["Switch", "UPS", "PDU", "Server"]),
                    firmware_version=f"v{random.randint(1, 5)}.{random.randint(0, 9)}.{random.randint(0, 20)}",
                    last_checked=now - timedelta(days=random.randint(0, 90)),
                )
            )
            db.add(
                MaintenanceAsset(
                    asset_name=f"asset-{i + 1}",
                    asset_type=random.choice(["Server", "Switch", "AC", "UPS"]),
                    warranty_expiry=now + timedelta(days=random.randint(30, 1200)),
                )
            )

        db.commit()
        print("Random data seeding done.")
    except Exception as exc:
        db.rollback()
        raise RuntimeError(f"seed_random_data failed: {exc}") from exc
    finally:
        db.close()


if __name__ == "__main__":
    seed_random_data()
