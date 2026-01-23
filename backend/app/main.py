from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from pydantic import BaseModel

from .database import Base, engine, get_db, Enterprise, Room, Cabinet

# 创建数据库表（如果不存在）
# 注意：在生产环境中通常使用 Alembic 进行迁移，这里为了简单直接创建
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cockpit Backend")

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic 模型
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

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

# 获取机房的机柜数据
@app.get("/api/room/{room_id}/cabinets", response_model=List[CabinetResponse])
def get_room_cabinets(room_id: str, db: Session = Depends(get_db)):
    # 查询指定机房的所有机柜，并预加载企业信息
    cabinets = db.query(Cabinet).filter(Cabinet.room_id == room_id).all()
    
    result = []
    for cab in cabinets:
        if cab.enterprise:
            result.append({
                "room_id": cab.room_id,
                "FKHNAME": cab.enterprise.name,
                "cabinet_id": cab.cabinet_label,
                "FENAME": cab.enterprise.full_name,
                "maintainer": cab.enterprise.maintainer,
                "KHMANAGE": cab.enterprise.manager
            })
    return result

# 获取资源概览统计
@app.get("/api/stats/overview")
def get_overview_stats(db: Session = Depends(get_db)):
    total_cabinets = db.query(Cabinet).count()
    total_enterprises = db.query(Enterprise).count()
    return {
        "totalITCabinetCount": total_cabinets,
        "totalEnterpriseCount": total_enterprises
    }

# 获取企业机柜统计
@app.get("/api/stats/enterprises", response_model=List[EnterpriseStat])
def get_enterprise_stats(db: Session = Depends(get_db)):
    # 统计每个企业的机柜数量
    stats = db.query(
        Enterprise.name, 
        func.count(Cabinet.id).label('count')
    ).join(Cabinet).group_by(Enterprise.name).all()
    
    return [{"fkhname": name, "cabinetCount": count} for name, count in stats]
