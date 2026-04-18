from app.room_layout_db import SessionLocal, RoomLayoutConfig, CabinetConfig
import random

db = SessionLocal()

room_ids = ['1-1', '201', '202', '203', '204', '205', '206',
            '3-1', '3-2', '3-3', '3-4', '3-5', '3-6',
            '401', '402', '403', '404', '405', '406',
            '501', '502', '503']

for room_id in room_ids:
    existing = db.query(RoomLayoutConfig).filter(RoomLayoutConfig.room_id == room_id).first()
    if not existing:
        config = RoomLayoutConfig(
            room_id=room_id,
            room_name=f"{room_id}机房",
            cols=30,
            rows=20,
            max_racks=600,
            default_color='#4a4a4a',
            is_clickable=True,
            is_hover_animation_enabled=True
        )
        db.add(config)
        print(f"Added room config: {room_id}")

db.commit()
print(f"Total rooms in config: {db.query(RoomLayoutConfig).count()}")
db.close()