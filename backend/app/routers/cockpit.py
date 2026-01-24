from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
import random
from datetime import datetime

from ..database import get_db, Enterprise, Room, Cabinet, Alert
from ..schemas import (
    EnterpriseResponse,
    RoomResponse,
    CabinetResponse,
    CabinetDetailResponse,
    CockpitStats
)

router = APIRouter(
    prefix="/cockpit",
    tags=["cockpit"],
    responses={404: {"description": "Not found"}},
)

@router.get("/stats", response_model=CockpitStats)
def get_cockpit_stats(db: Session = Depends(get_db)):
    total_cabinets = db.query(Cabinet).count()
    # Mocking power and capacity for now as they are not directly in DB
    total_power = 1250.5 # kW
    total_capacity = 2500.0 # kVA
    
    active_alerts = db.query(Alert).filter(Alert.status == "active").count()
    pue = 1.38 # Static for now or fetch from Feature

    return CockpitStats(
        total_cabinets=total_cabinets,
        total_power=total_power,
        total_capacity=total_capacity,
        active_alerts=active_alerts,
        pue=pue
    )

@router.get("/enterprises", response_model=List[EnterpriseResponse])
def get_enterprises(db: Session = Depends(get_db)):
    return db.query(Enterprise).all()

@router.get("/rooms", response_model=List[RoomResponse])
def get_rooms(db: Session = Depends(get_db)):
    return db.query(Room).all()

@router.get("/rooms/{room_id}/cabinets", response_model=List[CabinetResponse])
def get_room_cabinets(room_id: str, db: Session = Depends(get_db)):
    cabinets = db.query(Cabinet).filter(Cabinet.room_id == room_id).all()
    
    result = []
    for cab in cabinets:
        ent_name = cab.enterprise.name if cab.enterprise else None
        ent_color = cab.enterprise.color if cab.enterprise else "#ccc"
        
        # Mapping to CabinetResponse
        result.append({
            "room_id": cab.room_id,
            "FKHNAME": cab.room_id, # Mock mapping
            "cabinet_id": cab.cabinet_label,
            "FENAME": ent_name,
            "maintainer": "系统管理员",
            "KHMANAGE": "启用" if cab.status == "active" else "禁用",
            "color": ent_color
        })
    return result

@router.get("/rooms/{room_id}/cabinets/{cabinet_label}", response_model=CabinetDetailResponse)
def get_cabinet_detail(room_id: str, cabinet_label: str, db: Session = Depends(get_db)):
    # Try to find the cabinet
    # Note: cabinet_label is stored as '001', '002' etc. or just '1', '2' depending on data
    # We might need to handle padding or search flexibly.
    # For now, assume exact match or try integer conversion if string fails.
    
    cabinet = db.query(Cabinet).filter(
        Cabinet.room_id == room_id, 
        Cabinet.cabinet_label == cabinet_label
    ).first()
    
    if not cabinet:
        # Fallback: try removing leading zeros or adding them
        if cabinet_label.startswith("0"):
            cabinet = db.query(Cabinet).filter(
                Cabinet.room_id == room_id, 
                Cabinet.cabinet_label == str(int(cabinet_label))
            ).first()
    
    if not cabinet:
        raise HTTPException(status_code=404, detail="Cabinet not found")

    ent_name = cabinet.enterprise.name if cabinet.enterprise else None
    
    # Generate realistic mock data for dashboard
    # In a real system, this would come from monitoring features/metrics
    random.seed(f"{room_id}_{cabinet_label}") # Consistent random data
    
    total_u = 42
    used_u = random.randint(10, 38) if ent_name else 0
    power_usage = round(random.uniform(0.5, 5.0), 2) if ent_name else 0.0
    temperature = round(random.uniform(20.0, 28.0), 1) if ent_name else 22.0
    device_count = random.randint(3, 15) if ent_name else 0
    
    return {
        "id": cabinet.id,
        "cabinet_label": cabinet.cabinet_label,
        "room_id": cabinet.room_id,
        "enterprise_name": ent_name,
        "status": cabinet.status,
        "total_u": total_u,
        "used_u": used_u,
        "power_usage": power_usage,
        "temperature": temperature,
        "device_count": device_count,
        "updated_at": datetime.now()
    }

