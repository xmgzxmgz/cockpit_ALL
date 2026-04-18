"""机房布局配置 API 路由"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import subprocess
import os
import shutil
from decimal import Decimal

from app.room_layout_db import (
    get_db,
    RoomLayoutConfig,
    CabinetConfig,
    AreaFrameConfig,
    CabinetLayoutOrder,
    DbBackupRecord,
    get_all_rooms,
    get_room_by_id,
    get_room_cabinets,
    get_enabled_cabinets,
    get_room_area_frames,
    get_room_layout_order,
    get_clickable_rooms,
    get_hover_animation_rooms,
    is_room_clickable,
    is_room_hover_animation_enabled,
    get_room_hover_animation_config,
    get_room_default_color,
    get_room_grid_info,
    get_room_max_racks,
    shuffle_room_layout,
    reset_room_layout,
    update_room_settings,
    update_cabinet_enterprise,
    bulk_update_cabinets,
    create_backup_record,
    get_backup_records,
    get_latest_backup,
)

router = APIRouter(prefix="/api/room-layout", tags=["room-layout"])

BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "backups")
os.makedirs(BACKUP_DIR, exist_ok=True)


class RoomLayoutResponse(BaseModel):
    room_id: str
    room_name: Optional[str] = None
    cols: int
    rows: int
    max_racks: int
    default_color: str
    is_clickable: bool = True
    is_hover_animation_enabled: bool = True
    hover_duration: int = 200
    hover_easing: str = 'ease-out'
    hover_scale: float = 1.05
    hover_shadow_intensity: float = 0.3

    class Config:
        from_attributes = True


class CabinetConfigResponse(BaseModel):
    id: int
    room_id: str
    cabinet_id: int
    col_position: int
    row_position: int
    enterprise: Optional[str] = None
    enabled: bool
    color: Optional[str] = None
    is_hidden: bool
    visible_index: Optional[int] = None
    name: Optional[str] = None
    maintainer: Optional[str] = None
    manager: Optional[str] = None

    class Config:
        from_attributes = True


class AreaFrameResponse(BaseModel):
    id: int
    room_id: str
    frame_id: str
    label: Optional[str] = None
    rack_range: Optional[str] = None
    color: str
    border_width: int
    label_position: str

    class Config:
        from_attributes = True


class ShuffleRequest(BaseModel):
    room_id: str
    seed: Optional[int] = None


class ShuffleResponse(BaseModel):
    room_id: str
    original_order: List[int]
    shuffled_order: List[int]
    shuffle_seed: str
    message: str


class CabinetUpdateRequest(BaseModel):
    room_id: str
    cabinet_ids: List[int]
    enterprise: Optional[str] = None
    enabled: Optional[bool] = None
    color: Optional[str] = None


class RoomSettingsUpdateRequest(BaseModel):
    room_name: Optional[str] = None
    cols: Optional[int] = None
    rows: Optional[int] = None
    max_racks: Optional[int] = None
    default_color: Optional[str] = None
    is_clickable: Optional[bool] = None
    is_hover_animation_enabled: Optional[bool] = None
    hover_duration: Optional[int] = None
    hover_easing: Optional[str] = None
    hover_scale: Optional[float] = None
    hover_shadow_intensity: Optional[float] = None


class BackupResponse(BaseModel):
    id: int
    backup_name: str
    backup_path: Optional[str] = None
    backup_type: str
    backup_size: Optional[int] = None
    checksum: Optional[str] = None
    created_at: datetime
    description: Optional[str] = None

    class Config:
        from_attributes = True


class HoverAnimationConfigResponse(BaseModel):
    duration: int
    easing: str
    scale: float
    shadowIntensity: float


@router.get("/rooms", response_model=List[RoomLayoutResponse])
def list_rooms(db: Session = Depends(get_db)):
    """获取所有机房布局配置"""
    rooms = get_all_rooms(db)
    return rooms


@router.get("/rooms/clickable", response_model=List[str])
def list_clickable_rooms(db: Session = Depends(get_db)):
    """获取所有可点击的机房ID列表"""
    rooms = get_clickable_rooms(db)
    return [room.room_id for room in rooms]


@router.get("/rooms/hover-animation", response_model=List[str])
def list_hover_animation_rooms(db: Session = Depends(get_db)):
    """获取所有开启悬停动画的机房ID列表"""
    rooms = get_hover_animation_rooms(db)
    return [room.room_id for room in rooms]


@router.get("/rooms/{room_id}", response_model=RoomLayoutResponse)
def get_room(room_id: str, db: Session = Depends(get_db)):
    """获取指定机房布局配置"""
    room = get_room_by_id(db, room_id)
    if not room:
        raise HTTPException(status_code=404, detail=f"机房 {room_id} 不存在")
    return room


@router.get("/rooms/{room_id}/is-clickable")
def check_room_clickable(room_id: str, db: Session = Depends(get_db)):
    """检查机房是否可点击"""
    return {"room_id": room_id, "is_clickable": is_room_clickable(db, room_id)}


@router.get("/rooms/{room_id}/hover-animation")
def check_room_hover_animation(room_id: str, db: Session = Depends(get_db)):
    """检查机房是否开启悬停动画"""
    return {"room_id": room_id, "is_enabled": is_room_hover_animation_enabled(db, room_id)}


@router.get("/rooms/{room_id}/hover-animation-config", response_model=HoverAnimationConfigResponse)
def get_room_hover_config(room_id: str, db: Session = Depends(get_db)):
    """获取机房悬停动画配置"""
    config = get_room_hover_animation_config(db, room_id)
    return config


@router.get("/rooms/{room_id}/default-color")
def get_room_default_color_endpoint(room_id: str, db: Session = Depends(get_db)):
    """获取机房默认颜色"""
    return {"room_id": room_id, "default_color": get_room_default_color(db, room_id)}


@router.get("/rooms/{room_id}/grid-info")
def get_room_grid_info_endpoint(room_id: str, db: Session = Depends(get_db)):
    """获取机房网格信息"""
    info = get_room_grid_info(db, room_id)
    return {"room_id": room_id, **info}


@router.get("/rooms/{room_id}/max-racks")
def get_room_max_racks_endpoint(room_id: str, db: Session = Depends(get_db)):
    """获取机房最大机柜数"""
    return {"room_id": room_id, "max_racks": get_room_max_racks(db, room_id)}


@router.get("/rooms/{room_id}/cabinets", response_model=List[CabinetConfigResponse])
def get_room_cabinets_endpoint(room_id: str, enabled_only: bool = False, db: Session = Depends(get_db)):
    """获取机房的所有机柜配置"""
    room = get_room_by_id(db, room_id)
    if not room:
        raise HTTPException(status_code=404, detail=f"机房 {room_id} 不存在")

    if enabled_only:
        cabinets = get_enabled_cabinets(db, room_id)
    else:
        cabinets = get_room_cabinets(db, room_id)

    return cabinets


@router.get("/rooms/{room_id}/area-frames", response_model=List[AreaFrameResponse])
def get_room_area_frames_endpoint(room_id: str, db: Session = Depends(get_db)):
    """获取机房区域框架配置"""
    room = get_room_by_id(db, room_id)
    if not room:
        raise HTTPException(status_code=404, detail=f"机房 {room_id} 不存在")

    frames = get_room_area_frames(db, room_id)
    return frames


@router.put("/rooms/{room_id}/settings", response_model=RoomLayoutResponse)
def update_room_settings_endpoint(room_id: str, request: RoomSettingsUpdateRequest, db: Session = Depends(get_db)):
    """更新机房设置"""
    try:
        kwargs = request.model_dump(exclude_none=True)
        room = update_room_settings(db, room_id, **kwargs)
        return room
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/rooms/{room_id}/shuffle", response_model=ShuffleResponse)
def shuffle_room_layout_endpoint(room_id: str, seed: Optional[int] = None, db: Session = Depends(get_db)):
    """随机打乱机房布局排序"""
    room = get_room_by_id(db, room_id)
    if not room:
        raise HTTPException(status_code=404, detail=f"机房 {room_id} 不存在")

    try:
        order = shuffle_room_layout(db, room_id, seed)
        return ShuffleResponse(
            room_id=room_id,
            original_order=order.original_order,
            shuffled_order=order.shuffled_order,
            shuffle_seed=order.shuffle_seed,
            message="布局排序已随机打乱"
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/rooms/{room_id}/reset", response_model=dict)
def reset_room_layout_endpoint(room_id: str, db: Session = Depends(get_db)):
    """重置机房布局到原始顺序"""
    room = get_room_by_id(db, room_id)
    if not room:
        raise HTTPException(status_code=404, detail=f"机房 {room_id} 不存在")

    success = reset_room_layout(db, room_id)
    return {"room_id": room_id, "success": success, "message": "布局已重置到原始顺序"}


@router.get("/rooms/{room_id}/layout-order")
def get_layout_order(room_id: str, db: Session = Depends(get_db)):
    """获取机房当前布局排序"""
    room = get_room_by_id(db, room_id)
    if not room:
        raise HTTPException(status_code=404, detail=f"机房 {room_id} 不存在")

    order = get_room_layout_order(db, room_id)
    if not order:
        return {
            "room_id": room_id,
            "has_active_order": False,
            "message": "没有激活的布局排序，使用默认顺序"
        }

    return {
        "room_id": room_id,
        "has_active_order": True,
        "shuffle_seed": order.shuffle_seed,
        "is_active": order.is_active,
        "created_at": order.created_at.isoformat() if order.created_at else None
    }


@router.put("/cabinets/update", response_model=dict)
def update_cabinets_endpoint(request: CabinetUpdateRequest, db: Session = Depends(get_db)):
    """批量更新机柜信息"""
    count = bulk_update_cabinets(
        db,
        request.room_id,
        request.cabinet_ids,
        request.enterprise,
        request.enabled,
        request.color
    )
    return {
        "success": True,
        "updated_count": count,
        "message": f"成功更新 {count} 个机柜"
    }


@router.post("/backup", response_model=BackupResponse)
def create_backup(db: Session = Depends(get_db)):
    """创建数据库备份"""
    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_name = f"cockpit_db_backup_{timestamp}"
        backup_path = os.path.join(BACKUP_DIR, f"{backup_name}.sql")

        result = subprocess.run(
            [
                "pg_dump",
                "-h", "localhost",
                "-p", "5434",
                "-U", "user",
                "-d", "cockpit_db",
                "-f", backup_path
            ],
            env={**os.environ, "PGPASSWORD": "password"},
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            raise Exception(f"备份失败: {result.stderr}")

        file_size = os.path.getsize(backup_path)

        record = create_backup_record(
            db,
            backup_name=backup_name,
            backup_path=backup_path,
            backup_type="full",
            description=f"手动备份创建于 {timestamp}"
        )
        record.backup_size = file_size
        db.commit()

        return record

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="pg_dump 未安装，请安装 PostgreSQL 客户端工具")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"备份失败: {str(e)}")


@router.get("/backups", response_model=List[BackupResponse])
def list_backups(limit: int = 10, db: Session = Depends(get_db)):
    """获取备份记录列表"""
    records = get_backup_records(db, limit)
    return records


@router.post("/backup/{backup_id}/restore", response_model=dict)
def restore_backup(backup_id: int, db: Session = Depends(get_db)):
    """从备份恢复数据库"""
    from app.room_layout_db import SessionLocal

    record = db.query(DbBackupRecord).filter(DbBackupRecord.id == backup_id).first()
    if not record:
        raise HTTPException(status_code=404, detail=f"备份记录 {backup_id} 不存在")

    if not record.backup_path or not os.path.exists(record.backup_path):
        raise HTTPException(status_code=404, detail=f"备份文件不存在: {record.backup_path}")

    try:
        subprocess.run(
            ["psql",
             "-h", "localhost",
             "-p", "5434",
             "-U", "user",
             "-d", "cockpit_db",
             "-c", "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'cockpit_db' AND pid <> pg_backend_pid();"],
            env={**os.environ, "PGPASSWORD": "password"},
            capture_output=True,
            text=True
        )

        result = subprocess.run(
            ["psql",
             "-h", "localhost",
             "-p", "5434",
             "-U", "user",
             "-d", "cockpit_db",
             "-f", record.backup_path],
            env={**os.environ, "PGPASSWORD": "password"},
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            raise Exception(f"恢复失败: {result.stderr}")

        return {
            "success": True,
            "backup_name": record.backup_name,
            "message": "数据库已成功恢复"
        }

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="psql 未安装，请安装 PostgreSQL 客户端工具")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"恢复失败: {str(e)}")


@router.get("/backup/latest", response_model=BackupResponse)
def get_latest_backup_endpoint(db: Session = Depends(get_db)):
    """获取最新备份记录"""
    record = get_latest_backup(db)
    if not record:
        raise HTTPException(status_code=404, detail="没有找到备份记录")
    return record
