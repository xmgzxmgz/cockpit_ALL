"""数据中心配置相关的 Pydantic schemas"""

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


# ==================== DataCenterConfig Schemas ====================

class DataCenterConfigBase(BaseModel):
    name: str
    floor_count: int = 1


class DataCenterConfigCreate(DataCenterConfigBase):
    pass


class DataCenterConfigUpdate(BaseModel):
    name: Optional[str] = None
    floor_count: Optional[int] = None


class DataCenterConfigResponse(DataCenterConfigBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== FloorConfig Schemas ====================

class FloorConfigBase(BaseModel):
    floor_number: int
    floor_name: Optional[str] = None
    shape: str = "rectangle"
    width: float = 100
    depth: float = 100
    room_count: int = 0


class FloorConfigCreate(FloorConfigBase):
    data_center_id: int


class FloorConfigUpdate(BaseModel):
    floor_name: Optional[str] = None
    shape: Optional[str] = None
    width: Optional[float] = None
    depth: Optional[float] = None
    room_count: Optional[int] = None


class FloorConfigResponse(FloorConfigBase):
    id: int
    data_center_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== RoomConfig Schemas ====================

class RoomConfigBase(BaseModel):
    room_number: int
    room_name: Optional[str] = None
    shape: str = "rectangle"
    cabinet_count: int = 0
    position_x: float = 0
    position_y: float = 0
    position_z: float = 0
    rotation: float = 0
    width: float = 50
    depth: float = 50
    height: float = 30


class RoomConfigCreate(RoomConfigBase):
    floor_id: int


class RoomConfigUpdate(BaseModel):
    room_name: Optional[str] = None
    shape: Optional[str] = None
    cabinet_count: Optional[int] = None
    position_x: Optional[float] = None
    position_y: Optional[float] = None
    position_z: Optional[float] = None
    rotation: Optional[float] = None
    width: Optional[float] = None
    depth: Optional[float] = None
    height: Optional[float] = None


class RoomConfigResponse(RoomConfigBase):
    id: int
    floor_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== CabinetLayout Schemas ====================

class CabinetLayoutBase(BaseModel):
    layout_type: str = "row"
    columns: int = 10
    rows: int = 10
    spacing: float = 1.0
    start_position_x: float = 0
    start_position_y: float = 0


class CabinetLayoutCreate(CabinetLayoutBase):
    room_id: int


class CabinetLayoutUpdate(BaseModel):
    layout_type: Optional[str] = None
    columns: Optional[int] = None
    rows: Optional[int] = None
    spacing: Optional[float] = None
    start_position_x: Optional[float] = None
    start_position_y: Optional[float] = None


class CabinetLayoutResponse(CabinetLayoutBase):
    id: int
    room_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== CabinetGrid Schemas ====================

class CabinetGridBase(BaseModel):
    grid_x: int
    grid_y: int
    is_occupied: bool = False
    cabinet_id: Optional[int] = None


class CabinetGridCreate(CabinetGridBase):
    room_id: int


class CabinetGridUpdate(BaseModel):
    is_occupied: Optional[bool] = None
    cabinet_id: Optional[int] = None


class CabinetGridResponse(CabinetGridBase):
    id: int
    room_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CabinetGridBatchSelect(BaseModel):
    """批量框选机柜网格"""
    room_id: int
    start_x: int
    start_y: int
    end_x: int
    end_y: int
    is_occupied: bool = True


# ==================== ResourceOverview Schemas ====================

class ResourceOverviewBase(BaseModel):
    total_servers: int = 0
    total_it_cabinet_count: int = 0
    total_enterprise_count: int = 0
    should_bill_cabinets: int = 0
    billed_cabinets: int = 0
    reserved_cabinets: int = 0
    available_cabinets: int = 0
    customer_cabinets: int = 0
    self_use_cabinets: int = 0


class ResourceOverviewCreate(ResourceOverviewBase):
    pass


class ResourceOverviewUpdate(BaseModel):
    total_servers: Optional[int] = None
    total_it_cabinet_count: Optional[int] = None
    total_enterprise_count: Optional[int] = None
    should_bill_cabinets: Optional[int] = None
    billed_cabinets: Optional[int] = None
    reserved_cabinets: Optional[int] = None
    available_cabinets: Optional[int] = None
    customer_cabinets: Optional[int] = None
    self_use_cabinets: Optional[int] = None


class ResourceOverviewResponse(ResourceOverviewBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
