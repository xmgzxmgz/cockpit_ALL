"""机房机柜布局数据库模块"""
from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Text,
    DateTime,
    JSON,
    BigInteger,
    Float,
    create_engine,
    UniqueConstraint,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os
import random
import json

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@localhost:5434/cockpit_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class RoomLayoutConfig(Base):
    """机房布局配置表"""
    __tablename__ = "room_layout_config"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String(50), unique=True, nullable=False)
    room_name = Column(String(100))
    cols = Column(Integer, default=30)
    rows = Column(Integer, default=30)
    max_racks = Column(Integer)
    default_color = Column(String(50), default='#4a4a4a')
    is_clickable = Column(Boolean, default=True)
    is_hover_animation_enabled = Column(Boolean, default=True)
    hover_duration = Column(Integer, default=200)
    hover_easing = Column(String(50), default='ease-out')
    hover_scale = Column(Float, default=1.05)
    hover_shadow_intensity = Column(Float, default=0.3)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class CabinetConfig(Base):
    """机柜配置表"""
    __tablename__ = "cabinet_config"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String(50), nullable=False)
    cabinet_id = Column(Integer, nullable=False)
    col_position = Column(Integer, nullable=False)
    row_position = Column(Integer, nullable=False)
    enterprise = Column(String(255))
    enabled = Column(Boolean, default=True)
    color = Column(String(50))
    is_hidden = Column(Boolean, default=False)
    visible_index = Column(Integer)
    name = Column(String(255))
    maintainer = Column(String(100))
    manager = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint('room_id', 'cabinet_id', name='uix_room_cabinet'),
    )


class AreaFrameConfig(Base):
    """区域框架配置表"""
    __tablename__ = "area_frame_config"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String(50), nullable=False)
    frame_id = Column(String(50), nullable=False)
    label = Column(String(100))
    rack_range = Column(Text)
    color = Column(String(50), default='#4682B4')
    border_width = Column(Integer, default=3)
    label_position = Column(String(20), default='top')
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint('room_id', 'frame_id', name='uix_room_frame'),
    )


class CabinetLayoutOrder(Base):
    """机柜布局排序表（用于随机打乱功能）"""
    __tablename__ = "cabinet_layout_order"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String(50), nullable=False)
    original_order = Column(JSON, nullable=False)
    shuffled_order = Column(JSON, nullable=False)
    shuffle_seed = Column(String(100))
    is_active = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint('room_id', 'is_active', name='uix_room_active'),
    )


class DbBackupRecord(Base):
    """数据库备份记录表"""
    __tablename__ = "db_backup_record"

    id = Column(Integer, primary_key=True, index=True)
    backup_name = Column(String(255), nullable=False)
    backup_path = Column(String(500))
    backup_type = Column(String(50), default='full')
    backup_size = Column(BigInteger)
    checksum = Column(String(128))
    created_at = Column(DateTime, default=datetime.utcnow)
    description = Column(Text)


def get_db():
    """获取数据库会话"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_room_layout_db():
    """初始化机房布局数据库表"""
    Base.metadata.create_all(bind=engine)


def get_all_rooms(db) -> list:
    """获取所有机房配置"""
    return db.query(RoomLayoutConfig).all()


def get_room_by_id(db, room_id: str) -> RoomLayoutConfig:
    """根据机房ID获取机房配置"""
    return db.query(RoomLayoutConfig).filter(RoomLayoutConfig.room_id == room_id).first()


def get_clickable_rooms(db) -> list:
    """获取所有可点击的机房"""
    return db.query(RoomLayoutConfig).filter(RoomLayoutConfig.is_clickable == True).all()


def get_hover_animation_rooms(db) -> list:
    """获取所有开启悬停动画的机房"""
    return db.query(RoomLayoutConfig).filter(RoomLayoutConfig.is_hover_animation_enabled == True).all()


def is_room_clickable(db, room_id: str) -> bool:
    """检查机房是否可点击"""
    room = get_room_by_id(db, room_id)
    return room.is_clickable if room else False


def is_room_hover_animation_enabled(db, room_id: str) -> bool:
    """检查机房是否开启悬停动画"""
    room = get_room_by_id(db, room_id)
    return room.is_hover_animation_enabled if room else False


def get_room_hover_animation_config(db, room_id: str) -> dict:
    """获取机房悬停动画配置"""
    room = get_room_by_id(db, room_id)
    if not room:
        return {
            "duration": 200,
            "easing": "ease-out",
            "scale": 1.05,
            "shadowIntensity": 0.3
        }
    return {
        "duration": room.hover_duration or 200,
        "easing": room.hover_easing or "ease-out",
        "scale": room.hover_scale or 1.05,
        "shadowIntensity": room.hover_shadow_intensity or 0.3
    }


def get_room_default_color(db, room_id: str) -> str:
    """获取机房默认颜色"""
    room = get_room_by_id(db, room_id)
    return room.default_color if room else '#4a4a4a'


def get_room_grid_info(db, room_id: str) -> dict:
    """获取机房网格信息"""
    room = get_room_by_id(db, room_id)
    if not room:
        return {"cols": 30, "rows": 30}
    return {
        "cols": room.cols,
        "rows": room.rows
    }


def get_room_max_racks(db, room_id: str) -> int:
    """获取机房最大机柜数"""
    room = get_room_by_id(db, room_id)
    return room.max_racks if room else 660


def get_room_cabinets(db, room_id: str) -> list:
    """获取机房的所有机柜配置"""
    return db.query(CabinetConfig).filter(CabinetConfig.room_id == room_id).order_by(CabinetConfig.cabinet_id).all()


def get_enabled_cabinets(db, room_id: str) -> list:
    """获取机房已启用的机柜"""
    return db.query(CabinetConfig).filter(
        CabinetConfig.room_id == room_id,
        CabinetConfig.enabled == True
    ).order_by(CabinetConfig.cabinet_id).all()


def get_room_area_frames(db, room_id: str) -> list:
    """获取机房区域框架配置"""
    return db.query(AreaFrameConfig).filter(AreaFrameConfig.room_id == room_id).all()


def get_room_layout_order(db, room_id: str, active: bool = True) -> CabinetLayoutOrder:
    """获取机房当前激活的布局排序"""
    return db.query(CabinetLayoutOrder).filter(
        CabinetLayoutOrder.room_id == room_id,
        CabinetLayoutOrder.is_active == active
    ).first()


def shuffle_room_layout(db, room_id: str, seed: int = None) -> CabinetLayoutOrder:
    """随机打乱机房布局排序"""
    if seed is not None:
        random.seed(seed)
    else:
        seed = random.randint(100000, 999999)
        random.seed(seed)

    room = get_room_by_id(db, room_id)
    if not room:
        raise ValueError(f"机房 {room_id} 不存在")

    cabinets = get_enabled_cabinets(db, room_id)
    original_order = [c.cabinet_id for c in cabinets]
    shuffled_order = original_order.copy()
    random.shuffle(shuffled_order)

    db.query(CabinetLayoutOrder).filter(
        CabinetLayoutOrder.room_id == room_id,
        CabinetLayoutOrder.is_active == True
    ).update({'is_active': False})

    new_order = CabinetLayoutOrder(
        room_id=room_id,
        original_order=original_order,
        shuffled_order=shuffled_order,
        shuffle_seed=str(seed),
        is_active=True
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for idx, cab_id in enumerate(shuffled_order):
        cabinet = next((c for c in cabinets if c.cabinet_id == cab_id), None)
        if cabinet:
            cabinet.visible_index = idx + 1

    db.commit()
    return new_order


def reset_room_layout(db, room_id: str) -> bool:
    """重置机房布局到原始顺序"""
    db.query(CabinetLayoutOrder).filter(
        CabinetLayoutOrder.room_id == room_id,
        CabinetLayoutOrder.is_active == True
    ).update({'is_active': False})

    cabinets = get_enabled_cabinets(db, room_id)
    for idx, cabinet in enumerate(cabinets):
        cabinet.visible_index = idx + 1

    db.commit()
    return True


def update_room_settings(db, room_id: str, **kwargs) -> RoomLayoutConfig:
    """更新机房设置"""
    room = get_room_by_id(db, room_id)
    if not room:
        raise ValueError(f"机房 {room_id} 不存在")

    allowed_fields = [
        'room_name', 'cols', 'rows', 'max_racks', 'default_color',
        'is_clickable', 'is_hover_animation_enabled',
        'hover_duration', 'hover_easing', 'hover_scale', 'hover_shadow_intensity'
    ]
    for key, value in kwargs.items():
        if key in allowed_fields and value is not None:
            setattr(room, key, value)

    room.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(room)
    return room


def update_cabinet_enterprise(db, room_id: str, cabinet_id: int, enterprise: str, color: str = None) -> CabinetConfig:
    """更新机柜所属企业"""
    cabinet = db.query(CabinetConfig).filter(
        CabinetConfig.room_id == room_id,
        CabinetConfig.cabinet_id == cabinet_id
    ).first()

    if not cabinet:
        raise ValueError(f"机柜 {cabinet_id} 不存在")

    cabinet.enterprise = enterprise
    if color:
        cabinet.color = color
    elif color is None and enterprise:
        from .mock_data import get_enterprise_color
        cabinet.color = get_enterprise_color(enterprise)

    cabinet.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(cabinet)
    return cabinet


def bulk_update_cabinets(db, room_id: str, cabinet_ids: list, enterprise: str = None, enabled: bool = None, color: str = None) -> int:
    """批量更新机柜"""
    query = db.query(CabinetConfig).filter(CabinetConfig.room_id == room_id)
    if cabinet_ids:
        query = query.filter(CabinetConfig.cabinet_id.in_(cabinet_ids))

    cabinets = query.all()
    count = 0

    for cabinet in cabinets:
        if enterprise is not None:
            cabinet.enterprise = enterprise if enterprise else None
        if enabled is not None:
            cabinet.enabled = enabled
        if color is not None:
            cabinet.color = color
        elif enterprise is not None and enterprise:
            from .mock_data import get_enterprise_color
            cabinet.color = get_enterprise_color(enterprise)
        cabinet.updated_at = datetime.utcnow()
        count += 1

    db.commit()
    return count


def create_backup_record(db, backup_name: str, backup_path: str, backup_type: str = 'full', description: str = None) -> DbBackupRecord:
    """创建备份记录"""
    record = DbBackupRecord(
        backup_name=backup_name,
        backup_path=backup_path,
        backup_type=backup_type,
        description=description
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def get_backup_records(db, limit: int = 10) -> list:
    """获取备份记录列表"""
    return db.query(DbBackupRecord).order_by(DbBackupRecord.created_at.desc()).limit(limit).all()


def get_latest_backup(db) -> DbBackupRecord:
    """获取最新备份记录"""
    return db.query(DbBackupRecord).order_by(DbBackupRecord.created_at.desc()).first()
