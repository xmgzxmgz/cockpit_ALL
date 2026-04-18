from app.room_layout_db import SessionLocal, CabinetConfig
from app.database import Cabinet, Room, Enterprise
import random

db = SessionLocal()

print("Starting cabinet_config sync...")

# Get all rooms that need to be synced
rooms = db.query(Room).all()
print(f"Found {len(rooms)} rooms")

for room in rooms:
    # Get all cabinets for this room
    cabinets = db.query(Cabinet).filter(Cabinet.room_id == room.id).order_by(Cabinet.id).all()
    print(f"Room {room.id}: {len(cabinets)} cabinets")

    # Clear existing cabinet_config for this room
    db.query(CabinetConfig).filter(CabinetConfig.room_id == room.id).delete()

    # Create new cabinet_config entries based on cabinets table
    for idx, cabinet in enumerate(cabinets, start=1):
        # Calculate row and col based on idx (1-based sequential within room)
        row = (idx - 1) // 30 + 1
        col = ((idx - 1) % 30) + 1

        enterprise_name = None
        enterprise_color = None
        if cabinet.enterprise_id:
            enterprise = db.query(Enterprise).filter(Enterprise.id == cabinet.enterprise_id).first()
            if enterprise:
                enterprise_name = enterprise.name
                enterprise_color = enterprise.color

        config = CabinetConfig(
            room_id=room.id,
            cabinet_id=idx,  # Sequential cabinet number within the room
            col_position=col,
            row_position=row,
            enterprise=enterprise_name,
            enabled=cabinet.status == 'active' and enterprise_name is not None,
            color=enterprise_color,
            is_hidden=False,
            visible_index=idx,
            name=cabinet.cabinet_label,
            maintainer=enterprise.maintainer if enterprise else None,
            manager=enterprise.manager if enterprise else None
        )
        db.add(config)

db.commit()

# Verify the sync
total = db.query(CabinetConfig).count()
print(f"Total cabinet_config entries: {total}")

# Check a sample
sample = db.query(CabinetConfig).filter(CabinetConfig.room_id == '201').limit(3).all()
print("\nSample data for room 201:")
for s in sample:
    print(f"  cabinet_id={s.cabinet_id}, enterprise={s.enterprise}, enabled={s.enabled}")

db.close()
print("\nSync completed!")