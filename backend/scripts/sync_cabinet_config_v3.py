from app.room_layout_db import SessionLocal, CabinetConfig
from app.database import Cabinet, Room, Enterprise

db = SessionLocal()

print("Starting fresh sync of cabinet_config...")

# Get all rooms
rooms = db.query(Room).all()
print(f"Found {len(rooms)} rooms")

# Clear all existing cabinet_config
db.query(CabinetConfig).delete()

# Get all enterprises
enterprises = {e.id: e for e in db.query(Enterprise).all()}
print(f"Found {len(enterprises)} enterprises")

# Process each room
for room in rooms:
    cabinets = db.query(Cabinet).filter(Cabinet.room_id == room.id).order_by(Cabinet.id).all()

    if not cabinets:
        # Create empty placeholder for rooms without cabinets
        print(f"Room {room.id}: No cabinets, skipping")
        continue

    print(f"Room {room.id}: {len(cabinets)} cabinets")

    for idx, cabinet in enumerate(cabinets, start=1):
        row = (idx - 1) // 30 + 1
        col = ((idx - 1) % 30) + 1

        enterprise = enterprises.get(cabinet.enterprise_id) if cabinet.enterprise_id else None
        enterprise_name = enterprise.name if enterprise else None
        enterprise_color = enterprise.color if enterprise else None
        enabled = enterprise is not None  # Enabled only if enterprise is assigned

        config = CabinetConfig(
            room_id=room.id,
            cabinet_id=idx,
            col_position=col,
            row_position=row,
            enterprise=enterprise_name,
            enabled=enabled,
            color=enterprise_color,
            is_hidden=False,
            visible_index=idx,
            name=cabinet.cabinet_label,
            maintainer=enterprise.maintainer if enterprise else None,
            manager=enterprise.manager if enterprise else None
        )
        db.add(config)

db.commit()

# Summary
total = db.query(CabinetConfig).count()
print(f"\nTotal cabinet_config entries: {total}")

# Stats
stats = db.execute("""
    SELECT room_id, COUNT(*) as total,
           SUM(CASE WHEN enabled THEN 1 ELSE 0 END) as enabled,
           SUM(CASE WHEN enterprise IS NOT NULL THEN 1 ELSE 0 END) as with_enterprise
    FROM cabinet_config
    GROUP BY room_id
    ORDER BY room_id
""").fetchall()
print("\nRoom stats:")
for s in stats:
    print(f"  {s[0]}: total={s[1]}, enabled={s[2]}, with_enterprise={s[3]}")

db.close()
print("\nDone!")