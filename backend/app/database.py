from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os

# 从环境变量获取数据库连接 URL，如果未设置则使用默认值
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/cockpit")

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
    
    cabinets = relationship("Cabinet", back_populates="enterprise")

class Room(Base):
    __tablename__ = "rooms"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String)
    
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

# 获取数据库会话的依赖项
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
