"""数据中心配置 API 路由"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import random

from app.database import (
    get_db,
    DataCenterConfig,
    FloorConfig,
    RoomConfig,
    CabinetLayout,
    CabinetGrid,
    ResourceOverview,
)
from app.schemas.config import (
    DataCenterConfigCreate,
    DataCenterConfigResponse,
    FloorConfigCreate,
    FloorConfigResponse,
    RoomConfigCreate,
    RoomConfigResponse,
    CabinetLayoutCreate,
    CabinetLayoutResponse,
    CabinetGridCreate,
    CabinetGridResponse,
    CabinetGridBatchSelect,
    ResourceOverviewResponse,
    ResourceOverviewUpdate,
)

router = APIRouter(prefix="/api/config", tags=["config"])


# ==================== DataCenterConfig API ====================

@router.post("/data-center", response_model=DataCenterConfigResponse)
def create_data_center(config: DataCenterConfigCreate, db: Session = Depends(get_db)):
    """创建数据中心配置"""
    db_config = DataCenterConfig(**config.dict())
    db.add(db_config)
    db.commit()
    db.refresh(db_config)
    return db_config


@router.get("/data-center/{config_id}", response_model=DataCenterConfigResponse)
def get_data_center(config_id: int, db: Session = Depends(get_db)):
    """获取数据中心配置（不存在时自动创建默认）"""
    config = db.query(DataCenterConfig).filter(DataCenterConfig.id == config_id).first()
    if not config:
        # 自动创建默认数据中心配置，避免前端 404
        config = DataCenterConfig(name="北京A数据中心", floor_count=4)
        db.add(config)
        db.commit()
        db.refresh(config)
    return config


@router.put("/data-center/{config_id}", response_model=DataCenterConfigResponse)
def update_data_center(config_id: int, config: DataCenterConfigCreate, db: Session = Depends(get_db)):
    """更新数据中心配置"""
    db_config = db.query(DataCenterConfig).filter(DataCenterConfig.id == config_id).first()
    if not db_config:
        raise HTTPException(status_code=404, detail="配置不存在")
    
    for key, value in config.dict().items():
        setattr(db_config, key, value)
    
    db.commit()
    db.refresh(db_config)
    return db_config


# ==================== FloorConfig API ====================

@router.post("/floors", response_model=FloorConfigResponse)
def create_floor(floor: FloorConfigCreate, db: Session = Depends(get_db)):
    """创建楼层配置"""
    db_floor = FloorConfig(**floor.dict())
    db.add(db_floor)
    db.commit()
    db.refresh(db_floor)
    return db_floor


@router.get("/floors/{floor_id}", response_model=FloorConfigResponse)
def get_floor(floor_id: int, db: Session = Depends(get_db)):
    """获取楼层配置"""
    floor = db.query(FloorConfig).filter(FloorConfig.id == floor_id).first()
    if not floor:
        raise HTTPException(status_code=404, detail="楼层不存在")
    return floor


@router.get("/data-center/{data_center_id}/floors", response_model=List[FloorConfigResponse])
def get_floors_by_data_center(data_center_id: int, db: Session = Depends(get_db)):
    """获取数据中心的所有楼层"""
    floors = db.query(FloorConfig).filter(FloorConfig.data_center_id == data_center_id).all()
    return floors


# ==================== RoomConfig API ====================

@router.post("/rooms", response_model=RoomConfigResponse)
def create_room(room: RoomConfigCreate, db: Session = Depends(get_db)):
    """创建机房配置"""
    db_room = RoomConfig(**room.dict())
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room


@router.get("/rooms/{room_id}", response_model=RoomConfigResponse)
def get_room(room_id: int, db: Session = Depends(get_db)):
    """获取机房配置"""
    room = db.query(RoomConfig).filter(RoomConfig.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="机房不存在")
    return room


@router.get("/floors/{floor_id}/rooms", response_model=List[RoomConfigResponse])
def get_rooms_by_floor(floor_id: int, db: Session = Depends(get_db)):
    """获取楼层的所有机房"""
    rooms = db.query(RoomConfig).filter(RoomConfig.floor_id == floor_id).all()
    return rooms


@router.put("/rooms/{room_id}", response_model=RoomConfigResponse)
def update_room(room_id: int, room: RoomConfigCreate, db: Session = Depends(get_db)):
    """更新机房配置"""
    db_room = db.query(RoomConfig).filter(RoomConfig.id == room_id).first()
    if not db_room:
        raise HTTPException(status_code=404, detail="机房不存在")
    
    for key, value in room.dict().items():
        if key != "floor_id":
            setattr(db_room, key, value)
    
    db.commit()
    db.refresh(db_room)
    return db_room


# ==================== CabinetLayout API ====================

@router.post("/cabinet-layout", response_model=CabinetLayoutResponse)
def create_cabinet_layout(layout: CabinetLayoutCreate, db: Session = Depends(get_db)):
    """创建机柜排列配置"""
    # 删除旧的布局（如果存在）
    db.query(CabinetLayout).filter(CabinetLayout.room_id == layout.room_id).delete()
    
    db_layout = CabinetLayout(**layout.dict())
    db.add(db_layout)
    db.commit()
    db.refresh(db_layout)
    return db_layout


@router.get("/rooms/{room_id}/layout", response_model=CabinetLayoutResponse)
def get_cabinet_layout(room_id: int, db: Session = Depends(get_db)):
    """获取机房的机柜排列配置"""
    layout = db.query(CabinetLayout).filter(CabinetLayout.room_id == room_id).first()
    if not layout:
        raise HTTPException(status_code=404, detail="布局不存在")
    return layout


# ==================== CabinetGrid API ====================

@router.post("/cabinet-grid", response_model=CabinetGridResponse)
def create_cabinet_grid(grid: CabinetGridCreate, db: Session = Depends(get_db)):
    """创建机柜网格"""
    db_grid = CabinetGrid(**grid.dict())
    db.add(db_grid)
    db.commit()
    db.refresh(db_grid)
    return db_grid


@router.get("/rooms/{room_id}/grid", response_model=List[CabinetGridResponse])
def get_cabinet_grid(room_id: int, db: Session = Depends(get_db)):
    """获取机房的机柜网格"""
    grids = db.query(CabinetGrid).filter(CabinetGrid.room_id == room_id).all()
    return grids


@router.post("/rooms/{room_id}/grid/select")
def batch_select_cabinet_grid(room_id: int, select: CabinetGridBatchSelect, db: Session = Depends(get_db)):
    """批量框选机柜网格"""
    start_x = min(select.start_x, select.end_x)
    end_x = max(select.start_x, select.end_x)
    start_y = min(select.start_y, select.end_y)
    end_y = max(select.start_y, select.end_y)
    
    grids = db.query(CabinetGrid).filter(
        CabinetGrid.room_id == room_id,
        CabinetGrid.grid_x >= start_x,
        CabinetGrid.grid_x <= end_x,
        CabinetGrid.grid_y >= start_y,
        CabinetGrid.grid_y <= end_y,
    ).all()
    
    for grid in grids:
        grid.is_occupied = select.is_occupied
    
    db.commit()
    return {"count": len(grids), "message": f"已更新 {len(grids)} 个网格"}


@router.post("/rooms/{room_id}/grid/init")
def init_cabinet_grid(room_id: int, db: Session = Depends(get_db)):
    """初始化机房的机柜网格（100 个格子）"""
    # 删除旧的网格
    db.query(CabinetGrid).filter(CabinetGrid.room_id == room_id).delete()
    
    # 创建 10x10 的网格
    for x in range(10):
        for y in range(10):
            grid = CabinetGrid(room_id=room_id, grid_x=x, grid_y=y, is_occupied=False)
            db.add(grid)
    
    db.commit()
    return {"message": "已初始化 100 个网格"}


# ==================== ResourceOverview API ====================

@router.get("/resource-overview", response_model=ResourceOverviewResponse)
def get_resource_overview(db: Session = Depends(get_db)):
    """获取资源概览"""
    overview = db.query(ResourceOverview).first()
    if not overview:
        # 创建默认的资源概览
        overview = ResourceOverview(
            total_servers=random.randint(1000, 5000),
            total_it_cabinet_count=random.randint(100, 500),
            total_enterprise_count=random.randint(10, 100),
            should_bill_cabinets=random.randint(50, 200),
            billed_cabinets=random.randint(30, 150),
            reserved_cabinets=random.randint(10, 50),
            available_cabinets=random.randint(20, 100),
            customer_cabinets=random.randint(50, 200),
            self_use_cabinets=random.randint(10, 50),
        )
        db.add(overview)
        db.commit()
        db.refresh(overview)
    return overview


@router.put("/resource-overview", response_model=ResourceOverviewResponse)
def update_resource_overview(overview: ResourceOverviewUpdate, db: Session = Depends(get_db)):
    """更新资源概览"""
    db_overview = db.query(ResourceOverview).first()
    if not db_overview:
        db_overview = ResourceOverview()
        db.add(db_overview)
    
    for key, value in overview.dict(exclude_unset=True).items():
        setattr(db_overview, key, value)
    
    db.commit()
    db.refresh(db_overview)
    return db_overview


@router.post("/resource-overview/refresh")
def refresh_resource_overview(db: Session = Depends(get_db)):
    """刷新资源概览（生成随机数据）"""
    db_overview = db.query(ResourceOverview).first()
    if not db_overview:
        db_overview = ResourceOverview()
        db.add(db_overview)
    
    db_overview.total_servers = random.randint(1000, 5000)
    db_overview.total_it_cabinet_count = random.randint(100, 500)
    db_overview.total_enterprise_count = random.randint(10, 100)
    db_overview.should_bill_cabinets = random.randint(50, 200)
    db_overview.billed_cabinets = random.randint(30, 150)
    db_overview.reserved_cabinets = random.randint(10, 50)
    db_overview.available_cabinets = random.randint(20, 100)
    db_overview.customer_cabinets = random.randint(50, 200)
    db_overview.self_use_cabinets = random.randint(10, 50)
    
    db.commit()
    db.refresh(db_overview)
    return db_overview
