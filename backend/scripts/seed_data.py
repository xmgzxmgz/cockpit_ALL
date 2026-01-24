
import os
import sys
import random
from datetime import datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 添加 backend 目录到 sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from app.database import (
    Base,
    FeatureCategory,
    MonitoringFeature,
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
    Alert,
    AlertRule,
    Enterprise,
    Room,
    Cabinet
)
from app.mock_data import MOCK_CATEGORIES, MOCK_FEATURES

# 数据库连接
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/cockpit_db")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def generate_color():
    """生成随机颜色"""
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))

def seed_data():
    db = SessionLocal()
    try:
        print("Starting data seeding...")

        # 1. 填充功能分类 (FeatureCategory)
        for cat_data in MOCK_CATEGORIES:
            cat = db.query(FeatureCategory).filter_by(code=cat_data["code"]).first()
            if not cat:
                cat = FeatureCategory(**cat_data)
                db.add(cat)
            else:
                cat.name = cat_data["name"]
                cat.description = cat_data["description"]
        db.commit()

        # 2. 填充具体功能 (MonitoringFeature)
        for feat_data in MOCK_FEATURES:
            feat = db.query(MonitoringFeature).filter_by(code=feat_data["code"]).first()
            if not feat:
                feat = MonitoringFeature(**feat_data)
                db.add(feat)
            else:
                for key, value in feat_data.items():
                    setattr(feat, key, value)
        db.commit()

        # 3. 填充企业 (Enterprise)
        print("Seeding enterprises...")
        # 清除旧数据 (可选，这里我们选择保留或更新)
        # db.query(Enterprise).delete()
        
        enterprises = []
        for i in range(1, 51):
            name = f"模拟企业{i}"
            ent = db.query(Enterprise).filter_by(name=name).first()
            if not ent:
                ent = Enterprise(
                    name=name,
                    full_name=f"模拟科技发展有限公司_{i}",
                    maintainer=f"运维_{i}",
                    manager=f"经理_{i}",
                    color=generate_color()
                )
                db.add(ent)
                db.flush() # 获取 ID
            enterprises.append(ent)
        db.commit()

        # 4. 填充机房 (Room) 和机柜 (Cabinet)
        print("Seeding rooms and cabinets...")
        room_configs = [
            {"id": "1-1", "name": "核心机房1", "location": "F1-R1", "cols": 30, "rows": 22, "max_racks": 720},
            {"id": "205", "name": "扩展机房2", "location": "F2-R5", "cols": 30, "rows": 23, "max_racks": 690},
            {"id": "401", "name": "标准机房3", "location": "F4-R1", "cols": 30, "rows": 23, "max_racks": 690},
            {"id": "503", "name": "高密机房4", "location": "F5-R3", "cols": 30, "rows": 22, "max_racks": 600},
        ]

        for config in room_configs:
            room = db.query(Room).filter_by(id=config["id"]).first()
            if not room:
                room = Room(
                    id=config["id"],
                    name=config["name"],
                    location=config["location"],
                    cols=config["cols"],
                    rows=config["rows"],
                    max_racks=config["max_racks"],
                    status="active"
                )
                db.add(room)
                db.flush()
            
            # 填充机柜
            # 为了演示，我们在每个机房随机生成一些机柜
            # 假设机柜编号格式为 R-{row}-{col}
            # 清除该机房现有机柜以避免冲突 (简单处理)
            db.query(Cabinet).filter_by(room_id=room.id).delete()
            
            total_cabinets = int(config["max_racks"] * 0.7) # 70% 占用率
            for _ in range(total_cabinets):
                row = random.randint(1, config["rows"])
                col = random.randint(1, config["cols"])
                label = f"{row:02d}-{col:02d}"
                
                # 随机分配企业
                ent = random.choice(enterprises) if random.random() > 0.1 else None # 10% 空闲
                
                cabinet = Cabinet(
                    room_id=room.id,
                    enterprise_id=ent.id if ent else None,
                    cabinet_label=label,
                    status=random.choice(["active", "active", "active", "warning", "error"]) if ent else "inactive"
                )
                db.add(cabinet)
        db.commit()

        # 5. 填充环境读数 (EnvironmentReading)
        print("Seeding environment readings...")
        sensors = ["temperature", "humidity", "noise", "pm25"]
        for room_conf in room_configs:
            room_id = room_conf["id"]
            for _ in range(5): # 每个机房生成5个点
                for sensor in sensors:
                    val = 0
                    unit = ""
                    if sensor == "temperature":
                        val = random.uniform(20, 28)
                        unit = "°C"
                    elif sensor == "humidity":
                        val = random.uniform(30, 60)
                        unit = "%"
                    elif sensor == "noise":
                        val = random.uniform(40, 70)
                        unit = "dB"
                    elif sensor == "pm25":
                        val = random.uniform(10, 50)
                        unit = "ug/m3"
                    
                    reading = EnvironmentReading(
                        room_id=room_id,
                        sensor_type=sensor,
                        value=round(val, 2),
                        unit=unit,
                        recorded_at=datetime.utcnow() - timedelta(minutes=random.randint(1, 120))
                    )
                    db.add(reading)
        
        # 6. 填充其他监控数据 (简化)
        # ... (保留原有的其他填充逻辑如果需要，或者假设 Feature 表已经足够)
        
        db.commit()
        print("Data seeding completed successfully!")

    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
